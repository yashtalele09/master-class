// components/WhatYouLearn.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

/* ─── Types ────────────────────────────────────────────────── */
type Point = {
  title: string;
  description: string;
  image: string; // URL or path to image
};

type WhatYouLearnData = {
  headline: string;
  accentWords?: string[]; // words to highlight in crimson
  points: Point[];
};

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

/* ─── Card ───────────────────────────────────────────────────── */
function LearnCard({
  item,
  index,
  inView,
}: {
  item: Point;
  index: number;
  inView: boolean;
}) {
  const delay = `${index * 80}ms`;

  return (
    <article
      style={{ transitionDelay: inView ? delay : "0ms" }}
      className={[
        "group flex flex-col bg-white rounded-2xl overflow-hidden",
        "border border-[#e8e0dc]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        "hover:-translate-y-1",
        "transition-all duration-500 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}>
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#d4cac4]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-7 py-6 gap-3">
        <h3
          className="text-[17px] md:text-[14px] text-center white-space-nowrap font-bold leading-snug text-[#8b1a3a]"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          {item.title}
        </h3>
        <p className="text-[14px] md:text-[12px] leading-relaxed text-[#555] text-center">
          {item.description}
        </p>
      </div>
    </article>
  );
}

/* ─── Headline renderer (highlight accent words) ─────────────── */
function StyledHeadline({
  headline,
  accentWords = [],
}: {
  headline: string;
  accentWords?: string[];
}) {
  if (accentWords.length === 0) {
    return <>{headline}</>;
  }

  const regex = new RegExp(`(${accentWords.join("|")})`, "gi");
  const parts = headline.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        accentWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className="text-[#8b1a3a]">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function WhatYouLearn({ data }: { data: WhatYouLearnData }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="what-you-learn"
      className="relative py-20 sm:py-28 bg-[#ece7e2] overflow-hidden">
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* Header */}
        <div
          className={[
            "text-center mb-12 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}>
          <h2
            className="text-4xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a3e] leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <StyledHeadline
              headline={data.headline}
              accentWords={data.accentWords}
            />
          </h2>

          {/* Underline accent */}
          <div className="mt-4 flex justify-center">
            <div className="h-[3px] w-16 bg-[#8b1a3a] rounded-full" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.points.map((item, i) => (
            <LearnCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
