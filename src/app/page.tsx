import Hero from "@/components/marketing/hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import Pricing from "@/components/marketing/pricing/pricing";
import Contact from "@/components/marketing/contact/contact";
// import CTA from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Pricing />
      <Contact />
      {/* <CTA /> */}
    </main>
  );
}