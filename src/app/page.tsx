import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import Hero from "@/components/hero";
import { Problem, HowItWorks, Foundation, Vision, Why, Platforms, Roadmap, FAQ, CTA } from "@/components/sections";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Foundation />
        <Vision />
        <Why />
        <Platforms />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
