import type { LucideIcon } from "lucide-react";

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#315dbe]">
          <Icon className="h-4 w-4" />
          {eyebrow}
        </span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[#18233b] sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#6e788c] sm:text-base">{description}</p>
      </div>
      {action}
    </header>
  );
}
