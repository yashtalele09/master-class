// components/WhatYouLearn.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

/* ─── Types ────────────────────────────────────────────────── */
type Point = {
  title: string;
  description: string;
  icon?: string;
};

type WhatYouLearnData = {
  headline: string;
  subheadline?: string;
  points: Point[];
};

/* ─── Icons ─────────────────────────────────────────────────── */
const ICONS: ReactElement[] = [
  // Layers
  <svg
    key="layers"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  // Clock
  <svg
    key="clock"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
  // Activity
  <svg
    key="activity"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
  // Users
  <svg
    key="users"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // File
  <svg
    key="file"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>,
  // Target
  <svg
    key="target"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  // Zap
  <svg
    key="zap"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  // Star
  <svg
    key="star"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

function getIcon(index: number): ReactElement {
  return ICONS[index % ICONS.length];
}

/* ─── Intersection observer hook ────────────────────────────── */
function useInView(threshold = 0.15) {
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
  const delay = `${index * 60}ms`;

  return (
    <article
      style={{ transitionDelay: inView ? delay : "0ms" }}
      className={[
        "group relative flex flex-col gap-5 p-7 bg-white dark:bg-zinc-900",
        "border border-zinc-100 dark:border-zinc-800 rounded-2xl",
        "transition-all duration-500 ease-out",
        "hover:border-zinc-300 dark:hover:border-zinc-600",
        "hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]",
        "hover:-translate-y-0.5",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}>
      {/* Top row: icon + step number */}
      <div className="flex items-start justify-between">
        {/* Icon pill */}
        <div
          className={[
            "flex items-center justify-center w-11 h-11 rounded-xl",
            "bg-zinc-100 dark:bg-zinc-800",
            "text-zinc-500 dark:text-zinc-400",
            "group-hover:bg-zinc-900 group-hover:text-white",
            "dark:group-hover:bg-white dark:group-hover:text-zinc-900",
            "transition-all duration-300",
          ].join(" ")}>
          {getIcon(index)}
        </div>

        {/* Step number */}
        <span
          className={[
            "font-mono text-[11px] font-semibold tabular-nums",
            "text-zinc-200 dark:text-zinc-700",
            "group-hover:text-zinc-400 dark:group-hover:text-zinc-500",
            "transition-colors duration-300",
          ].join(" ")}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-[15px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {item.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="mt-auto">
        <svg
          className={[
            "w-4 h-4",
            "text-zinc-200 dark:text-zinc-700",
            "group-hover:text-zinc-900 dark:group-hover:text-zinc-100",
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            "transition-all duration-300",
          ].join(" ")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </article>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function WhatYouLearn({ data }: { data: WhatYouLearnData }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="what-you-learn"
      className="relative py-20 sm:py-28 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Top fade overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-50 dark:from-zinc-950 to-transparent"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* Header */}
        <div
          className={[
            "max-w-2xl mb-14 sm:mb-16 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              What You&apos;ll Learn
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08]">
            {data.headline}
          </h2>

          {data.subheadline && (
            <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              {data.subheadline}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.points.map((item, i) => (
            <LearnCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer stat bar */}
        <div
          className={[
            "mt-10 flex items-center gap-4 transition-all duration-700 delay-300 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}>
          {/* Count */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
              {data.points.length}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 leading-tight">
              core skills
              <br />
              covered in depth
            </span>
          </div>

          {/* Divider line */}
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800 ml-2" />

          {/* CTA pill */}
          <a
            href="#register"
            className={[
              "hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
              "text-xs font-semibold",
              "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
              "hover:bg-zinc-700 dark:hover:bg-zinc-200",
              "transition-colors duration-200",
            ].join(" ")}>
            Reserve your seat
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
