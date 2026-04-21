// ===================================
// KIBAN CMS — Service Layer
// ===================================
// Headless CMS client para o Algarve Explorer.
// Documentação API: /api/v1/...
// SDK: @kiban/client (opcional, aqui usamos fetch direto)
// ===================================

const KIBAN_URL = process.env.NEXT_PUBLIC_KIBAN_URL || '';
const KIBAN_API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY || '';
const KIBAN_TENANT = process.env.NEXT_PUBLIC_KIBAN_TENANT || 'algarveexplorer';

export const isKibanConfigured = Boolean(KIBAN_URL && KIBAN_API_KEY);

// ===================================
// FOCAL POINT HELPERS
// ===================================
// The KIBAN admin stores the focal point in the image URL hash as `#fp=x,y`
// (0-100 percentages). Use these helpers to extract the clean URL and the
// CSS `object-position` value so the right part of the image stays visible
// regardless of how it's cropped.

/**
 * Strip the focal point hash from an image URL.
 */
export function imageUrl(url?: string | null): string {
  if (!url) return '';
  return url.replace(/#fp=\d+(?:\.\d+)?,\d+(?:\.\d+)?$/, '');
}

/**
 * Get the `object-position` CSS value for an image URL.
 * Falls back to `center` if no focal point is set.
 */
export function imageObjectPosition(url?: string | null): string {
  if (!url) return 'center';
  const match = url.match(/#fp=(\d+(?:\.\d+)?),(\d+(?:\.\d+)?)/);
  if (!match) return 'center';
  return `${match[1]}% ${match[2]}%`;
}

// ===================================
// FETCH HELPER
// ===================================

interface KibanListResponse<T = any> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

interface KibanSingleResponse<T = any> {
  data: T;
}

async function kibanFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${KIBAN_URL}/api/v1${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIBAN_API_KEY}`,
      'X-Tenant': KIBAN_TENANT,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`KIBAN API ${res.status}: ${body}`);
  }

  return res.json();
}

// ===================================
// TOURS API (add-on Tours & Bookings)
// ===================================
// Endpoint: /api/v1/tours
// Schema alinhado com apps/api/src/routes/tours.ts do KIBAN CMS.

export interface CancellationPolicyTier {
  hours_before: number;
  refund_percent: number;
  label?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AccessibilityInfo {
  wheelchair_accessible?: boolean;
  stroller_accessible?: boolean;
  service_animals_allowed?: boolean;
  public_transport_nearby?: boolean;
  infant_seats_available?: boolean;
  notes?: string;
  [key: string]: any;
}

export interface TourEntry {
  slug: string;
  title: string;
  subtitle: string;
  short_description: string;
  full_description: string;
  product_code: string;
  tour_type: string;
  categories: string[];
  difficulty_level: string;
  duration_minutes: number;
  capacity: number;
  min_age: number | null;
  max_age: number | null;
  languages: string[];
  price_adult: number;
  price_child: number;
  child_age_range: string;
  currency: string;
  schedule_type: 'fixed_slots' | 'weekly_schedule' | string;
  fixed_slots: string[];
  weekly_schedule: Record<string, any>;
  slot_interval_minutes: number;
  cover_image: string;
  gallery: string[];
  /**
   * Highlights as of kibanCMS v1.5 are always Array<{image, caption}>.
   * Legacy v1.0-v1.4 returned string[]; the `get`/`list` service functions
   * normalise both shapes below so consumers only need to handle one.
   */
  highlights: Array<{ image: string; caption: string }>;
  itinerary: string;
  meeting_point: string;
  pickup_zones: string[];
  inclusions: string[];
  exclusions: string[];
  what_to_bring: string[];
  additional_info: string;
  accessibility_info: AccessibilityInfo;
  health_restrictions: string[];
  physical_requirements: string;
  cancellation_policy: CancellationPolicyTier[];
  weather_policy: string;
  faq: FAQItem[];
  fine_print: string;
  is_digital_ticket: boolean;
  instant_confirmation: boolean;
  travellers_choice: boolean;
  likely_to_sell_out: boolean;
  rating: number;
  rating_count: number;
  resource_slug: string;
}

/**
 * Normalise a tour entry coming from the API — kibanCMS v1.5 changed
 * `highlights` from string[] to Array<{image, caption}>. This helper accepts
 * both shapes (and raw newline-separated strings, which older admin entries
 * may still have in content JSON) and always returns the current shape, so
 * consumer components don't have to branch on shape.
 */
function normaliseTour<T extends Partial<TourEntry> | null>(tour: T): T {
  if (!tour) return tour;
  const raw = (tour as any).highlights;
  let highlights: Array<{ image: string; caption: string }>;
  if (Array.isArray(raw)) {
    highlights = raw.map(h =>
      h && typeof h === 'object'
        ? { image: String(h.image || ''), caption: String(h.caption || '') }
        : { image: '', caption: String(h || '') }
    );
  } else if (typeof raw === 'string' && raw.trim()) {
    highlights = raw
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(caption => ({ image: '', caption }));
  } else {
    highlights = [];
  }
  return { ...tour, highlights } as T;
}

export const tours = {
  /**
   * Listar todas as tours publicadas.
   */
  list: async (): Promise<{ data: TourEntry[]; error: null | Error }> => {
    try {
      const response = await kibanFetch<{ data: TourEntry[] }>('/tours');
      const data = (response.data || []).map(t => normaliseTour(t)) as TourEntry[];
      return { data, error: null };
    } catch (err) {
      console.error('KIBAN: Error listing tours:', err);
      return { data: [], error: err as Error };
    }
  },

  /**
   * Obter tour por slug.
   */
  getBySlug: async (
    slug: string
  ): Promise<{ data: TourEntry | null; error: null | Error }> => {
    try {
      const response = await kibanFetch<{ data: TourEntry }>(`/tours/${slug}`);
      return { data: normaliseTour(response.data || null), error: null };
    } catch (err) {
      console.error('KIBAN: Error fetching tour:', err);
      return { data: null, error: err as Error };
    }
  },

  /**
   * Recomendações (mesma categoria, excluindo a atual).
   */
  recommended: async (
    categories: string[],
    excludeSlug: string,
    limit = 3
  ): Promise<{ data: TourEntry[]; error: null | Error }> => {
    try {
      const response = await kibanFetch<{ data: TourEntry[] }>('/tours');
      const all = (response.data || []).map(t => normaliseTour(t)) as TourEntry[];
      const filtered = all.filter(
        (t) =>
          t.slug !== excludeSlug &&
          (categories.length === 0 ||
            t.categories.some((c) => categories.includes(c)))
      );
      return { data: filtered.slice(0, limit), error: null };
    } catch (err) {
      console.error('KIBAN: Error fetching recommended:', err);
      return { data: [], error: err as Error };
    }
  },
};

// ===================================
// ENTRIES API
// ===================================
// Collection "experiences" com campo category: 'tours' | 'transfers' | 'experiences'
// Os campos seguem o schema definido no KIBAN admin.

export interface KibanQueryParams {
  status?: string;
  search?: string;
  tags?: string;
  limit?: number;
  page?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  lang?: string;
  [key: string]: string | number | boolean | undefined;
}

function buildQuery(params?: KibanQueryParams): string {
  if (!params) return '';
  const filtered = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return filtered.length ? `?${filtered.join('&')}` : '';
}

export const entries = {
  /**
   * Listar entries de uma collection.
   * Exemplo: entries.list('experiences', { status: 'published', limit: 10 })
   */
  list: async <T = any>(
    collection: string,
    params?: KibanQueryParams
  ): Promise<KibanListResponse<T>> => {
    return kibanFetch<KibanListResponse<T>>(
      `/entries/${collection}${buildQuery(params)}`
    );
  },

  /**
   * Obter entry por slug.
   * Exemplo: entries.getBySlug('experiences', 'benagil-tour')
   */
  getBySlug: async <T = any>(
    collection: string,
    slug: string,
    params?: KibanQueryParams
  ): Promise<T> => {
    const response = await kibanFetch<KibanSingleResponse<T> | T>(
      `/entries/${collection}/${slug}${buildQuery(params)}`
    );
    // A API pode retornar { data: T } ou T diretamente
    return (response as any).data ?? response;
  },
};

// ===================================
// MEDIA API
// ===================================

export const media = {
  /**
   * Obter URL pública de um asset.
   * No KIBAN, as image_urls já vêm com URL completo.
   */
  getUrl: (path: string): string => {
    if (path.startsWith('http')) return path;
    return `${KIBAN_URL}${path}`;
  },
};

// ===================================
// FORMS API
// ===================================

export interface FormSubmission {
  form_name: string;
  name?: string;
  email: string;
  subject?: string;
  message: string;
  [key: string]: string | undefined;
}

export const forms = {
  /**
   * Submeter formulário de contacto.
   * POST /api/v1/forms/submit (público, requer API key)
   */
  submit: async (data: FormSubmission): Promise<{ success: boolean }> => {
    return kibanFetch<{ success: boolean }>('/forms/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ===================================
// NEWSLETTER API
// ===================================

export const newsletter = {
  /**
   * Subscrever email na newsletter.
   * POST /api/v1/newsletter/subscribe (público, requer API key)
   */
  subscribe: async (email: string): Promise<{ success: boolean }> => {
    return kibanFetch<{ success: boolean }>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Cancelar subscrição.
   */
  unsubscribe: async (email: string): Promise<{ success: boolean }> => {
    return kibanFetch<{ success: boolean }>('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// ===================================
// BOOKINGS API
// ===================================

export interface BookingRequest {
  tour_slug: string;
  date: string;
  participants: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
}

export const bookings = {
  /**
   * Listar tours disponíveis para reserva.
   */
  getTours: async (): Promise<{ data: any[] }> => {
    return kibanFetch<{ data: any[] }>('/bookings/tours');
  },

  /**
   * Verificar disponibilidade para uma data.
   */
  checkAvailability: async (
    tourId: string,
    date: string
  ): Promise<{ available: boolean; slots: number }> => {
    return kibanFetch(`/bookings/availability?tour_id=${tourId}&date=${date}`);
  },

  /**
   * Criar reserva (gera sessão Stripe).
   */
  create: async (
    data: BookingRequest
  ): Promise<{ sessionId: string; checkoutUrl: string }> => {
    return kibanFetch('/bookings/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Verificar estado de uma reserva.
   */
  getStatus: async (
    bookingId: string
  ): Promise<{ status: string; data: any }> => {
    return kibanFetch(`/bookings/status/${bookingId}`);
  },
};

// ===================================
// REDIRECTS API
// ===================================

export const redirects = {
  /**
   * Resolver um redirect (útil para SEO de URLs antigos).
   */
  resolve: async (
    path: string
  ): Promise<{ target: string; type: 301 | 302 } | null> => {
    try {
      return await kibanFetch(`/redirects/resolve?path=${encodeURIComponent(path)}`);
    } catch {
      return null;
    }
  },
};

// ===================================
// EXPERIENCE HELPERS
// ===================================
// Funções de alto nível que substituem as queries Supabase.
// Usam a collection "experiences" no KIBAN.

const COLLECTION = 'experiences';

export interface ExperienceEntry {
  id: string;
  slug: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  short_description_pt?: string;
  short_description_en?: string;
  category: 'tours' | 'transfers' | 'experiences';
  price?: number;
  duration_minutes?: number;
  difficulty_pt?: string;
  difficulty_en?: string;
  max_participants?: number;
  image_urls?: string[];
  cover_image?: string;
  highlights_pt?: string[];
  highlights_en?: string[];
  included_pt?: string[];
  included_en?: string[];
  not_included_pt?: string[];
  not_included_en?: string[];
  itinerary_pt?: any;
  itinerary_en?: any;
  meeting_point_pt?: string;
  meeting_point_en?: string;
  end_point_pt?: string;
  end_point_en?: string;
  age_min?: number;
  age_max?: number;
  age_description_pt?: string;
  age_description_en?: string;
  departure_times?: string[];
  cancellation_hours?: number;
  cancellation_policy_pt?: string;
  cancellation_policy_en?: string;
  hotel_pickup?: boolean;
  pickup_details_pt?: string;
  pickup_details_en?: string;
  languages_offered?: string[];
  instant_confirmation?: boolean;
  mobile_ticket_accepted?: boolean;
  wheelchair_accessible?: boolean;
  accessibility_notes_pt?: string;
  accessibility_notes_en?: string;
  not_suitable_for_pt?: string[];
  not_suitable_for_en?: string[];
  fareharbor_url?: string;
  featured?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  metadata?: any;
}

export const experiences = {
  /**
   * Listar experiências com filtros.
   */
  list: async (filters?: {
    category?: string;
    featured?: boolean;
    active?: boolean;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<{ data: ExperienceEntry[]; error: null | Error }> => {
    try {
      const params: KibanQueryParams = {
        status: 'published',
        limit: filters?.limit,
        sort: filters?.sort || 'created_at',
        order: filters?.order || 'desc',
      };

      // KIBAN permite filtros custom via query params
      if (filters?.category) {
        params['filter[category]'] = filters.category;
      }
      if (filters?.featured !== undefined) {
        params['filter[featured]'] = filters.featured;
      }

      const response = await entries.list<ExperienceEntry>(COLLECTION, params);
      return { data: response.data || [], error: null };
    } catch (err) {
      console.error('KIBAN: Error listing experiences:', err);
      return { data: [], error: err as Error };
    }
  },

  /**
   * Obter experiência por slug.
   */
  getBySlug: async (
    slug: string
  ): Promise<{ data: ExperienceEntry | null; error: null | Error }> => {
    try {
      const data = await entries.getBySlug<ExperienceEntry>(COLLECTION, slug);
      return { data, error: null };
    } catch (err) {
      console.error('KIBAN: Error fetching experience:', err);
      return { data: null, error: err as Error };
    }
  },

  /**
   * Listar experiências em destaque.
   */
  featured: async (
    limit = 6
  ): Promise<{ data: ExperienceEntry[]; error: null | Error }> => {
    return experiences.list({
      featured: true,
      active: true,
      limit,
    });
  },

  /**
   * Listar tours.
   */
  tours: async (): Promise<{ data: ExperienceEntry[]; error: null | Error }> => {
    return experiences.list({ category: 'tours', active: true });
  },

  /**
   * Listar transfers.
   */
  transfers: async (): Promise<{ data: ExperienceEntry[]; error: null | Error }> => {
    return experiences.list({ category: 'transfers', active: true });
  },

  /**
   * Obter recomendações (mesma categoria, excluindo a atual).
   */
  recommended: async (
    category: string,
    excludeId: string,
    limit = 3
  ): Promise<{ data: ExperienceEntry[]; error: null | Error }> => {
    try {
      const response = await entries.list<ExperienceEntry>(COLLECTION, {
        status: 'published',
        'filter[category]': category,
        limit,
      });
      const filtered = (response.data || []).filter((e) => e.id !== excludeId);
      return { data: filtered.slice(0, limit), error: null };
    } catch (err) {
      console.error('KIBAN: Error fetching recommended:', err);
      return { data: [], error: err as Error };
    }
  },
};

// ===================================
// EXPORTS
// ===================================

const kiban = {
  entries,
  media,
  forms,
  newsletter,
  bookings,
  redirects,
  experiences,
  tours,
  isConfigured: isKibanConfigured,
};

export default kiban;
