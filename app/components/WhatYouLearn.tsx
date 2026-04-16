// components/WhatYouLearn.tsx

import type { ReactElement } from "react";

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

const ICONS: Record<number, ReactElement> = {
  0: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  1: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  2: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  3: (
    <svg
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
    </svg>
  ),
  4: (
    <svg
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
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  5: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

function getFallbackIcon(index: number): ReactElement {
  return ICONS[index % Object.keys(ICONS).length];
}

export default function WhatYouLearn({ data }: { data: WhatYouLearnData }) {
  return (
    <section
      id="what-you-learn"
      className="relative py-20 sm:py-28 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Decorative background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #000 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            <span className="w-5 h-px bg-zinc-300 dark:bg-zinc-700" />
            What You'll Learn
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08]">
            {data.headline}
          </h2>

          {data.subheadline && (
            <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              {data.subheadline}
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
          {data.points.map((item, i) => (
            <article
              key={i}
              className="group relative bg-white dark:bg-zinc-950 p-7 flex flex-col gap-4 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              {/* Index + icon row */}
              <div className="flex items-start justify-between">
                {/* Circled icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-colors duration-200">
                  {getFallbackIcon(i)}
                </div>

                {/* Step number */}
                <span className="text-[11px] font-bold tabular-nums text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors duration-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="mt-auto pt-2">
                <svg
                  className="w-4 h-4 text-zinc-200 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
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
          ))}
        </div>

        {/* Bottom count bar */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-3xl font-extrabold tabular-nums text-zinc-900 dark:text-zinc-100">
            {data.points.length}
          </span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500 leading-snug">
            core skills <br className="hidden sm:block" /> covered in depth
          </span>
          <div className="ml-4 flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
    </section>
  );
}
