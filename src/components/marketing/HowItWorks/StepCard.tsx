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
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <span className="pointer-events-none absolute -right-3 -top-5 select-none text-[6rem] font-extrabold leading-none text-gray-50 transition group-hover:text-blue-50">
        {number}
      </span>

      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="relative mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
        Step {number}
      </div>

      <h3 className="relative mt-1.5 text-xl font-bold">
        {title}
      </h3>

      <p className="relative mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}