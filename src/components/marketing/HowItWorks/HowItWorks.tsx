import Container from "@/components/layout/Container";
import StepCard from "./StepCard";
import { Upload, WandSparkles, Package } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#e59019]">
            A little magic, three steps
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1d2841]">
            Your story starts here
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Creating a keepsake colouring book takes only a few happy minutes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <StepCard number="1" title="Upload Your Photos" description="Choose 8–20 of your favourite photos." icon={<Upload className="h-5 w-5 text-[#315dbe]" />} />
          <StepCard number="2" title="We Create the Artwork" description="We transform each photo into a beautiful colouring page." icon={<WandSparkles className="h-5 w-5 text-[#315dbe]" />} />
          <StepCard number="3" title="Print & Delivery" description="Your book is professionally printed and delivered to your doorstep." icon={<Package className="h-5 w-5 text-[#315dbe]" />} />
        </div>
      </Container>
    </section>
  );
}
