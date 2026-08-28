import Image from "next/image";

import Container from "@/components/layout/Container";
import StepCard from "./StepCard";
import { Upload, WandSparkles, Package } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden border-y border-[#e2eaf7] bg-[#f7faff] py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-48 w-48 rounded-full border-[30px] border-[#dfeafe]/60" />
      <Container>
        <div className="relative grid items-stretch gap-8 lg:grid-cols-[0.82fr_2.18fr] lg:gap-10">
          <div className="flex flex-col justify-center lg:pr-4">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d9860b]">
              A little magic, three steps
            </span>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-[#1d2841] md:text-5xl">
              From your photos to their new favourite colouring book
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#5c667a]">
              Turn the moments your child recognises and loves into a printed
              book they can colour, share and treasure.
            </p>

            <div className="mt-7 flex items-center gap-3 text-sm font-extrabold text-[#315dbe]">
              <span>Upload</span>
              <span className="h-px flex-1 bg-[#bfd3f4]" />
              <span>Create</span>
              <span className="h-px flex-1 bg-[#bfd3f4]" />
              <span>Print</span>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[#dbe5f5] bg-[#dbe5f5] shadow-[0_18px_45px_rgba(41,72,125,0.10)] md:grid-cols-3">
            <StepCard
              number="1"
              title="Choose your memories"
              description="Upload 8 or 16 favourite photos straight from your phone or computer."
              icon={<Upload className="h-5 w-5" />}
            />
            <StepCard
              number="2"
              title="We create every colouring page"
              description="We transform every photo into a joyful illustration while keeping familiar people and moments recognisable."
              icon={<WandSparkles className="h-5 w-5" />}
            />
            <StepCard
              number="3"
              title="We print and deliver"
              description="Your photos and matching illustrations are printed as a 16- or 32-page A4 book and delivered to your preferred location."
              icon={<Package className="h-5 w-5" />}
            />
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#dbe5f5] bg-white shadow-[0_16px_40px_rgba(41,72,125,0.08)]">
          <div className="grid items-center md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative z-10 p-7 sm:p-9 lg:pl-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9860b]">
                The finished keepsake
              </p>
              <h3 className="mt-3 max-w-md text-3xl font-black leading-tight text-[#1d2841]">
                From a family photo to a book that feels completely your own.
              </h3>
              <p className="mt-4 max-w-md leading-7 text-[#5c667a]">
                Every original memory sits beside its colouring-page version,
                ready to be coloured, shared and kept.
              </p>
            </div>

            <div className="relative flex min-h-56 items-center justify-center overflow-hidden px-5 pt-2 sm:min-h-64 md:justify-end md:px-8">
              <div className="absolute bottom-4 right-6 h-40 w-[90%] rounded-[50%] bg-[#eef0ff] md:w-[28rem]" />
              <Image
                src="/images/decor/open-colouring-book.png"
                alt="An open Doodles book showing a family photograph beside its colouring page"
                width={520}
                height={347}
                className="relative z-10 h-auto w-full max-w-[30rem] drop-shadow-[0_18px_22px_rgba(41,72,125,0.18)]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
