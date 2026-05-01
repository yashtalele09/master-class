"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Types ────────────────────────────────────────────────── */
type WhoIsThisForData = {
  headline: string;
  audience: Array<{ point: string }>;
  not_for: Array<{ point: string }>;
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

/* ─── Check Icon ─────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-white flex-shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      />
    </svg>
  );
}

/* ─── X Icon ─────────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-white flex-shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      />
    </svg>
  );
}

/* ─── Single item pill ───────────────────────────────────────── */
function PillItem({
  text,
  index,
  inView,
  variant,
}: {
  text: string;
  index: number;
  inView: boolean;
  variant: "green" | "red";
}) {
  const delay = `${index * 60}ms`;
  const iconBg = variant === "green" ? "bg-[#2ecc40]" : "bg-[#e53e3e]";

  return (
    <div
      style={{ transitionDelay: inView ? delay : "0ms" }}
      className={[
        "flex items-center gap-4 px-5 py-4 rounded-2xl",
        "bg-[#f0f0f0] border border-[#e2e2e2]",
        "hover:border-[#c8c8c8] hover:shadow-sm hover:-translate-y-0.5",
        "transition-all duration-400 ease-out cursor-default",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}>
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconBg} flex-shrink-0 shadow-sm`}>
        {variant === "green" ? <CheckIcon /> : <XIcon />}
      </span>
      <span className="text-[15px] font-semibold text-[#1a1a3e]">{text}</span>
    </div>
  );
}

/* ─── Sub-section block ──────────────────────────────────────── */
function ItemBlock({
  title,
  titleColor,
  items,
  variant,
  inView,
  baseIndex,
}: {
  title: string;
  titleColor: string;
  items: string[];
  variant: "green" | "red";
  inView: boolean;
  baseIndex: number;
}) {
  const half = Math.ceil(items.length / 2);
  const leftCol = items.slice(0, half);
  const rightCol = items.slice(half);

  return (
    <div>
      {/* Sub-section title */}
      <div
        className={[
          "flex items-center gap-3 mb-5 transition-all duration-700 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        ].join(" ")}>
        <div
          className={`h-[3px] w-8 rounded-full ${variant === "green" ? "bg-[#2ecc40]" : "bg-[#e53e3e]"}`}
        />
        <h3
          className={`text-xl font-extrabold ${titleColor}`}
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          {title}
        </h3>
      </div>

      {/* Two-column pill grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {leftCol.map((item, i) => (
            <PillItem
              key={i}
              text={item}
              index={baseIndex + i}
              inView={inView}
              variant={variant}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {rightCol.map((item, i) => (
            <PillItem
              key={i}
              text={item}
              index={baseIndex + half + i}
              inView={inView}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function WhoIsThisFor({ data }: { data: WhoIsThisForData }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="relative py-20 sm:py-28 bg-[#F5FAFC] overflow-hidden">
      <div ref={ref} className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* ── Main Title ── */}
        <div
          className={[
            "text-center mb-14 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1a1a3e] leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {data.headline}
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-[3px] w-20 bg-[#8b1a3a] rounded-full" />
          </div>
        </div>

        {/* ── FOR YOU section ── */}
        <ItemBlock
          title="This Is For You If..."
          titleColor="text-[#1a6b2a]"
          items={data.audience.map((a) => a.point)}
          variant="green"
          inView={inView}
          baseIndex={0}
        />

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e2e2e2]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#aaa]">
            vs
          </span>
          <div className="flex-1 h-px bg-[#e2e2e2]" />
        </div>

        {/* ── NOT FOR YOU section ── */}
        <ItemBlock
          title="This Is NOT For You If..."
          titleColor="text-[#b91c1c]"
          items={data.not_for.map((n) => n.point)}
          variant="red"
          inView={inView}
          baseIndex={data.audience.length}
        />
      </div>
    </section>
  );
}
