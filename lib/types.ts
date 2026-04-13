// ===================================
// TIPOS — Algarve Explorer + KIBAN CMS
// ===================================

export interface Highlight {
  text: string;
  text_pt: string;
  image: string;
}

export interface Tour {
  id: string;
  title: string;
  title_pt: string;
  slug: string;
  duration: string;
  duration_pt: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  difficulty_pt: string;
  price: number;
  description: string;
  description_pt: string;
  image: string;
  heroImage?: string;
  highlights: Highlight[];
  itinerary?: {
    title: string;
    title_pt: string;
    desc: string;
    desc_pt: string;
    stopTime?: string;
    stopTime_pt?: string;
  }[];
  maxGroupSize?: number;
  ageRange?: string;
  ageRange_pt?: string;
}

export interface TransferService {
  id: string;
  route: string;
  route_pt: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  description: string;
  description_pt: string;
}

export interface NavItem {
  label: string;
  path: string;
}

// ===================================
// KIBAN CMS — Experience Entry
// ===================================
// Tipo principal que vem da collection "experiences" no KIBAN.

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
  itinerary_pt?: ItineraryItem[];
  itinerary_en?: ItineraryItem[];
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
  metadata?: Record<string, any>;
}

export interface ItineraryItem {
  title: string;
  description: string;
  stop_time?: string;
  image?: string;
}

// ===================================
// KIBAN CMS — Form Submission
// ===================================

export interface ContactFormData {
  form_name: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ===================================
// KIBAN CMS — Booking
// ===================================

export interface BookingData {
  tour_slug: string;
  date: string;
  participants: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
}
