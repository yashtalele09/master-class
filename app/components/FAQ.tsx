"use client";
import { useState } from "react";

interface FAQItemType {
  question: string;
  answer: string;
}

interface FAQData {
  headline: string;
  items: FAQItemType[];
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border border-gray-300 transition-transform duration-200 ${
        open ? "rotate-45" : "rotate-0"
      }`}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <line
          x1="4"
          y1="0"
          x2="4"
          y2="8"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="4"
          x2="8"
          y2="4"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </span>
  );
}

function FAQItem({ item }: { item: FAQItemType }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-colors ${
          open ? "text-gray-900" : "text-gray-500"
        }`}>
        <span className="flex-1 text-sm font-medium leading-snug">
          {item.question}
        </span>

        <PlusIcon open={open} />
      </button>

      {/* Animated Answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}>
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-[13px] leading-relaxed font-light text-gray-500">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ data }: { data: FAQData }) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Label */}
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">
          FAQ
        </p>

        {/* Heading */}
        <h2 className="mb-10 text-[2.2rem] leading-tight font-normal italic text-gray-900 font-serif">
          {data.headline}
        </h2>

        {/* FAQ List */}
        <div className="border-b border-gray-200">
          {data.items.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
