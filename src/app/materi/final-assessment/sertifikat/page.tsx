"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateCertificate } from "@/lib/generate-certificate";
import confetti from "canvas-confetti";

/* =======================
   BACKGROUND MUSIC
======================= */
function BackgroundMusic() {
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadYT = () =>
      new Promise<void>((resolve) => {
        if ((window as any).YT?.Player) return resolve();

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        (window as any).onYouTubeIframeAPIReady = () => resolve();
      });

    const init = async () => {
      await loadYT();

      playerRef.current = new (window as any).YT.Player("yt-bg-music", {
        videoId: "GZtL94eJd3Q",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          loop: 1,
          playlist: "GZtL94eJd3Q",
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();

            setTimeout(() => {
              event.target.playVideo();
            }, 300);
          },
        },
      });
    };

    init();
  }, []);

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (muted) player.unMute();
    else player.mute();

    setMuted(!muted);
  };

  return (
    <>
      <div id="yt-bg-music" className="fixed w-[1px] h-[1px] opacity-0" />

      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black px-4 py-3 text-white shadow-lg"
      >
        {muted ? "🔇 Musik" : "🔊 Musik"}
      </button>
    </>
  );
}
/* =======================
   PAGE
======================= */
export default function SertifikatPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUser(data);
    };

    fetchUser();

    confetti({
      particleCount: 200,
      spread: 110,
      origin: { y: 0.6 },
    });
  }, []);

  const downloadCertificate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Silakan login terlebih dahulu");

      const res = await fetch("/api/certificate/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return alert("Gagal mengambil data sertifikat");

      const user = await res.json();
      if (!user?.name) return alert("Nama user tidak ditemukan");

      await generateCertificate(user.name, user.certificateIssuedAt);

      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          moduleSlug: "final-assessment",
          lessonSlug: "sertifikat",
        }),
      });
    } catch {
      alert("Terjadi kesalahan");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f7fb] to-[#eef2ff] flex flex-col relative">

      <BackgroundMusic />

      {/* BACK BUTTON */}
      <Link href="/">
        <button className="fixed top-6 left-6 z-50 rounded-full bg-white/80 backdrop-blur-md shadow-md p-3 hover:scale-105 transition">
          <ArrowLeft />
        </button>
      </Link>

      {/* CENTER */}
      <section className="flex-1 flex items-center justify-center px-4 py-10">

        {/* 🔥 BIGGER + RESPONSIVE CARD */}
        <div className="
          w-full
          max-w-2xl
          sm:max-w-3xl
          rounded-3xl
          border border-yellow-200
          bg-white/80
          backdrop-blur-xl
          shadow-2xl
          p-6 sm:p-10 md:p-14
          text-center
          relative
          overflow-hidden
        ">

          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-yellow-200 blur-3xl opacity-30 rounded-full" />

          {/* HEADER */}
          {/* HEADER */}
<p className="relative text-base sm:text-lg tracking-[0.3em] text-yellow-600 font-bold">
  SERTIFIKAT KELULUSAN
</p>

<h1 className="relative mt-4 text-5xl sm:text-6xl md:text-7xl font-black text-[#0d1333]">
  🎓
</h1>

<h1 className="relative mt-2 text-2xl sm:text-3xl md:text-4xl font-black text-[#0d1333]">
  PROFICIAT • DISCIPULE
</h1>

<p className="relative mt-3 text-xl text-slate-900 leading-relaxed">
  Kamu telah menyelesaikan seluruh pembelajaran Latin Gerejawi
</p>

{/* BUTTON */}
<div className="relative mt-6 sm:mt-8">
  <Button
    onClick={downloadCertificate}
    className="h-12 sm:h-14 px-6 sm:px-10 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold text-base sm:text-lg shadow-lg hover:scale-105 transition"
  >
    🏆 Download Sertifikat
  </Button>
</div>

{/* ✨ DOA TAMBAHAN (GLORIA PATRI) */}
<div className="relative mt-6 px-4 py-4 rounded-2xl bg-yellow-50/60 border border-yellow-100">
  <p className="text-xl font-semibold text-yellow-700 mb-2">
    Marilah kita bersyukur kepada Allah!
  </p>

  <p className="text-sm sm:text-xl text-slate-900">
      Te Deum laudamus: te Dominum confitemur.  Te aeternum Patrem omnis<br />
      terra veneratur. Tibi omnes Angeli; tibi coeli et universae potestates. <br />
  </p>
</div>


        </div>
      </section>

      {/* FOOTER (UNCHANGED) */}
      <footer className="border-t py-8 text-center text-slate-500">
        <p>© 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.</p>
        <p className="mt-2">
          Untuk Kemuliaan Tuhan - Belajar Bahasa Latin Gereja Katolik
        </p>
      </footer>

    </main>
  );
}