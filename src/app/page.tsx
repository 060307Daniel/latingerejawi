"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { transformProgress } from "@/lib/progress/transform-progress";
import { calculateModuleProgress } from "@/lib/progress-engine";
import {
  COURSE_STRUCTURE,
  ModuleSlug,
} from "@/lib/course-structure";

import InfoCard from "@/components/InfoCard";
import SectionCard from "@/components/SectionCard";
import PastorCard from "@/components/PastorCard";


import {
  BookOpen,
  Home,
  Trophy,
  BookText,
  GraduationCap,
  UserPlus,
  FolderOpen,
  BookMarked,
  ClipboardCheck,
  ChevronRight,
  Lock,
  Mail,
  BookCopy,
  Clock3,
  TrophyIcon,
  ChurchIcon,
  Scroll, Landmark, ArrowRight, CheckCircle2,
  Book,
} from "lucide-react";

export default function HomePage() {

const [pastorId, setPastorId] = useState<string | null>(null);



  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] =
    useState(true);

  const [progressData, setProgressData] = useState<Record<string, string[]>>({});

const [passedQuizCount, setPassedQuizCount] =
  useState(0);

const [lockedModal, setLockedModal] = useState(false);
const [lockedMessage, setLockedMessage] = useState("");

const isPastor = user?.role === "PASTOR";

const isAdmin = user?.role === "ADMIN";

  const fetchProgress = async (userId: number) => {
  try {
    const res = await fetch(
      `/api/progress?userId=${userId}`
    );

    const progress = await res.json();

     const passedQuizCount = progress.filter(
      (item: any) =>
        item.lessonSlug.startsWith("quiz-")
    ).length;

    setPassedQuizCount(passedQuizCount);

    const formatted = transformProgress(progress);

    setProgressData(formatted);
  } catch (err) {
    console.log(err);
  }

};

const getModuleProgress = (
  moduleSlug: ModuleSlug
) => {
  const completed =
    progressData[moduleSlug] || [];

  console.log("completed", completed);

  return calculateModuleProgress(
    moduleSlug,
    completed
  );
};


const isModuleCompleted = (
  moduleSlug: ModuleSlug
) => {
  return getModuleProgress(moduleSlug) >= 100;
};

const isDoaDasarUnlocked =
  isModuleCompleted("elementa-1");

const isOrdinariumUnlocked =
  isModuleCompleted("doa-doa-dasar");

const isPujiSyukurUnlocked =
  isModuleCompleted("ordinarium-misa");

/*const isKataUmumUnlocked =
  isModuleCompleted("puji-syukur");*/

const isFinalUnlocked =
  isModuleCompleted("puji-syukur");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await fetch(
          "/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          setUser(null);
          setLoading(false);
          return;
        }

        const data =
          await response.json();

        if (data.message) {
          setUser(null);
          setLoading(false);
          return;
        }


setUser(data);

if (data?.id) {
  fetchProgress(data.id);
}

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        setLoading(false);
      } catch (error) {
        console.log(error);

        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
  const syncPastor = () => {
    setPastorId(localStorage.getItem("pastorId"));
  };

  syncPastor();

  window.addEventListener("storage", syncPastor);

  return () => {
    window.removeEventListener("storage", syncPastor);
  };
}, []);

   const modules = [
  {
    title: "1: Elementa",
    slug: "elementa-1",
    description:
      "Pengenalan huruf mati dan huruf hidup dalam bahasa Latin Gerejawi",

    completed:
      progressData["elementa-1"]?.length || 0,

    lessons: COURSE_STRUCTURE["elementa-1"].length,

    unlocked: true,

    href: "/materi/elementa-1",
    icon: "📖",
  },

  {
    title: "2: Doa-doa Dasar",
    slug: "doa-doa-dasar",
    description:
      "Pengenalan doa-doa sederhana dalam Latin Gerejawi",

    completed:
      progressData["doa-doa-dasar"]?.length || 0,

    lessons:
      COURSE_STRUCTURE["doa-doa-dasar"].length,

    unlocked:
      isModuleCompleted("elementa-1"),

    href: "/materi/doa-doa-dasar",
    icon: "🙏",
  },

  {
    title: "3: Ordinarium Misa",
    slug: "ordinarium-misa",
    description:
      "Penggunaan frasa liturgi dalam Gereja Katolik",

    completed:
      progressData["ordinarium-misa"]?.length || 0,

    lessons:
      COURSE_STRUCTURE["ordinarium-misa"].length,

    unlocked:
      isModuleCompleted("doa-doa-dasar"),

    href: "/materi/ordinarium-misa",
    icon: "👼",
  },

  {
    title: "4: Puji Syukur",
    slug: "puji-syukur",
    description:
      "Memahami dan mendalami teks nyanyian dalam buku Puji Syukur",

    completed:
      progressData["puji-syukur"]?.length || 0,

    lessons:
      COURSE_STRUCTURE["puji-syukur"].length,

    unlocked:
      isModuleCompleted("ordinarium-misa"),

    href: "/materi/puji-syukur",
    icon: "📿",
  },

  /*{
    title: "Kata Umum Lainnya",
    slug: "kata-umum",
    description:
      "Bonus tambahan kata-kata yang sering digunakan dalam lingkungan gereja",

    completed:
      progressData["kata-umum"]?.length || 0,

    lessons:
      COURSE_STRUCTURE["kata-umum"].length,

    unlocked:
      isModuleCompleted("puji-syukur"),

    href: "/materi/kata-umum",
    icon: "🎵",
  },*/

  {
    title: "Ujian Terakhir",
    slug: "final-assessment",
    description:
      "Uji kembali pengetahuan yang sudah dipelajari untuk mendapatkan sertifikat",

    completed:
      progressData["final-assessment"]?.length || 0,

    lessons:
      COURSE_STRUCTURE["final-assessment"].length,

    unlocked:
      isModuleCompleted("puji-syukur"),

    href: "/materi/final-assessment",
    icon: "📘",
  },
];

  const totalLessons =
    modules.reduce(
      (acc, module) =>
        acc + module.lessons,
      0
    );

const totalCompletedLessons = Object.values(progressData)
  .flat()
  .length;

 /*const allCompletedLessons = Object.values(progressData)
  .flat()
  .length;*/

const totalProgress =
  totalLessons > 0
    ? Math.round((totalCompletedLessons / totalLessons) * 100)
    : 0;

    const allModulesCompleted =
  modules.length > 0 &&
  modules.every((m) => {
    const percent = Math.round(
      ((m.completed ?? 0) / m.lessons) * 100
    );
    return percent >= 100;
  });

const handleLockedModule = (
  moduleName: string,
  index: number
) => {

  const previousModule =
    index > 0
      ? modules[index - 1].title
      : "modul sebelumnya";

  setLockedMessage(
  `Anda harus menyelesaikan seluruh modul pembelajaran "${previousModule}" terlebih dahulu.`
);

  setLockedModal(true);
};

  const handleGuestAlert = () => {
    alert(
      "Anda belum login, daftar terlebih dahulu untuk dapat mengakses materinya."
    );
  };

  const scrollToSection = (
    id: string
  ) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">
        <div className="text-lg font-semibold text-slate-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] pb-10">


      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">

          {/* LOGO */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white lg:h-14 lg:w-14">
              <BookOpen size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#0d1333] lg:text-4xl">
                LatinGerejawi
              </h1>

              <p className="text-sm text-slate-500 lg:text-lg">
                Belajar Bahasa Latin Gerejawi
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end lg:w-auto lg:gap-4">
           <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
            >
              <Home size={20} />
              Beranda
            </Link>
            <Link
             href="/glosarium"
             className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg" >
             <BookText size={20} />
             Glosarium
            </Link>

            {/* KHUSUS ADMIN */}
{isAdmin && (
  <Link
    href="/admin/dashboard"
    className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
  >
    <BookOpen size={20} />
    Dashboard
  </Link>
)}

            {user ? (
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
              >
                <GraduationCap size={20} />
                {user.name || "Profil"}
              </Link>
            ) : (
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
              >
                <GraduationCap size={20} />
                Belum Masuk? Daftar Sekarang!
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto mt-6 max-w-7xl px-4 lg:mt-10 lg:px-6">

        {/* SECTION 1 */}
    {/* SECTION 1 - HERO CLEAN */}
<SectionCard
  title="LatinGerejawi"
  description="Salve! Dominus Vobiscum! Selamat Datang di sebuah platform pembelajaran yang memperkenalkan bahasa Latin dalam konteks Gereja Katolik, sehingga umat beriman dapat memahami warisan iman dengan lebih bermakna."
  icon={<ChurchIcon className="text-red-600" size={28} />}
  borderColor="border-red-200"
  bgColor="bg-white"
  centered
>

  {/* 2 CARDS ONLY */}
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

    {/* CARD 1 - SEJARAH */}
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">

      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
            <Book size={28} />
          </div>

          <h3 className="text-2xl font-bold text-red-700 lg:text-2xl">
            SEJARAH SINGKAT
          </h3>
        </div>

        <p className="text-2xl font-semibold text-slate-800 mb-3">
          Kenapa Bahasa Latin adalah Bahasa Gereja
        </p>

        <p className="text-lg leading-relaxed text-slate-600">
          Latin menjadi bahasa resmi Gereja Katolik sejak abad ke-4, menggantikan bahasa Yunani. Konsili Vatikan II (1962-1965) memperbolehkan penggunaan bahasa vernakular, namun..
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/sejarah-latin"
          className="inline-flex items-center gap-2 text-lg font-semibold text-red-600 transition-all duration-300 hover:text-red-700 group-hover:gap-3"
        >
          ...selengkapnya <ArrowRight size={16} />
        </Link>
      </div>

    </div>

    {/* CARD 2 - PENGGUNAAN */}
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">

      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
            <Landmark size={28} />
          </div>

          <h3 className="text-2xl font-bold text-red-700 lg:text-2xl">
            PENGGUNAAN DALAM GEREJA
          </h3>
        </div>

        <p className="text-2xl font-semibold text-slate-800 mb-3">
          Kapan kita menggunakan Bahasa Latin?
        </p>

        <p className="text-lg leading-relaxed text-slate-600">
          Latin Gerejawi digunakan dalam Misa Tridentina, doa-doa resmi seperti Rosario dan Liturgi Jam, dokumen-dokumen Kepausan, dan nyanyian Gregorian. Mempelajari Latin membantu umat memahami kekayaan tradisi liturgi Katolik dan..
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/penggunaan-latin"
          className="inline-flex items-center gap-2 text-lg font-semibold text-red-600 transition-all duration-300 hover:text-red-700 group-hover:gap-3"
        >
          ...selengkapnya <ArrowRight size={16} />
        </Link>
      </div>

    </div>

  </div>
</SectionCard>

        {/* SECTION 2 */}
      {/* SECTION 2 */}
{/* SECTION 2 */}
<div className="mt-10">
  <SectionCard
    title="Apa yang Akan Anda Dapatkan?"
    description="Platform pembelajaran Latin Gerejawi yang komprehensif dengan materi terstruktur dari dasar hingga mahir."
    borderColor="border-[#ffa600]/40"
    bgColor="bg-white"
    icon={<Trophy className="text-[#ffa600]" size={28} />}
    centered
  >
    <div className="relative">

      {/* soft background glow */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#ffa600]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#0d1333]/5 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* LEFT CARD - MATERI (with slight gold accent) */}
        <div className="relative rounded-2xl border border-[#ffa600]/40 bg-white p-7 lg:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#ffa600]/80">

          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#ffa600]/10 blur-2xl" />

          <h3 className="flex items-center gap-2 text-xl font-bold text-[#0d1333] lg:text-3xl">
            <span className="text-[#ffa600]">✦</span>
            Materi Pembelajaran
          </h3>

          <p className="mt-3 text-2xl text-slate-700 leading-relaxed">
            Anda akan mempelajari Bahasa Latin Gerejawi secara bertahap dari aturan yang ada sampai mendalami doa dan nyanyian Gereja
          </p>

          <div className="mt-6 space-y-4 text-slate-700">

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">📖</span>
              <p>Pengucapan Bahasa Latin Gerejawi Sesuai Aturannya</p>
            </div>

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">✍</span>
              <p>Mengenali Kosakata dalam Bahasa Latin Gerejawi</p>
            </div>

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">🙏</span>
              <p>Belajar doa-doa Latin yang digunakan dalam liturgi</p>
            </div>

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">🎵</span>
              <p>Mengenal nyanyian Gregorian dan tradisi Gereja</p>
            </div>

          </div>
        </div>

        {/* RIGHT CARD - BENEFIT (CLEAN NO ACCENT BACKGROUND) */}
        <div className="relative rounded-2xl border border-[#ffa600]/40 bg-white p-7 lg:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#ffa600]/70">

          <h3 className="flex items-center gap-2 text-xl font-bold text-[#0d1333] lg:text-3xl">
            <span className="text-[#ffa600]">✦</span>
            Benefit yang Didapat
          </h3>

          <p className="mt-3 text-2xl text-slate-700 leading-relaxed">
            Pembelajaran ini membantu Anda tidak hanya memahami bahasa, tetapi juga mendalami tradisi dan spiritualitas Gereja.
          </p>

          <div className="mt-6 space-y-4 text-slate-700">

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">⛪</span>
              <p>Memperkaya Pemahaman akan Warisan Iman</p>
            </div>

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">📚</span>
              <p>Meningkatkan Kemampuan Pelafalan</p>
            </div>

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">🗣</span>
              <p>Sertifikat Penyelesaian</p>
            </div>

            <div className="text-xl flex gap-3">
              <span className="text-[#ffa600]">✨</span>
              <p>Tim Pastor Yang Siap Membantu</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </SectionCard>
</div>
        {/* SECTION 3 */}
<div className="mt-12 rounded-3xl border border-red-100 bg-white p-6 lg:p-12">

  {/* HEADER */}
  <div className="mb-10 text-center">

    <div className="mx-auto flex h-12 w-12 items-center justify-center text-3xl">
        <GraduationCap className="text-[#E53935]" size={28} />
    </div>

    <h2 className="mt-4 text-3xl font-bold  lg:text-5xl">
      Pastor Pendamping Anda
    </h2>

    <p className="mx-auto mt-3 text-base-600 lg:text-xl">
      Terdapat para pastor yang siap membimbing perjalanan pembelajaran Latin Gerejawi
    </p>

  </div>

  {/* GRID */}
  <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

    {/* CARD 1 */}
    <div className="group cursor-pointer rounded-3xl border border-red-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">

      <PastorCard
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCA2oFYSKXTqHN_oBsf6j5hnNfNhR3-43Nw&s"
        name="RP. Stenly Pondaag, MSC"
        position="Pengajar di Seminari Keuskupan"
        education={[
          "S1 – STF Seminari Pineleng, Manado",
          "S2 – Universität Innsbruck, Austria",
          "S3 – Universität Innsbruck, Austria",
        ]}
      />
    </div>

    {/* CARD 2 */}
    <div className="group cursor-pointer rounded-3xl border border-red-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">

      <PastorCard
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gEhxpnRYGc8F-29siUGxVwZBAIsYNBqbVjkOyMGNMfD9SjRwEUw6y5M&s=10"
        name="RP. Stefanus Watuseke, MSC"
        position="Pengajar di Seminari Keuskupan"
        education={[
          "S1 – STF Seminari Pineleng, Manado",
          "S2 – Pontificia Universitas Gregoriana, Roma",
        ]}
      />
    </div>

    {/* CARD 3 */}
    <div className="group cursor-pointer rounded-3xl border border-red-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">

      <PastorCard
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq60ks3mytiChRnHExKJOVYjAKUNTFNFk87Onx5dVFg&s=10"
        name="RD. Louis Bayak"
        position="Pengajar di Seminari Keuskupan"
        education={[
          "S1 Filsafat – Seminari Tinggi Pineleng, Manado",
        ]}
      />
    </div>
  </div>

    <p className=" mt-6 text-center text-base-600 text-xl">
      Fitur "Hubungi Pastor" terdapat dibawah halaman dan hanya bisa diakses sesudah login
    </p>


</div>

        {/* LANGKAH PENGGUNAAN */}
        <div className="mt-10 rounded-3xl border border-[#c7d7ff] bg-white p-5 lg:p-8">

          <h2 className="text-4xl font-bold text-center text-[#0d1333]">
            Cara Menggunakan Aplikasi
          </h2>

          <p className="mt-2 text-xl text-center text-slate-900 ">
            Ikuti langkah-langkah sederhana untuk memulai pembelajaran Anda
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border-2 border-dashed border-[#806704] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]">
                <UserPlus size={30} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#0d1333]">
                LANGKAH 1
              </h3>

              <p className="mt-2 text-lg">
                Daftarkan diri Anda
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-[#0d1333] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-[#0d1333]">
                <FolderOpen size={30} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#0d1333]">
                LANGKAH 2
              </h3>

              <p className="mt-2 text-lg">
                Pilih Modul
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-[#806704] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]">
                <BookMarked size={30} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#0d1333]">
                Langkah 3
              </h3>

              <p className="mt-2 text-lg">
                Pelajari Materi
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-[#0d1333] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-[#0d1333]">
                <ClipboardCheck size={30} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#0d1333]">
                LANGKAH 4
              </h3>

              <p className="mt-2 text-lg">
                Ikuti Kuis
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() =>
                scrollToSection(
                  "modul-kursus"
                )
              }
              className="rounded-xl bg-[#030326] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
            >
              Lihat Modul Pembelajaran
            </button>
          </div>
        </div>

        {/* MODUL KURSUS */}
        <div
          id="modul-kursus"
          className="mt-10"
        >

          {/* MODE LOGIN */}
          {user && (
            <>
              {/* TRACKING */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] p-6 text-white shadow-lg">

                <h2 className="text-5xl text-center font-bold">
                  Salve Discipule!
                </h2>

                <p className="mt-2 text-xl text-center text-white/90">
                  Selamat datang di perjalanan pembelajaran bahasa suci Gereja.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <BookCopy size={28} />
                      <div>
                        <h3 className="text-3xl font-bold">
                          {totalCompletedLessons}
                        </h3>
                        <p className="text-sm">
                          Pelajaran Selesai
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <TrophyIcon size={28} />
                      <div>
                        <h3 className="text-3xl font-bold">
                          {passedQuizCount}/7
                        </h3>
                        <p className="text-sm">
                          Kuis Lulus
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <Clock3 size={28} />
                      <div>
                        <h3 className="text-3xl font-bold">
                          {totalProgress}%
                        </h3>
                        <p className="text-sm">
                          Progress Kursus
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold text-center text-[#0d1333]">
                  Progress Anda
                </h2>

                <p className="mt-2 text-center text-xl">
                  Lacak perjalanan Anda dalam pembelajaran ini!
                </p>

                <div className="mt-6 flex items-center justify-between text-lg font-semibold text-slate-700">
                  <span>Penyelesaian Keseluruhan</span>
                  <span>
                    {totalCompletedLessons} dari {totalLessons} pelajaran
                  </span>
                </div>

                <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-red-600 transition-all duration-500"
                    style={{
                      width: `${totalProgress}%`,
                    }}
                  ></div>
                </div>
              </div>
            </>
          )}

          {/* TITLE */}
          <h2 className="mt-10 text-3xl  text-center font-bold text-[#0d1333]">
            Modul Pembelajaran
          </h2>

          {/* MODE BELUM LOGIN */}
          {!user && (
            <div className="mt-6 rounded-3xl border border-[#facc15] bg-[#fffbeb] p-8 text-center">
              <Lock
                className="mx-auto text-[#d97706]"
                size={42}
              />

              <h3 className="mt-5 text-2xl font-bold text-[#0d1333]">
                Login Diperlukan
              </h3>

              <p className="mt-3 text-slate-500">
                Anda harus login terlebih dahulu untuk mengakses modul pembelajaran
              </p>

              <Link
                href="/register"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#030326] px-6 py-3 text-white"
              >
                <GraduationCap size={18} />
                Login / Daftar Sekarang
              </Link>
            </div>
          )}

          {/* GRID MODUL */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {modules.map((module, index) => {

              const isLocked =
                !user || !module.unlocked;

               const completed = module.completed ?? 0;

const percent = Math.round(
  (completed / module.lessons) * 100
);

const isCompleted = percent >= 100;

const isInProgress =
  percent > 0 && percent < 100;

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!user) {
                      handleGuestAlert();
                    } else if (
                      user &&
                      !module.unlocked
                    ) {
                      handleLockedModule(
  module.title,
  index
);
                    }
                  }}
                  className={`rounded-3xl border p-6 shadow-sm transition hover:shadow-md ${
  isCompleted
    ? "border-yellow-300 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"
    : isInProgress
    ? "border-red-500 bg-gradient-to-br from-red-50 via-white to-red-50"
    : "border-slate-200 bg-white"
}`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-4">
                      <div className="text-4xl">
                        {module.icon}
                      </div>

                      <div>
                        <h3
                          className={`text-2xl font-bold transition ${
  isCompleted
    ? "text-yellow-700"
    : isInProgress
    ? "text-red-700"
    : module.unlocked
    ? "text-[#0d1333] hover:text-red-600"
    : "text-slate-500"
}`}
                        >
                          {module.title}
                        </h3>

                        <p className="mt-2 text-base leading-7 text-slate-800">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    {isLocked && (
                      <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                        <Lock size={12} />
                        Terkunci
                      </div>
                    )}
                  </div>

                  {isCompleted && (
  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text- font-semibold text-yellow-700">
    🏆 Selesai
  </div>
)}

{isInProgress && (
  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
    📖 Sedang Dipelajari
  </div>
)}

                  <div className="mt-8 flex items-center justify-between text-sm font-semibold text-slate-500">
                    <span>
  {module.completed} / {module.lessons} pelajaran
</span>

                    <span>
                      {percent}%
                    </span>
                  </div>

                  <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
  isCompleted
    ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600"
    : isInProgress
    ? "bg-gradient-to-r from-red-500 to-red-700"
    : "bg-slate-400"
}`}
                      style={{
                        width: `${percent}%`,
                      }}
                    ></div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">

                    <div className="flex gap-2">
                      {Array.from({
                        length:
                          module.lessons,
                      }).map(
                        (_, idx) => (
                          <div
  key={idx}
  className={`h-2 w-2 rounded-full ${
  isCompleted
    ? "bg-yellow-500"
    : isInProgress
    ? "bg-red-500"
    : "bg-slate-300"
}`}
/>
                        )
                      )}
                    </div>

                    {module.unlocked &&
                    user ? (
                      <Link
                        href={
                          module.href || "#"
                        }
                        className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
                      >
                        Lanjutkan
                        <ChevronRight size={16} />
                      </Link>
                    ) : (
                      <button className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                        Lihat Detail
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* HUBUNGI PASTOR */}
  {/* HUBUNGI PASTOR */}
<div
  id="hubungi-pastor"
  className="relative mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md"
>

  {/* decorative background blur */}
  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#9333ea] opacity-10 blur-3xl" />
  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#9333ea] opacity-10 blur-3xl" />

  <div className="relative p-6 md:p-10">

    {/* HEADER ICON */}
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
        <Mail className="text-[#E53935]" size={28} />
      </div>

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d1333]">
        {isPastor
          ? "Pesan Masuk dari Umat"
          : "Hubungi Pastor Pendamping"}
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-2 text-xl text-slate-900">
        {isPastor
          ? "Kelola dan tanggapi pesan umat seputar Bahasa Latin Gerejawi"
          : "Ada pertanyaan seputar Bahsa Latin Gerejawi? Pastor siap membantu anda!"}
      </p>
    </div>

    {/* NOT LOGIN */}
    {!user ? (
      <div className="mt-8 mx-auto max-w-md text-center rounded-2xl border bg-slate-50 p-6">
        <p className="text-slate-800 text-lg md:text-lg">
          Silakan login terlebih dahulu untuk memulai percakapan dengan pastor.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 font-semibold text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
        >
          <GraduationCap size={18} />
          Login / Daftar
        </Link>
      </div>
    ) : (

      /* LOGGED IN */
      <div className="mt-10 flex flex-col items-center gap-6">

        <p className="text-red-700 text-xl text-center">
          {isPastor
            ? "Silakan tanggapi pesan umat dengan menekan tombol dibawah ini"
            : "Klik tombol di bawah untuk memilih pastor dan memulai percakapan pribadi"}
        </p>

        {/* BUTTON */}
        {isPastor ? (
          <Link
            href="/pastor/chat"
            className="w-full max-w-xl rounded-2xl bg-red-600 px-6 py-4 text-center font-bold text-white shadow-lg transition hover:scale-[1.02]"
          >
            Kelola Pesan Umat
          </Link>
        ) : (
          <Link href="/pilih-pastor" className="group relative w-full max-w-xl">

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-center font-bold text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] active:scale-[0.98]">

              {/* shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition duration-700" />

              <div className="relative flex items-center justify-center gap-2 text-lg">
                ✉ Mulai Konsultasi Sekarang
              </div>

            </div>
          </Link>
        )}

        {/* FOOTER NOTE */}
        <p className="text-lg text-slate-900">
          {isPastor
            ? "Terima kasih sudah mau membantu umat Pastor"
            : "Mohon bersabar dalam menunggu respon Pastor"}
        </p>

      </div>
    )}
  </div>
</div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="mt-14 text-center text-lg leading-9 text-slate-500">
        <p>
          © 2026 Latin Gerejawi. Ad Maiorem Dei
          Gloriam.
        </p>

        <p>
          Untuk Kemuliaan Tuhan - Belajar Bahasa
          Latin Gereja Katolik
        </p>
      </div>

{lockedModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">

    <div className="w-[90%] max-w-md rounded-3xl bg-white p-7 shadow-2xl">

      <div className="text-center">

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <Lock className="text-red-600" size={40} />
        </div>

        <h2 className="text-3xl font-bold text-[#0d1333]">
          Modul Terkunci
        </h2>

        <p className="mt-2 break-words whitespace-pre-line text-xl text-slate-900">
  {lockedMessage}
</p>

      </div>

      <button
        onClick={() => setLockedModal(false)}
        className="mt-8 w-full rounded-xl bg-red-600 py-3 text-lg font-semibold text-white transition hover:bg-red-700"
      >
        Mengerti
      </button>

    </div>

  </div>
)}



    </main>
  );
}