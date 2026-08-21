import ImageComparisonSlider from "@/components/ui/image-comparison-slider";

export default function HeroImage() {
  return (
    <div className="relative z-10 rounded-[1.75rem] bg-white p-2 shadow-2xl shadow-[#345ba1]/30">
      <ImageComparisonSlider
        beforeImage="/images/hero/family-original.jpg"
        afterImage="/images/hero/family-colouring.png"
        beforeAlt="Original family photograph"
        afterAlt="Family photograph transformed into a colouring page"
      />
    </div>
  );
}
