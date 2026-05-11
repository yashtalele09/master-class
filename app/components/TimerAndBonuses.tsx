"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bold?: boolean;
}

function InfoCard({ icon, label, value, bold }: InfoCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center transition-all hover:scale-[1.03]"
      style={{
        background: "linear-gradient(145deg, #3b1f5e, #4e2970)",
        border: "2px solid rgba(255,255,255,0.18)",
        boxShadow:
          "0 8px 32px rgba(80,20,120,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}>
      <div
        className="flex items-center justify-center rounded-full text-amber-200"
        style={{
          width: 48,
          height: 48,
          background: "rgba(255,255,255,0.08)",
          border: "1.5px solid rgba(255,255,255,0.2)",
        }}>
        {icon}
      </div>
      <p className="text-xs text-amber-100/80 font-semibold tracking-widest uppercase">
        {label}
      </p>
      <p
        className={`text-white leading-tight ${bold ? "text-2xl font-extrabold" : "text-xl font-semibold"}`}>
        {value}
      </p>
    </div>
  );
}

interface CountdownUnit {
  value: number;
  label: string;
}

function CountdownBox({ value, label }: CountdownUnit) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-amber-300/60 bg-white/10 backdrop-blur text-white text-3xl font-extrabold tabular-nums shadow-lg">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-100">
        {label}
      </span>
    </div>
  );
}

function useCountdown(targetDate?: string) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setTimeLeft(diff);
    };

    calculateTimeLeft();
    const id = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  return { h, m, s };
}

// ---- Icons (inline SVG to avoid extra deps) ----
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const GiftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

interface WebinarHeroProps {
  data?: {
    instructor_name: string;
    instructor_details: string;
    date: string;
    time: string;
    original_price: string;
    price: string;
    cta_text: string;
    cta_subtext: string;
    duration: string;
    video_url?: string;
    benefits?: { icon: string; text: string }[];
  };
  labels?: any;
}

// ---- Main Component ----
export default function WebinarHero({ data, labels }: WebinarHeroProps) {
  const navigate = useRouter();
  const { h, m, s } = useCountdown(data?.date);
  const videoRef = useRef<HTMLIFrameElement>(null);

  return (
    <section
      id="webinar_hero"
      className="relative min-h-screen bg-[#fdf7f4] w-full overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ffe0b2 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #fff8e1 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-1 text-center">
          <p className="text-base text-amber-800/80 tracking-wide font-medium">
            By{" "}
            <span className="font-extrabold text-amber-900 text-lg tracking-tight">
              {data?.instructor_name || "Shikha Kaushal"}
            </span>
          </p>
          <p className="text-amber-700/80 text-sm tracking-widest uppercase font-semibold">
            {data?.instructor_details || "Leading Parenting & Kids Coach"}
          </p>
          <div className="mt-3 h-[2px] w-16 rounded bg-amber-400/60" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Video + Benefits */}
          <div className="flex flex-col gap-8">
            {/* Video Embed */}
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/10">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full"
                  src={data?.video_url || "https://www.youtube.com/embed/TFrz6jj8oqA"}
                  title="Webinar Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Benefits List (Dynamic) */}
            {data?.benefits && data.benefits.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur border border-amber-100 shadow-sm transition-all hover:scale-[1.02]">
                    <span className="text-2xl">{benefit.icon}</span>
                    <span className="text-sm font-bold text-amber-900">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info Cards Grid */}
          <div className="grid grid-cols-2 gap-4 content-start">
            <InfoCard
              icon={<CalendarIcon />}
              label="Starts on"
              value={
                data?.date
                  ? new Date(data.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                    })
                  : "May 3rd"
              }
              bold
            />
            <InfoCard
              icon={<ClockIcon />}
              label="Time"
              value={data?.time || "11 to 12 PM"}
              bold
            />
            <InfoCard
              icon={<GiftIcon />}
              label="Original Price"
              value={`₹${data?.original_price || "2,999"}`}
              bold
            />
            <InfoCard
              icon={<ShieldIcon />}
              label="Limited Offer"
              value={`₹${data?.price || "499"}`}
              bold
            />
          </div>
        </div>

        {/* Countdown + CTA Banner */}
        <div
          className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl px-8 py-6 sm:flex-row"
          style={{
            background: "rgba(120, 60, 0, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
          }}>
          {/* Text */}
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-xl">
              {data?.cta_text || "Enrollment ends soon."}{" "}
            </p>
            <p className="text-amber-200 font-semibold">
              {data?.cta_subtext || "Claim your spot!"}
            </p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <CountdownBox value={h} label="Hours" />
            <span className="text-amber-200 text-3xl font-bold mb-4">:</span>
            <CountdownBox value={m} label="Minutes" />
            <span className="text-amber-200 text-3xl font-bold mb-4">:</span>
            <CountdownBox value={s} label="Seconds" />
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate.push("/registration")}
            className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-extrabold text-lg text-amber-800 shadow-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-300">
            <span className="relative z-10">{data?.cta_text || "Register Today"}</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber-400 to-orange-500 transition-transform duration-300 group-hover:translate-x-0 opacity-10" />
          </button>
        </div>
      </div>
    </section>
  );
}
