"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  BookText,
  GraduationCap,
  Home,
  LogOut,
  Mail,
  MapPin,
  Search,
  User,
  Users,
} from "lucide-react";

export default function PendampingPage() {
  const [user, setUser] = useState<any>(null);

  const [activeTab, setActiveTab] =
    useState("pengguna");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("name");

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  // DUMMY USER DATABASE
  const [users] = useState([
    {
      name: "Maria Santos",
      wilayah: "WR Sta. Agnes",
      paroki: "Katedral Manado",
      progress: 65,
      kuis: 8,
      status: "Aktif",
    },
    {
      name: "Yohanes Paulus",
      wilayah: "WR St. Petrus",
      paroki: "St. Ignatius",
      progress: 42,
      kuis: 5,
      status: "Aktif",
    },
    {
      name: "Theresia Magdalena",
      wilayah: "WR Sta. Maria",
      paroki: "Hati Kudus Yesus",
      progress: 89,
      kuis: 12,
      status: "Aktif",
    },
    {
      name: "Fransiskus Xavier",
      wilayah: "WR Santo Yosef",
      paroki: "St. Yosep Pekerja",
      progress: 34,
      kuis: 3,
      status: "Aktif",
    },
    {
      name: "Katarina dari Siena",
      wilayah: "WR Sta. Katarina",
      paroki: "Ratu Rosari Suci",
      progress: 78,
      kuis: 10,
      status: "Aktif",
    },
  ]);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.name
          .toLowerCase()
          .includes(keyword) ||
        item.paroki
          .toLowerCase()
          .includes(keyword) ||
        item.wilayah
          .toLowerCase()
          .includes(keyword)
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(
          b.name
        );
      }

      if (sortBy === "wilayah") {
        return a.wilayah.localeCompare(
          b.wilayah
        );
      }

      return a.paroki.localeCompare(
        b.paroki
      );
    });

    return filtered;
  }, [search, sortBy, users]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
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

            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg">
              <GraduationCap size={20} />
              {user?.name || "Profil"}
            </button>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mx-auto max-w-7xl px-4 pb-4 lg:px-6">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>Progress Pembelajaran</p>

            <p className="font-semibold">
              0 / 21 pelajaran
            </p>
          </div>

          <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#d4d4d8]">
            <div className="h-full w-[0%] rounded-full bg-[#0f172a]" />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        {/* BACK */}
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-[#111827]"
        >
          <ArrowLeft size={22} />
          Kembali ke Dashboard
        </Link>

        {/* TITLE */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#0f172a] lg:text-6xl">
              Dashboard Admin
            </h1>

            <p className="mt-3 text-xl text-slate-500">
              Salve Pastor - Selamat Datang di
              Dashboard Pendamping
            </p>
          </div>

          <div className="rounded-full border bg-white px-5 py-2 text-sm font-semibold">
            Mode Pastor
          </div>
        </div>

        {/* STATS */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* CARD */}
          <div className="rounded-3xl border bg-white p-7">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold">
                Total Pengguna
              </h3>

              <Users className="text-slate-500" />
            </div>

            <h2 className="mt-10 text-5xl font-bold">
              {users.length}
            </h2>

            <p className="mt-3 text-lg text-slate-500">
              Terdaftar di platform
            </p>
          </div>

          {/* CARD */}
          <div className="rounded-3xl border bg-white p-7">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold">
                Pengguna Aktif
              </h3>

              <BarChart3 className="text-green-600" />
            </div>

            <h2 className="mt-10 text-5xl font-bold">
              {users.filter(
                (item) =>
                  item.status === "Aktif"
              ).length}
            </h2>

            <p className="mt-3 text-lg text-slate-500">
              Progress &gt; 20%
            </p>
          </div>

          {/* CARD */}
          <div className="rounded-3xl border bg-white p-7">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold">
                Rata-rata Progress
              </h3>

              <BarChart3 className="text-blue-600" />
            </div>

            <h2 className="mt-10 text-5xl font-bold">
              62%
            </h2>

            <p className="mt-3 text-lg text-slate-500">
              Semua pengguna
            </p>
          </div>

          {/* CARD */}
          <div className="rounded-3xl border bg-white p-7">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold">
                Total Modul
              </h3>

              <BookText className="text-red-500" />
            </div>

            <h2 className="mt-10 text-5xl font-bold">
              7
            </h2>

            <p className="mt-3 text-lg text-slate-500">
              Modul pembelajaran
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-10 flex w-fit rounded-full bg-[#f1f1f1] p-1">
          <button
            onClick={() =>
              setActiveTab("pengguna")
            }
            className={`rounded-full px-5 py-2 text-lg font-semibold transition ${
              activeTab === "pengguna"
                ? "bg-white shadow"
                : ""
            }`}
          >
            Pengguna
          </button>

          <button
            onClick={() =>
              setActiveTab("progress")
            }
            className={`rounded-full px-5 py-2 text-lg font-semibold transition ${
              activeTab === "progress"
                ? "bg-white shadow"
                : ""
            }`}
          >
            Progress
          </button>

          <button
            onClick={() =>
              setActiveTab("profil")
            }
            className={`rounded-full px-5 py-2 text-lg font-semibold transition ${
              activeTab === "profil"
                ? "bg-white shadow"
                : ""
            }`}
          >
            Profil
          </button>
        </div>

        {/* PENGGUNA */}
        {activeTab === "pengguna" && (
          <div className="mt-8 rounded-3xl border bg-white p-6 lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  Daftar Pengguna
                </h2>

                <p className="mt-2 text-xl text-slate-500">
                  Lihat semua pengguna yang
                  terdaftar di platform
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row">
                {/* SEARCH */}
                <div className="flex items-center gap-3 rounded-2xl border bg-[#f8fafc] px-4">
                  <Search
                    size={20}
                    className="text-slate-500"
                  />

                  <input
                    type="text"
                    placeholder="Cari nama, wilayah, atau paroki..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="h-14 w-full bg-transparent outline-none lg:w-80"
                  />
                </div>

                {/* SORT */}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="h-14 rounded-2xl border bg-[#f8fafc] px-4 outline-none"
                >
                  <option value="name">
                    Sort Nama A-Z
                  </option>

                  <option value="wilayah">
                    Sort Wilayah A-Z
                  </option>

                  <option value="paroki">
                    Sort Paroki A-Z
                  </option>
                </select>
              </div>
            </div>

            {/* TABLE */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4 text-lg">
                      Nama
                    </th>

                    <th className="pb-4 text-lg">
                      Wilayah Rohani
                    </th>

                    <th className="pb-4 text-lg">
                      Paroki
                    </th>

                    <th className="pb-4 text-lg">
                      Progress
                    </th>

                    <th className="pb-4 text-lg">
                      Kuis Selesai
                    </th>

                    <th className="pb-4 text-lg">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className="border-b"
                      >
                        <td className="py-5 text-lg font-semibold">
                          {item.name}
                        </td>

                        <td className="py-5 text-lg text-slate-600">
                          {item.wilayah}
                        </td>

                        <td className="py-5 text-lg text-slate-600">
                          {item.paroki}
                        </td>

                        <td className="py-5">
                          <div className="w-fit rounded-full bg-[#0f172a] px-4 py-1 text-white">
                            {item.progress}%
                          </div>
                        </td>

                        <td className="py-5 text-center text-lg">
                          {item.kuis}
                        </td>

                        <td className="py-5">
                          <div className="w-fit rounded-full bg-green-600 px-4 py-1 text-white">
                            {item.status}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {activeTab === "progress" && (
          <div className="mt-8 rounded-3xl border bg-white p-6 lg:p-10">
            <h2 className="text-3xl font-bold">
              Statistik Progress
            </h2>

            <p className="mt-2 text-xl text-slate-500">
              Analisis kemajuan pembelajaran
              pengguna
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
                <h3 className="text-2xl font-bold text-green-700">
                  Progress Tinggi (&gt;70%)
                </h3>

                <h2 className="mt-5 text-5xl font-bold text-green-800">
                  2
                </h2>
              </div>

              <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6">
                <h3 className="text-2xl font-bold text-yellow-700">
                  Progress Sedang (30-70%)
                </h3>

                <h2 className="mt-5 text-5xl font-bold text-yellow-800">
                  3
                </h2>
              </div>

              <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <h3 className="text-2xl font-bold text-red-700">
                  Progress Rendah (&lt;30%)
                </h3>

                <h2 className="mt-5 text-5xl font-bold text-red-800">
                  0
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* PROFIL */}
        {activeTab === "profil" && (
          <div className="mt-8 rounded-3xl border bg-white p-6 lg:p-10">
            <div className="flex items-center gap-3">
              <User size={28} />

              <h2 className="text-3xl font-bold">
                Informasi Pribadi
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* LEFT */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <User size={20} />

                    <p className="text-lg font-semibold">
                      Nama Lengkap
                    </p>
                  </div>

                  <p className="mt-3 text-3xl font-semibold text-[#0f172a]">
                    {user?.name || "-"}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin size={20} />

                    <p className="text-lg font-semibold">
                      Tempat, Tanggal Lahir
                    </p>
                  </div>

                  <p className="mt-3 text-2xl text-[#0f172a]">
                    Manado, 20 Mei 1985
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Mail size={20} />

                    <p className="text-lg font-semibold">
                      Email
                    </p>
                  </div>

                  <p className="mt-3 text-2xl text-[#0f172a]">
                    {user?.email || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* FOOT */}
            <div className="mt-10 flex items-center justify-between border-t pt-8">
              <div className="rounded-full bg-[#f1f5f9] px-4 py-1 text-sm font-semibold">
                Pendamping
              </div>

              <button
                onClick={() =>
                  setShowLogoutModal(true)
                }
                className="flex items-center gap-3 rounded-2xl bg-red-600 px-6 py-3 text-lg font-bold text-white transition hover:opacity-90"
              >
                <LogOut size={20} />
                Keluar
              </button>
            </div>
          </div>
        )}
      </section>

      {/* MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8">
            <h2 className="text-3xl font-bold text-[#0f172a]">
              Konfirmasi Keluar
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-500">
              Apakah anda yakin ingin keluar
              dari akun ini?
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() =>
                  setShowLogoutModal(false)
                }
                className="h-14 flex-1 rounded-2xl border text-lg font-bold"
              >
                Tidak
              </button>

              <button
                onClick={handleLogout}
                className="h-14 flex-1 rounded-2xl bg-red-600 text-lg font-bold text-white"
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}