"use client";

import { useEffect, useState } from "react";
import { transformProgress } from "@/lib/progress/transform-progress";
import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  Home,
  GraduationCap,
  BookText,
} from "lucide-react";

import ElementaProgressCard from "@/components/ElementaProgressCard";
import LessonItem from "@/components/LessonItem";

export default function Elementa1Page() {

const [user, setUser] = useState<any>(null);
const [progressData, setProgressData] = useState<Record<string, string[]>>({});

const [lockedModal, setLockedModal] = useState(false);
const [lockedMessage, setLockedMessage] = useState("");

const completed = progressData["elementa-1"] || [];
console.log(completed);

  const completedLessons =
  progressData["elementa-1"]?.length || 0;

const totalLessons = 6;

const progress =
  totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

const isModuleCompleted = progress >= 100;

    
useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log("USER:", data);

    setUser(data);

    if (data?.id) {
  const progressRes = await fetch(
    `/api/progress?userId=${data.id}`
  );

  const progress = await progressRes.json();

  console.log("RAW PROGRESS:", progress);

  const formatted = transformProgress(progress);

  console.log("FORMATTED:", formatted);

  setProgressData(formatted);
}
  };

  fetchUser();
}, []);

const isUnlocked = (index: number) => {
  if (index === 0) return true;
  return completed.length >= index;
};

const lessonTitles = [
  "Pengenalan Huruf Mati",
  "Latihan 1: Huruf Mati",
  "Quiz 1: Huruf Mati",
  "Pengenalan Huruf Hidup",
  "Latihan 2: Huruf Hidup",
  "Quiz 2: Huruf Hidup",
];

const handleLessonClick = (index: number) => {
  if (isUnlocked(index)) return;

  const prevLesson = lessonTitles[index - 1];

  setLockedMessage(
    `Materi ini masih terkunci. Selesaikan materi sebelum "${prevLesson}" terlebih dahulu.`
  );

  setLockedModal(true);
};


  return (
    <main className="min-h-screen bg-[#f5f7fb]">

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
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
            >
              <BookText size={20} />
              Glosarium
            </Link>

            <Link
              href="/profile"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
            >
              <GraduationCap size={20} />
              Profil
            </Link>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mx-auto max-w-7xl px-4 pb-5 lg:px-6">

          <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>Progress Pembelajaran</span>

            <span>
              {completedLessons} / {totalLessons} pelajaran
            </span>
          </div>

          <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-slate-200">

            <div
  className={`h-full rounded-full transition-all duration-500 ${
    isModuleCompleted
      ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600"
      : "bg-red-600"
  }`}
  style={{
    width: `${progress}%`,
  }}
/>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">

        {/* BACK */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-base font-semibold text-[#0d1333]"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>

            {isModuleCompleted && (
  <div className="mb-8 rounded-3xl border border-yellow-300 bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-100 p-6 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="text-5xl">
        🏆
      </div>

      <div>
        <h2 className="text-2xl font-bold text-yellow-800">
          Modul Elementa Selesai
        </h2>

        <p className="mt-1 text-yellow-700">
          Selamat! Anda telah menyelesaikan seluruh materi dalam modul ini.
        </p>
      </div>
    </div>
  </div>
)}

        {/* CARD PROGRESS */}
        <ElementaProgressCard
  totalLessons={totalLessons}
  completedLessons={completedLessons}
  progress={progress}
  completed={isModuleCompleted}
/>

        {/* TITLE */}
        <h2 className="mt-10 text-3xl font-bold text-[#0d1333] lg:text-5xl">
          Pelajaran
        </h2>

        <p className="mt-3 text-base text-slate-500 lg:text-lg">
          Ikuti seluruh materi secara berurutan untuk membuka pelajaran berikutnya.
        </p>

        {/* LIST */}
        <div className="mt-8 space-y-6">

  <LessonItem
  number={1}
  title="Pengenalan Huruf Mati"
  duration="15 menit"
  type="lesson"
  href="/materi/elementa-1/pengenalan-huruf-mati"
  locked={!isUnlocked(0)}
  onLockedClick={() => handleLessonClick(0)}
/>

  <LessonItem
  number={2}
  title="Latihan 1: Huruf Mati"
  duration="10 menit"
  type="practice"
  href="/materi/elementa-1/persiapan-latihan-1"
  locked={!isUnlocked(1)}
  onLockedClick={() => handleLessonClick(1)}
/>

  <LessonItem
  number={3}
  title="Quiz 1: Huruf Mati"
  duration="15 menit"
  type="quiz"
  href="/materi/elementa-1/persiapan-quiz-1"
  locked={!isUnlocked(2)}
  onLockedClick={() => handleLessonClick(2)}
/>

  <LessonItem
  number={4}
  title="Pengenalan Huruf Hidup"
  duration="15 menit"
  type="lesson"
  href="/materi/elementa-1/pengenalan-huruf-hidup"
  locked={!isUnlocked(3)}
  onLockedClick={() => handleLessonClick(3)}
/>

  <LessonItem
  number={5}
  title="Latihan 2: Huruf Hidup"
  duration="10 menit"
  type="practice"
  href="/materi/elementa-1/latihan-2-huruf-hidup"
  locked={!isUnlocked(4)}
  onLockedClick={() => handleLessonClick(4)}
/>

  <LessonItem
  number={6}
  title="Quiz 2: Huruf Hidup"
  duration="15 menit"
  type="quiz"
   href="/materi/elementa-1/quiz-2-huruf-hidup"
  locked={!isUnlocked(5)}
  onLockedClick={() => handleLessonClick(5)}
/>

</div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t py-10 text-center text-slate-500">

        <p>
          © 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.
        </p>

        <p className="mt-2">
          Untuk Kemuliaan Tuhan - Belajar Bahasa Latin Gereja Katolik
        </p>
      </footer>

{lockedModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
    
    <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
      
      <h2 className="text-xl font-bold text-[#0d1333]">
        Materi Terkunci
      </h2>

      <p className="mt-3 text-slate-900">
        {lockedMessage}
      </p>

      <button
        className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white"
        onClick={() => setLockedModal(false)}
      >
        Mengerti
      </button>

    </div>
  </div>
)}

    </main>
  );
}