import Container from "@/components/layout/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section
  id="hero"
  className="scroll-mt-24 overflow-hidden bg-[#fffdf7] py-7 lg:py-10"
>
      <Container>
        <div className="relative grid items-center overflow-hidden rounded-[2.5rem] bg-[#5489dc] px-7 py-10 shadow-[0_18px_44px_rgba(52,95,181,0.18)] lg:grid-cols-2 lg:gap-12 lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full border-[28px] border-white/10" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[36px] border-[#91b9f0]/40" />
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}
