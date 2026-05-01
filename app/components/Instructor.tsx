"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ─── Types ────────────────────────────────────────────────── */
interface BioParagraph {
  text: string;
  boldPhrases?: string[]; // phrases to bold within the text
}

interface CoachData {
  name: string;
  title: string;
  credentials: { point: string; }[];
  image: string;
  socialIcon?: "instagram" | "youtube" | "twitter";
  followerCount: string;
  followerLabel: string;
  bioParagraphs: BioParagraph[];
}

/* ─── Intersection observer hook ────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Rich text renderer (bold phrases) ─────────────────────── */
function RichText({ text, boldPhrases = [] }: BioParagraph) {
  if (boldPhrases.length === 0) return <>{text}</>;
  const regex = new RegExp(
    `(${boldPhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        boldPhrases.some((p) => p.toLowerCase() === part.toLowerCase()) ? (
          <strong key={i} className="font-bold text-white">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* ─── Instagram Icon ─────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function MeetCoach({ data }: { data: CoachData }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 bg-[#0e1b4d] overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #6c4bdc 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #00bcd4 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* ── Section Title ── */}
        <div
          className={[
            "text-center mb-14 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Meet Your Coach {data.name}
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-[3px] w-20 bg-white/60 rounded-full" />
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* ── LEFT: Image + Card ── */}
          <div
            className={[
              "w-full lg:w-auto flex-shrink-0 flex flex-col items-center transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            ].join(" ")}>
            {/* Circular image with teal ring */}
            <div className="relative">
              {/* Outer teal glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 180deg, #00c9b1, #00bcd4, #0e8fb5, #00c9b1)",
                  padding: "4px",
                  borderRadius: "9999px",
                }}
              />
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: 340,
                  height: 340,
                  border: "5px solid #00c9b1",
                  boxShadow: "0 0 0 4px #0e1b4d, 0 0 0 8px #00c9b1",
                }}>
                {/* Purple/lavender background behind image */}
                <div className="absolute inset-0 bg-[#9b87e8]" />
                <Image
                  src={data.image}
                  alt={data.name}
                  width={280}
                  height={280}
                  className="relative z-10 w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* White info card below image */}
            <div
              className="relative -mt-8 w-80 z-10 bg-white rounded-2xl shadow-xl px-7 pt-12 pb-7 text-center"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}>
              <h3
                className="text-xl font-extrabold text-[#8b1a3a] leading-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {data.name}
              </h3>
              <p className="mt-1 text-sm text-[#444] font-medium leading-snug">
                {data.title}
              </p>
              <div className="my-4 flex justify-center">
                <div className="h-[2px] w-10 bg-[#0e1b4d]/20 rounded-full" />
              </div>

              {/* Social follower badge */}
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[#c13584]">
                  <InstagramIcon />
                </span>
                <span className="text-lg font-extrabold text-[#1a1a3e]">
                  {data.followerCount}
                </span>
                <span className="text-sm text-[#555] font-medium">
                  {data.followerLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Bio ── */}
          <div
            className={[
              "flex-1 flex flex-col gap-5 transition-all duration-700 delay-150 ease-out",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            ].join(" ")}>
            {data.bioParagraphs.map((para, i) => (
              <p
                key={i}
                className="text-[14px] sm:text-[18px] leading-relaxed text-white/80">
                <RichText text={para.text} boldPhrases={para.boldPhrases} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
