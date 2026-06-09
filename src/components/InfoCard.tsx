type InfoCardProps = {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  borderColor?: string;
  titleColor?: string;
};

export default function InfoCard({
  title,
  subtitle,
  description,
  children,
  borderColor = "border-[#f1dfb0]",
  titleColor = "text-[#b45309]",
}: InfoCardProps) {
  return (
    <div
      className={`min-h-full rounded-2xl border bg-white p-6 lg:p-8 ${borderColor}`}
    >
      <h3
        className={`text-xl font-bold lg:text-3xl ${titleColor}`}
      >
        {title}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm font-semibold text-slate-500 lg:text-lg">
          {subtitle}
        </p>
      )}

      {description && (
        <div className="mt-5 text-base leading-8 text-[#334155] lg:text-xl lg:leading-[45px]">
          {description}
        </div>
      )}

      {children && (
        <div className="mt-5">
          {children}
        </div>
      )}
    </div>
  );
}