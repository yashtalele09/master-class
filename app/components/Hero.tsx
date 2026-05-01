"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HeroData {
  hero: {
    urgency_badge: string;
    headline: string;
    subheadline: string;
    cta_text: string;
    cta_subtext: string;
    image: string;
    name: string;
    title: string;
    experience: string;
    price: string;
    original_price: string;
    meta: { icon: string; label: string; value: string }[];
    offer_badge: { emoji: string; text: string }[];
  };
}

export default function Hero({ data }: { data: HeroData }) {
  const { hero } = data;
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: number) => ({
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes spin-slow { to { transform: rotate(360deg);  } }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float-up {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-7px); }
        }
        @keyframes ping-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0; transform: scale(2.2); }
        }

        .spin-slow  { animation: spin-slow 28s linear infinite; }
        .spin-rev   { animation: spin-rev  20s linear infinite; }
        .float-anim { animation: float-up 4s ease-in-out infinite; }

        .cta-btn {
          background: linear-gradient(110deg, #b8141a 30%, #e03a3a 50%, #b8141a 70%);
          background-size: 200% auto;
          animation: shimmer 2.8s linear infinite;
        }
        .cta-btn:hover { animation-play-state: paused; filter: brightness(1.1); }

        .meta-card {
          background: #ffffff;
          border: 1.5px solid #f0e4e4;
          box-shadow: 0 2px 10px rgba(184,20,26,0.05);
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .meta-card:hover {
          border-color: #c8202a;
          box-shadow: 0 6px 20px rgba(184,20,26,0.12);
          transform: translateY(-2px);
        }
      `}</style>

      <section className="font-body relative overflow-hidden bg-[#fdf7f4] min-h-screen">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Warm blobs */}
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#fce8e8]/70 blur-3xl" />
          <div className="absolute top-1/2 -right-28 w-[380px] h-[380px] rounded-full bg-[#fef0e0]/80 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[340px] h-[260px] rounded-full bg-[#fce8e8]/50 blur-3xl" />

          {/* Concentric arcs – left side (mirror the original) */}
          {[180, 260, 340, 420, 500].map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#c8202a]/[0.06]"
              style={{
                width: r,
                height: r,
                left: -r * 0.55,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          ))}

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #c8202a 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b8141a] via-[#e8323a] to-[#EF9F27]" />
        </div>

        {/* TOP BADGE */}
        <div
          className="relative z-10 flex justify-center pt-10"
          style={fadeUp(0.1)}>
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#b8141a] px-7 py-2.5 shadow-[0_4px_20px_rgba(184,20,26,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 animate-[ping-dot_1.8s_ease-in-out_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
              {hero.urgency_badge}
            </span>
          </div>
        </div>

        {/* HEADLINE */}
        <div
          className="relative z-10 mx-auto mt-8 max-w-4xl px-6 text-center"
          style={fadeUp(0.25)}>
          <h1 className="font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-black leading-[1.05] tracking-tight text-[#1a0808]">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] font-light leading-relaxed text-[#8a7070]">
            {hero.subheadline}
          </p>
        </div>

        {/* TWO-COLUMN */}
        <div className="relative z-10 mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-10 px-6 pb-20 lg:grid-cols-2 lg:items-center">
          {/* LEFT: Coach */}
          <div className="flex flex-col items-center" style={fadeUp(0.4)}>
            <div className="float-anim relative flex items-center justify-center">
              {/* Orbital rings */}
              <div className="spin-slow absolute w-[330px] h-[330px] rounded-full border border-dashed border-[#c8202a]/18" />
              <div className="spin-rev  absolute w-[278px] h-[278px] rounded-full border border-[#EF9F27]/22" />

              {/* Soft glow */}
              <div className="absolute w-[230px] h-[230px] rounded-full bg-[#c8202a]/8 blur-2xl" />

              {/* Coach circle */}
              <div className="relative w-[248px] h-[248px] rounded-full overflow-hidden border-4 border-white shadow-[0_8px_40px_rgba(184,20,26,0.18),0_2px_12px_rgba(0,0,0,0.07)]">
                <Image
                  src={data.hero.image}
                  fill
                  alt={data.hero.name || "Instructor"}
                  className="object-cover object-top"
                />
              </div>

              {/* Live badge */}
              <div className="absolute top-5 right-0 flex items-center gap-1.5 rounded-full bg-white border border-green-200 px-3 py-1.5 shadow-md">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-600 uppercase tracking-widest font-semibold">
                  Live
                </span>
              </div>
            </div>

            {/* Name card */}
            <div className="mt-6 w-full max-w-sm rounded-2xl border border-[#f0dada] bg-white px-6 py-5 text-center shadow-[0_4px_24px_rgba(184,20,26,0.09)]">
              <p className="font-display text-xl font-bold text-[#b8141a]">
                {data.hero.name}
              </p>
              <p className="mt-1 text-[13px] text-[#9a8080]">
                {data.hero.title}
              </p>
              <div className="mt-2 flex justify-center items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="h-3.5 w-3.5 text-[#EF9F27]"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1.5 text-[11px] text-[#c0a8a8]">
                  {data.hero.experience} experience
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Info + CTA */}
          <div className="flex flex-col gap-5" style={fadeUp(0.55)}>
            {/* 2×2 meta grid */}
            <div className="grid grid-cols-2 gap-3">
              {hero.meta.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="meta-card flex items-center gap-3 rounded-2xl px-4 py-4 cursor-default">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fde8e8] text-xl">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b8141a]">
                      {label}
                    </p>
                    <p className="mt-0.5 text-[13px] font-semibold text-[#2a1010]">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#e8d0d0] to-transparent" />

            {/* CTA */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  router.push("/registration");
                }}
                className="cta-btn group flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-semibold tracking-wide text-white shadow-[0_4px_24px_rgba(184,20,26,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_6px_36px_rgba(184,20,26,0.5)] active:scale-[0.98]">
                <span>{hero.cta_text}</span>
                <span className="flex items-center gap-1.5 rounded-lg bg-black/20 px-2.5 py-1 text-xs">
                  <span className="line-through text-white/50">
                    ₹{hero.original_price}
                  </span>
                  <span className="font-bold text-white"> ₹{hero.price}</span>
                </span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <p className="text-center text-[12px] font-semibold text-[#b8141a]">
                ⚡ {hero.cta_subtext}
              </p>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-6 pt-1">
              {hero.offer_badge.map(({ emoji, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <span className="text-sm">{emoji}</span>
                  <span className="text-[11px] text-[#b8a0a0]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
