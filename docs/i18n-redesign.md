# RFC — KIBAN i18n Add-on Redesign

**Status:** Draft
**Author:** Tiago Pacheco (with Claude)
**Date:** 2026-05-06
**Target:** KIBAN CMS v1.7+ + headless consumers (Algarve Explorer is the pilot)

---

## 1. Context

The current KIBAN i18n add-on is a Google-Translate-style client widget: a `<script>` injected into the `<head>` mutates the DOM after hydration. It works on every site, requires no rebuild, but inherits all the limitations of runtime DOM translation:

- **Flash of original content** — every visitor sees the default locale for ~300–800 ms before the widget rewrites the page.
- **Single URL per page** — search engines see only the default locale, so multilingual content is invisible to Google in any language other than the default. No hreflang. No locale-prefixed sitemaps.
- **Fragile DOM mutation** — React re-renders, lazy-loaded content, and dynamic state mutations all revert text back to the source language until the widget re-runs.
- **Auto-translate only** — output is machine quality. No way for marketing/copy teams to override or refine.
- **No coverage tooling** — devs have no signal for which strings are missing translations.
- **No translation memory** — every request re-translates the same string against DeepL/Google quota.
- **No translatable URLs (slugs)** — `/about` stays `/about` in every language, losing keyword intent per market.

The competitive reference is [TranslatePress](https://translatepress.com/) for WordPress: visual front-end editor, hybrid auto + manual translation, locale-prefixed URLs, translatable slugs/meta/alt text, DeepL/Google fallback, full SEO compliance.

This RFC proposes redesigning the KIBAN i18n add-on to deliver TranslatePress-class capability while staying true to KIBAN's headless-first nature.

---

## 2. Goals & Non-Goals

### Goals

1. **Zero flash** — translated HTML is delivered server-side; first paint is already in the user's locale.
2. **Multilingual SEO** — locale-prefixed URLs, hreflang tags, per-locale sitemap, translatable meta, translatable slugs.
3. **Hybrid translation workflow** — DeepL/Google for instant draft, human review for final, translation memory to avoid re-paying for the same string.
4. **Visual front-end editor** — non-technical translators click any text on the live site, edit inline, and publish. Killer differentiator.
5. **Headless-friendly** — works for Next.js, Nuxt, Astro, plain React, and vanilla HTML. No framework lock-in.
6. **Backwards compatible** — existing sites using the legacy widget keep working during transition; opt-in to the new SDK at the consumer's pace.

### Non-Goals (v1)

- Multi-tenant translation memory pooling across customers (privacy concern; future feature).
- Real-time collaborative editing (single-editor-at-a-time is fine for v1).
- Translation of binary assets (videos, audio).
- RTL layout polyfills — covered by the consumer framework, not the i18n SDK.

---

## 3. Architecture

### 3.1 Layered overview

```
┌─────────────────────────────────────────────────────────────┐
│  Consumer site (Next.js, Nuxt, plain HTML, …)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  @kiban/i18n SDK                                       │   │
│  │  - SSR mode (preferred)                                │   │
│  │  - CSR mode (legacy widget compatibility)              │   │
│  │  - Visual editor bridge (postMessage)                  │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────────────────────────┐
│  KIBAN API  /api/v1/i18n/*                                   │
│  - translations, languages, url-aliases, coverage,           │
│    missing-keys, auto-translate, import/export               │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│  Data layer (Postgres / Supabase)                            │
│  - i18n_languages                                            │
│  - i18n_translations                                         │
│  - i18n_url_aliases                                          │
│  - i18n_translation_memory                                   │
│  - tour_translations / entry_translations (sidecars)         │
└──────────────────────────────────────────────────────────────┘
                   ▲
                   │ admin auth
┌──────────────────┴──────────────────────────────────────────┐
│  KIBAN Admin UI                                              │
│  - Translations dashboard (coverage, drafts queue)           │
│  - Bulk editor (table view, filters, status)                 │
│  - Visual editor (iframe overlay on live site)               │
│  - Auto-translate workflow (DeepL/Google)                    │
│  - Import/export (PO, CSV, JSON, XLIFF)                      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data model

**`i18n_languages`** *(already exists; expand)*
```sql
code           text primary key       -- 'pt', 'en', 'fr-CA'
name           text                    -- 'Português', 'English'
native_name    text                    -- 'Português', 'English'
flag_emoji     text
direction      text default 'ltr'      -- 'ltr' | 'rtl'
is_default     boolean
is_enabled     boolean
fallback_chain text[]                  -- ['en', 'pt']: try en, then pt
sort_order     int
```

**`i18n_translations`** *(NEW — universal key-value store)*
```sql
id             uuid primary key
namespace      text not null           -- 'frontend.algarveexplorer' | 'tours.{slug}'
key            text not null           -- 'home.hero.title'
locale         text not null           -- references i18n_languages.code
value          text not null
source         text not null           -- 'auto:deepl' | 'auto:google' | 'manual' | 'imported'
status         text not null           -- 'draft' | 'reviewed' | 'published'
updated_by     uuid
updated_at     timestamptz default now()
version        int default 1
unique (namespace, key, locale)
```

**`i18n_url_aliases`** *(NEW — translatable slugs)*
```sql
resource_type  text                    -- 'tour' | 'page'
resource_id    text                    -- slug or ID in default locale
locale         text
alias          text                    -- localized slug
unique (resource_type, resource_id, locale)
unique (locale, alias)                  -- prevents collisions per locale
```

**`i18n_translation_memory`** *(NEW — cache + cost control)*
```sql
source_text    text
source_locale  text
target_locale  text
target_text    text
score          float                   -- confidence
provider       text                    -- 'deepl' | 'google'
created_at     timestamptz
unique (source_text, source_locale, target_locale)
```

**Entry-level translations** *(per content collection)*

For collections like `tours`, the recommended approach is a **sidecar table**:

```sql
tour_translations
  - tour_id        uuid → tours.id
  - locale         text
  - fields         jsonb        -- { "title": "…", "subtitle": "…", "short_description": "…" }
  - status         text
  - updated_at     timestamptz
  - unique (tour_id, locale)
```

This avoids schema migrations every time a language is added and keeps the base entry untouched. Translatable fields are declared per collection in a config (e.g., `tours_i18n_fields = ["title", "subtitle", "short_description", "full_description"]`).

### 3.3 API surface

```
# Read
GET    /api/v1/i18n/languages
GET    /api/v1/i18n/translations/:namespace?locale=en
GET    /api/v1/i18n/translations/:namespace/:key?locale=en
GET    /api/v1/i18n/coverage?namespace=…
GET    /api/v1/i18n/missing-keys?namespace=…
GET    /api/v1/i18n/url-aliases?locale=en

# Write (admin auth)
POST   /api/v1/i18n/translations                        # single create/update
POST   /api/v1/i18n/translations/bulk                   # batch import
POST   /api/v1/i18n/translations/auto                   # trigger DeepL for drafts
POST   /api/v1/i18n/missing-keys                        # SDK reports new keys
POST   /api/v1/i18n/url-aliases
DELETE /api/v1/i18n/translations/:id

# Content endpoints (existing — extend with sidecar lookup)
GET    /api/v1/tours?lang=fr                            # joins tour_translations
GET    /api/v1/tours/:slug?lang=fr                      # uses url_aliases reverse-lookup
```

**Locale resolution rules (server side):**
1. Explicit `?lang=` query param wins.
2. Then `Accept-Language` header.
3. Then `kiban-lang` cookie.
4. Then `i18n_languages.is_default`.

If a translation is missing in the requested locale, fall back via `fallback_chain` (e.g., `fr-CA → fr → en → pt`).

### 3.4 Frontend SDK — `@kiban/i18n`

**Package layout:**
```
@kiban/i18n             # core (locale negotiation, fetch helpers, types)
@kiban/i18n-react       # React hooks & components, Next.js helpers
@kiban/i18n-cli         # extract / pull / coverage commands
@kiban/i18n-legacy      # the existing widget script (compat shim)
```

**SSR usage (Next.js App Router):**

```tsx
// app/[locale]/layout.tsx
import { KibanI18nProvider, getTranslations } from '@kiban/i18n-react/server';

export async function generateStaticParams() {
  return (await fetchEnabledLocales()).map((l) => ({ locale: l.code }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getTranslations({
    namespace: 'frontend.algarveexplorer',
    locale,
  });

  return (
    <html lang={locale}>
      <body>
        <KibanI18nProvider locale={locale} messages={messages}>
          {children}
        </KibanI18nProvider>
      </body>
    </html>
  );
}
```

```tsx
// any client component
import { useT } from '@kiban/i18n-react';

const t = useT();
return <h1>{t('home.hero.title')}</h1>;
```

**Auto key-discovery:** when `t('some.new.key')` is called and the key doesn't exist in the loaded messages, the SDK reports the key (debounced, batched) to `POST /i18n/missing-keys`. The string then appears in the admin's "missing keys" queue, ready to be drafted via auto-translate.

**Translatable slugs:**

```ts
import { localizePath } from '@kiban/i18n-react';

<Link href={localizePath('/about', 'fr')}>{t('nav.about')}</Link>
// → /fr/a-propos
```

**SEO helpers:**

```ts
import { generateLocaleAlternates, generateMultiLocaleSitemap } from '@kiban/i18n-react/seo';

// In generateMetadata:
alternates: {
  canonical: '/en/about',
  languages: await generateLocaleAlternates('/about'),
  // → { 'pt': '/sobre', 'en': '/en/about', 'fr': '/fr/a-propos' }
},
```

**CLI:**
```sh
kiban-i18n extract             # codemod scans source for t()/<TText/> calls
kiban-i18n pull --locale=en    # downloads translations to messages/en.json (for SSG)
kiban-i18n coverage            # prints % per locale to CI
kiban-i18n auto --locale=fr    # bulk auto-translate via DeepL
```

### 3.5 Admin UI

1. **Translations Dashboard**
   - Coverage matrix: collections × locales, % published.
   - Drafts queue: items waiting human review.
   - Missing keys queue: keys reported by SDK that don't have any translation yet.
   - Translation memory hit rate (cost savings).

2. **Bulk Editor**
   - Spreadsheet-like table.
   - Columns: namespace, key, source text, EN, FR, ES, …, status.
   - Filters: status, locale, namespace.
   - Inline editing, paste from clipboard, undo.

3. **Visual Editor** *(killer feature)*
   - Embeds the live site in an iframe with `?kiban-edit=1`.
   - SDK detects this and adds `data-kiban-key` attributes to every translated element.
   - Admin overlay catches clicks → opens inline editor near the element → saves to API → page re-renders.
   - Uses `postMessage` for cross-frame auth and event passing.
   - Drafts are visible only in the editor; production sees published only.

4. **Auto-Translate Workflow**
   - Bulk button: "Translate all missing keys for locale `X` via DeepL".
   - Translations land as `status='draft'`.
   - Reviewer opens the queue, approves → `status='published'`.

5. **Import/Export**
   - PO/MO (gettext, agency-friendly).
   - CSV (Excel-friendly).
   - JSON (developer-friendly).
   - XLIFF (industry standard for translation tools).

---

## 4. SEO Implementation

- **Locale-prefixed URLs**: `/` (default `pt`), `/en/...`, `/fr/...`. Default locale stays at root to preserve existing SEO.
- **Translatable slugs**: `tour_translations` provides `slug_localized`. `/en/horse-riding-tour` ↔ `/fr/balade-a-cheval`.
- **Hreflang tags**: server-rendered in every page's `<head>`:
  ```html
  <link rel="alternate" hreflang="pt" href="https://example.com/sobre" />
  <link rel="alternate" hreflang="en" href="https://example.com/en/about" />
  <link rel="alternate" hreflang="x-default" href="https://example.com/sobre" />
  ```
- **Per-locale sitemap**: `sitemap.xml` includes `<xhtml:link>` entries for each locale variant of each URL. Optionally separate sitemaps `sitemap-pt.xml`, `sitemap-en.xml` linked from a sitemap index.
- **Canonical**: each locale page is canonical to itself (not to the default locale). Hreflang carries the locale relationship.
- **Localized metadata**: `<title>`, `<meta description>`, `og:*`, `twitter:*` all come from the per-locale translations.

---

## 5. Migration & Backwards Compatibility

The existing widget keeps working unchanged. New sites opt in to the SDK; existing sites can migrate incrementally:

1. Install `@kiban/i18n-react` alongside the legacy widget.
2. Move one route at a time under `app/[locale]/`. As each route migrates, the SDK takes over translation; the legacy widget still handles unmigrated routes.
3. After full migration, remove the legacy widget script.

For sites that can't SSR (static HTML, vanilla JS), `@kiban/i18n` provides a CSR mode that's still better than the current widget: it fetches translations once and caches them, instead of mutating the DOM on every render.

The existing `?lang=` query parameter on content endpoints stays. New sidecar tables join on it. Customers' existing API consumers see no breaking changes.

---

## 6. Roadmap

| Phase | Deliverable | Effort (1 senior dev) |
|---|---|---|
| 1 | Backend foundation: schema, read APIs, auto-translate worker | 3–5 days |
| 2 | Admin: bulk editor + coverage dashboard | 5–8 days |
| 3 | SDK `@kiban/i18n` (SSR + CSR + CLI) | 4–6 days |
| 4 | Migrate Algarve Explorer (pilot) | 1–2 days |
| 5 | Visual editor (iframe + bridge) | 5–10 days |
| 6 | Translatable slugs + hreflang/sitemap helpers | 2–3 days |
| 7 | Import/export (PO, CSV, XLIFF) + CI integrations | 2–3 days |

**MVP that delivers ~80 % of value (Phases 1+2+3+4):** ~2–3 weeks.

**Full release:** 4–6 weeks single-dev, ~3 weeks with a backend + frontend pair.

A **shorter pilot** before backend work is implemented in this repo as `app/[locale]/` + server-side `?lang=` consumption. It validates the SSR architecture and delivers value to Algarve Explorer immediately, without depending on the new translation tables.

---

## 7. Open Product Decisions

1. **URL strategy**: subfolders (`/en/about`) — *recommended, default*.
2. **Default-locale prefix**: `/` (no prefix, PT) — *recommended*. Preserves existing SEO.
3. **Translatable slugs**: defer to Phase 6 (v2) so MVP ships faster.
4. **MT provider**: DeepL — *recommended* (better Romance/Germanic quality than Google for our markets).
5. **Pricing/positioning**: defer; not blocking the technical design.
6. **DeepL key ownership**: customer brings their own (BYOK) — *recommended*. KIBAN passes calls through, no quota management. Pooled key is a future product decision.
7. **Legacy widget deprecation timeline**: keep indefinitely with a deprecation warning in admin UI.

---

## 8. Open Technical Questions

- **Auth for the visual editor iframe**: short-lived signed token in `postMessage` handshake, rotated per session.
- **Concurrent edit conflict resolution**: last-write-wins for v1; introduce optimistic locking in v2 if needed.
- **Cache invalidation**: when a translation is published, what invalidates? Strategy: cache key includes `(namespace, locale, etag-of-bundle)`; admin write bumps the etag.
- **Field-level vs document-level translation status**: v1 is document-level (`tour_translations.status`). v2 may need field-level for partial drafts.
- **Per-namespace versioning**: should the SDK pin to a translation bundle version, or always fetch latest? Recommendation: SSG/ISR pages fetch at build/revalidate, no pinning needed; SPA mode caches with stale-while-revalidate.

---

## 9. Risks

- **DOM `data-kiban-key` annotation overhead** for the visual editor — small, but adds to first paint. Should be conditional on `?kiban-edit=1`.
- **Slug uniqueness** across locales — handled by the `unique (locale, alias)` constraint, but UX must surface conflicts clearly.
- **DeepL API limits + cost** — translation memory mitigates re-translation; quota dashboards in admin help customers self-manage.
- **Legacy widget performance regression risk** if we change anything in the existing `/i18n/widget.js` — keep it untouched, ship the new SDK as a separate distribution.

---

## 10. Pilot Scope (this repo, immediate)

To validate the SSR architecture before any KIBAN-side work, the Algarve Explorer pilot will:

1. Restructure routes under `app/[locale]/`.
2. Read locale from URL segment (server side).
3. Pass locale to KIBAN content fetches via existing `?lang=` query parameter.
4. Externalize hardcoded UI strings into `messages/{locale}.json` (manually maintained for the pilot — replaced by KIBAN-stored translations once Phase 1 ships).
5. Add hreflang tags and a multi-locale sitemap.
6. Replace `LanguageSwitcher` to navigate between `/`, `/en/...`, `/fr/...` instead of mutating cookies.
7. Keep the legacy KIBAN widget loaded only for the GDPR cookie notice and the accessibility add-on — not for translating site content.

Outcome: zero flash on initial load and language switch, multilingual SEO, validated SDK shape ready for productization in `@kiban/i18n`.
