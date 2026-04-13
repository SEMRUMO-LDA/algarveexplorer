# Algarve Explorer Tours

Premium trail adventures and nature discoveries in Southern Portugal.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **CMS:** KIBAN CMS (headless REST API)
- **Animations:** Framer Motion
- **AI Assistant:** Google Gemini

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your KIBAN and Gemini API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_KIBAN_URL` | KIBAN CMS API base URL |
| `NEXT_PUBLIC_KIBAN_API_KEY` | KIBAN CMS public API key |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI key |
| `TRIPADVISOR_API_KEY` | TripAdvisor Content API key |

## Project Structure

```
app/                → Next.js App Router pages
components/         → Shared UI components
pages_src/          → Page-level components
services/           → KIBAN CMS + Gemini API clients
lib/                → Contexts, translations, types
public/             → Static assets (images, video)
```

## CMS

Content is managed via [KIBAN CMS](https://github.com/SEMRUMO-LDA/kibanCMS). The `experiences` collection holds tours, transfers, and experiences with bilingual content (PT/EN).

---

Developed by **AORUBRO**
