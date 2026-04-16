interface HeroData {
  hero: {
    urgency_badge: string;
    headline: string;
    subheadline: string;
    cta_text: string;
    cta_subtext: string;
  };
}

export default function Hero({ data }: { data: HeroData }) {
  const { hero } = data;

  return (
    <section className="relative overflow-hidden bg-[#0a0a09] px-6 py-20 text-center font-sans">
      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 opacity-50 bg-[linear-gradient(#1a1a18_1px,transparent_1px),linear-gradient(90deg,#1a1a18_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative mx-auto max-w-2xl">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#3a3a38] bg-[#1a1a18] px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF9F27]" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-[#FAC775]">
            {hero.urgency_badge}
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 font-['Bebas_Neue'] text-[clamp(3.5rem,10vw,5.5rem)] leading-[0.95] tracking-wide text-[#f5f4f0]">
          {hero.headline}
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-10 max-w-md text-sm font-light leading-relaxed text-[#888780]">
          {hero.subheadline}
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="#register"
            className="rounded bg-[#EF9F27] px-9 py-3 text-sm font-medium tracking-wide text-[#0a0a09] transition-all duration-150 hover:-translate-y-[1px] hover:bg-[#FAC775]">
            {hero.cta_text}
          </a>

          <span className="text-[11px] italic text-[#5f5e5a]">
            {hero.cta_subtext}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-12 h-px w-8 bg-[#2c2c2a]" />
      </div>
    </section>
  );
}
