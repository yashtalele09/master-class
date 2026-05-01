"use client";

import { useState, useRef } from "react";
import landingData from "@/content/landing.json";

/* ─── Types ─────────────────────────────────────────────── */
type FormData = {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  source: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

type RegisterFormProps = {
  data: {
    headline: string;
    subheadline?: string;
    button_text: string;
    success_message: string;
    // Course content
    date?: string;
    time?: string;
    price?: string;
    original_price?: string;
    instructor?: string;
    course_image?: string;
    benefits?: string[];
    description?: string;
  };
};

type Status = "idle" | "loading" | "success" | "error";

/* ─── Constants ──────────────────────────────────────────── */
const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  whatsapp: "",
  city: "",
  source: "",
};

const SOURCE_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "google", label: "Google" },
  { value: "friend", label: "Friend / Referral" },
  { value: "other", label: "Other" },
];

/* ─── Sub-components ─────────────────────────────────────── */

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-amber-700/70 dark:text-amber-400/60">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-[11px] text-rose-500">
          <span className="inline-block h-1 w-1 rounded-full bg-rose-500" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  inputMode,
  hasError,
  autoComplete,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  hasError?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      inputMode={inputMode}
      autoComplete={autoComplete}
      className={[
        "h-10 w-full rounded-lg border px-3.5 text-sm outline-none transition-all duration-150",
        "bg-white/80 text-zinc-900 placeholder-zinc-300",
        "dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder-zinc-600",
        "focus:ring-2 focus:ring-offset-0",
        hasError
          ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20"
          : "border-amber-200/70 hover:border-amber-300 focus:border-amber-500 focus:ring-amber-500/15 dark:border-zinc-700 dark:focus:border-amber-500",
      ].join(" ")}
    />
  );
}

function SelectInput({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hasError?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={[
          "h-10 w-full appearance-none rounded-lg border px-3.5 pr-9 text-sm outline-none transition-all duration-150",
          "bg-white/80 dark:bg-zinc-900/60",
          "focus:ring-2 focus:ring-offset-0",
          value === ""
            ? "text-zinc-300 dark:text-zinc-600"
            : "text-zinc-900 dark:text-zinc-100",
          hasError
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20"
            : "border-amber-200/70 hover:border-amber-300 focus:border-amber-500 focus:ring-amber-500/15 dark:border-zinc-700 dark:focus:border-amber-500",
        ].join(" ")}>
        <option value="" disabled>
          Select source…
        </option>
        {SOURCE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-400"
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="3 5 7 9 11 5" />
      </svg>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="mr-2 inline-block h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none">
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="2.5 8.5 6 12 13.5 4" />
    </svg>
  );
}

/* ─── Success State ──────────────────────────────────────── */
function SuccessState({
  message,
  onPay,
}: {
  message: string;
  onPay: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-amber-100 bg-white p-10 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
            <CheckIcon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            You&apos;re in!
          </h2>
          <p className="mb-8 text-sm text-zinc-500 leading-relaxed dark:text-zinc-400">
            {message}
          </p>
          <div className="mb-6 border-t border-zinc-100 dark:border-zinc-800" />
          <p className="text-xs text-zinc-400 mb-2 uppercase tracking-widest font-semibold">
            Secure your seat
          </p>
          <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
            ₹499{" "}
            <span className="text-base font-normal text-zinc-400">
              · one-time
            </span>
          </p>
          <p className="text-xs text-zinc-400 line-through mb-6">₹1,299</p>
          <button
            onClick={onPay}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 active:scale-[0.98]">
            Confirm Seat — Pay ₹499
          </button>
          <p className="mt-4 text-xs text-zinc-400">
            🔒 Secured by Razorpay · UPI, cards & netbanking
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */

export default function RegistrationPage() {
  const data = {
    headline: landingData.register_form.headline,
    subheadline: landingData.register_form.subheadline,
    button_text: landingData.register_form.button_text,
    success_message: landingData.register_form.success_message,
    benefits: landingData.register_form.benefits,
    date: landingData.masterclass.date,
    time: landingData.masterclass.time,
    price: landingData.masterclass.price,
    original_price: landingData.masterclass.original_price,
    instructor: landingData.instructor.name,
    course_image: landingData.hero.image,
    description: landingData.masterclass.tagline,
  };

  return <RegisterForm data={data} />;
}

function RegisterForm({ data }: RegisterFormProps) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const firstErrorRef = useRef<string | null>(null);

  const benefits = data.benefits ?? [
    "Rewire Your Subconscious Beliefs",
    "Manifest Your Dream Life",
    "Heal your Childhood Trauma",
    "Stop Procrastinating & Become an Achiever",
  ];

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.whatsapp))
      newErrors.whatsapp = "Enter a valid 10-digit Indian number.";
    setErrors(newErrors);
    const keys = Object.keys(newErrors) as (keyof FormData)[];
    firstErrorRef.current = keys[0] ?? null;
    return keys.length === 0;
  };

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let json: { message?: string; success_message?: string };
      try {
        json = await res.json();
      } catch {
        throw new Error("Invalid server response.");
      }
      if (!res.ok) throw new Error(json?.message ?? "Request failed.");
      setStatus("success");
      setMessage(
        json?.success_message ?? json?.message ?? data.success_message,
      );
      if (
        typeof window !== "undefined" &&
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq
      ) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
          "track",
          "Lead",
        );
      }
    } catch (err) {
      const error = err as Error;
      setStatus("error");
      setMessage(error.message ?? "Something went wrong. Please try again.");
    }
  };

  const handlePayment = async () => {
    try {
      const { load } = await import("@cashfreepayments/cashfree-js");
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 499,
          name: form.name,
          email: form.email,
          phone: form.whatsapp,
        }),
      });
      const orderData = await res.json();
      const cashfree = await load({ mode: "sandbox" });
      cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_self",
      });
    } catch {
      alert("Payment failed. Try again.");
    }
  };

  if (status === "success")
    return <SuccessState message={message} onPay={handlePayment} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/60 to-rose-50/40 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Top bar */}
      <div className="border-b border-amber-100/80 bg-white/70 backdrop-blur-sm px-6 py-3 dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex items-center justify-between">
          {/* ← Back button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:text-zinc-200">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="10 3 5 8 10 13" />
            </svg>
            Back
          </button>

          {/* Centered badge */}
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            ✦ Live Masterclass · Limited Seats ✦
          </p>

          {/* Invisible spacer keeps badge visually centered */}
          <div className="w-16" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14 lg:items-start">
          {/* ── LEFT: Course Info ── */}
          <div className="flex flex-col gap-6">
            {/* Badge + Title */}
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 mb-3">
                Live Masterclass
              </span>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                {data.headline}
              </h1>
              {data.subheadline && (
                <p className="mt-3 text-base text-zinc-500 leading-relaxed dark:text-zinc-400">
                  {data.subheadline}
                </p>
              )}
            </div>

            {/* Instructor + Price */}
            <div className="flex flex-wrap items-center gap-4">
              {data.instructor && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  By{" "}
                  <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                    {data.instructor}
                  </span>
                </p>
              )}
              <div className="flex items-baseline gap-2">
                {data.original_price && (
                  <span className="text-sm text-zinc-400 line-through">
                    {data.original_price}
                  </span>
                )}
                <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                  {data.price ?? "₹99"}
                </span>
              </div>
            </div>

            {/* Course Image */}
            {data.course_image ? (
              <div className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src={data.course_image}
                  alt={data.headline}
                  className="w-full object-cover"
                />
              </div>
            ) : (
              /* Placeholder banner if no image provided */
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-700 via-orange-700 to-rose-800 p-8 shadow-md">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_70%)]" />
                <p className="relative text-2xl font-extrabold text-white leading-snug">
                  {data.headline}
                </p>
                <ul className="mt-4 space-y-2">
                  {benefits.slice(0, 4).map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/90">
                      <span className="text-amber-300">✦</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Date / Time pills */}
            {(data.date || data.time) && (
              <div className="flex flex-wrap gap-3">
                {data.date && (
                  <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <svg
                      className="h-4 w-4 text-amber-500"
                      viewBox="0 0 16 16"
                      fill="currentColor">
                      <path d="M5 .5a.5.5 0 0 1 .5.5v.5h5V1a.5.5 0 0 1 1 0v.5h1A1.5 1.5 0 0 1 14 3v10a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13V3a1.5 1.5 0 0 1 1.5-1.5h1V1A.5.5 0 0 1 5 .5zM3.5 2.5A.5.5 0 0 0 3 3v1h10V3a.5.5 0 0 0-.5-.5h-9zM3 5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V5H3z" />
                    </svg>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                      {data.date}
                    </span>
                  </div>
                )}
                {data.time && (
                  <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <svg
                      className="h-4 w-4 text-amber-500"
                      viewBox="0 0 16 16"
                      fill="currentColor">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                      {data.time}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {data.description && (
              <p className="text-sm text-zinc-600 leading-relaxed dark:text-zinc-400 border-l-2 border-amber-400 pl-4 italic">
                {data.description}
              </p>
            )}

            {/* Benefits */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                What you&apos;ll gain
              </p>
              <ul className="space-y-2.5">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                      <CheckIcon className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    </span>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social proof */}
            <div className="rounded-xl border border-amber-100 bg-white/60 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["🙋", "🙋‍♂️", "🙋‍♀️"].map((e, i) => (
                    <span
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-base dark:border-zinc-900 dark:bg-amber-900/40">
                      {e}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-bold text-zinc-700 dark:text-zinc-200">
                    500+ people
                  </span>{" "}
                  have already registered
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Registration Form ── */}
          <div className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              {/* Form header */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-7 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-100/80 mb-1">
                  Free Registration
                </p>
                <h2 className="text-xl font-extrabold text-white">
                  Reserve Your Spot
                </h2>
                <p className="text-xs text-amber-100/70 mt-1">
                  Fill in your details below to join the masterclass
                </p>
              </div>

              <div className="px-7 py-6">
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <FieldWrapper label="Full Name" error={errors.name}>
                    <TextInput
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Riya Sharma"
                      autoComplete="name"
                      hasError={!!errors.name}
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Email Address" error={errors.email}>
                    <TextInput
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="riya@example.com"
                      autoComplete="email"
                      hasError={!!errors.email}
                    />
                  </FieldWrapper>

                  <FieldWrapper label="WhatsApp Number" error={errors.whatsapp}>
                    <TextInput
                      type="tel"
                      value={form.whatsapp}
                      onChange={handleChange("whatsapp")}
                      placeholder="9876543210"
                      maxLength={10}
                      inputMode="numeric"
                      hasError={!!errors.whatsapp}
                    />
                  </FieldWrapper>

                  <div className="grid grid-cols-2 gap-3">
                    <FieldWrapper label="City">
                      <TextInput
                        value={form.city}
                        onChange={handleChange("city")}
                        placeholder="Mumbai"
                        autoComplete="address-level2"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="How did you hear?">
                      <SelectInput
                        value={form.source}
                        onChange={handleChange("source")}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="border-t border-zinc-100 pt-1 dark:border-zinc-800" />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                    {status === "loading" ? (
                      <>
                        <Spinner />
                        Submitting…
                      </>
                    ) : (
                      data.button_text
                    )}
                  </button>

                  {status === "error" && (
                    <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/50 dark:bg-rose-950/40">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-rose-500"
                        viewBox="0 0 16 16"
                        fill="currentColor">
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
                      </svg>
                      <p className="text-xs leading-relaxed text-rose-700 dark:text-rose-400">
                        {message}
                      </p>
                    </div>
                  )}
                </form>

                {/* Trust row */}
                <div className="mt-5 flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-500"
                      viewBox="0 0 16 16"
                      fill="currentColor">
                      <path d="M8 .5a7.5 7.5 0 1 0 0 15A7.5 7.5 0 0 0 8 .5zm3.03 5.78-3.5 4.5a.75.75 0 0 1-1.12.06l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.91.91 2.97-3.82a.75.75 0 1 1 1.18.91z" />
                    </svg>
                    Free to register
                  </span>
                  <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-500"
                      viewBox="0 0 16 16"
                      fill="currentColor">
                      <path d="M8 1a2 2 0 0 1 2 2v1h1.5A1.5 1.5 0 0 1 13 5.5v7A1.5 1.5 0 0 1 11.5 14h-7A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4H6V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v1h2V3a1 1 0 0 0-1-1z" />
                    </svg>
                    No spam, ever
                  </span>
                  <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-500"
                      viewBox="0 0 16 16"
                      fill="currentColor">
                      <path d="M8 1a5 5 0 0 0-5 5v1h-.5A1.5 1.5 0 0 0 1 8.5v5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 13.5 7H13V6a5 5 0 0 0-5-5zm0 1a4 4 0 0 1 4 4v1H4V6a4 4 0 0 1 4-4z" />
                    </svg>
                    100% secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
