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

  const LETTER = "ti"; // timer halaman
  const TIMER_KEY = `huruf-mati-${LETTER}-timer`; 

const [timeLeft, setTimeLeft] = useState(90);
const [hydrated, setHydrated] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const completedLessons = 4;
  const totalLessons = 4;

  const [showWarning, setShowWarning] =
  useState(false);

  const [showExercisePopup, setShowExercisePopup] =
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

  setShowExercisePopup(true);
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
          className="mb-8 inline-flex items-center gap-2 text-xl font-semibold text-[#0d1333] "
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
            Berikut adalah aturan pelafalan huruf mati dalam bahasa Latin Gerejawi!
          </p>
        </div>

        {/* SUB TITLE */}
        <div className="mt-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0d1333]">
            Huruf TI
          </h2>

          <p className="mt-5 text-xl lg:text-2xl leading-[42px] text-slate-700">
            Huruf T unik karna hanya memiliki aturan jika huruf T tersebut diikuti huruf I menjadi "TI". TI ini mempunyai <strong> 3 cara baca tergantung huruf setelahnya</strong>
          </p>
        </div>

        {/* RULE CARD */}
        <Card className="mt-8 rounded-3xl">
  <CardContent className="space-y-8 p-7 lg:p-10">

    {/* TABEL 1 */}
    <div>

      <h3 className="text-2xl font-bold text-[#0d1333]">
        Dibaca sebagai "TI" pada umumnya
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">

        <table className="w-full text-left">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-lg font-bold">
                KATA LATIN
              </th>

              <th className="p-4 text-lg font-bold">
                CARA BACA
              </th>

              <th className="p-4 text-lg font-bold">
                ARTI
              </th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                TIGRIS
              </td>

              <td className="p-4 text-xl">
                TI-gris
              </td>

              <td className="p-4 text-xl">
                Harimau
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                TIMOR
              </td>

              <td className="p-4 text-xl">
                TI-mor
              </td>

              <td className="p-4 text-xl">
                Ketakutan
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                TIRO
              </td>

              <td className="p-4 text-xl">
                TI-ro
              </td>

              <td className="p-4 text-xl">
                Murid / Pemula
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    {/* TABEL 2 */}
    <div>

      <h3 className="text-2xl font-bold text-[#0d1333]">
        Dibaca "TSI" jika diikuti vokal dan tidak didahului huruf S
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">

        <table className="w-full text-left">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-lg font-bold">
                KATA LATIN
              </th>

              <th className="p-4 text-lg font-bold">
                CARA BACA
              </th>

              <th className="p-4 text-lg font-bold">
                ARTI
              </th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                MOTIO
              </td>

              <td className="p-4 text-xl">
                mo-TSI-o
              </td>

              <td className="p-4 text-xl">
                Gerakan
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                ALTIOR
              </td>

              <td className="p-4 text-xl">
                al-TSI-or
              </td>

              <td className="p-4 text-xl">
                Lebih tinggi
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                CONTIO
              </td>

              <td className="p-4 text-xl">
                con-TSI-o
              </td>

              <td className="p-4 text-xl">
                Pertemuan umum
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    {/* TABEL 3 */}
    <div>

      <h3 className="text-2xl font-bold text-[#0d1333]">
        Tetap dibaca "TI" jika didahului huruf S
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">

        <table className="w-full text-left">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-lg font-bold">
                KATA LATIN
              </th>

              <th className="p-4 text-lg font-bold">
                CARA BACA
              </th>

              <th className="p-4 text-lg font-bold">
                ARTI
              </th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                OSTIUM
              </td>

              <td className="p-4 text-xl">
                OS-ti-um
              </td>

              <td className="p-4 text-xl">
                Pintu
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-4 text-xl font-semibold">
                IUSTIOR
              </td>

              <td className="p-4 text-xl">
                IUS-ti-or
              </td>

              <td className="p-4 text-xl">
                Lebih adil
              </td>

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
  ["TIGRIS", "Harimau", "TI-gris", "/audio/tigris.mp3"],
  ["TIMOR", "Ketakutan", "TI-mor", "/audio/timor.mp3"],
  ["TIRO", "Murid / Pemula", "TI-ro", "/audio/tiro.mp3"],

  ["MOTIO", "Gerakan", "mo-TSI-o", "/audio/motio.mp3"],
  ["ALTIOR", "Lebih tinggi", "al-TSI-or", "/audio/altior.mp3"],
  ["CONTIO", "Pertemuan umum", "con-TSI-o", "/audio/contio.mp3"],

  ["OSTIUM", "Pintu", "OS-ti-um", "/audio/ostium.mp3"],
  ["IUSTIOR", "Lebih adil", "IUS-ti-or", "/audio/iustior.mp3"],
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
  <Link href="/materi/elementa-1/pengenalan-huruf-mati-s">
    <Button
      variant="outline"
      className="h-14 rounded-2xl px-6 text-lg font-semibold"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Kembali ke Huruf S
    </Button>
  </Link>

  {/* NEXT */}
   <Button
  onClick={handleNext}
  className="h-14 rounded-2xl bg-[#030326] px-8 text-lg font-semibold hover:bg-[#030326]/90"
>
  Latihan 1: Huruf Mati
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

{showExercisePopup && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">

    <Card className="w-full max-w-xl rounded-3xl shadow-2xl">
      <CardContent className="p-8 text-center">

        <div className="mb-4 text-6xl">
          📚
        </div>

        <h2 className="text-3xl font-bold text-[#0d1333]">
          Latihan 1: Huruf Mati
        </h2>
        
        <p className="mt-2 text-lg leading-8 text-slate-1100">
     
        </p>

        <p className="mt-4 text-lg leading-8 text-slate-1100">
          <strong>Setelah membaca dan memahami materi, yuk kita melatih!</strong>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Button
            variant="outline"
            className="h-14 rounded-2xl px-8 text-lg"
            onClick={() =>
              setShowExercisePopup(false)
            }
          >
            Kembali
          </Button>

          <Button
  className="h-14 rounded-2xl bg-[#030326] px-8 text-lg"
  onClick={async () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (user?.id) {
      await trackLesson({
        userId: user.id,
        moduleSlug: "elementa-1",
        lessonSlug: "pengenalan-huruf-mati",
      });
    }

    window.location.href =
      "/materi/elementa-1/persiapan-latihan-1";
  }}
>
  Latihan 1
</Button>
        </div>

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