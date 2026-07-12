import { Sparkles, Printer, Truck } from "lucide-react";

export default function HeroStats() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-100 pt-6 text-sm font-medium text-gray-600">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-blue-600" />
        AI Generated
      </div>

      <div className="h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-2">
        <Printer className="h-4 w-4 text-blue-600" />
        Premium Print
      </div>

      <div className="h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-blue-600" />
        Home Delivery
      </div>
    </div>
  );
}