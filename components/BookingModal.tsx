'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  X,
  Calendar,
  Loader2,
  AlertCircle,
  ArrowRight,
  Tag,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  bookingsV2,
  coupons,
  type AvailabilitySlot,
  type CouponValidation,
  type TourEntry,
} from '@/services/kiban';

interface BookingModalProps {
  tour: TourEntry;
  open: boolean;
  onClose: () => void;
}

const eur = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildNextDays(count: number): Date[] {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

export default function BookingModal({ tour, open, onClose }: BookingModalProps) {
  const today = useMemo(() => toISODate(new Date()), []);
  const quickDates = useMemo(() => buildNextDays(14), []);

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<CouponValidation | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const nativeDateRef = useRef<HTMLInputElement>(null);

  const capacity = tour.capacity || 20;
  const hasChildPricing = (tour.price_child ?? 0) > 0;

  useEffect(() => {
    if (open) {
      setDate('');
      setTimeSlot('');
      setAdults(1);
      setChildren(0);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setEmailTouched(false);
      setSlots([]);
      setError(null);
      setCouponInput('');
      setCoupon(null);
    }
  }, [open, tour.slug]);

  useEffect(() => {
    if (!date || !open) {
      setSlots([]);
      setTimeSlot('');
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    setError(null);
    bookingsV2
      .availability(tour.slug, date)
      .then((res) => {
        if (cancelled) return;
        setSlots(res.slots || []);
        setTimeSlot('');
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setSlots([]);
        setError('Não foi possível carregar disponibilidade.');
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date, tour.slug, open]);

  const subtotal = useMemo(
    () => adults * (tour.price_adult || 0) + children * (tour.price_child || 0),
    [adults, children, tour.price_adult, tour.price_child],
  );

  const discount = useMemo(() => {
    if (!coupon?.valid || !coupon.discount_cents) return 0;
    return coupon.discount_cents / 100;
  }, [coupon]);

  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    if (!coupon?.valid || !coupon.code) return;
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || subtotal <= 0) return;
    const subtotalCents = Math.round(subtotal * 100);
    coupons
      .validate({
        code: coupon.code,
        resource_slug: tour.slug,
        customer_email: email,
        subtotal_cents: subtotalCents,
        currency: (tour.currency || 'eur').toLowerCase(),
      })
      .then((res) => {
        if (!res.valid) setCoupon(null);
        else setCoupon(res);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal, email]);

  const applyCoupon = async () => {
    const code = couponInput.trim();
    if (!code) return;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setCoupon({ valid: false, message: 'Introduza o seu email antes de aplicar o código.' });
      return;
    }
    setCouponLoading(true);
    try {
      const res = await coupons.validate({
        code,
        resource_slug: tour.slug,
        customer_email: email,
        subtotal_cents: Math.round(subtotal * 100),
        currency: (tour.currency || 'eur').toLowerCase(),
      });
      setCoupon(res);
    } finally {
      setCouponLoading(false);
    }
  };

  const clearCoupon = () => {
    setCoupon(null);
    setCouponInput('');
  };

  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  const validation = useMemo(() => {
    if (!date) return 'Escolhe a data';
    if (!timeSlot) return 'Escolhe o horário';
    if (!name.trim()) return 'Indica o teu nome';
    if (!emailValid) return 'Email inválido';
    return null;
  }, [date, timeSlot, name, emailValid]);

  const canSubmit = !validation && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const origin = window.location.origin;
      const { checkoutUrl } = await bookingsV2.checkout({
        resource_slug: tour.slug,
        date,
        time_slot: timeSlot,
        party_size: adults,
        party_size_secondary: children || undefined,
        customer_name: name.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim() || undefined,
        notes: notes.trim() || undefined,
        coupon_code: coupon?.valid ? coupon.code : undefined,
        success_url: `${origin}/tours/${tour.slug}?booking=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/tours/${tour.slug}?booking=cancelled`,
      });

      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err?.message || 'Erro ao criar reserva. Tente novamente.');
      setSubmitting(false);
    }
  };

  // Lock scroll + ESC close + initial focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const openNativeDate = useCallback(() => {
    const el = nativeDateRef.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!el) return;
    try {
      el.showPicker?.();
    } catch {
      el.click();
    }
  }, []);

  const stepperButton = (label: string, onClick: () => void, disabled: boolean, icon: 'minus' | 'plus') => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-11 h-11 rounded-full border-2 border-slate-200 text-brand-navy hover:border-[#da6927] hover:text-[#da6927] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-brand-navy flex items-center justify-center transition-colors"
    >
      {icon === 'minus' ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
    </button>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm z-[200]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:m-auto md:h-fit md:max-h-[92vh] md:max-w-4xl z-[201] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Grab handle (mobile) */}
            <div className="md:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-100">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#da6927] mb-1">
                  Reservar
                </p>
                <h2
                  id="booking-modal-title"
                  className="text-lg md:text-2xl font-bold font-montserrat text-brand-navy truncate"
                >
                  {tour.title}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 ml-4"
                aria-label="Fechar"
              >
                <X size={18} className="text-brand-navy" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col md:flex-row min-h-0">
              {/* Main column */}
              <div className="flex-1 overflow-y-auto md:border-r md:border-slate-100">
                <div className="px-6 md:px-8 py-6 space-y-8">
                  {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {/* DATE */}
                  <section>
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="flex items-center gap-2 text-sm font-bold text-brand-navy">
                        <Calendar size={16} className="text-[#da6927]" /> Quando queres ir?
                      </h3>
                      <button
                        type="button"
                        onClick={openNativeDate}
                        className="text-xs font-semibold text-[#da6927] hover:underline"
                      >
                        Outra data
                      </button>
                    </div>
                    {/* Native date input kept offscreen for "Outra data" trigger */}
                    <input
                      ref={nativeDateRef}
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="sr-only"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                      {quickDates.map((d) => {
                        const iso = toISODate(d);
                        const selected = iso === date;
                        return (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => setDate(iso)}
                            className={`snap-start flex-shrink-0 w-16 py-2.5 rounded-xl border-2 text-center transition-colors ${
                              selected
                                ? 'bg-[#0d4357] text-white border-[#0d4357]'
                                : 'bg-white text-brand-navy border-slate-200 hover:border-[#da6927]'
                            }`}
                          >
                            <div className={`text-[10px] font-bold uppercase tracking-wider ${selected ? 'text-white/70' : 'text-brand-body/60'}`}>
                              {DAY_LABELS[d.getDay()]}
                            </div>
                            <div className="text-lg font-bold leading-tight">{d.getDate()}</div>
                            <div className={`text-[10px] ${selected ? 'text-white/70' : 'text-brand-body/60'}`}>
                              {MONTH_LABELS[d.getMonth()]}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {date && !quickDates.some((d) => toISODate(d) === date) && (
                      <p className="text-xs text-brand-body/70 mt-2">
                        Data escolhida:{' '}
                        <span className="font-semibold text-brand-navy">
                          {new Date(date).toLocaleDateString('pt-PT', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      </p>
                    )}
                  </section>

                  {/* TIME */}
                  {date && (
                    <section>
                      <h3 className="text-sm font-bold text-brand-navy mb-3">Horário</h3>
                      {loadingSlots ? (
                        <div className="flex items-center gap-2 text-brand-body/60 text-sm">
                          <Loader2 size={14} className="animate-spin" /> A verificar disponibilidade…
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-brand-body/60">
                          Sem disponibilidade nesta data. Tenta outra.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {slots.map((slot) => {
                            const full = slot.available <= 0;
                            const selected = timeSlot === slot.time;
                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={full}
                                onClick={() => setTimeSlot(slot.time)}
                                className={`py-3 px-3 rounded-xl border-2 text-sm font-bold transition-all ${
                                  selected
                                    ? 'bg-[#0d4357] text-white border-[#0d4357]'
                                    : full
                                      ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through'
                                      : 'bg-white text-brand-navy border-slate-200 hover:border-[#da6927]'
                                }`}
                              >
                                {slot.time}
                                <span className={`block text-[10px] font-medium mt-0.5 ${selected ? 'text-white/70' : 'text-brand-body/60'}`}>
                                  {full ? 'esgotado' : `${slot.available} vagas`}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  )}

                  {/* PARTY SIZE */}
                  <section>
                    <h3 className="text-sm font-bold text-brand-navy mb-4">Pessoas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-semibold text-brand-navy">Adultos</p>
                          <p className="text-xs text-brand-body/60">{eur.format(tour.price_adult || 0)} por pessoa</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {stepperButton('Remover adulto', () => setAdults((n) => Math.max(1, n - 1)), adults <= 1, 'minus')}
                          <span className="w-8 text-center text-lg font-bold text-brand-navy tabular-nums">{adults}</span>
                          {stepperButton('Adicionar adulto', () => setAdults((n) => Math.min(capacity, n + 1)), adults + children >= capacity, 'plus')}
                        </div>
                      </div>
                      {hasChildPricing && (
                        <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-3">
                          <div>
                            <p className="font-semibold text-brand-navy">
                              Crianças{' '}
                              {tour.child_age_range && (
                                <span className="font-normal text-brand-body/60 text-sm">({tour.child_age_range})</span>
                              )}
                            </p>
                            <p className="text-xs text-brand-body/60">{eur.format(tour.price_child || 0)} por criança</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {stepperButton('Remover criança', () => setChildren((n) => Math.max(0, n - 1)), children <= 0, 'minus')}
                            <span className="w-8 text-center text-lg font-bold text-brand-navy tabular-nums">{children}</span>
                            {stepperButton('Adicionar criança', () => setChildren((n) => n + 1), adults + children >= capacity, 'plus')}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* CUSTOMER */}
                  <section className="pt-2 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-brand-navy mb-4 pt-4">Os teus dados</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-body/70 mb-1.5">Nome completo</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-brand-body/70 mb-1.5">Email</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailTouched(true)}
                            autoComplete="email"
                            className={`w-full px-4 py-3 border rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent ${
                              emailTouched && email && !emailValid ? 'border-red-300' : 'border-slate-200'
                            }`}
                          />
                          {emailTouched && email && !emailValid && (
                            <p className="text-xs text-red-600 mt-1">Verifica o formato do email.</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-brand-body/70 mb-1.5">
                            Telefone <span className="font-normal text-brand-body/50">(opcional)</span>
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete="tel"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-brand-body/70 mb-1.5">
                          Notas <span className="font-normal text-brand-body/50">(opcional)</span>
                        </label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Alergias, pedidos especiais, etc."
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent resize-none placeholder:text-brand-body/40"
                        />
                      </div>
                    </div>
                  </section>

                  {/* COUPON */}
                  <section className="pt-2">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-brand-navy mb-3">
                      <Tag size={14} className="text-[#da6927]" /> Código promocional
                      <span className="font-normal text-brand-body/50">(opcional)</span>
                    </h3>
                    {coupon?.valid ? (
                      <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Check size={16} className="text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-green-800">{coupon.code}</p>
                            <p className="text-xs text-green-700">
                              Desconto de {eur.format((coupon.discount_cents || 0) / 100)} aplicado
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={clearCoupon}
                          className="text-green-700 hover:text-green-900 p-1"
                          aria-label="Remover código"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                applyCoupon();
                              }
                            }}
                            placeholder="EX: WELCOME10"
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent placeholder:text-brand-body/40"
                          />
                          <button
                            type="button"
                            onClick={applyCoupon}
                            disabled={!couponInput.trim() || couponLoading}
                            className="px-5 py-3 bg-[#0d4357] hover:bg-[#da6927] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                          >
                            {couponLoading ? <Loader2 size={14} className="animate-spin" /> : 'Aplicar'}
                          </button>
                        </div>
                        {!emailValid && couponInput && (
                          <p className="text-xs text-brand-body/60 mt-2">
                            Preenche o email acima antes de aplicar o código.
                          </p>
                        )}
                        {coupon && !coupon.valid && coupon.reason !== 'unavailable' && (
                          <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                            <AlertCircle size={12} />
                            {coupon.message || 'Código inválido.'}
                          </p>
                        )}
                      </>
                    )}
                  </section>
                </div>
              </div>

              {/* Sidebar — order summary */}
              <aside className="md:w-80 md:flex-shrink-0 bg-slate-50 md:bg-white border-t md:border-t-0 border-slate-100 flex flex-col">
                <div className="px-6 md:px-6 py-5 md:py-6 md:flex-1 md:overflow-y-auto">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-body/60 mb-3">
                    Resumo
                  </p>

                  {/* Selection recap */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-brand-body">
                      <span>Data</span>
                      <span className="font-semibold text-brand-navy text-right">
                        {date
                          ? new Date(date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })
                          : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-brand-body">
                      <span>Horário</span>
                      <span className="font-semibold text-brand-navy">{timeSlot || '—'}</span>
                    </div>
                    <div className="flex justify-between text-brand-body">
                      <span>Pessoas</span>
                      <span className="font-semibold text-brand-navy">
                        {adults} adulto{adults !== 1 ? 's' : ''}
                        {children > 0 && `, ${children} criança${children !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="border-t border-slate-200 pt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between text-brand-body">
                      <span>
                        {adults} × {eur.format(tour.price_adult || 0)}
                      </span>
                      <span className="tabular-nums">{eur.format(adults * (tour.price_adult || 0))}</span>
                    </div>
                    {children > 0 && (
                      <div className="flex justify-between text-brand-body">
                        <span>
                          {children} × {eur.format(tour.price_child || 0)}
                        </span>
                        <span className="tabular-nums">{eur.format(children * (tour.price_child || 0))}</span>
                      </div>
                    )}
                    {coupon?.valid && discount > 0 && (
                      <div className="flex justify-between text-green-700">
                        <span>Desconto ({coupon.code})</span>
                        <span className="tabular-nums">−{eur.format(discount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 mt-3 pt-3 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-brand-navy">Total</span>
                    <span className="text-2xl font-bold font-montserrat text-brand-navy tabular-nums">
                      {eur.format(total)}
                    </span>
                  </div>
                </div>

                {/* Sticky footer CTA + trust */}
                <div className="px-6 py-4 md:py-5 border-t border-slate-100 bg-white md:bg-slate-50 sticky bottom-0">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    title={validation || undefined}
                    className="w-full flex items-center justify-center gap-2 bg-[#0d4357] hover:bg-[#da6927] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-bold text-base transition-colors duration-200 shadow-md"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> A processar…
                      </>
                    ) : (
                      <>
                        {validation ? validation : `Reservar por ${eur.format(total)}`}
                        {!validation && <ArrowRight size={16} />}
                      </>
                    )}
                  </button>

                  <ul className="mt-3 space-y-1.5 text-[11px] text-brand-body/70">
                    <li className="flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-green-600 flex-shrink-0" /> Pagamento seguro via Stripe
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Zap size={12} className="text-[#da6927] flex-shrink-0" /> Confirmação imediata por email
                    </li>
                    <li className="flex items-center gap-1.5">
                      <RotateCcw size={12} className="text-brand-navy flex-shrink-0" /> Cancelamento grátis até 24h antes
                    </li>
                  </ul>
                </div>
              </aside>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
