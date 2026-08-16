import { ReactNode } from "react";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export default function StepCard({
  number,
  title,
  description,
  icon,
}: StepCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#e1e8f4] bg-white p-7 shadow-[0_10px_25px_rgba(40,74,128,0.08)] transition hover:-translate-y-1 hover:border-[#9cc0f6] hover:shadow-xl">
      <span className="pointer-events-none absolute -right-3 -top-5 select-none text-[6rem] font-black leading-none text-[#f4f8ff] transition group-hover:text-[#e8f1ff]">
        {number}
      </span>

      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#315dbe]">
        {icon}
      </div>

      <div className="relative mt-5 text-xs font-black uppercase tracking-[0.15em] text-[#e59019]">
        Step {number}
      </div>

      <h3 className="relative mt-1.5 text-xl font-black text-[#1d2841]">
        {title}
      </h3>

      <p className="relative mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}
