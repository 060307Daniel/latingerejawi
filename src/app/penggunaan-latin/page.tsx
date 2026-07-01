"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, ArrowLeft, GraduationCap } from "lucide-react";

export default function PenggunaanLatinPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] pb-10">

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">

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

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end lg:w-auto lg:gap-4">

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg"
            >
              <Home size={20} />
              Beranda
            </Link>

        <Link
              href="/glosarium"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg"
            >
              Glosarium
            </Link>

            <Link
              href="/profile"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg"
            >
              <GraduationCap size={20} />
              Profil
            </Link>

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="px-10 py-12">

        {/* BACK BUTTON */}
        <div className="mx-auto max-w-4xl mb-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold text-[#111827]"
          >
            <ArrowLeft size={22} />
            Kembali ke Halaman Utama
          </Link>
        </div>

        {/* TITLE */}
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-[#030326]">
            Penggunaan Bahasa Latin dalam Gereja
          </h1>
        </div>

        {/* ARTICLE */}
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white p-8 shadow-md">

          <h2 className="text-3xl font-bold mb-4">
            Kapan kita menggunakan Bahasa Latin?
          </h2>

          <p className="text-lg leading-9 text-gray-700">
            Bahasa Latin Gerejawi digunakan dalam berbagai aspek kehidupan
            liturgi Gereja Katolik. Salah satu yang paling dikenal adalah
            Misa Tridentina, yaitu bentuk liturgi tradisional yang sepenuhnya
            menggunakan bahasa Latin.
          </p>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Selain itu, Latin juga digunakan dalam doa-doa resmi Gereja seperti
            Rosario dalam bentuk tradisional, Liturgi Jam (Liturgy of the Hours),
            serta berbagai nyanyian Gregorian yang menjadi warisan musik suci
            Gereja Katolik.
          </p>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Dokumen-dokumen Kepausan seperti ensiklik, dekret, dan teks resmi
            Vatikan juga secara tradisional ditulis dalam bahasa Latin sebelum
            diterjemahkan ke berbagai bahasa modern.
          </p>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Mempelajari bahasa Latin membantu umat memahami kedalaman tradisi
            liturgi Gereja, sekaligus memperkaya pengalaman spiritual karena
            banyak istilah teologis memiliki makna yang lebih dalam dalam
            bahasa aslinya.
          </p>

          {/* SOURCE SECTION */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold text-[#030326]">
              Sumber Bacaan:
            </h3>

            <ul className="mt-4 space-y-3 text-base text-blue-600 underline">
              <li>
                <a href="https://www.vatican.va" target="_blank">
                  Vatican.va – Dokumen Liturgi Gereja
                </a>
              </li>

              <li>
                <a href="https://www.catholic.com" target="_blank">
                  Catholic.com – Penjelasan Misa Latin
                </a>
              </li>

              <li>
                <a href="https://www.newadvent.org" target="_blank">
                  New Advent – Liturgical History
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-16 text-center text-base leading-8 text-slate-500">
        <p>© 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.</p>
        <p>Untuk Kemuliaan Tuhan - Belajar Bahasa Latin Gereja Katolik</p>
      </div>

    </main>
  );
}