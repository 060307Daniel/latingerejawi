"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  Home,
  BookText,
  GraduationCap,
  Search,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function PastorChatPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("latest");
  const [search, setSearch] = useState("");

  // 🔥 NEW: pastor filter state
  const [pastorId, setPastorId] = useState("pastor_stenly");

  // 🔥 FETCH DATA BY PASTOR
  useEffect(() => {
    fetch(`/api/pastor/chat-room?pastorId=${pastorId}`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, [pastorId]);

  const filteredRooms = useMemo(() => {
    let data = [...rooms];

    if (search) {
      data = data.filter((r) =>
        r.user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortBy) {
      case "latest":
        data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
        );
        break;

      case "az":
        data.sort((a, b) =>
          a.user.name.localeCompare(b.user.name)
        );
        break;

      case "paroki":
        data.sort((a, b) =>
          (a.user.paroki || "").localeCompare(b.user.paroki || "")
        );
        break;

      case "unread":
        data = data.filter((r) => r.unreadCount > 0);
        break;
    }

    return data;
  }, [rooms, sortBy, search]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">

      {/* HEADER (TIDAK DIUBAH SAMA SEKALI) */}
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

            <Link href="/" className="flex items-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg">
              <Home size={20} />
              Beranda
            </Link>

            <Link href="/glosarium" className="flex items-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg">
              <BookText size={20} />
              Glosarium
            </Link>

            <Link href="/profile" className="flex items-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-8 lg:py-4 lg:text-lg">
              <GraduationCap size={20} />
              Profil
            </Link>

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 py-8">

        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={22} />
            Kembali ke Beranda
          </Link>
        </div>

        {/* GREETING */}
        <div className="mb-8 rounded-2xl border bg-white p-6">

          <p className="text-slate-1200 text-xl text-center">
            Dominus Vobiscum!
          </p>

          <h2 className="mt-1 text-4xl font-bold text-center text-[#0d1333]">
            SALVE PASTOR!!! 👋
          </h2>

          <p className="mt-2 text-2xl text-slate-800 text-center ">
            Selamat Datang di Dashboard Pastor Pembimbing
          </p>

        </div>

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0d1333]">
            PESAN MASUK
          </h1>
          <p className="text-slate-800 text-xl mt-2">
            Berikut adalah pesan-pesan dari para umat:
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* 🔥 NEW: PASTOR FILTER (UI tetap simpel) */}
          <select
            value={pastorId}
            onChange={(e) => setPastorId(e.target.value)}
            className="bg-white border rounded-2xl px-5 py-4 text-lg"
          >
            <option value="pastor_stenly">Pastor Stenly</option>
            <option value="pastor_watuseke">Pastor Watuseke</option>
            <option value="pastor_louis">Pastor Louis</option>
          </select>

          <div className="flex items-center gap-3 bg-white border rounded-2xl px-5 py-4 flex-1">
            <Search size={20} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama umat..."
              className="w-full outline-none text-lg"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border rounded-2xl px-5 py-4 text-lg"
          >
            <option value="latest">Terbaru</option>
            <option value="unread">Belum Dibaca</option>
            <option value="az">A - Z</option>
            <option value="paroki">Paroki</option>
          </select>

        </div>

        {/* LIST */}
        <div className="bg-white border rounded-3xl divide-y">

          {filteredRooms.map((room) => (
            <Link key={room.id} href={`/chat/${room.id}`}>
              <div className="flex justify-between items-start p-6 hover:bg-slate-50 transition">

                <div className="flex-1">

                  <p className="text-2xl font-bold text-[#0d1333]">
                    {room.user.name}
                  </p>

                  <p className="text-lg text-slate-500">
                    {room.user.email}
                  </p>

                  <div className="flex gap-5 mt-2 text-base text-slate-500">
                    {room.user.paroki && <span>⛪ {room.user.paroki}</span>}
                    {room.user.wilayah && <span>📍 {room.user.wilayah}</span>}
                  </div>

                  {room.lastMessage && (
                    <p className="mt-4 text-lg text-slate-700 line-clamp-2">
                      {room.lastMessage}
                    </p>
                  )}

                </div>

                <div className="text-right min-w-[140px]">

                  <p className="text-sm text-slate-400">
                    {new Date(room.updatedAt).toLocaleString("id-ID")}
                  </p>

                  <ChevronRight className="mt-5 ml-auto text-slate-400" size={26} />

                </div>

              </div>
            </Link>
          ))}

        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center text-slate-500 mt-12 text-lg">
            Tidak ada percakapan ditemukan
          </div>
        )}

      </main>

      {/* FOOTER */}
      <div className="mt-16 text-center text-lg leading-9 text-slate-500">
        <p>© 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.</p>
        <p>Untuk Kemuliaan Tuhan - Belajar Bahasa Gereja Katolik</p>
      </div>

    </div>
  );
}