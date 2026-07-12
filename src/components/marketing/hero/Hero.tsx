import Container from "@/components/layout/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section
  id="hero"
  className="scroll-mt-24 overflow-hidden py-12 lg:py-20"
>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}