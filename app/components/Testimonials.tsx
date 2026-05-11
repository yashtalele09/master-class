"use client";

import Image from "next/image";
import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarInitial?: string;
  image?: string;
}

interface TestimonialsProps {
  data: {
    headline: string;
    items: Testimonial[];
  };
  labels?: any;
}

const AVATAR_COLORS: Record<string, string> = {
  T: "#c084fc",
  M: "#fb923c",
  S: "#34d399",
  R: "#60a5fa",
  V: "#f472b6",
};

function Avatar({ initial, src, avatar }: { initial?: string; src?: string; avatar?: string }) {
  const imageSrc = src || avatar;
  if (imageSrc) {
    return (
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-amber-200/60">
        <Image src={imageSrc} alt="avatar" fill className="object-cover" />
      </div>
    );
  }
  const color = AVATAR_COLORS[initial ?? "T"] ?? "#c084fc";
  return (
    <div
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white text-lg font-bold ring-2 ring-white/40"
      style={{ background: color }}>
      {initial || "T"}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-3 opacity-20">
      <path
        d="M0 24V14.4C0 10.4 1.06667 7.06667 3.2 4.4C5.38667 1.68 8.4 0 12.24 0L13.6 2.64C11.04 3.36 9.04 4.72 7.6 6.72C6.16 8.72 5.44 10.96 5.44 13.44H10.4V24H0ZM18.4 24V14.4C18.4 10.4 19.4667 7.06667 21.6 4.4C23.7867 1.68 26.8 0 30.64 0L32 2.64C29.44 3.36 27.44 4.72 26 6.72C24.56 8.72 23.84 10.96 23.84 13.44H28.8V24H18.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-3xl p-6 transition-all duration-300"
      style={{
        background: hovered
          ? "linear-gradient(145deg, #ffffff, #fdf6f0)"
          : "linear-gradient(145deg, #ffffff, #fafaf8)",
        boxShadow: hovered
          ? "0 20px 60px rgba(180, 100, 50, 0.18), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        border: "1.5px solid rgba(245, 203, 167, 0.5)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}>
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, #f5cba7, #e8a87c, #f5cba7)"
            : "transparent",
        }}
      />

      {/* Header: Avatar + Name */}
      <div className="mb-4 flex items-center gap-3">
        <Avatar 
          initial={testimonial.avatarInitial || testimonial.name?.[0]} 
          src={testimonial.image} 
          avatar={testimonial.avatar} 
        />
        <div>
          <p
            className="font-extrabold text-gray-900 text-lg leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}>
            {testimonial.name}
          </p>
          <p className="text-sm text-gray-400 font-medium">
            {testimonial.role || testimonial.title}
          </p>
        </div>
      </div>

      {/* Quote text */}
      <div className="mt-1 flex flex-col">
        <QuoteIcon />
        <p
          className="text-gray-600 text-sm leading-relaxed"
          style={{ fontFamily: "'Georgia', serif" }}>
          {testimonial.quote}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ data, labels }: TestimonialsProps) {
  if (!data) return null;

  return (
    <section
      className="relative w-full overflow-hidden py-20 px-4"
      style={{
        background:
          "linear-gradient(160deg, #f9f4ef 0%, #f0e8df 50%, #ede0d4 100%)",
      }}>
      {/* Background texture dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#7c3a1e 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-14 text-center">
          <h2
            className="text-5xl font-black text-gray-900 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}>
            {data.headline}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-16 rounded bg-amber-300" />
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <div className="h-px w-16 rounded bg-amber-300" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

