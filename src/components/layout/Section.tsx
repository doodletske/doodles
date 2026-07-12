type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-14 lg:py-20 ${className}`}>
      {children}
    </section>
  );
}