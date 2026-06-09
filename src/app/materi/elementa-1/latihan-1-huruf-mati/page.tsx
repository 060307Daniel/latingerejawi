"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Lightbulb,
  Clock3,
  RotateCcw,
  BookOpen,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Progress,
} from "@/components/ui/progress";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import {
  Label,
} from "@/components/ui/label";

export default function LatihanHurufMatiPage() {

  const questionBank = [

    {
      id: 1,
      topic: "Huruf C",

      objective:
        "Mengidentifikasi cara baca huruf C pada kata Latin.",

      question:
        "Kata centum dibaca ....",

      hint:
        "Perhatikan huruf yang mengikuti C.",

      options: [
        "kentum",
        "sentum",
        "syentum",
        "centum",
      ],

      answer: 1,

      explanation:
        'Huruf C yang diikuti huruf e dibaca "ce", sehingga CENTUM dibaca SENTUM.',
    },

    {
      id: 2,
      topic: "Huruf C",

      objective:
        "Menafsirkan aturan pelafalan huruf C.",

      question:
        "Perhatikan kata berikut: caedes, coetus, cito, dan centum. Huruf C pada kata-kata tersebut dibaca 'ce' karena ....",

      hint:
        "Perhatikan huruf setelah C.",

      options: [
        "diikuti huruf a",
        "diikuti huruf u",
        "diikuti ae, oe, e, atau i",
        "selalu berada di awal kata",
      ],

      answer: 2,

      explanation:
        'Huruf C dibaca "ce" jika diikuti ae, oe, e, atau i.',
    },

    {
      id: 3,
      topic: "Huruf G",

      objective:
        "Mengidentifikasi cara baca huruf G pada kata Latin.",

      question:
        "Kata agnus dibaca ....",

      hint:
        "Perhatikan gabungan huruf GN.",

      options: [
        "agnus",
        "agnyus",
        "anyus",
        "ayus",
      ],

      answer: 2,

      explanation:
        'Gabungan GN dibaca seperti bunyi "ny", sehingga AGNUS dibaca ANYUS.',
    },

    {
      id: 4,
      topic: "Huruf G",

      objective:
        "Menafsirkan aturan pelafalan huruf G.",

      question:
        'Mengapa kata agnus dibaca "anyus"?',

      hint:
        "Fokus pada huruf setelah G.",

      options: [
        "Karena huruf g diikuti e",
        "Karena huruf g diikuti i",
        "Karena huruf g diikuti n",
        "Karena huruf g berada di akhir kata",
      ],

      answer: 2,

      explanation:
        'Huruf G yang diikuti N menghasilkan bunyi "ny".',
    },

    {
      id: 5,
      topic: "Huruf S",

      objective:
        "Mengidentifikasi cara baca huruf S pada kata Latin.",

      question:
        "Kata scientia dibaca ....",

      hint:
        "Perhatikan gabungan huruf SC.",

      options: [
        "sientia",
        "scientia",
        "syientia",
        "kientia",
      ],

      answer: 2,

      explanation:
        'SC diikuti e atau i dibaca "sy". SCIENTIA dibaca SYIENTIA.',
    },

    {
      id: 6,
      topic: "Huruf S",

      objective:
        "Menafsirkan aturan pelafalan huruf S.",

      question:
        'Huruf S pada kata scientia dibaca "sy" karena ....',

      hint:
        "Lihat kombinasi SC.",

      options: [
        "diikuti huruf n",
        "diikuti huruf t",
        "diikuti ce atau cis",
        "berada di awal kata",
      ],

      answer: 2,

      explanation:
        'SC yang diikuti e atau i dibaca "sy".',
    },

    {
      id: 7,
      topic: "Huruf TI",

      objective:
        "Mengidentifikasi cara baca TI pada kata Latin.",

      question:
        "Kata motio dibaca ....",

      hint:
        "TI bertemu huruf vokal.",

      options: [
        "motio",
        "motsio",
        "motsiyo",
        "mosio",
      ],

      answer: 2,

      explanation:
        'TI yang diikuti vokal dibaca "tsi", sehingga MOTIO dibaca MOTSIYO.',
    },

    {
      id: 8,
      topic: "Huruf TI",

      objective:
        "Menafsirkan aturan pelafalan TI.",

      question:
        'Kata ostium tetap dibaca "ostium" karena ....',

      hint:
        "Perhatikan huruf sebelum TI.",

      options: [
        "huruf ti berada di akhir kata",
        "huruf ti didahului huruf s",
        "huruf ti diikuti huruf m",
        "huruf ti berada di tengah kata",
      ],

      answer: 1,

      explanation:
        'Jika TI didahului huruf S maka tetap dibaca TI.',
    },

  ];

  function shuffleArray<T>(array: T[]) {
    const arr = [...array];

    for (
      let i = arr.length - 1;
      i > 0;
      i--
    ) {
      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [arr[i], arr[j]] = [
        arr[j],
        arr[i],
      ];
    }

    return arr;
  }

  const generateQuestions = () => {
    return shuffleArray(
      questionBank
    ).slice(0, 4);
  };

  const [questions, setQuestions] =
  useState<typeof questionBank>([]);

const [currentQuestion, setCurrentQuestion] =
  useState(0);

const [answers, setAnswers] =
  useState<Record<number, string>>({});

const [submitted, setSubmitted] =
  useState(false);

const [showHint, setShowHint] =
  useState(false);

const [timeLeft, setTimeLeft] =
  useState(30);

const [mounted, setMounted] =
  useState(false);

/* ===================================
   LOAD SOAL ACAK
=================================== */

useEffect(() => {

  setQuestions(
    generateQuestions()
  );

  setMounted(true);

}, []);

/* ===================================
   PINDAH SOAL
=================================== */

const handleNext = () => {

  setShowHint(false);

  if (
    currentQuestion <
    questions.length - 1
  ) {

    setCurrentQuestion(
      (prev) => prev + 1
    );

    setTimeLeft(30);

    return;
  }

  setSubmitted(true);

};

/* ===================================
   TIMER
=================================== */

useEffect(() => {

  if (!mounted) return;

  if (submitted) return;

  if (questions.length === 0) return;

  if (timeLeft <= 0) {

    handleNext();

    return;
  }

  const timer = setTimeout(() => {

    setTimeLeft(
      (prev) => prev - 1
    );

  }, 1000);

  return () =>
    clearTimeout(timer);

}, [
  timeLeft,
  submitted,
  currentQuestion,
  mounted,
  questions.length,
]);

/* ===================================
   LOADING SCREEN
=================================== */

if (
  !mounted ||
  questions.length === 0
) {

  return (

    <main className="min-h-screen flex items-center justify-center">

      <p className="text-slate-500">
        Memuat latihan...
      </p>

    </main>

  );

}

const currentQ =
  questions[currentQuestion];

const selectedAnswer =
  answers[currentQ.id];

const progress =
  ((currentQuestion + 1) /
    questions.length) *
  100;

/* ===================================
   JAWAB SOAL
=================================== */

const handleAnswer = (
  value: string
) => {

  setAnswers((prev) => ({
    ...prev,
    [currentQ.id]: value,
  }));

};

/* ===================================
   RESET
=================================== */

const handleReset = () => {

  setQuestions(
    generateQuestions()
  );

  setAnswers({});

  setSubmitted(false);

  setCurrentQuestion(0);

  setTimeLeft(30);

  setShowHint(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

};

/* ===================================
   HASIL
=================================== */

const correctCount =
  questions.filter((q) => {

    return (
      Number(
        answers[q.id]
      ) === q.answer
    );

  }).length;

const wrongCount =
  questions.length -
  correctCount;

const weakTopics =
  Array.from(
    new Set(
      questions
        .filter(
          (q) =>
            Number(
              answers[q.id]
            ) !== q.answer
        )
        .map(
          (q) => q.topic
        )
    )
  );

  return (

    <main className="min-h-screen bg-[#f5f7fb]">

      {!submitted && (

        <section className="mx-auto max-w-5xl px-6 py-10">

  <div className="mb-10 flex items-center gap-4">

    <Link href="/materi/elementa-1">

      <Button
        variant="outline"
        className="h-12 w-12 rounded-2xl"
      >
        <ArrowLeft size={20} />
      </Button>

    </Link>

    <div>

      <h1 className="text-3xl font-black tracking-tight text-[#0d1333]">
        LATIHAN 1
      </h1>

      <p className="mt-2 text-2xl font-medium text-slate-500">
        Pelafalan Huruf Mati
      </p>

    </div>

  </div>

  <Card className="rounded-3xl border-0 shadow-xl">

  <CardContent className="p-8">

    <div className="flex items-start justify-between">

      {/* KIRI */}
      <div>

        <p className="text-lg font-semibold uppercase tracking-wide text-slate-600">
          Soal
        </p>

        <p className="mt-2 text-4xl font-black text-[#0d1333]">
          {currentQuestion + 1} / {questions.length}
        </p>

      </div>

      {/* KANAN */}
      <div className="text-right">

        <p className="text-lg font-semibold uppercase tracking-wide text-red-600">
          Waktu Tersisa
        </p>

        <div className="mt-2 flex items-center justify-end gap-3 text-red-600">

          <Clock3 size={52} />

          <span className="text-4xl font-black">
            {timeLeft}
          </span>

        </div>

      </div>

    </div>

    <Progress
      value={progress}
      className="mt-8 h-4"
    />

  </CardContent>

</Card>

          <Card className="mt-8 rounded-3xl border-0 shadow-xl">

  <CardContent className="p-10">

    {/*<div className="rounded-3xl bg-slate-100 p-8">

      <p className="text-2xl font-bold uppercase text-slate-800">

        Objektif Pembelajaran

      </p>

      <p className="mt-4 text-2xl font-bold leading-10 text-slate-700">

        {currentQ.objective}

      </p>

    </div>*/}

    <h2 className="mt-10 text-3xl font-black leading-snug text-[#0d1333]">

      {currentQ.question}

    </h2>

    <div className="mt-8">

  <Button
    variant="outline"
    className="
      h-14
      rounded-2xl
      px-6
      text-lg
      font-semibold
    "
    onClick={() =>
      setShowHint(!showHint)
    }
  >

    <Lightbulb size={24} />

    {showHint
      ? "Sembunyikan Petunjuk"
      : "Lihat Petunjuk"}

  </Button>

</div>

{showHint && (

  <div
    className="
      mt-6
      rounded-3xl
      border
      border-yellow-200
      bg-yellow-50
      p-8
    "
  >

    <p className="text-xl font-bold text-yellow-800">
      💡 Petunjuk
    </p>

    <p
      className="
        mt-4
        text-xl
        leading-9
        text-slate-700
      "
    >
      {currentQ.hint}
    </p>

  </div>


)}

    <RadioGroup
      className="mt-8 space-y-5"
      value={answers[currentQ.id]}
      onValueChange={handleAnswer}
    >

      {currentQ.options.map(
        (option, index) => {

          const isSelected =
            selectedAnswer ===
            String(index);

          return (

            <div
              key={index}
              className={`
                rounded-3xl
                border-2
                p-8
                transition-all
                cursor-pointer

                ${
                  isSelected
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 hover:border-red-300"
                }
              `}
            >

              <div className="flex items-center gap-5">

                <RadioGroupItem
                  value={String(index)}
                  id={`${currentQ.id}-${index}`}
                />

                <Label
                  htmlFor={`${currentQ.id}-${index}`}
                  className="
                    w-full
                    cursor-pointer
                    text-xl
                    font-semibold
                    leading-9
                  "
                >

                  {String.fromCharCode(
                    65 + index
                  )}

                  . {option}

                </Label>

              </div>

            </div>

          );
        }
      )}


    </RadioGroup>

    <div className="mt-10 flex justify-end">

      <Button
        onClick={handleNext}
        disabled={
          selectedAnswer ===
          undefined
        }
        className="
          h-16
          rounded-3xl
          bg-red-600
          px-12
          text-xl
          font-bold
          hover:bg-red-700
        "
      >

        Lanjut

      </Button>

    </div>

  </CardContent>

</Card>

        </section>

      )}

            {submitted && (

        <section className="mx-auto max-w-4xl px-4 py-10">

          <Card className="overflow-hidden rounded-3xl border-0 shadow-xl">

            <div className="bg-[#030326] px-10 py-12 text-center text-white">

              <h2 className="text-5xl font-black">
                🎉 Latihan Selesai
              </h2>

              <p className="mt-3 text-lg text-white/80">
                Terima kasih telah berlatih
                pelafalan Latin Gerejawi.
              </p>

            </div>

            <CardContent className="p-8">

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">

                  <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                    Jawaban Benar
                  </p>

                  <p className="mt-3 text-7xl font-bold text-green-700">
                    {correctCount}
                  </p>

                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                  <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
                    Jawaban Salah
                  </p>

                  <p className="mt-3 text-7xl font-bold text-red-700">
                    {wrongCount}
                  </p>

                </div>

              </div>

              {/*<div className="mt-8 rounded-3xl bg-slate-100 p-8">

  <h3 className="text-3xl font-black text-[#0d1333]">

    Objektif Pembelajaran

  </h3>

  <p className="mt-3 text-lg text-slate-600">

    Berikut adalah capaian pembelajaran berdasarkan
    hasil latihan yang telah Anda kerjakan.

  </p>

  <div className="mt-8 space-y-4">

    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="font-bold text-[#0d1333]">

          Mengidentifikasi cara baca huruf C

        </p>

        {weakTopics.includes("Huruf C") ? (

          <span className="font-bold text-red-600">
            🔴 Perlu Ditinjau
          </span>

        ) : (

          <span className="font-bold text-green-600">
            🟢 Tercapai
          </span>

        )}

      </div>

    </div>

    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="font-bold text-[#0d1333]">

          Mengidentifikasi cara baca huruf G

        </p>

        {weakTopics.includes("Huruf G") ? (

          <span className="font-bold text-red-600">
            🔴 Perlu Ditinjau
          </span>

        ) : (

          <span className="font-bold text-green-600">
            🟢 Tercapai
          </span>

        )}

      </div>

    </div>

    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="font-bold text-[#0d1333]">

          Mengidentifikasi cara baca huruf S

        </p>

        {weakTopics.includes("Huruf S") ? (

          <span className="font-bold text-red-600">
            🔴 Perlu Ditinjau
          </span>

        ) : (

          <span className="font-bold text-green-600">
            🟢 Tercapai
          </span>

        )}

      </div>

    </div>

    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="font-bold text-[#0d1333]">

          Mengidentifikasi cara baca huruf TI

        </p>

        {weakTopics.includes("Huruf TI") ? (

          <span className="font-bold text-red-600">
            🔴 Perlu Ditinjau
          </span>

        ) : (

          <span className="font-bold text-green-600">
            🟢 Tercapai
          </span>

        )}

      </div>

    </div>

  </div>

</div>*/}
              <Card className="mt-8 rounded-3xl border-0 shadow-lg">

  <CardContent className="p-8">

    <h3 className="text-3xl font-black text-[#0d1333]">

      Objektif Pembelajaran

    </h3>

    <p className="mt-3 text-lg text-slate-600">

      Berikut adalah capaian pembelajaran berdasarkan
      hasil latihan yang telah Anda kerjakan.

    </p>/

    <div className="mt-8 space-y-5">

      {/* HURUF C */}

      <div className="rounded-2xl bg-slate-50 p-5">

        <div className="flex items-center justify-between">

          <p className="font-bold text-[#0d1333]">

            Mengidentifikasi cara baca huruf C

          </p>

          {weakTopics.includes("Huruf C") ? (

            <span className="font-bold text-red-600">
              🔴 Perlu Ditinjau
            </span>

          ) : (

            <span className="font-bold text-green-600">
              🟢 Tercapai
            </span>

          )}

        </div>

        {weakTopics.includes("Huruf C") && (

          <p className="mt-3 text-slate-600">

            Huruf C dibaca "ce" apabila
            diikuti huruf ae, oe, e, atau i.

          </p>

        )}

      </div>

      {/* HURUF G */}

      <div className="rounded-2xl bg-slate-50 p-5">

        <div className="flex items-center justify-between">

          <p className="font-bold text-[#0d1333]">

            Mengidentifikasi cara baca huruf G

          </p>

          {weakTopics.includes("Huruf G") ? (

            <span className="font-bold text-red-600">
              🔴 Perlu Ditinjau
            </span>

          ) : (

            <span className="font-bold text-green-600">
              🟢 Tercapai
            </span>

          )}

        </div>

        {weakTopics.includes("Huruf G") && (

          <p className="mt-3 text-slate-600">

            Gabungan GN dibaca seperti
            bunyi "ny".

          </p>

        )}

      </div>

      {/* HURUF S */}

      <div className="rounded-2xl bg-slate-50 p-5">

        <div className="flex items-center justify-between">

          <p className="font-bold text-[#0d1333]">

            Mengidentifikasi cara baca huruf S

          </p>

          {weakTopics.includes("Huruf S") ? (

            <span className="font-bold text-red-600">
              🔴 Perlu Ditinjau
            </span>

          ) : (

            <span className="font-bold text-green-600">
              🟢 Tercapai
            </span>

          )}

        </div>

        {weakTopics.includes("Huruf S") && (

          <p className="mt-3 text-slate-600">

            SC yang diikuti huruf e atau i
            dibaca "sy".

          </p>

        )}

      </div>

      {/* HURUF TI */}

      <div className="rounded-2xl bg-slate-50 p-5">

        <div className="flex items-center justify-between">

          <p className="font-bold text-[#0d1333]">

            Mengidentifikasi cara baca huruf TI

          </p>

          {weakTopics.includes("Huruf TI") ? (

            <span className="font-bold text-red-600">
              🔴 Perlu Ditinjau
            </span>

          ) : (

            <span className="font-bold text-green-600">
              🟢 Tercapai
            </span>

          )}

        </div>

        {weakTopics.includes("Huruf TI") && (

          <p className="mt-3 text-slate-600">

            TI yang diikuti vokal dibaca
            "tsi", kecuali jika didahului
            huruf S, T, atau X.

          </p>

        )}

      </div>

    </div>

  </CardContent>

</Card>

              <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

                <h3 className="text-lg font-bold text-yellow-800">
                  💡 Saran Belajar
                </h3>

                <p className="mt-3 leading-8 text-slate-700">

                  Ulangi latihan beberapa
                  kali untuk memperoleh
                  kombinasi soal yang
                  berbeda.

                </p>

                <p className="mt-3 leading-8 text-slate-700">

                  Semakin sering berlatih,
                  semakin mudah mengenali
                  pola pelafalan Latin
                  Gerejawi.

                </p>

              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

                <Button
                  onClick={handleReset}
                  className="
h-16
rounded-3xl
px-12
text-lg
font-bold
"
                >

                  <RotateCcw
                    size={18}
                  />

                  Coba Lagi

                </Button>

                <Link href="/materi/elementa-1">

                  <Button
  variant="outline"
  className="
    h-16
    rounded-3xl
    px-12
    text-xl
    font-bold
  "
>

                    <BookOpen
                      size={18}
                    />

                    Kembali ke Materi

                  </Button>

                </Link>

              </div>

            </CardContent>

          </Card>

        </section>

      )}

      <footer className="mt-16 border-t py-10 text-center text-slate-500">

        <p>
          © 2026 Latin Gerejawi.
          Ad Maiorem Dei Gloriam.
        </p>

        <p className="mt-2">
          Untuk Kemuliaan Tuhan —
          Belajar Bahasa Latin Gereja Katolik
        </p>

      </footer>

    </main>

  );
}