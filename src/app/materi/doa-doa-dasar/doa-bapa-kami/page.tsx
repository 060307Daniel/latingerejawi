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

export default function DoaDoaDasarPage() {
  const router = useRouter();

  const LETTER = "doa"; // timer halaman
  const TIMER_KEY = `${LETTER}-bapa-kami-timer`; 

const [timeLeft, setTimeLeft] = useState(90);
const [hydrated, setHydrated] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const completedLessons = 1;
  const totalLessons = 1;

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
          href="/materi/doa-doa-dasar"
          className="mb-8 inline-flex items-center gap-2  text-xl font-semibold text-[#0d1333] "
        >
          <ArrowLeft size={18} />
          Kembali ke Halaman Modul
        </Link>

        {/* LESSON INFO */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xl lg:text-lg text-slate-500">
          <BookOpen size={18} />
          <span>Materi</span>
          <span>90 detik</span>
        </div>

        {/* TITLE */}
        {/* TITLE + TIMER */}
<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

  <h1 className="text-3xl lg:text-5xl font-bold text-[#0d1333]">
    DOA Bapa Kami
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

    <h2 className="text-3xl lg:text-4xl font-bold text-[#0d1333] mb-4">
      Bapa Kami
    </h2>

    <p className="text-xl lg:text-2xl leading-[44px] text-slate-800">
      Doa Bapa Kami adalah doa yang diajarkan langsung oleh Yesus Kristus kepada para murid-Nya ketika
      mereka meminta diajarkan cara berdoa, hal ini dapat dilihat dalam Matius 6: 9-15 ataupun dalam Lukas 11:2-4.
      Dalam Gereja Katolik, doa ini menjadi salah satu doa pokok yang digunakan dalam berbagai perayaan liturgi maupun doa pribadi.   
    </p>

    <p className="mt-4 text-xl lg:text-2xl leading-[44px] text-slate-800">
      Melalui Doa Bapa Kami, umat beriman memuji Allah sebagai Bapa, memohon kebutuhan hidup, pengampunan dosa, serta perlindungan dari pencobaan.
      Di Gereja Katolik Indonesia, Bapa Kami menggunakan terjemahan dari Alkitab Vulgata dan diterjemahkan kembali 
      ke dalam Bahasa Indonesia oleh KWI.
    </p>

  </CardContent>
</Card>

<div className="mt-12">
  <h2 className="text-3xl lg:text-4xl font-bold text-[#0d1333]">
    Teks dan Audio
  </h2>

  <p className="mt-4 text-xl lg:text-2xl text-slate-600">
    Dengarkan dan ikuti pelafalan doa secara lengkap.
  </p>

  <Card className="mt-6 border-slate-200 shadow-md">
    <CardContent className="flex flex-col gap-6 p-7 lg:p-10">

      {/* TEXT AREA */}
      <div>
        <h4 className="text-xl lg:text-2xl font-bold text-[#0d1333]">
          Teks Bahasa Latin Gerejawi: "Pater Noster"
        </h4>

        <p className=" text-xl lg:text-2xl leading-[44px] text-slate-1200 font-medium">
           Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. 
           Panem nostrum quotidianum da nobis hodie, et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus
           nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen
        </p>

        <h4 className="mt-3 text-xl lg:text-xl font-bold text-[#0d1333]">
          Teks Transliterasi: Cara Baca
        </h4>

        <p className="text-xl lg:text-xl leading-[44px] text-slate-1200 font-medium">
           Pa-ter nos-ter, kwi es in che-lis:sangk-ti-fi-ce-tur no-men tu-um: Ad-ve-ni-at reg-num tu-um: fi-at vo-lun-tas tu-a, si-kut in ce-lo et in ter-ra.
           Pa-nem nos-trum ko-ti-di-a-num da no-bis ho-di-e: et di-mit-te no-bis de-bi-ta nos-tra, si-kut et nos di-mit-ti-mus de-bi-to-ri-bus nos-tris: et ne nos in-du-kas in ten-ta-shi-o-nem:
           sed li-be-ra nos a ma-lo. Amen
        </p>
      </div>

      {/* AUDIO BUTTON AREA */}
<div className="flex w-full items-center justify-between rounded-2xl border bg-slate-50 px-6 py-5">

  {/* TEXT */}
  <div className="flex-1 pr-6">
    <p className="text-2xl font-semibold text-slate-1200">
      Putar Audio
    </p>

    <p className="text-xl text-slate-900">
      Tekan ikon untuk mendengarkan doa
    </p>
  </div>

  {/* BUTTON (RIGHT SIDE FIXED) */}
  <div className="flex shrink-0">
    <Button
      size="icon"
      className="h-16 w-16 rounded-full bg-[#030326] hover:bg-[#030326]/90"
      onClick={() => playAudio("/audio/bapa-kami.mp3")}
    >
      <Volume2 size={30} />
    </Button>
  </div>

</div>

    </CardContent>
  </Card>
</div>

        {/* SECTION TITLE */}
        <div className="mt-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0d1333]">
            Petunjuk mendaraskan Doa Bapa Kami
          </h2>

          <p className="mt-4 text-lg lg:text-3xl text-slate-600">
            Berikut adalah kata-kata, arti serta cara mendaraskannya dengan benar
          </p>
        </div>

        {/* SUB TITLE 
        <div className="mt-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0d1333]">
            Huruf TI
          </h2>

          <p className="mt-5 text-xl lg:text-2xl leading-[42px] text-slate-700">
            Dalam bahasa Latin Gerejawi terdapat 2 bentuk vokal rangkap yang memiliki aturan pelafalan khusus, <strong>yaitu AE dan OE</strong>
          </p>
        </div>*/}

        {/* RULE CARD */}
       <Card className="mt-8 rounded-3xl">
  <CardContent className="space-y-8 p-7 lg:p-10">

    <div>
      <h3 className="text-2xl font-bold text-[#0d1333]">
        Perhatikanlah tabel berikut!
      </h3>

      <div className="mt-4 overflow-hidden rounded-2xl border">
        <table className="w-full table-fixed text-left">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-lg font-bold">KATA LATIN</th>
              <th className="p-4 text-lg font-bold">ARTI</th>
              <th className="p-4 text-lg font-bold">CARA MENDARASKAN</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Pater noster, qui es in caelis
  </td>

  <td className="p-4 text-xl">
    Pater → Bapa<br/>
    noster → kami<br/>
    qui → yang<br/>
    es → adalah<br/>
    in → di<br/>
    caelis → surga
  </td>

  <td className="p-4 text-xl">
    pa-ter nos-ter kwi es in ce-lis<br/>
    <strong>Perhatikan:</strong><br/>
    qu → dibaca "kw"<br/>
    ae → dibaca "e"<br/>
    semua huruf dibaca jelas
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Sanctificetur nomen tuum
  </td>

  <td className="p-4 text-xl">
    sanctificetur → dikuduskanlah<br/>
    nomen → nama<br/>
    tuum → milik-Mu
  </td>

  <td className="p-4 text-xl">
    sank-ti-fi-ce-tur no-men tu-um<br/>
    <strong>Perhatikan:</strong><br/>
    c → dibaca "k"<br/>
    semua vokal dibaca jelas
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Adveniat regnum tuum
  </td>

  <td className="p-4 text-xl">
    adveniat → datanglah<br/>
    regnum → kerajaan<br/>
    tuum → milik-Mu
  </td>

  <td className="p-4 text-xl">
    ad-ve-ni-at reg-num tu-um<br/>
    <strong>Perhatikan:</strong><br/>
    semua vokal dibaca terpisah<br/>
    fi-at, tu-um
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Fiat voluntas tua, sicut in caelo et in terra
  </td>

  <td className="p-4 text-xl">
    Fiat → jadilah<br/>
    voluntas → kehendak<br/>
    tua → milik-Mu<br/>
    sicut → seperti<br/>
    caelo → surga<br/>
    terra → bumi
  </td>

  <td className="p-4 text-xl">
    fi-at vo-lun-tas tu-a si-cut in ce-lo et in ter-ra<br/>
    <strong>Perhatikan:</strong><br/>
    ae → dibaca "e"<br/>
    semua vokal dibaca jelas
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Panem nostrum quotidianum da nobis hodie
  </td>

  <td className="p-4 text-xl">
    panem → roti<br/>
    nostrum → milik kami<br/>
    quotidianum → sehari-hari<br/>
    da → berikan<br/>
    nobis → kepada kami<br/>
    hodie → hari ini
  </td>

  <td className="p-4 text-xl">
    pa-nem nos-trum kwo-ti-di-a-num da no-bis ho-di-e<br/>
    <strong>Perhatikan:</strong><br/>
    qu → dibaca "kw"<br/>
    semua vokal dibaca jelas
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Et dimitte nobis debita nostra
  </td>

  <td className="p-4 text-xl">
    et → dan<br/>
    dimitte → ampunilah<br/>
    nobis → kepada kami<br/>
    debita → dosa/hutang<br/>
    nostra → milik kami
  </td>

  <td className="p-4 text-xl">
    et di-mit-te no-bis de-bi-ta nos-tra<br/>
    <strong>Perhatikan:</strong><br/>
    semua huruf dibaca jelas
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Sicut et nos dimittimus debitoribus nostris
  </td>

  <td className="p-4 text-xl">
    sicut → seperti<br/>
    et → juga<br/>
    nos → kami<br/>
    dimittimus → kami mengampuni<br/>
    debitoribus → kepada yang bersalah<br/>
    nostris → milik kami
  </td>

  <td className="p-4 text-xl">
    si-cut et nos di-mit-ti-mus de-bi-to-ri-bus nos-tris<br/>
    <strong>Perhatikan:</strong><br/>
    semua suku kata dibaca jelas
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Et ne nos inducas in tentationem
  </td>

  <td className="p-4 text-xl">
    et → dan<br/>
    ne → jangan<br/>
    nos → kami<br/>
    inducas → engkau membawa<br/>
    tentationem → pencobaan
  </td>

  <td className="p-4 text-xl">
    et ne nos in-du-cas in ten-ta-tsi-o-nem<br/>
    <strong>Perhatikan:</strong><br/>
    ti + vokal → "tsi"<br/>
    tentationem → ten-ta-tsi-o-nem
  </td>
</tr>

<tr className="border-t">
  <td className="p-4 text-xl font-semibold">
    Sed libera nos a malo. Amen.
  </td>

  <td className="p-4 text-xl">
    sed → tetapi<br/>
    libera → bebaskanlah<br/>
    nos → kami<br/>
    a → dari<br/>
    malo → kejahatan<br/>
    amen → amin
  </td>

  <td className="p-4 text-xl">
    sed li-be-ra nos a ma-lo a-men<br/>
    <strong>Perhatikan:</strong><br/>
    semua vokal dibaca jelas
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
  [
    "Pater noster, qui es in caelis",
    "Bapa kami yang ada di surga",
    "pa-ter nos-ter kwi es in ce-lis",
    "/audio/pater-noster-1.mp3"
  ],

  [
    "Sanctificetur nomen tuum",
    "Dikuduskanlah nama-Mu",
    "sank-ti-fi-ce-tur no-men tu-um",
    "/audio/pater-noster-2.mp3"
  ],

  [
    "Adveniat regnum tuum",
    "Datanglah kerajaan-Mu",
    "ad-ve-ni-at reg-num tu-um",
    "/audio/pater-noster-3.mp3"
  ],

  [
    "Fiat voluntas tua, sicut in caelo et in terra",
    "Jadilah kehendak-Mu di atas bumi seperti di dalam surga",
    "fi-at vo-lun-tas tu-a si-cut in ce-lo et in ter-ra",
    "/audio/pater-noster-4.mp3"
  ],

  [
    "Panem nostrum quotidianum da nobis hodie",
    "Berilah kami rezeki (roti) pada hari ini",
    "pa-nem nos-trum kwo-ti-di-a-num da no-bis ho-di-e",
    "/audio/pater-noster-5.mp3"
  ],

  [
    "Et dimitte nobis debita nostra",
    "Ampunilah kesalahan kami",
    "et di-mit-te no-bis de-bi-ta nos-tra",
    "/audio/pater-noster-6.mp3"
  ],

  [
    "Sicut et nos dimittimus debitoribus nostris",
    "Seperti kami pun mengampuni yang bersalah kepada kami",
    "si-kut et nos di-mit-ti-mus de-bi-to-ri-bus nos-tris",
    "/audio/pater-noster-7.mp3"
  ],

  [
    "Et ne nos inducas in tentationem",
    "Jangan masukkan kami ke dalam pencobaan",
    "et ne nos in-du-cas in ten-ta-si-o-nem",
    "/audio/pater-noster-8.mp3"
  ],

  [
    "Sed libera nos a malo. Amen.",
    "Tetapi bebaskanlah kami dari yang jahat. Amin.",
    "sed li-be-ra nos a ma-lo a-men",
    "/audio/pater-noster-9.mp3"
  ],

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
  <Link href="/materi/doa-doa-dasar">
    <Button
      variant="outline"
      className="h-14 rounded-2xl px-6 text-lg font-semibold"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Kembali ke Halaman Modul
    </Button>
  </Link>

  {/* NEXT */}
   <Button
  onClick={handleNext}
  className="h-14 rounded-2xl bg-[#030326] px-8 text-lg font-semibold hover:bg-[#030326]/90"
>
  Latihan 2: Doa Bapa Kami
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
          Latihan 2
        </h2>

        {/*<p className="mt-5 text-lg leading-8 text-slate-900">
          Anda akan mengikuti Latihan 1 mengenai
          pelafalan huruf mati dalam Bahasa Latin
          Gerejawi.
        </p>*/}

        
        <p className="mt-2 text-lg leading-8 text-slate-1100">
          Latihan ini untuk membantu Anda melatih pelafalan dan memahami doa Bapa Kami. Tidak ada Salah dan Benar dalam Latihan dan dapat juga selalu dicoba berkali-kali
        </p>

        {/*<p className="mt-4 text-lg leading-8 text-slate-1200">
          Nilai disini tidak berpengaruh karna hanya latihan saja
        </p>*/}

        <p className="mt-4 text-lg leading-8 text-slate-1100">
          <strong>Untuk melanjutkan tekan tombol "Latihan 2"</strong>
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
        moduleSlug: "doa-doa-dasar",
        lessonSlug: "doa-bapa-kami",
      });
    }

    window.location.href =
      "/materi/doa-doa-dasar/persiapan-latihan-2";
  }}
>
  Latihan 2
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