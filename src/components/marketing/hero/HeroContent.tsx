import Button from "@/components/ui/Button";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div>
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-7xl">
        Your Favorite Photos,
        <br />
        Their Next Favorite
        <br />
        <span className="text-blue-600">Coloring Book.</span>
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-7 text-gray-600">
        Upload 8–20 of your favorite memories and we'll transform
        them into beautiful coloring pages, professionally print
        them, and deliver your personalized book right to your
        doorstep.
      </p>

      <div className="mt-7">
        <Button>Create My Book</Button>
      </div>

      <HeroStats />
    </div>
  );
}