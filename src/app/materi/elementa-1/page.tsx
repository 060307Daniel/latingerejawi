"use client";

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
  const totalLessons = 5;
  const completedLessons = 0;
  const progress = 0;

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
              className="h-full rounded-full bg-red-600 transition-all duration-500"
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

        {/* CARD PROGRESS */}
        <ElementaProgressCard
          totalLessons={totalLessons}
          completedLessons={completedLessons}
          progress={progress}
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
            duration="20 menit"
            type="lesson"
            href="/materi/elementa-1/pengenalan-huruf-mati"
          />

          <LessonItem
            number={2}
            title="Latihan 1: Huruf Mati"
            duration="10 menit"
            type="practice"
            locked
          />

          <LessonItem
            number={3}
            title="Pengenalan Huruf Hidup"
            duration="15 menit"
            type="lesson"
            locked
          />

          <LessonItem
            number={4}
            title="Latihan 2: Huruf Hidup"
            duration="10 menit"
            type="practice"
            locked
          />

          <LessonItem
            number={5}
            title="Quiz: Huruf Mati dan Huruf Hidup"
            duration="15 menit"
            type="quiz"
            locked
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
    </main>
  );
}