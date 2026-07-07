"use client";

import { transformProgress } from "@/lib/progress/transform-progress";
import { calculateModuleProgress } from "@/lib/progress-engine";
import { COURSE_STRUCTURE, ModuleSlug } from "@/lib/course-structure";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Home,
  GraduationCap,
  ArrowLeft,
  User,
  Mail,
  Church,
  MapPin,
  BookText,
  Award,
  TrendingUp,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [progressData, setProgressData] = useState<Record<string, string[]>>({});
  const [passedQuizCount, setPassedQuizCount] = useState(0);

  const fetchProgress = async (userId: string) => {
    try {
      const res = await fetch(`/api/progress?userId=${userId}`);
      const progress = await res.json();

      const formatted = transformProgress(progress);
      setProgressData(formatted);

      const quizCount = progress.filter((item: any) =>
        item.lessonSlug.startsWith("quiz-")
      ).length;

      setPassedQuizCount(quizCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      if (parsed?.id) {
        fetchProgress(parsed.id);
      }
    }
  }, []);

  const totalLessons = Object.values(COURSE_STRUCTURE).flat().length;

  const totalCompletedLessons = Object.values(progressData).flat().length;

  const totalProgress =
    totalLessons > 0
      ? Math.round((totalCompletedLessons / totalLessons) * 100)
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };


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

            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg">
              <GraduationCap size={20} />
              Profil
            </button>
          </div>
        </div>

        {/* PROGRESS 
       <span>
  {totalCompletedLessons} / {totalLessons} pelajaran
</span>

<div className="h-3 w-full rounded-full bg-slate-200">
  <div
    className="h-3 rounded-full bg-[#16233f]"
    style={{ width: `${totalProgress}%` }}
  />
</div>*/}
      </header>

      {/* CONTENT */}
      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        {/* BACK */}
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-[#111827]"
        >
          <ArrowLeft size={22} />
          Kembali ke Halaman Utama
        </Link>

        {/* TITLE */}
        <div className="mt-8">
          <h2 className="text-4xl font-bold text-[#0f172a]">
            Profil Saya
          </h2>

          <p className="mt-2 text-xl text-slate-500">
            Kelola informasi profil dan lihat
            progress pembelajaran Anda
          </p>
        </div>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-4">
          {/* LEFT */}
          <div className="space-y-6 xl:col-span-3">
            {/* PROFILE CARD */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-[#0f172a]">
                <User size={24} />
                Informasi Pribadi
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* NAMA */}
                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={18} />
                    <span className="font-semibold">
                      Nama Lengkap
                    </span>
                  </div>

                  <p className="mt-2 text-2xl text-[#0f172a]">
                    {user?.name}
                  </p>
                </div>

                {/* EMAIL */}
                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail size={18} />
                    <span className="font-semibold">
                      Email
                    </span>
                  </div>

                  <p className="mt-2 text-2xl text-[#0f172a]">
                    {user?.email}
                  </p>
                </div>

                {/* PAROKI */}
                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Church size={18} />
                    <span className="font-semibold">
                      Paroki
                    </span>
                  </div>

                  <p className="mt-2 text-2xl text-[#0f172a]">
                    {user?.paroki}
                  </p>
                </div>

                {/* WR */}
                <div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={18} />
                    <span className="font-semibold">
                      Wilayah Rohani
                    </span>
                  </div>

                  <p className="mt-2 text-2xl text-[#0f172a]">
                    {user?.wilayah}
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold">
                  Pengguna
                </div>

                <button
                  onClick={() =>
                    setShowLogoutModal(true)
                  }
                  className="flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700"
                >
                  <LogOut size={20} />
                  Keluar
                </button>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-[#0f172a]">
                <BookText size={24} />
                Progress Pembelajaran
              </h3>

              <div className="mt-8">
  <div className="flex justify-between">
    <span>Pelajaran Selesai</span>
    <span>
      {totalCompletedLessons} / {totalLessons}
    </span>
  </div>

  <div className="h-4 w-full rounded-full bg-slate-200 mt-3">
    <div
      className="h-4 rounded-full bg-[#dc2626]"
      style={{ width: `${totalProgress}%` }}
    />
  </div>

  <p className="mt-3 text-slate-400">
    {totalProgress}% dari total pembelajaran
  </p>
</div>

              {/* STATS */}
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* CARD */}
                <div className="rounded-2xl bg-[#eef4ff] p-6 text-center">
                  <BookText
                    className="mx-auto text-blue-600"
                    size={30}
                  />

                <h4 className="mt-3 text-4xl font-bold text-[#0f172a]">
  {totalCompletedLessons}
</h4>

                  <p className="mt-2 text-lg text-slate-500">
                    Pelajaran
                  </p>
                </div>

                {/* CARD */}
                <div className="rounded-2xl bg-[#eefcf1] p-6 text-center">
                  <Award
                    className="mx-auto text-green-600"
                    size={30}
                  />

              <h4 className="mt-3 text-4xl font-bold text-[#0f172a]">
  {passedQuizCount}
</h4>

                  <p className="mt-2 text-lg text-slate-500">
                    Kuis Selesai
                  </p>
                </div>

                {/* CARD */}
                <div className="rounded-2xl bg-[#faf5ff] p-6 text-center">
                  <TrendingUp
                    className="mx-auto text-purple-600"
                    size={30}
                  />

             <h4 className="mt-3 text-4xl font-bold text-[#0f172a]">
  {totalProgress}%
</h4>
 <p className="mt-2 text-lg text-slate-500">
                    Progress Anda
                  </p>
                </div>
              </div>
            </div>
          </div>

         {/* RIGHT */}
<div className="space-y-6">

  {/* PENCAPAIAN + BUTTONS */}
  <div className="rounded-3xl border bg-white p-6 shadow-sm">
    <h3 className="text-center text-2xl font-bold text-[#0f172a]">
      SERTIFIKAT PENYELESAIAN
    </h3>
    
      <p className="mt-3  text-center text-lg text-slate-900">
        Tombol sertifikat akan muncul jika semua kursus telah selesai
      </p>

      {/* BUTTON DOWNLOAD SERTIFIKAT (hanya jika 100%) */}
      {totalProgress === 100 && (
        <button
          onClick={async () => {
            const token = localStorage.getItem("token");
            if (!token) return alert("Silakan login");

            const res = await fetch("/api/certificate/me", {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) return alert("Gagal mengambil sertifikat");

            const userData = await res.json();

            if (!userData?.name) {
              return alert("Nama user tidak ditemukan");
            }

            const { generateCertificate } = await import(
              "@/lib/generate-certificate"
            );

            await generateCertificate({
  userName: userData.name,
  certificateDate: userData.certificateIssuedAt,
  pastorName: userData.pastorName,
  pastorTitle: userData.pastorTitle,
  parishLogo: userData.parishLogo,
});
          }}
          className="mt-6 h-12 w-full rounded-2xl bg-yellow-500 font-bold text-black hover:bg-yellow-600 transition"
        >
          🏆 Download Sertifikat
        </button>
      )}

      {/* BUTTON LANJUT BELAJAR */}
      <button
        className="mt-4 h-12 w-full rounded-2xl border text-lg font-semibold transition hover:bg-slate-50"
      >
        Lanjutkan Belajar
      </button>
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

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8">
            <h3 className="text-3xl font-bold text-[#0f172a]">
              Konfirmasi Keluar
            </h3>

            <p className="mt-4 text-lg text-slate-500">
              Apakah anda yakin ingin keluar?
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() =>
                  setShowLogoutModal(false)
                }
                className="h-14 flex-1 rounded-2xl border text-lg font-semibold"
              >
                Tidak
              </button>

              <button
                onClick={handleLogout}
                className="h-14 flex-1 rounded-2xl bg-red-600 text-lg font-semibold text-white"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}