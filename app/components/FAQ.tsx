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
      className={`text-xl font-semibold transition-transform duration-300 ${
        open ? "rotate-45" : "rotate-0"
      }`}>
      +
    </span>
  );
}

export function FAQItem({ item }: { item: FAQItemType }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl bg-[#d6d1cb] shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-base md:text-lg font-medium text-black">
          {item.question}
        </span>

        <PlusIcon open={open} />
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-gray-700 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProfessionalFAQ({ data }: { data: FAQData }) {
  return (
    <section className="py-20 px-6 bg-[#f7f7f7]">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-4xl md:text-5xl font-semibold">
            <span className="text-pink-600">Frequently</span>{" "}
            <span className="text-blue-900">Asked Questions</span>
          </h2>

          <div className="mt-4 w-24 h-1 bg-pink-600 mx-auto rounded-full" />
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {data.items.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
