'use client';

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight } from "lucide-react";

// =============================================
// CONFIG
// =============================================
const LOCATION_ID = "25463557";

// =============================================
// TIPOS
// =============================================
interface Review {
  id: string;
  title: string;
  text: string;
  rating: number;
  published_date: string;
  user: { username: string; avatar?: { small: string } };
  trip_type?: string;
  experience?: string;
}

interface Details {
  name: string;
  rating: number;
  count: number;
  url: string;
}

// =============================================
// DADOS DEMO (fallback enquanto sem API key)
// =============================================
const DEMO_REVIEWS: Review[] = [
  {
    id: "1",
    title: "Experiência inesquecível!",
    text: "A gruta de Benagil foi absolutamente deslumbrante. O guia era muito simpático e conhecedor da região. Recomendo vivamente a todos que visitam o Algarve! Tudo muito bem organizado desde o início.",
    rating: 5,
    published_date: "2025-11-15",
    user: { username: "Marco P." },
    trip_type: "Casal",
    experience: "Grutas de Benagil",
  },
  {
    id: "2",
    title: "Top! Voltaremos com certeza",
    text: "Fizemos o passeio de barco pela costa e foi fantástico. A equipa foi muito profissional e o barco muito confortável. As paisagens são de tirar o fôlego. Os miúdos adoraram!",
    rating: 5,
    published_date: "2025-10-28",
    user: { username: "Sophie L." },
    trip_type: "Família",
    experience: "Costa Dourada",
  },
  {
    id: "3",
    title: "Muito bom, super recomendo",
    text: "A experiência em si foi excelente, cenários lindíssimos e guia muito atencioso. Conseguimos ver golfinhos durante o passeio, o que tornou tudo ainda mais especial.",
    rating: 4,
    published_date: "2025-10-10",
    user: { username: "James R." },
    trip_type: "Amigos",
    experience: "Ponta da Piedade",
  },
  {
    id: "4",
    title: "A melhor atividade no Algarve",
    text: "Já fizemos muitas atividades no Algarve mas esta foi de longe a melhor. Organização impecável, vistas incríveis e o pôr do sol foi mágico. Obrigado Algarve Explorer!",
    rating: 5,
    published_date: "2025-09-22",
    user: { username: "Ana S." },
    trip_type: "Casal",
    experience: "Sunset Tour",
  },
  {
    id: "5",
    title: "Perfeito para famílias",
    text: "Fomos com crianças e tudo correu lindamente. A equipa teve muito cuidado com a segurança e os miúdos adoraram. Excelente relação qualidade-preço. Voltaremos no próximo verão!",
    rating: 5,
    published_date: "2025-09-05",
    user: { username: "Pedro M." },
    trip_type: "Família",
    experience: "Grutas de Benagil",
  },
  {
    id: "6",
    title: "Simplesmente maravilhoso",
    text: "A natureza do Algarve é brutal e esta experiência permite ver o melhor. O kayak nas grutas foi o ponto alto. Staff super atencioso do início ao fim. 5 estrelas!",
    rating: 5,
    published_date: "2025-08-18",
    user: { username: "Elena K." },
    trip_type: "Casal",
    experience: "Kayak nas Grutas",
  },
];

const DEMO_SUMMARY: Details = {
  name: "Algarve Explorer",
  rating: 4.8,
  count: 347,
  url: `https://www.tripadvisor.com/Attraction_Review-d${LOCATION_ID}`,
};

// =============================================
// HOOK
// =============================================
function useTripadvisorReviews(locationId: string) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const [revRes, detRes] = await Promise.all([
          fetch(`/api/reviews?action=reviews&locationId=${locationId}`),
          fetch(`/api/reviews?action=details&locationId=${locationId}`),
        ]);

        if (!revRes.ok) throw new Error("API indisponível");

        const revData = await revRes.json();
        const detData = await detRes.json();

        if (revData.error || detData.error) throw new Error("API error");

        if (!cancelled) {
          setReviews(revData.data || []);
          setDetails({
            name: detData.name,
            rating: parseFloat(detData.rating),
            count: parseInt(detData.num_reviews),
            url: detData.web_url,
          });
          setIsDemo(false);
        }
      } catch (error) {
        if (!cancelled) {
          setReviews(DEMO_REVIEWS);
          setDetails(DEMO_SUMMARY);
          setIsDemo(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [locationId]);

  return { reviews, details, loading, isDemo };
}

// =============================================
// SUB-COMPONENTES
// =============================================
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 20 20" fill={s <= rating ? "#da6927" : "#E0E0E0"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function TripBadge({ type }: { type: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Casal: { bg: "#FFF3E0", text: "#da6927" },
    Família: { bg: "#E3F2FD", text: "#1565C0" },
    Amigos: { bg: "#FFF3E0", text: "#E65100" },
    Solo: { bg: "#F3E5F5", text: "#7B1FA2" },
    Couples: { bg: "#FFF3E0", text: "#da6927" },
    Family: { bg: "#E3F2FD", text: "#1565C0" },
    Friends: { bg: "#FFF3E0", text: "#E65100" },
  };
  const c = colors[type] || { bg: "#F5F5F5", text: "#666" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 11, fontWeight: 600, padding: "3px 10px",
      borderRadius: 20, background: c.bg, color: c.text,
      letterSpacing: 0.3,
    }}>
      {type}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.user.username.split(" ").map((n) => n[0]).join("");
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.10)"
          : "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minWidth: 300,
        maxWidth: 340,
        flex: "0 0 auto",
        border: "1px solid #f0f0f0",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "linear-gradient(135deg, #da6927, #ff9d6c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, margin: 0, color: "#1a1a1a" }}>
              {review.user.username}
            </p>
            <p style={{ fontSize: 12, color: "#999", margin: 0, marginTop: 2 }}>
              {new Date(review.published_date).toLocaleDateString("pt-PT", {
                year: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>
        <Stars rating={review.rating} size={14} />
      </div>

      {review.experience && (
        <span style={{
          fontSize: 11, fontWeight: 600, color: "#da6927",
          textTransform: "uppercase", letterSpacing: 0.8,
        }}>
          {review.experience}
        </span>
      )}

      <h4 style={{ fontWeight: 700, fontSize: 15, margin: 0, color: "#1a1a1a", lineHeight: 1.3 }}>
        {review.title}
      </h4>
      <p style={{
        fontSize: 13.5, color: "#555", lineHeight: 1.7, margin: 0,
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        flexGrow: 1,
      }}>
        {review.text}
      </p>

      {review.trip_type && (
        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          <TripBadge type={review.trip_type} />
        </div>
      )}
    </div>
  );
}

function ArrowButton({ direction, onClick, visible }: {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        [direction === "left" ? "left" : "right"]: 8,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: hovered ? "#f5f5f5" : "#fff",
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "background 0.15s",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function TripadvisorIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#da6927" />
      <circle cx="11" cy="16" r="4.5" stroke="#fff" strokeWidth="1.8" fill="none" />
      <circle cx="21" cy="16" r="4.5" stroke="#fff" strokeWidth="1.8" fill="none" />
      <circle cx="11" cy="16" r="1.5" fill="#fff" />
      <circle cx="21" cy="16" r="1.5" fill="#fff" />
      <path d="M16 10 L11 14 M16 10 L21 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 8.5 L16 7 L18 8.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// =============================================
// COMPONENTE PRINCIPAL — exporta este
// =============================================
export default function TripadvisorReviews() {
  const { reviews, details, loading, isDemo } = useTripadvisorReviews(LOCATION_ID);
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [reviews]);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  // Loading skeleton
  if (loading) {
    return (
      <section style={{ padding: "64px 24px", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 20, overflow: "hidden" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                minWidth: 300, height: 220, borderRadius: 16,
                background: "linear-gradient(110deg, #f0f0f0 30%, #f8f8f8 50%, #f0f0f0 70%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s ease-in-out infinite",
              }} />
            ))}
          </div>
          <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) return null;

  const tripadvisorUrl = details?.url || `https://www.tripadvisor.com/Attraction_Review-d${LOCATION_ID}`;

  return (
    <section style={{
      padding: "64px 0",
      background: "#FAFBFC",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 1.5rem", marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <TripadvisorIcon />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#da6927", letterSpacing: 2, textTransform: "uppercase" }}>
                Tripadvisor
              </span>
              {isDemo && (
                <span style={{
                  fontSize: 10, fontWeight: 600, color: "#E65100",
                  background: "#FFF3E0", padding: "2px 8px", borderRadius: 10,
                }}>
                  DEMO
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold font-montserrat text-brand-navy tracking-tight mb-2 md:mb-3 uppercase">
              {language === 'pt' ? 'O que dizem os nossos exploradores' : 'What our explorers say'}
            </h2>
          </div>

          {details && (
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
              background: "#fff", padding: "16px 24px", borderRadius: 16,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>
                  {details.rating?.toFixed(1) || "—"}
                </div>
                <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>de 5</div>
              </div>
              <div style={{ width: 1, height: 40, background: "#eee" }} />
              <div>
                <Stars rating={Math.round(details.rating || 0)} size={18} />
                <p style={{ fontSize: 12, color: "#777", margin: 0, marginTop: 4 }}>
                  {details.count || 0} {language === 'pt' ? 'avaliações' : 'reviews'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards com scroll horizontal */}
      <div style={{ position: "relative", maxWidth: 1600, margin: "0 auto" }}>
        <ArrowButton direction="left" onClick={() => scroll(-1)} visible={canScrollLeft} />
        <ArrowButton direction="right" onClick={() => scroll(1)} visible={canScrollRight} />

        <div ref={scrollRef} style={{
          display: "flex", gap: 24, overflowX: "auto",
          padding: "10px 1.5rem 32px", scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ scrollSnapAlign: "start" }}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Botão CTA */}
      <div className="flex justify-center mt-12 mb-8">
        <a
          href={tripadvisorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-4 bg-[#da6927] text-white px-8 py-4 sm:px-12 sm:py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0d4357] transition-colors duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:ring-offset-2"
        >
          <span>{language === 'pt' ? 'Ver todas as avaliações no Tripadvisor' : 'See all reviews on Tripadvisor'}</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
