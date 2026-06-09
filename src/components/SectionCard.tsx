type SectionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  borderColor?: string;
  bgColor?: string;
};

export default function SectionCard({
  title,
  description,
  icon,
  children,
  borderColor = "border-[#e7d6a5]",
  bgColor = "bg-[#fdf9ed]",
}: SectionCardProps) {
  return (
    <div
      className={`rounded-3xl border p-5 lg:p-10 ${borderColor} ${bgColor}`}
    >
      <div className="mb-6 flex items-start gap-3 lg:mb-8 lg:items-center lg:gap-4">
        {icon}

        <h2 className="text-2xl font-bold leading-tight text-[#0d1333] lg:text-5xl">
          {title}
        </h2>
      </div>

      <p className="mb-8 max-w-5xl text-base leading-8 text-[#334155] lg:mb-10 lg:text-2xl lg:leading-[50px]">
        {description}
      </p>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}