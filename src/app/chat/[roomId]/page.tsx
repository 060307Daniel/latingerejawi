"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import {
  BookOpen,
  Home,
  BookText,
  GraduationCap,
  ArrowLeft,
  User,
} from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const roomId = params?.roomId as string | undefined;
  const pastorId = searchParams?.get("pastorId") ?? undefined;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  // 🔥 FIX: AMBIL PASTOR DARI DATABASE (BUKAN HARDCODE)
  const [pastors, setPastors] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/pastor")
      .then((res) => res.json())
      .then((data) => setPastors(data));
  }, []);

  const currentPastor =
    pastors.find((p) => p.id === pastorId) || null;

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const user = await res.json();
      setCurrentUser(user);
    }

    loadUser();
  }, []);

  useEffect(() => {
    if (!roomId) return;

    fetch(`/api/messages/${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [roomId]);

  const sendMessage = async () => {
    if (!roomId || !text || !currentUser) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        senderId: currentUser.id,
        text,
      }),
    });

    setText("");

    const res = await fetch(`/api/messages/${roomId}`);
    const data = await res.json();

    setMessages(data);
  };

  const pastorImages: Record<string, string> = {
  "Pastor Stenly":
    "https://stfsp.ac.id/wp-content/uploads/2021/08/stenlyp-695x1024.jpg",

  "Pastor Stefanus Watuseke":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gEhxpnRYGc8F-29siUGxVwZBAIsYNBqbVjkOyMGNMfD9SjRwEUw6y5M&s=10",

  "Pastor Louis Bayak":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq60ks3mytiChRnHExKJOVYjAKUNTFNFk87Onx5dVFg&s=10",
};

  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] text-lg font-semibold">
        Loading chat...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] flex flex-col">

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

      {/* CHAT SECTION */}
      <section className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 space-y-5">

        {/* BACK BUTTON */}
        <Link
          href="/pilih-pastor"
          className="inline-flex items-center gap-2 text-xl text-base-600 hover:text-base-900"
        >
          <ArrowLeft size={20} />
          Kembali ke Pilih Pastor
        </Link>

        {/* PASTOR INFO (FIXED SAFE RENDER) */}
        <div className="rounded-3xl border bg-white p-5 shadow-sm flex items-center gap-4">

          <div className="h-14 w-14 rounded-full bg-gradient-to-br text-xl from-red-600 to-red-800 flex items-center justify-center text-white">
            <img
  src={
    currentPastor?.name
      ? pastorImages[currentPastor.name]
      : undefined
  }
  alt={currentPastor?.name}
  className="h-16 w-16 rounded-full border-2 border-red-200 object-cover"
  onError={(e) => {
    e.currentTarget.src =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        currentPastor?.name || "Pastor"
      )}&background=dc2626&color=fff`;
  }}
/>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0d1333]">
              {currentPastor?.name ?? "Memuat pastor..."}
            </h2>
            <p className="text-base text-slate-500">
              {currentPastor?.position ?? ""}
            </p>
          </div>
        </div>

        {/* CHAT BOX */}
        <div className="rounded-3xl border bg-white shadow-sm flex flex-col h-[60vh] overflow-hidden">

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m) => {
              const isMine =
                currentUser && m.senderId === currentUser.id;

              return (
                <div
                  key={m.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-5 py-3 text-lg leading-relaxed rounded-2xl shadow-sm ${
                      isMine
                        ? "bg-red-600 text-white text-xl rounded-br-md"
                        : "bg-slate-100 text-slate-900 rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t bg-white p-4 flex gap-3">

            <input
              className="flex-1 text-lg px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tulis pesan..."
            />

            <button
              onClick={sendMessage}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold text-lg"
            >
              Kirim
            </button>

          </div>

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