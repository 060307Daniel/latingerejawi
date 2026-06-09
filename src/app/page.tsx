"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { transformProgress } from "@/lib/progress/transform-progress";
import { calculateModuleProgress } from "@/lib/progress-engine";
import { COURSE_STRUCTURE } from "@/lib/course-structure";

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
} from "lucide-react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] =
    useState(true);

  const [progressData, setProgressData] = useState<Record<string, string[]>>({});

  const fetchProgress = async (userId: number) => {
  try {
    const res = await fetch(
      `/api/progress?userId=${userId}`
    );

    const progress = await res.json();

    const formatted = transformProgress(progress);

    setProgressData(formatted);
  } catch (err) {
    console.log(err);
  }
};

  const getModuleProgress = (moduleSlug: string) => {
    const completed = progressData[moduleSlug] || [];
    return calculateModuleProgress(moduleSlug, completed);
  };

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

    const modules = [
  {
    title: "Elementa 1",
    description: "Pengenalan huruf mati dan huruf hidup dalam bahasa Latin Gerejawi",
    lessons: 6,
    progress: getModuleProgress("elementa-1"),
    unlocked: true,
    href: "/materi/elementa-1",
    icon: "📖",
  },

    {
      title: "Elementa 2",
      description:
        "Pengenalan dasar pengucapan dan aksen bahasa Latin",
      lessons: 4,
      progress: 0,
      unlocked: false,
      href: "#",
      icon: "✝",
    },
    {
      title: "Doa-doa Dasar",
      description:
        "Pengenalan doa-doa sederhana dalam Latin Gerejawi",
      lessons: 3,
      progress: 0,
      unlocked: false,
      href: "#",
      icon: "🙏",
    },
    {
      title: "Ordinarium Misa",
      description:
        "Penggunaan frasa liturgi dalam Gereja Katolik",
      lessons: 2,
      progress: 0,
      unlocked: false,
      href: "#",
      icon: "👼",
    },
    {
      title: "Puji Syukur",
      description:
        "Memahami dan mendalami teks Nyanyian dalam buku Puji Syukur",
      lessons: 2,
      progress: 0,
      unlocked: false,
      href: "#",
      icon: "📿",
    },
    {
      title: "Kata Umum Lainnya",
      description:
        "Bonus tambahan kata-kata yang sering digunakan dalam lingkungan gereja",
      lessons: 4,
      progress: 0,
      unlocked: false,
      href: "#",
      icon: "🎵",
    },
    {
      title: "Final Assement",
      description:
        "Uji kembali pengetahuan yang sudah dipelajari untuk mendapatkan sertifikat",
      lessons: 2,
      progress: 0,
      unlocked: false,
      href: "#",
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

  const handleLockedModule = (
    moduleName: string
  ) => {
    alert(
      `Materi ini hanya bisa diakses jika anda sudah menyelesaikan materi sebelumnya sebelum "${moduleName}".`
    );
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
        <SectionCard
          title="Salve! Dominus Vobiscum! "
          description="Selamat Datang di LatinGerejawi.com! Sebuah platform pembelajaran yang memperkenalkan bahasa Latin dalam konteks Gereja Katolik, sehingga pengguna dapat memahami doa, liturgi, dan warisan iman dengan lebih bermakna."
          icon={
            <BookText
              className="text-[#b45309]"
              size={28}
            />
          }
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-[#f1dfb0] bg-white p-7 lg:min-h-[340px] lg:p-10">

              <h3 className="text-xl font-bold text-[#b45309] lg:text-3xl">
                Sejarah Singkat
              </h3>

              <p className="mt-2 text-lg font-semibold text-[#0d1333] lg:text-2xl">
                Kenapa Bahasa Latin adalah Bahasa Gereja
              </p>

              <p className="mt-5 text-base leading-8 text-[#334155] lg:text-xl lg:leading-[45px]">
                Latin menjadi bahasa resmi Gereja Katolik sejak abad ke-4,
                menggantikan bahasa Yunani. Konsili Vatikan II (1962-1965)
                memperbolehkan penggunaan bahasa vernakular, namun Latin tetap
                menjadi bahasa resmi Gereja dan digunakan dalam dokumen-dokumen
                penting serta liturgi khusus{" "}
                <Link
                  href="/sejarah-latin"
                  className="underline text-black"
                >
                  ...selengkapnya
                </Link>
              </p>
            </div>

            <div className="rounded-2xl border border-[#f1dfb0] bg-white p-7 lg:min-h-[340px] lg:p-10">

              <h3 className="text-xl font-bold text-[#b45309] lg:text-3xl">
                Penggunaan dalam Gereja
              </h3>

              <p className="mt-2 text-lg font-semibold text-[#0d1333] lg:text-2xl">
                Kapan kita menggunakan Bahasa Latin?
              </p>

              <p className="mt-5 text-base leading-8 text-[#334155] lg:text-xl lg:leading-[45px]">
                Latin Gerejawi digunakan dalam Misa Tridentina, doa-doa resmi
                seperti Rosario dan Liturgi Jam, dokumen-dokumen Kepausan,
                dan nyanyian Gregorian. Mempelajari Latin membantu umat
                memahami kekayaan tradisi liturgi Katolik dan memperdalam
                spiritualitas mereka{" "}
                <Link
                  href="/penggunaan-latin"
                  className="underline text-black"
                >
                  ...selengkapnya
                </Link>
              </p>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 2 */}
        <div className="mt-8">
          <SectionCard
            title="Apa yang Akan Anda Dapatkan?"
            description="Platform pembelajaran Latin Gerejawi yang komprehensif dengan materi terstruktur dari dasar hingga mahir."
            borderColor="border-[#cae6d1]"
            bgColor="bg-[#eefcf1]"
            icon={
              <Trophy
                className="text-green-700"
                size={28}
              />
            }
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-[#d7ecd9] bg-white p-7 lg:min-h-[340px] lg:p-10">

                <h3 className="text-xl font-bold text-[#15803d] lg:text-3xl">
                  Materi Pembelajaran
                </h3>

                <div className="mt-6 space-y-5 text-base leading-8 text-[#334155] lg:text-xl lg:leading-[40px]">

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      📖
                    </span>

                    <p>
                      Pelajari pengucapan Bahasa Latin Gerejawi secara bertahap
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      ✍
                    </span>

                    <p>
                      Memahami tata bahasa dan kosakata dasar Latin
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      🙏
                    </span>

                    <p>
                      Belajar doa-doa Latin Gerejawi yang umum digunakan
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      🎵
                    </span>

                    <p>
                      Mengenal nyanyian Gregorian dan liturgi Gereja
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#d7ecd9] bg-white p-7 lg:min-h-[340px] lg:p-10">

                <h3 className="text-xl font-bold text-[#15803d] lg:text-3xl">
                  Benefit yang Didapat
                </h3>

                <div className="mt-6 space-y-5 text-base leading-8 text-[#334155] lg:text-xl lg:leading-[40px]">

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      ⛪
                    </span>

                    <p>
                      Memahami tradisi Gereja Katolik lebih mendalam
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      📚
                    </span>

                    <p>
                      Meningkatkan kemampuan membaca Bahasa Latin
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      🗣
                    </span>

                    <p>
                      Melatih pelafalan Latin Gerejawi dengan benar
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">
                      ✨
                    </span>

                    <p>
                      Memperkaya pengalaman spiritual dan liturgi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 3 */}
        <div className="mt-10 rounded-3xl border border-[#ead7ff] bg-[#faf5ff] p-5 lg:p-10">

          {/* HEADER */}
          <div className="mb-6 flex items-start gap-3 lg:mb-8 lg:items-center lg:gap-4">
            <div className="text-3xl text-[#9333ea]">
              🎓
            </div>

            <h2 className="text-2xl font-bold leading-tight text-[#0d1333] lg:text-5xl">
              Pastor Pendamping Anda
            </h2>
          </div>

          <p className="mb-8 text-base leading-8 text-[#64748b] lg:mb-10 lg:text-2xl">
            Tim pastor yang siap membimbing perjalanan
            pembelajaran Latin Gerejawi Anda
          </p>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            <div
              onClick={() =>
                scrollToSection(
                  "hubungi-pastor"
                )
              }
              className="cursor-pointer"
            >
              <PastorCard
                image="https://stfsp.ac.id/wp-content/uploads/2021/08/stenlyp-695x1024.jpg"
                name="Dr. Stenly Vianny Pondaag, S.S., M.Th."
                position="Dosen di Sekolah Tinggi Filsafat Seminari Pineleng"
                education={[
                  "S1 – Sekolah Tinggi Filsafat Seminari Pineleng, Manado",
                  "S2 – Universität Innsbruck, Austria",
                  "S3 – Universität Innsbruck, Austria",
                ]}
              />
            </div>

            <div
              onClick={() =>
                scrollToSection(
                  "hubungi-pastor"
                )
              }
              className="cursor-pointer"
            >
              <PastorCard
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                name="Stefanus Ardi Watuseke, Lic.Teol.Dog."
                position="Dosen di Sekolah Tinggi Filsafat Seminari Pineleng"
                education={[
                  "S1 – Sekolah Tinggi Filsafat Seminari Pineleng, Manado",
                  "S2 – Pontificia Universitas Gregoriana, Roma",
                ]}
              />
            </div>

            <div
              onClick={() =>
                scrollToSection(
                  "hubungi-pastor"
                )
              }
              className="cursor-pointer"
            >
              <PastorCard
                image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                name="Rm. Stefanus Kristofel Sondakh, Pr"
                position="Pembina Liturgi Gregorian"
                education={[
                  "S1 Filsafat – Seminari Tinggi Pineleng, Manado",
                  "S1 Teologi – Seminari Tinggi Pineleng, Manado",
                  "S2 Musik Liturgi – Pontifical Institute of Sacred Music, Roma",
                ]}
              />
            </div>
          </div>
        </div>

        {/* LANGKAH PENGGUNAAN */}
        <div className="mt-10 rounded-3xl border border-[#c7d7ff] bg-white p-5 lg:p-8">

          <h2 className="text-2xl font-bold text-[#0d1333]">
            Cara Menggunakan Aplikasi
          </h2>

          <p className="mt-2 text-base text-slate-500">
            Ikuti langkah-langkah sederhana untuk memulai pembelajaran Anda
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border-2 border-dashed border-[#93c5fd] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                <UserPlus size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0d1333]">
                Langkah 1
              </h3>

              <p className="mt-2 text-slate-500">
                Daftarkan diri Anda
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-[#86efac] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                <FolderOpen size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0d1333]">
                Langkah 2
              </h3>

              <p className="mt-2 text-slate-500">
                Pilih Modul
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-[#facc15] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]">
                <BookMarked size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0d1333]">
                Langkah 3
              </h3>

              <p className="mt-2 text-slate-500">
                Pelajari Materi
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-[#d8b4fe] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3e8ff] text-[#9333ea]">
                <ClipboardCheck size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0d1333]">
                Langkah 4
              </h3>

              <p className="mt-2 text-slate-500">
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

          <div className="mt-10 border-t pt-8">

            <h2 className="text-2xl font-bold text-[#0d1333]">
              Video Tutorial
            </h2>

            <p className="mt-2 text-base text-slate-500">
              Masih bingung? Nonton video tutorialnya saja!
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/DaeoQYkPS2Y"
                  title="Video Tutorial"
                  allowFullScreen
                />
              </div>
            </div>
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

                <h2 className="text-3xl font-bold">
                  Salve, Discipule!
                </h2>

                <p className="mt-2 text-base text-white/90">
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
                          0/8
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
                <h2 className="text-2xl font-bold text-[#0d1333]">
                  Progress Anda
                </h2>

                <p className="mt-2 text-slate-500">
                  Lacak perjalanan Anda melalui Bahasa Latin Gerejawi
                </p>

                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-600">
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
          <h2 className="mt-10 text-3xl font-bold text-[#0d1333]">
            Modul Kursus
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
                        module.title
                      );
                    }
                  }}
                  className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-4">
                      <div className="text-4xl">
                        {module.icon}
                      </div>

                      <div>
                        <h3
                          className={`text-xl font-bold transition ${
                            module.unlocked
                              ? "text-[#0d1333] hover:text-red-600"
                              : "text-slate-500"
                          }`}
                        >
                          {module.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
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

                  <div className="mt-8 flex items-center justify-between text-sm font-semibold text-slate-500">
                    <span>
                      {module.progress} / {module.lessons} pelajaran
                    </span>

                    <span>
                      {module.progress}%
                    </span>
                  </div>

                  <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-red-600 transition-all duration-500"
                      style={{
                        width: `${module.progress}%`,
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
                            className="h-2 w-2 rounded-full bg-slate-300"
                          ></div>
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
          <div
            id="hubungi-pastor"
            className="mt-10 rounded-3xl bg-white p-6 shadow-sm"
          >

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e8ff] text-[#9333ea]">
                <Mail size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#0d1333]">
                Hubungi Pastor Pendamping
              </h2>

              <p className="mt-2 text-slate-500">
                Ada pertanyaan atau butuh bimbingan?
              </p>
            </div>

            {!user ? (
              <div className="mt-8 text-center">

                <p className="text-slate-500">
                  Anda harus login terlebih dahulu untuk menghubungi Pastor Pendamping
                </p>

                <Link
                  href="/register"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#9333ea] px-6 py-3 text-white"
                >
                  <GraduationCap size={18} />
                  Login / Daftar Sekarang
                </Link>
              </div>
            ) : (
              <div className="mx-auto mt-8 max-w-3xl">

                <label className="text-sm font-semibold text-slate-700">
                  Ketik pertanyaan atau pesan anda yang ingin dikirim kepada pastor pendamping:
                </label>

                <textarea
                  rows={6}
                  placeholder="Ketik pertanyaan atau pesan anda..."
                  className="mt-3 w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-[#9333ea]"
                />

                <button className="mt-5 w-full rounded-xl bg-[#9333ea] px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90">
                  ✉ Kirim Pesan
                </button>
              </div>
            )}
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
    </main>
  );
}