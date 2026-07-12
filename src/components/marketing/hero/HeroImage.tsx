import ImageComparisonSlider from "@/components/ui/image-comparison-slider";

export default function HeroImage() {
  return (
    <ImageComparisonSlider
      beforeImage="/images/hero/before.jpg"
      afterImage="/images/hero/after.jpg"
      beforeAlt="Original Photo"
      afterAlt="Coloring Page"
    />
  );
}