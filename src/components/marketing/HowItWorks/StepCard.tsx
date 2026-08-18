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
    <article className="group relative bg-white p-6 transition-colors hover:bg-[#fbfdff] lg:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#315dbe] transition-transform group-hover:-rotate-3 group-hover:scale-105">
          {icon}
        </div>
        <span className="select-none text-4xl font-black tracking-tighter text-[#dfeafe]">
          0{number}
        </span>
      </div>

      <div className="mt-9 text-xs font-black uppercase tracking-[0.16em] text-[#d9860b]">
        Step {number}
      </div>

      <h3 className="mt-2 text-xl font-black leading-tight text-[#1d2841]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#5c667a]">
        {description}
      </p>

      <div className="mt-6 h-1 w-10 rounded-full bg-[#ffd24e] transition-all group-hover:w-16" />
    </article>
  );
}
