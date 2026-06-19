"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackLesson } from "@/lib/progress/track-lesson";
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  Home,
  BookText,
  GraduationCap,
  ArrowRight,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PengenalanHurufMatiPage() {
  const router = useRouter();

  const LETTER = "g"; // timer halaman
  const TIMER_KEY = `huruf-mati-${LETTER}-timer`; 

const [timeLeft, setTimeLeft] = useState(90);
const [hydrated, setHydrated] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const completedLessons = 2;
  const totalLessons = 4;

  const [showWarning, setShowWarning] =
  useState(false);


  const progress =
  (completedLessons / totalLessons) * 100;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.message) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


useEffect(() => {
  if (!hydrated) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 0) return 0;

      const newTime = prev - 1;
      localStorage.setItem(TIMER_KEY, newTime.toString());
      return newTime;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [hydrated]);

  const playAudio = (src: string) => {
  const audio = new Audio(src);
  audio.play();
};

  const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return `${minutes}:${secs 
    .toString()
    .padStart(2, "0")}`;
};

const handleNext = () => {
  if (timeLeft > 0) {
    setShowWarning(true);
    return;
  }

  window.location.href =
    "/materi/elementa-1/pengenalan-huruf-mati-s";
};

useEffect(() => {
  const saved = localStorage.getItem(TIMER_KEY);

  if (saved) {
    const parsed = parseInt(saved);
    if (!isNaN(parsed)) {
      setTimeLeft(parsed);
    }
  }

  setHydrated(true);
}, []);

/*const handleNext = () => {
  if (timeLeft > 0) {
    alert(
      `Waktu belajar masih tersisa ${formatTime(
        timeLeft
      )}.

Anda hanya dapat melanjutkan ketika waktu belajar tersebut sudah selesai.

Silakan coba lagi nanti.`
    );

    return;
  }

  router.push(
    "/materi/elementa-1/pengenalan-huruf-mati-g"
  );
};*/

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER (TETAP) */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white lg:h-14 lg:w-14">
              <BookOpen size={24} />
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

            <Link href="/" className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-6 lg:py-4 lg:text-lg">
              <Home size={20} />
              Beranda
            </Link>

            <Link href="/glosarium" className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-6 lg:py-4 lg:text-lg">
              <BookText size={20} />
              Glosarium
            </Link>

            {user && (
              <Link href="/profile" className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white lg:px-6 lg:py-4 lg:text-lg">
                <GraduationCap size={20} />
                {user.name || "Profil"}
              </Link>
            )}

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

      

      {/* CONTENT (TETAP) */}
      <section className="mx-auto max-w-5xl px-4 py-8 lg:px-6">

        {/* BACK */}
        <Link
          href="/materi/elementa-1"
          className="mb-8 inline-flex items-center gap-2  text-xl font-semibold text-[#0d1333] "
        >
          <ArrowLeft size={18} />
          Kembali ke Modul Elementa 
        </Link>

        {/* LESSON INFO */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-base lg:text-lg text-slate-500">
          <BookOpen size={18} />
          <span>Materi</span>
          <span>90 Detik</span>
        </div>

        {/* TITLE */}
        {/* TITLE + TIMER */}
<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

  <h1 className="text-3xl lg:text-5xl font-bold text-[#0d1333]">
    PENGENALAN HURUF MATI
  </h1>

  <div className="flex items-center gap-3 rounded-2xl border bg-white px-5 py-3 shadow-sm">

    <Clock
      size={26}
      className="text-[#0d1333]"
    />

    <div>
      <p className="text-sm text-slate-500">
        Waktu Belajar
      </p>

      <p className="text-2xl font-bold text-[#0d1333]">
        {hydrated ? formatTime(timeLeft) : "0:00"}
      </p>
    </div>

  </div>

</div>

<div className="mt-6 border-b" />

        {/* INTRO */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-7 lg:p-10">
            <p className="text-xl lg:text-3xl leading-[44px] lg:leading-[52px] text-slate-700">
              Huruf mati adalah huruf yang tidak memiliki bunyi vokal atau yang sering disebut sebagai konsonan. Dalam bahasa Latin Gerejawi, <strong>huruf-huruf tersebut meliputi C, G, S, dan T.</strong> Cara bacanya mirip bahasa Indonesia sehingga mudah dipelajari. Namun ada beberapa aturan penting yang berlaku.
            </p>
          </CardContent>
        </Card>

        {/* SECTION TITLE */}
        <div className="mt-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0d1333]">
            Aturan Pelafalan Huruf Latin
          </h2>

          <p className="mt-4 text-lg lg:text-3xl text-slate-600">
            Berikut aturan penting pelafalan huruf mati.
          </p>
        </div>

        {/* SUB TITLE */}
        <div className="mt-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0d1333]">
            Huruf G
          </h2>

          <p className="mt-5 text-xl lg:text-2xl leading-[42px] text-slate-700">
            Huruf G memiliki <strong>3 cara baca tergantung huruf setelahnya</strong>
          </p>
        </div>

        {/* RULE CARD */}
        <Card className="mt-8 rounded-3xl">
  <CardContent className="p-7 lg:p-10 space-y-8">

    {/* TABLE 1 */}
    <div>
      <h3 className="text-2xl font-bold text-[#0d1333]">
        Dibaca sebagai Huruf "G" pada umumnya
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-lg font-bold">KATA LATIN</th>
              <th className="p-4 text-lg font-bold">CARA BACA</th>
              <th className="p-4 text-lg font-bold">ARTI</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4 text-xl font-semibold">GLORIA</td>
              <td className="p-4 text-xl">GLO-ri-a</td>
              <td className="p-4 text-xl">Kemuliaan</td>
            </tr>

            <tr className="border-t">
              <td className="p-4 text-xl font-semibold">AGRI</td>
              <td className="p-4 text-xl">AG-ri</td>
              <td className="p-4 text-xl">Ladang-ladang</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* TABLE 2 */}
    <div>
      <h3 className="text-2xl font-bold text-[#0d1333]">
        "G' dibaca sebagai huruf "J" jika diikuti -e atau -i
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">
        <table className="w-full table-fixed text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="w-1/3 p-4 text-lg font-bold">
                KATA LATIN
              </th>

              <th className="w-1/3 p-4 text-lg font-bold">
                CARA BACA
              </th>

              <th className="w-1/3 p-4 text-lg font-bold">
                ARTI
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4 text-xl font-semibold break-words">
                GENUS
              </td>
              <td className="p-4 text-xl break-words">
                JE-nus
              </td>
              <td className="p-4 text-xl break-words">
                Jenis
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4 text-xl font-semibold break-words">
                GENS
              </td>
              <td className="p-4 text-xl break-words">
                JE-ns
              </td>
              <td className="p-4 text-xl break-words">
                Bangsa
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4 text-xl font-semibold break-words">
                AGER
              </td>
              <td className="p-4 text-xl break-words">
                a-JER
              </td>
              <td className="p-4 text-xl break-words">
                Ladang
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4 text-xl font-semibold break-words">
                DILIGERE
              </td>
              <td className="p-4 text-xl break-words">
                di-li-JE-re
              </td>
              <td className="p-4 text-xl break-words">
                Mengasihi / mencintai
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* TABLE 3 (NY / NG SOUND) */}
    <div>
      <h3 className="text-2xl font-bold text-[#0d1333]">
        "G" dibaca sebagai "NY" jika diikut -n seperti "gn"
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-lg font-bold">KATA LATIN</th>
              <th className="p-4 text-lg font-bold">CARA BACA</th>
              <th className="p-4 text-lg font-bold">ARTI</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4 text-xl font-semibold">AGNUS</td>
              <td className="p-4 text-xl">a-NYUS</td>
              <td className="p-4 text-xl">Anak domba</td>
            </tr>

            <tr className="border-t">
              <td className="p-4 text-xl font-semibold">MAGNUS</td>
              <td className="p-4 text-xl">ma-NYUS</td>
              <td className="p-4 text-xl">Besar</td>
            </tr>

            <tr className="border-t">
              <td className="p-4 text-xl font-semibold">AGNOSCERE</td>
              <td className="p-4 text-xl">a-NYOS-ce-re</td>
              <td className="p-4 text-xl">Mengenali</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </CardContent>
</Card>

        {/* AUDIO */}
        <div className="mt-12">
          <p className="text-xl lg:text-2xl leading-[44px] text-slate-700">
            Berikut adalah audio pelafalannya.<strong> Silahkan klik ikon volume untuk mendengarkan.</strong>
          </p>
        </div>

        {/* AUDIO GRID */}
<div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

  {[
  ["GLORIA", "Kemuliaan", "GLO-ri-a", "/audio/gloriaa.mp3"],
  ["AGRI", "Ladang-ladang", "AG-ri", "/audio/agri.mp3"],

  ["GENUS", "Jenis", "JE-nus", "/audio/genus.mp3"],
  ["GENS", "Bangsa", "JENS", "/audio/gens.mp3"],
  ["AGER", "Ladang", "A-jer", "/audio/ager.mp3"],
  ["DILIGERE", "Mencintai", "di-LI-je-re", "/audio/diligere.mp3"],

  ["AGNUS", "Anak domba", "a-NYUS", "/audio/agnus.mp3"],
  ["MAGNUS", "Besar", "ma-NYUS", "/audio/magnus.mp3"],
  ["AGNOSCERE", "Mengenali", "a-NYOS-ce-re", "/audio/agnoscere.mp3"],
].map(([word, meaning, pron, audio]) => (
    <Card key={word}>
      <CardContent className="flex items-center justify-between p-7 lg:p-8">

        <div>
          <h4 className="text-lg font-bold text-[#0d1333]">
            {word}
          </h4>

          <p className="mt-1 text-3xl font-bold text-[#0d1333]">
            {pron}
          </p>

          <p className="mt-1 text-lg text-slate-500">
            {meaning}
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-16 w-16 rounded-full"
          onClick={() => playAudio(audio)}
        >
          <Volume2 size={42} />
        </Button>

      </CardContent>
    </Card>
  ))}
</div>

{/*<div className="mt-6">
  <button
    onClick={() => {
  localStorage.setItem(TIMER_KEY, "90");
  setTimeLeft(90);
}}
    className="rounded-xl bg-red-600 px-6 py-3 text-white"
  >
    Reset Timer
  </button>
</div>

{/* NAVIGATION */}
<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"></div>

{/* NAVIGATION */}
<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

  {/* KEMBALI */}
  <Link href="/materi/elementa-1/pengenalan-huruf-mati">
    <Button
      variant="outline"
      className="h-14 rounded-2xl px-6 text-lg font-semibold"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Kembali ke Huruf C
    </Button>
  </Link>

  {/* NEXT */}
   <Button
  onClick={handleNext}
  className="h-14 rounded-2xl bg-[#030326] px-8 text-lg font-semibold hover:bg-[#030326]/90"
>
  Huruf S
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>
</div>


{showWarning && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">

    <Card className="w-full max-w-xl rounded-3xl shadow-2xl">
      <CardContent className="p-8 text-center">

        <div className="mb-4 text-6xl">
          ⏳
        </div>

        <h2 className="mt-4 text-3xl font-bold text-[#0d1333]">
          Waktu Belajar Belum Selesai
        </h2>

        {/*<p className="mt-5 text-xl font-bold leading-8 text-slate-700">
          Waktu belajar masih tersisa
        </p>*/}

        <p className="mt-2 text-4xl font-bold text-red-600">
          {formatTime(timeLeft)}
        </p>

        <p className="mt-5 text-lg font-bold leading-8 text-slate-900">
          Anda hanya dapat melanjutkan ke materi berikutnya
          setelah waktu belajar selesai.
        </p>

        <Button
          onClick={() => setShowWarning(false)}
          className="mt-8 h-14 rounded-2xl bg-[#030326] px-8 text-lg"
        >
          Mengerti
        </Button>

      </CardContent>
    </Card>

  </div>
)}

      </section>

      {/* FOOTER (RESTORED) */}
      <footer className="mt-16 border-t py-10 text-center text-slate-500">
        <p>© 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.</p>
        <p className="mt-2">
          Untuk Kemuliaan Tuhan - Belajar Bahasa Latin Gereja Katolik
        </p>
      </footer>

    </main>
  );
}