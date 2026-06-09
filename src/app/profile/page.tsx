"use client";

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

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

        {/* PROGRESS */}
        <div className="mx-auto max-w-7xl px-4 pb-4 lg:px-6">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>Progress Pembelajaran</span>

            <span>0 / 21 pelajaran</span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-200">
            <div className="h-3 w-[0%] rounded-full bg-[#16233f]" />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        {/* BACK */}
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-[#111827]"
        >
          <ArrowLeft size={22} />
          Kembali ke Dashboard
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
        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 xl:col-span-2">
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
                <div className="mb-3 flex items-center justify-between text-lg font-semibold">
                  <span>Pelajaran Selesai</span>

                  <span>0 / 21</span>
                </div>

                <div className="h-4 w-full rounded-full bg-slate-200">
                  <div className="h-4 w-[0%] rounded-full bg-[#16233f]" />
                </div>

                <p className="mt-3 text-slate-400">
                  0.0% dari total pembelajaran
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
                    0
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
                    0
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
                    0%
                  </h4>

                  <p className="mt-2 text-lg text-slate-500">
                    Nilai Rata-rata
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* ACHIEVEMENT */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0f172a]">
                Pencapaian
              </h3>

              <div className="flex flex-col items-center py-16 text-center">
                <Award
                  className="text-slate-300"
                  size={70}
                />

                <p className="mt-6 text-xl text-slate-400">
                  Belum ada pencapaian.
                </p>

                <p className="text-xl text-slate-400">
                  Mulai belajar sekarang!
                </p>
              </div>
            </div>

            {/* AKTIVITAS */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0f172a]">
                Aktivitas Terkini
              </h3>

              <p className="mt-8 text-lg text-slate-400">
                Belum ada aktivitas pembelajaran
              </p>

              <button className="mt-8 h-14 w-full rounded-2xl border text-lg font-semibold transition hover:bg-slate-50">
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