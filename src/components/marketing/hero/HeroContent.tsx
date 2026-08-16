import Button from "@/components/ui/Button";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="relative z-10">
      <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
        Made from your memories
      </p>
      <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight text-white lg:text-6xl">
        Photos that turn into
        <br />
        their next <span className="text-[#ffdf67]">favourite book.</span>
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-7 text-blue-50">
        Upload 8–20 favourite memories. We turn them into a one-of-a-kind
        colouring book, print it beautifully, and deliver it to your door.
      </p>

      <div className="mt-7">
        <Button className="doodlets-button--sun">
          Create My Book
        </Button>
      </div>

      <HeroStats />
    </div>
  );
}
