// app/page.tsx

import type { Metadata } from "next";
import data from "@/content/landing.json";

import Hero from "./components/Hero";
import Instructor from "./components/Instructor";
import WhatYouLearn from "./components/WhatYouLearn";
import Curriculum from "./components/Curriculum";
import SocialProof from "./components/SocialProof";
import WhoIsThisFor from "./components/WhoIsThisFor";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: data.seo?.title ?? data.hero?.headline,
  description: data.seo?.description ?? data.hero?.subheadline,
  openGraph: {
    title: data.seo?.title ?? data.hero?.headline,
    description: data.seo?.description ?? data.hero?.subheadline,
    images: data.seo?.og_image ? [{ url: data.seo.og_image }] : [],
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero data={data} />

      <WhatYouLearn data={data.what_you_learn} />

      <Curriculum data={data.curriculum} />

      <Instructor data={data.instructor} />

      <SocialProof data={data.social_proof} />

      <WhoIsThisFor data={data.who_is_this_for} />

      <FAQ data={data.faq} />

      <Footer data={data.footer} />
    </main>
  );
}
