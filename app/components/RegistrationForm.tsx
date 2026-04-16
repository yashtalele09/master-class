"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type FormData = {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  source: string;
};

type RegisterFormProps = {
  data: {
    headline: string;
    subheadline?: string;
    button_text: string;
    success_message: string;
  };
};

const INPUT_CLASSES =
  "w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 text-sm font-medium outline-none transition-all duration-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/10 dark:hover:border-zinc-600";

const LABEL_CLASSES =
  "block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5";

export default function RegisterForm({ data }: RegisterFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    source: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.whatsapp)) {
      newErrors.whatsapp = "Enter a valid 10-digit Indian mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        city: form.city,
        source: form.source,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
      return;
    }

    setStatus("success");
    setMessage(data.success_message || "You're registered!");

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  if (status === "success") {
    return (
      <section className="min-h-[420px] flex items-center justify-center px-6 py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center max-w-sm">
          {/* Animated checkmark */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center animate-[scale-in_0.4s_cubic-bezier(0.22,1,0.36,1)]">
            <svg
              className="w-8 h-8 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            You're registered!
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {message}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="register"
      className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 px-6 py-14 sm:px-10">
      {/* Subtle decorative grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1">
            Registration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {data.subheadline}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name */}
          <div>
            <label className={LABEL_CLASSES}>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Riya Sharma"
              value={form.name}
              onChange={handleChange("name")}
              className={`${INPUT_CLASSES} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`}
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={LABEL_CLASSES}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              className={`${INPUT_CLASSES} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className={LABEL_CLASSES}>WhatsApp Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400 dark:text-zinc-500 select-none">
                +91
              </span>
              <input
                type="tel"
                placeholder="9876543210"
                value={form.whatsapp}
                onChange={handleChange("whatsapp")}
                maxLength={10}
                className={`${INPUT_CLASSES} pl-14 ${errors.whatsapp ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`}
                autoComplete="tel"
              />
            </div>
            {errors.whatsapp && (
              <p className="mt-1.5 text-xs text-red-500">{errors.whatsapp}</p>
            )}
          </div>

          {/* City + Source row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASSES}>City</label>
              <input
                type="text"
                placeholder="Mumbai"
                value={form.city}
                onChange={handleChange("city")}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label className={LABEL_CLASSES}>How did you hear?</label>
              <select
                value={form.source}
                onChange={handleChange("source")}
                className={`${INPUT_CLASSES} appearance-none cursor-pointer`}>
                <option value="">Select source</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
                <option value="friend">Friend / Referral</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative w-full overflow-hidden rounded-xl bg-zinc-900 dark:bg-zinc-50 px-6 py-3.5 text-sm font-bold text-white dark:text-zinc-900 tracking-wide transition-all duration-200 hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-zinc-50">
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Submitting…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {data.button_text}
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>

            {status === "error" && (
              <p className="mt-3 text-center text-xs text-red-500">{message}</p>
            )}

            <p className="mt-4 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
              By registering, you agree to receive updates via WhatsApp & email.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
