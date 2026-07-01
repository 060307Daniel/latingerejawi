"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  Home,
  GraduationCap,
  BookText,
  ClipboardCheck,
  Clock3,
  FileQuestion,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PersiapanQuiz1TandaSalibPage() {

  const [showStartWarning, setShowStartWarning] = useState(false);

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

      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-10 lg:px-6">

        {/* BACK */}
        <Link
          href="/materi/elementa-1"
          className="mb-8 inline-flex items-center gap-2 text-base font-semibold text-[#0d1333]"
        >
          <ArrowLeft size={18} />
          Kembali ke Halaman Modul
        </Link>

        {/* HERO */}
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-8 lg:p-12">

            <div className="text-center">

              <div className="mb-5 text-7xl">
                📚
              </div>

              <h1 className="text-4xl font-black text-[#0d1333] lg:text-5xl">
                Quiz 1: Huruf Mati
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-slate-900">
                Quiz ini bertujuan untuk mengukur pemahaman Anda mengenai
                materi <strong>Huruf Mati</strong> yang
                telah dipelajari sebelumnya.
              </p>

            </div>

          </CardContent>
        </Card>

        {/* PERSIAPAN */}
        <Card className="mt-8 rounded-3xl">
          <CardContent className="p-8">

            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-8 w-8 text-green-600" />
              <h2 className="text-3xl font-bold text-[#0d1333]">
                Sebelum Memulai Quiz
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-xl text-slate-700">

              <p>✓ Sudah mempelajari materi Pengenalan Huruf Mati.</p>

              <p>✓ Sudah menyelesaikan Latihan 1: Huruf Mati.</p>

              <p>✓ Berada di tempat yang tenang agar dapat berkonsentrasi.</p>

            </div>

          </CardContent>
        </Card>

        {/* INFO QUIZ */}
        <Card className="mt-8 rounded-3xl">
          <CardContent className="p-8">

             <div className="flex items-center gap-3">
        <FileQuestion className="h-8 w-8 text-red-600" />

        <h2 className="text-3xl font-bold text-[#0d1333]">
          Informasi Quiz
        </h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-white p-5">
          <p className="text-xl text-slate-600">
            Materi
          </p>

          <p className="text-2xl font-bold text-[#0d1333]">
            Pengenalan Huruf Mati
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <p className="text-xl text-slate-600">
            Total Soal
          </p>

          <p className="text-2xl font-bold text-[#0d1333]">
            10 Nomor
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <p className="text-xl text-slate-600">
            Pilihan Ganda
          </p>

          <p className="text-2xl font-bold text-[#0d1333]">
            7 Nomor
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <p className="text-xl text-slate-600">
            Nilai Kelulusan
          </p>

          <p className="text-2xl font-bold text-[#0d1333]">
            80-100
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <p className="text-xl text-slate-600">
            Waktu
          </p>

          <p className="text-2xl font-bold text-[#0d1333]">
            10 Menit
          </p>
        </div>

      </div>

          </CardContent>
        </Card>

        {/* PESAN */}
        <Card className="mt-8 rounded-3xl border-yellow-300 bg-yellow-50">
          <CardContent className="p-8 text-center">

            <div className="text-5xl">
              ⏳
            </div>

            <h3 className="mt-4 text-2xl font-bold text-yellow-800">
              Pastikan Anda Sudah Siap
            </h3>

            <p className="mt-3 text-xl leading-8 text-yellow-900">
              Setelah menekan tombol <strong>Mulai Quiz</strong>,
              Anda akan langsung diarahkan ke quiz. 
            </p>

            <p className="mt-3 text-lg leading-8 text-yellow-900">
              "Datanglah, ya Roh Kudus, penuhi hati umat-Mu, dan nyalakanlah api cinta-Mu di dalam kami.
            </p>

              <p className="text-lg leading-8 text-yellow-900">
              Utuslah Roh-Mu, maka kami akan diciptakan kembali, dan Engkau akan membaharui muka bumi. Amin."
            </p>


          </CardContent>
        </Card>

        {/* BUTTON */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <Button
            asChild
            variant="outline"
            className="h-14 rounded-2xl px-10 text-lg"
          >
            <Link href="/materi/elementa-1/latihan-1-huruf-hidup">
              Kembali ke Latihan
            </Link>
          </Button>

          <Button
  className="h-14 rounded-2xl bg-red-600 px-10 text-lg hover:bg-red-700"
  onClick={() => setShowStartWarning(true)}
>
  Mulai Quiz
</Button>

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

      {showStartWarning && (
  <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 px-4 py-6">

    <div className="flex min-h-full items-center justify-center">

      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
        <CardContent className="p-5 sm:p-8 lg:p-10">

          {/* ICON */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-3xl sm:text-4xl">⚠️</span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-[#0d1333]">
              Mohon Perhatiannya
            </h2>

            <p className="mt-2 text-base sm:text-lg lg:text-xl text-slate-700">
              Anda akan memulai <strong>Quiz 1: Huruf Mati</strong>
            </p>
          </div>

          {/* WARNING BOX */}
          <div className="mt-8 rounded-3xl border border-red-300 bg-red-50 p-6">

            <h3 className="text-2xl font-bold text-red-600">
              Sebelum melanjutkan:
            </h3>

            <div className="mt-4 space-y-4">

              <div className="flex items-start gap-3">
                <span className="text-xl">•</span>

                <p className="text-xl font-medium text-red-600">
                  Quiz memiliki <strong>3 kali kesempatan.</strong> Jika pada kesempatan ketiga masih belum lulus,
                  anda harus <strong>menunggu 30 Menit</strong> sebelum kesempatan selanjutnya.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">•</span>

                <p className="text-xl font-medium text-red-600">
                  Jangan menekan tombol <strong>Kembali (Back)</strong>,
                  menutup tab, atau me-refresh halaman selama quiz berlangsung.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">•</span>

                <p className="text-xl font-medium text-red-600">
                  Keluar dari halaman quiz dapat menyebabkan progres dan
                  jawaban yang sedang dikerjakan tidak tersimpan.
                </p>
              </div>

            </div>
          </div>

          {/* QUESTION */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0d1333]">
              Apakah Anda siap memulai quiz?
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">

            <Button
              variant="outline"
              className="h-12 sm:h-14 rounded-2xl px-6 sm:px-8 text-sm sm:text-lg font-bold"
              onClick={() => setShowStartWarning(false)}
            >
              Belum Siap
            </Button>

            <Button
              className="h-12 sm:h-14 rounded-2xl bg-red-600 px-6 sm:px-8 text-sm sm:text-lg font-bold hover:bg-red-700"
              onClick={() => {
                window.location.href =
                  "/materi/elementa-1/quiz-1-huruf-mati";
              }}
            >
              Ya, Mulai Quiz
            </Button>

          </div>

        </CardContent>
      </Card>

    </div>

  </div>
)}

    </main>
  );
}