"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  Home,
  BookText,
  GraduationCap,
  Mail,
  ChevronRight,
  ArrowLeft,
  Info,
} from "lucide-react";

export default function PilihPastorPage() {
  
  const router = useRouter();

  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const [pastor, setpastor] = useState<any[]>([]);

 const pastorInfo: Record<string, any> = {
  "Pastor Stenly": {
    image:
      "https://stfsp.ac.id/wp-content/uploads/2021/08/stenlyp-695x1024.jpg",
    position: "Pengajar di Seminari Keuskupan",
    education: [
      "S1 – STF Seminari Pineleng, Manado",
      "S2 – Universität Innsbruck, Austria",
      "S3 – Universität Innsbruck, Austria",
    ],
  },

  "Pastor Stefanus Watuseke": {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gEhxpnRYGc8F-29siUGxVwZBAIsYNBqbVjkOyMGNMfD9SjRwEUw6y5M&s=10",
    position: "Pengajar di Seminari Keuskupan",
    education: [
      "S1 – STF Seminari Pineleng, Manado",
      "S2 – Pontificia Universitas Gregoriana, Roma",
    ],
  },

  "Pastor Louis Bayak": {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq60ks3mytiChRnHExKJOVYjAKUNTFNFk87Onx5dVFg&s=10",
    position: "Pengajar di Seminari Keuskupan",
    education: [
      "S1 Filsafat – Seminari Tinggi Pineleng, Manado",
    ],
  },
};

  useEffect(() => {
    fetch("/api/pastor")
      .then((res) => res.json())
      .then((data) => setpastor(data));
  }, []);

  useEffect(() => {
    const seen = localStorage.getItem("pastor_info_seen");
    if (!seen) setShowPopup(true);
  }, []);

  const closePopup = () => {
    if (dontShowAgain) {
      localStorage.setItem("pastor_info_seen", "true");
    }
    setShowPopup(false);
  };

  // 🔥 FIX CHAT ROOM (SUDAH BENAR 100%)
  const startChat = async (pastorId: string) => {
    const token = localStorage.getItem("token");

    try {
      // ambil user login
      const meRes = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const me = await meRes.json();

     const res = await fetch("/api/chat-room", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    pastorId,
  }),
});


      const data = await res.json();

      if (!res.ok) {
        console.error("Gagal membuat room:", data);
        return;
      }

      router.push(`/chat/${data.id}?pastorId=${pastorId}`);
    } catch (err) {
      console.error("Error create chat room:", err);
    }
  };
  

  return (
    <main className="min-h-screen bg-[#f5f7fb] pb-10">

      {/* POPUP INFO */}
      {showPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-[#0d1333]">
              Cara Menggunakan
            </h2>

            <p className="mt-3 text-sm text-slate-600 leading-6">
              Pilih pastor untuk memulai konsultasi rohani.
            </p>

            <label className="mt-5 flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              Jangan tampilkan lagi
            </label>

            <button
              onClick={closePopup}
              className="mt-6 w-full rounded-xl bg-[#030326] py-3 text-white font-semibold"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* INFO BUTTON */}
      <button
        onClick={() => setShowInfo(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#030326] text-white shadow-lg"
      >
        <Info size={20} />
      </button>

      {/* INFO MODAL */}
      {showInfo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl text-center font-bold text-[#0d1333]">
              Tentang Halaman Ini
            </h2>

            <p className="mt-3 text-lg text-center text-slate-800 leading-6">
              Pilih pastor jika ada pertanyaan. Mohon bersabar untuk menunggu balasan dan jangan spam pesan
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-6 w-full rounded-xl bg-[#030326] py-3 text-white font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* HEADER (TIDAK DIUBAH) */}
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

      {/* BACK BUTTON */}
      <div className="mx-auto mt-6 max-w-7xl px-4 lg:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>
      </div>

      {/* TITLE */}
      <section className="mx-auto mt-6 max-w-7xl px-4 lg:px-6">

        <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <Mail size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#0d1333] lg:text-4xl">
                Pilih Pastor Pendamping
              </h1>
              <p className="text-slate-500 lg:text-lg">
                Klik pastor untuk mulai konsultasi rohani
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {pastor.map((pastor) => {
  const info = pastorInfo[pastor.name];

  return (
            <div
              key={pastor.id}
              onClick={() => startChat(pastor.id)}
              className="cursor-pointer rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex flex-col gap-5 lg:flex-row">

<img
  src={
    info?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      pastor.name
    )}`
  }
  alt={pastor.name}
  className="h-28 w-28 rounded-full border object-cover"
/>

  <div className="flex-1">

    <h2 className="text-3xl font-bold text-[#B91C1C]">
      {pastor.name}
    </h2>

   <p className="mt-1 text-lg text-base-900">
  {info?.position}
</p>

    <div className="mt-4">
      <p className="font-semibold  text-lg text-[#B91C1C]">
        Riwayat Pendidikan
      </p>

      <ul className="mt-2 space-y-2 text-lg leading-6 text-slate-600">
  {info?.education?.map(
          (edu: string, index: number) => (
            <li
              key={index}
              className="flex items-start gap-2"
            >
              <span className="mt-1 text-red-500">
                •
              </span>

              <span>{edu}</span>
            </li>
          )
        )}
      </ul>
    </div>

  </div>

</div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-500">
                  Chat Pastor Sekarang
                </p>

                <div className="flex items-center gap-2 rounded-xl bg-[#030326] px-4 py-2 text-sm font-semibold text-white">
                  Pilih
                  <ChevronRight size={16} />
                </div>
              </div>

            </div>
            );
})}

        </div>

      </section>

      {/* FOOTER */}
      <div className="mt-14 text-center text-lg leading-9 text-slate-500">
        <p>© 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.</p>
        <p>Untuk Kemuliaan Tuhan - Belajar Bahasa Gereja Katolik</p>
      </div>

    </main>
  );
}