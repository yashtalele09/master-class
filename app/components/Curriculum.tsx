"use client";
import { useRef, useEffect } from "react";

interface Module {
  time: string;
  title: string;
  description: string;
}

interface CurriculumData {
  headline: string;
  modules: Module[];
}

export default function Curriculum({ data }: { data: CurriculumData }) {
  const totalModules = data.modules.length;

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p
          className="mb-3 text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--color-text-tertiary, #9ca3af)" }}>
          Course curriculum
        </p>

        {/* Headline */}
        <h2
          className="mb-10 text-4xl leading-tight"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontWeight: 600,
            color: "var(--color-text-primary, #111)",
          }}>
          {data.headline}
        </h2>

        {/* Module list */}
        <div
          style={{
            borderTop: "0.5px solid var(--color-border-secondary, #e5e7eb)",
          }}>
          {data.modules.map((m, i) => (
            <div
              key={i}
              className="group grid gap-x-6 gap-y-1 py-5 transition-colors duration-150 hover:bg-gray-50 rounded-md hover:-mx-4 hover:px-4"
              style={{
                gridTemplateColumns: "60px 1fr auto",
                alignItems: "start",
                borderBottom:
                  "0.5px solid var(--color-border-tertiary, #f0f0f0)",
              }}>
              {/* Index number */}
              <span
                className="leading-none pt-0.5"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--color-text-tertiary, #9ca3af)",
                }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title + Description */}
              <div>
                <p
                  className="text-sm font-medium leading-snug mb-1"
                  style={{ color: "var(--color-text-primary, #111)" }}>
                  {m.title}
                </p>
                <p
                  className="text-xs leading-relaxed font-light"
                  style={{ color: "var(--color-text-secondary, #6b7280)" }}>
                  {m.description}
                </p>
              </div>

              {/* Time pill */}
              <span
                className="mt-0.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide"
                style={{
                  color: "var(--color-text-tertiary, #9ca3af)",
                  borderColor: "var(--color-border-tertiary, #e5e7eb)",
                  background: "var(--color-background-tertiary, #f9fafb)",
                }}>
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-6 flex items-center gap-3 text-xs"
          style={{ color: "var(--color-text-tertiary, #9ca3af)" }}>
          <div
            className="flex-1"
            style={{
              height: "0.5px",
              background: "var(--color-border-tertiary, #e5e7eb)",
            }}
          />
          <span>{totalModules} modules</span>
          <div
            className="flex-1"
            style={{
              height: "0.5px",
              background: "var(--color-border-tertiary, #e5e7eb)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
