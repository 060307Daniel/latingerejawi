type SectionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  borderColor?: string;
  bgColor?: string;
  centered?: boolean;
};

export default function SectionCard({
  title,
  description,
  icon,
  children,
  borderColor = "border-[#e7d6a5]",
  bgColor = "bg-[#fdf9ed]",
  centered = false,
}: SectionCardProps) {
  return (
    <div
      className={`rounded-3xl border p-5 lg:p-10 ${borderColor} ${bgColor}`}
    >
      {/* HEADER */}
      <div
        className={`mb-6 flex gap-3 lg:mb-8 ${
          centered
            ? "flex-col items-center text-center"
            : "items-start lg:items-center lg:gap-4"
        }`}
      >
        <div className={centered ? "mx-auto" : ""}>{icon}</div>

        <h2
          className={`font-bold leading-tight text-[#0d1333] ${
            centered
              ? "text-3xl lg:text-6xl text-center"
              : "text-2xl lg:text-5xl"
          }`}
        >
          {title}
        </h2>
      </div>

      {/* DESCRIPTION */}
      <p
        className={`mb-8 text-[#334155] ${
          centered
            ? "text-center mx-auto max-w-4xl text-lg lg:text-2xl leading-relaxed"
            : "max-w-5xl text-base lg:text-2xl lg:leading-[50px]"
        }`}
      >
        {description}
      </p>

      <div className="w-full">{children}</div>
    </div>
  );
}