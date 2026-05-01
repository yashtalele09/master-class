"use client";
import React from "react";

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
    <section className="py-20 px-6 bg-gradient-to-b from-[#F5FAFC] to-[#E0EEF7]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-xs tracking-widest uppercase text-gray-400 mb-3">
            Course Curriculum
          </p>
          <h2
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            {data.headline}
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {data.modules.map((m, i) => (
            <div
              key={i}
              className="group flex items-start gap-5 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
              {/* Index */}
              <div className="min-w-[50px] h-[50px] flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold text-lg shadow-sm">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {m.description}
                </p>
              </div>

              {/* Time */}
              <div className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 whitespace-nowrap">
                {m.time}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-center gap-4 text-sm text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="font-medium text-gray-500">
            {totalModules} Modules Included
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
