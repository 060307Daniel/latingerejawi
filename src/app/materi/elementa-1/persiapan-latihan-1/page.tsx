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

export default function PersiapanHurufMatiPage() {


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
       {/* HERO */}
<Card className="rounded-3xl border-0 shadow-lg">
  <CardContent className="p-8 lg:p-12">

    <div className="text-center">

      <div className="mb-5 text-7xl">
        📖
      </div>

      <h1 className="text-4xl font-black text-[#0d1333] lg:text-5xl">
        Latihan 1: Huruf Mati
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-2xl leading-8 text-slate-900">
        Latihan ini untuk membantu Anda melatih pemahaman kata-kata dalam konsep <strong>Huruf Mati</strong> sebelum mengikuti quiz.
      </p>

    </div>

  </CardContent>
</Card>


{/* TUJUAN PEMBELAJARAN */}
<Card className="mt-8 rounded-3xl">
  <CardContent className="p-8">

    <div className="flex items-center gap-3">
      <BookOpen className="h-8 w-8 text-blue-600" />

      <h2 className="text-3xl font-bold text-[#0d1333]">
        Tujuan Pembelajaran
      </h2>
    </div>

    <p className="mt-5 text-2xl leading-8 text-slate-700">
      Berdasarkan latihan ini, Anda akan berlatih untuk mencapai
      kemampuan berikut:
    </p>

    <div className="mt-8 space-y-5">

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-2xl font-bold text-[#0d1333]">
          Mampu Mengidentifikasi Huruf Mati dalam Latin Gerejawi
        </h3>

        <p className="mt-3 text-xl leading-8 text-slate-700">
          Mengidentifikasi aturan pelafalan Huruf Mati  yang benar dalam Latin Gerejawi.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-2xl font-bold text-[#0d1333]">
          Pemahaman Konsep Huruf Mati
        </h3>

        <p className="mt-3 text-xl leading-8 text-slate-700">
          Memahami konsep aturan pelafalan Huruf Mati yang benar dalam Latin Gerejawi
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-2xl font-bold text-[#0d1333]">
          Penerapan Konsep Huruf Mati
        </h3>

        <p className="mt-3 text-xl leading-8 text-slate-700">
          Menggunakan aturan pelafalan yang benar ketika menghadapi kata yang mempunyai Huruf Mati 
        </p>
      </div>

    </div>

  </CardContent>
</Card>


{/* INFO LATIHAN */}
<Card className="mt-8 rounded-3xl">
  <CardContent className="p-8">

    <div className="flex items-center gap-3">
      <FileQuestion className="h-8 w-8 text-red-600" />

      <h2 className="text-3xl font-bold text-[#0d1333]">
        Informasi Latihan
      </h2>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-2">

      <div className="rounded-2xl bg-white p-5">
        <p className="text-xl text-slate-600">
          Total Soal
        </p>

        <p className="text-2xl font-bold text-[#0d1333]">
          4 Nomor
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5">
        <p className="text-xl text-slate-600">
          Waktu per Soal
        </p>

        <p className="text-2xl font-bold text-[#0d1333]">
          30 Detik
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5">
        <p className="text-xl text-slate-600">
          Pengacakan Soal
        </p>

        <p className="text-2xl font-bold text-[#0d1333]">
          Ya
        </p>
      </div>

      
      <div className="rounded-2xl bg-white p-5">
        <p className="text-xl text-slate-600">
          Kelulusan
        </p>

        <p className="text-2xl font-bold text-[#0d1333]">
          Tidak Ada
        </p>
      </div>

    </div>

  </CardContent>
</Card>


{/* PESAN */}
<Card className="mt-8 rounded-3xl border-yellow-300 bg-yellow-50">
  <CardContent className="p-8 text-center">

    <div className="text-5xl">
      🎯
    </div>

    <h3 className="mt-4 text-3xl font-bold text-yellow-800">
      Siap Untuk Berlatih?
    </h3>

    <p className="mt-3 text-xl leading-8 text-yellow-900">
      Latihan ini <strong>dapat diulang berkali-kali</strong> untuk membantu memperkuat
    </p>

     <p className="text-xl leading-8 text-yellow-900">
      pemahaman dan pelafalan konsep Huruf Mati. 
    </p>

    <p className="mt-3 text-xl leading-8 text-yellow-900">
        <strong>Soal-soal latihan selalu diacak kembali dari Bank Soal yang ada.</strong>
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
            <Link href="/materi/elementa-1/pengenalan-huruf-ti">
              Kembali ke Materi
            </Link>
          </Button>

          <Button
  asChild
  className="h-14 rounded-2xl bg-red-600 px-10 text-lg hover:bg-red-700"
>
  <Link href="/materi/elementa-1/latihan-1-huruf-mati">
    Mulai Latihan 1: Huruf Mati
  </Link>
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


    </main>
  );
}