"use client";

import { useState, useRef, useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";

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
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400">
          <span className="inline-block h-1 w-1 rounded-full bg-rose-500 dark:bg-rose-400" />
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
        "h-11 w-full rounded-xl border px-4 text-sm font-medium outline-none transition-all duration-150",
        "bg-zinc-50 text-zinc-900 placeholder-zinc-300",
        "dark:bg-zinc-800/60 dark:text-zinc-100 dark:placeholder-zinc-600",
        "hover:border-zinc-300 dark:hover:border-zinc-600",
        "focus:ring-2 focus:ring-offset-0",
        hasError
          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10 dark:border-rose-500 dark:focus:border-rose-400"
          : "border-zinc-200 focus:border-zinc-800 focus:ring-zinc-800/8 dark:border-zinc-700 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/10",
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
          "h-11 w-full appearance-none rounded-xl border px-4 pr-10 text-sm font-medium outline-none transition-all duration-150",
          "bg-zinc-50 text-zinc-900 dark:bg-zinc-800/60 dark:text-zinc-100",
          "hover:border-zinc-300 dark:hover:border-zinc-600",
          "focus:ring-2 focus:ring-offset-0",
          value === ""
            ? "text-zinc-300 dark:text-zinc-600"
            : "text-zinc-900 dark:text-zinc-100",
          hasError
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
            : "border-zinc-200 focus:border-zinc-800 focus:ring-zinc-800/8 dark:border-zinc-700 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/10",
        ].join(" ")}>
        <option value="" disabled>
          Source
        </option>
        {SOURCE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* chevron icon */}
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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

function SuccessCheckmark() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/40 dark:bg-emerald-900/30 dark:ring-emerald-900/20">
      <svg
        className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */

export default function RegisterForm({ data }: RegisterFormProps) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const firstErrorRef = useRef<string | null>(null);

  /* ── Validation ── */
  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.whatsapp)) {
      newErrors.whatsapp = "Enter a valid 10-digit Indian number.";
    }

    setErrors(newErrors);

    const keys = Object.keys(newErrors) as (keyof FormData)[];
    firstErrorRef.current = keys[0] ?? null;

    return keys.length === 0;
  };

  /* ── Change handler ── */
  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  /* ── Submit ── */
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

      let json: any;
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

      /* Meta Pixel */
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message ?? "Something went wrong. Please try again.");
    }
  };

  /* ── Payment ── */
  const handlePayment = async () => {
    try {
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

      const data = await res.json();

      const cashfree = await load({
        mode: "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch {
      alert("Payment failed. Try again.");
    }
  };

  /* ── Success state ── */
  if (status === "success") {
    return (
      <section className="flex min-h-[28rem] items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-zinc-100 bg-white px-8 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <SuccessCheckmark />
            </div>

            {/* Copy */}
            <h2 className="mb-2 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              You're registered!
            </h2>
            <p className="mb-8 text-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {message}
            </p>

            {/* Divider */}
            <div className="mb-6 border-t border-zinc-100 dark:border-zinc-800" />

            {/* Price block */}
            <div className="mb-6 flex items-baseline justify-center gap-2">
              <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                ₹499
              </span>
              <span className="text-sm text-zinc-400">· one-time</span>
            </div>

            {/* Pay button */}
            <button
              onClick={handlePayment}
              className="group relative w-full overflow-hidden rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Confirm seat — Pay ₹499
            </button>

            {/* Reassurance */}
            <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
              Secured by Razorpay · UPI, cards &amp; netbanking accepted
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ── Form state ── */
  return (
    <section
      id="register"
      className="bg-zinc-50 px-6 py-14 dark:bg-zinc-950 sm:px-10">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            Live Masterclass
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {data.subheadline}
            </p>
          )}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <FieldWrapper label="Full Name" error={errors.name}>
              <TextInput
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Riya Sharma"
                autoComplete="name"
                hasError={!!errors.name}
              />
            </FieldWrapper>

            {/* Email */}
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

            {/* WhatsApp */}
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

            {/* City + Source */}
            <div className="grid grid-cols-2 gap-4">
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

            {/* Divider */}
            <div className="border-t border-zinc-100 pt-1 dark:border-zinc-800" />

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              {status === "loading" ? (
                <>
                  <Spinner />
                  Submitting…
                </>
              ) : (
                data.button_text
              )}
            </button>

            {/* Error banner */}
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
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor">
                <path d="M8 .5a7.5 7.5 0 1 0 0 15A7.5 7.5 0 0 0 8 .5zm3.03 5.78-3.5 4.5a.75.75 0 0 1-1.12.06l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.91.91 2.97-3.82a.75.75 0 1 1 1.18.91z" />
              </svg>
              Free to register
            </span>
            <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor">
                <path d="M11.5 1h-7A2.5 2.5 0 0 0 2 3.5v9A2.5 2.5 0 0 0 4.5 15h7a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 11.5 1zM8 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4.5a1 1 0 0 1-2 0v-3a1 1 0 0 1 2 0v3z" />
              </svg>
              No spam, ever
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
