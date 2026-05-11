import type { Metadata } from "next";
import localData from "@/content/landing.json";
import { client } from "@/sanity/lib/client";
import { LANDING_QUERY } from "@/sanity/lib/queries";

import Hero from "./components/Hero";
import Instructor from "./components/Instructor";
import WhatYouLearn from "./components/WhatYouLearn";
import Curriculum from "./components/Curriculum";
import SocialProof from "./components/SocialProof";
import WhoIsThisFor from "./components/WhoIsThisFor";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WebinarHero from "./components/TimerAndBonuses";
import TestimonialsSection from "./components/Testimonials";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(LANDING_QUERY) || localData;
  return {
    title: data.seo?.title ?? data.hero?.headline,
    description: data.seo?.description ?? data.hero?.subheadline,
  };
}

export default async function HomePage() {
  const data = await client.fetch(LANDING_QUERY);
  
  // Fallback to local data if Sanity is empty
  const finalData = data || localData;
  const labels = finalData.labels;

  return (
    <main>
      {finalData.section_order?.map((section: string, index: number) => {
        switch (section) {
          case "hero":
            return <Hero key={index} data={finalData.hero} labels={labels} />;

          case "webinar_hero":
            return <WebinarHero key={index} data={finalData.webinar_hero} labels={labels} />;

          case "what_you_learn":
            return <WhatYouLearn key={index} data={finalData.what_you_learn} labels={labels} />;

          case "curriculum":
            return <Curriculum key={index} data={finalData.curriculum} labels={labels} />;

          case "instructor":
            return <Instructor key={index} data={finalData.instructor} labels={labels} />;

          case "testimonials":
            return <TestimonialsSection key={index} data={finalData.testimonials} labels={labels} />;

          case "social_proof":
            return <SocialProof key={index} data={finalData.social_proof} labels={labels} />;

          case "who_is_this_for":
            return <WhoIsThisFor key={index} data={finalData.who_is_this_for} labels={labels} />;

          case "faq":
            return <FAQ key={index} data={finalData.faq} labels={labels} />;

          case "footer":
            return <Footer key={index} data={finalData.footer} labels={labels} />;

          default:
            return null;
        }
      })}
    </main>
  );
}
