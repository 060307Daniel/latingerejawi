 import { GraduationCap } from "lucide-react";

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
    <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* FOTO */}
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="h-40 w-40 rounded-full border-4 border-red-300 object-cover"
        />
      </div>

      {/* NAMA */}
      <h3 className="mt-6 text-center text-2xl font-bold text-red-700">
        {name}
      </h3>

      {/* BADGE */}
      <div className="mt-4 flex justify-center">
        <div className="rounded-full border border-red-600 px-4 py-1 text-center text-lg font-semibold text-base-600">
          {position}
        </div>
      </div>

      {/* PENDIDIKAN */}
<div className="mt-8">
  <h4 className="flex items-center gap-2 text-base font-bold text-base-600">
    <GraduationCap size={18} className="text-red-600" />
    Riwayat Pendidikan
  </h4>

        <div className="mt-4 border-l-2 border-red-100 pl-5 text-lg leading-9 text-600">
          {education.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      {/* BUTTON 
      <button
        onClick={onContactClick}
        className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-red-200 text-xl font-bold text-red-600 transition hover:bg-red-50 hover:border-red-300"
      >
        ✉ Hubungi
      </button>*/}
    </div>
  );
}