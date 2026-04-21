'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Users, Loader2, AlertCircle, ArrowRight, Tag, Check } from 'lucide-react';
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

export default function BookingModal({ tour, open, onClose }: BookingModalProps) {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<CouponValidation | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Reset when modal opens for a new tour
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
      setSlots([]);
      setError(null);
      setCouponInput('');
      setCoupon(null);
    }
  }, [open, tour.slug]);

  // Load available slots when date changes
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

  const subtotal = useMemo(() => {
    return adults * (tour.price_adult || 0) + children * (tour.price_child || 0);
  }, [adults, children, tour.price_adult, tour.price_child]);

  const discount = useMemo(() => {
    if (!coupon?.valid || !coupon.discount_cents) return 0;
    return coupon.discount_cents / 100;
  }, [coupon]);

  const total = Math.max(0, subtotal - discount);

  // Revalidate coupon when subtotal or email changes
  useEffect(() => {
    if (!coupon?.valid || !coupon.code) return;
    // Re-validate silently; if no longer valid, clear it.
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

  const canSubmit =
    date &&
    timeSlot &&
    adults > 0 &&
    name.trim() &&
    /^\S+@\S+\.\S+$/.test(email) &&
    !submitting;

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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:m-auto md:h-fit md:max-h-[90vh] md:max-w-2xl z-[201] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#da6927] mb-1">
                  Reservar
                </p>
                <h2 className="text-xl md:text-2xl font-bold font-montserrat text-brand-navy truncate">
                  {tour.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 ml-4"
                aria-label="Fechar"
              >
                <X size={18} className="text-brand-navy" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="px-8 py-6 space-y-6">
                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3">
                    <Calendar size={14} className="text-[#da6927]" /> Data
                  </label>
                  <input
                    type="date"
                    min={today}
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onClick={(e) => {
                      // Native date input only opens the picker on the calendar
                      // icon by default in most browsers — expand the hit area
                      // to the whole input for a more obvious touch target.
                      const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
                      try { el.showPicker?.(); } catch { /* unsupported browser */ }
                    }}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent cursor-pointer"
                  />
                </div>

                {/* Time slots */}
                {date && (
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3 block">
                      Horário
                    </label>
                    {loadingSlots ? (
                      <div className="flex items-center gap-2 text-brand-body/60 text-sm">
                        <Loader2 size={14} className="animate-spin" /> A verificar disponibilidade...
                      </div>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-brand-body/60">
                        Sem disponibilidade nesta data. Tente outra.
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
                              className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                                selected
                                  ? 'bg-[#0d4357] text-white border-[#0d4357]'
                                  : full
                                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through'
                                  : 'bg-white text-brand-navy border-slate-200 hover:border-[#da6927]'
                              }`}
                            >
                              {slot.time}
                              <span className="block text-[9px] font-medium opacity-70 mt-0.5">
                                {full ? 'esgotado' : `${slot.available} vagas`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Participants */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3">
                      <Users size={14} className="text-[#da6927]" /> Adultos
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={tour.capacity || 20}
                      required
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                    />
                  </div>
                  {tour.price_child > 0 && (
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3 block">
                        Crianças {tour.child_age_range && <span className="opacity-60">({tour.child_age_range})</span>}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={tour.capacity || 20}
                        value={children}
                        onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* Customer info */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3 block">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3 block">
                        Telefone <span className="opacity-60 lowercase tracking-normal">(opcional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3 block">
                      Notas <span className="opacity-60 lowercase tracking-normal">(opcional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Coupon / Promo code */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-body/80 mb-3">
                      <Tag size={14} className="text-[#da6927]" /> Código Promocional
                      <span className="opacity-60 lowercase tracking-normal font-normal">(opcional)</span>
                    </label>

                    {coupon?.valid ? (
                      <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Check size={16} className="text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-green-800">{coupon.code}</p>
                            <p className="text-xs text-green-700">
                              Desconto de €{((coupon.discount_cents || 0) / 100).toFixed(2)} aplicado
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
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-brand-navy font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#da6927] focus:border-transparent"
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
                        {coupon && !coupon.valid && coupon.reason !== 'unavailable' && (
                          <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                            <AlertCircle size={12} />
                            {coupon.message || 'Código inválido.'}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer with total + CTA */}
              <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4 sticky bottom-0">
                <div>
                  {coupon?.valid && discount > 0 && (
                    <p className="text-xs text-brand-body/60 line-through mb-0.5">
                      €{subtotal.toFixed(2)}
                    </p>
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-body/60">
                    Total
                  </p>
                  <p className="text-2xl font-bold font-montserrat text-brand-navy tracking-tight">
                    €{total.toFixed(2)}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="flex items-center gap-3 bg-[#0d4357] hover:bg-[#da6927] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> A processar
                    </>
                  ) : (
                    <>
                      Pagar <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
