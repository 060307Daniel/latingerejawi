type PastorCardProps = {
  image: string;
  name: string;
  position: string;
  education: string[];
  onContactClick?: () => void;
};

export default function PastorCard({
  image,
  name,
  position,
  education,
  onContactClick,
}: PastorCardProps) {
  return (
    <div className="rounded-3xl border border-[#ead7ff] bg-white p-6">
      {/* FOTO */}
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="h-40 w-40 rounded-full border-4 border-[#e9d5ff] object-cover"
        />
      </div>

      {/* NAMA */}
      <h3 className="mt-6 text-center text-2xl font-bold text-[#0f172a]">
        {name}
      </h3>

      {/* BADGE */}
      <div className="mt-4 flex justify-center">
        <div className="rounded-full border border-[#c084fc] px-4 py-1 text-center text-lg font-semibold text-[#9333ea]">
          {position}
        </div>
      </div>

      {/* PENDIDIKAN */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 text-xl font-bold text-[#334155]">
          🎓 Riwayat Pendidikan
        </h4>

        <div className="mt-4 border-l-2 border-[#e9d5ff] pl-5 text-lg leading-9 text-[#64748b]">
          {education.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={onContactClick}
        className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[#d8b4fe] text-xl font-bold text-[#9333ea] transition hover:bg-[#faf5ff]"
      >
        ✉ Hubungi
      </button>
    </div>
  );
}