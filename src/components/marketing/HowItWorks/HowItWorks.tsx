import Container from "@/components/layout/Container";
import StepCard from "./StepCard";
import {
  Upload,
  WandSparkles,
  Package,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <section
  id="how-it-works"
  className="scroll-mt-24 py-14 lg:py-20"
>
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            The Process
          </span>

          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
            How It Works
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Creating your personalized coloring book
            takes just a few minutes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <StepCard
            number="1"
            title="Upload Your Photos"
            description="Choose 8–20 of your favourite photos."
            icon={<Upload className="h-5 w-5 text-blue-600" />}
          />

          <StepCard
            number="2"
            title="We Create the Artwork"
            description="We transform each photo into a beautiful coloring page."
            icon={<WandSparkles className="h-5 w-5 text-blue-600" />}
          />

          <StepCard
            number="3"
            title="Print & Delivery"
            description="Your book is professionally printed and delivered to your doorstep."
            icon={<Package className="h-5 w-5 text-blue-600" />}
          />
        </div>
      </Container>
    </section>
  );
}