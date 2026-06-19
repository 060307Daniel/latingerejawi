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

import { trackLesson } from "@/lib/progress/track-lesson";

export default function LatihanHurufHidupPage() {

  const questionBank = [
  {
    id: 1,
    topic: "Vokal Dasar",
    objective: "Mengidentifikasi huruf hidup Latin",
    question: "Huruf hidup dalam bahasa Latin Gerejawi adalah …",
    hint: "Perhatikan semua vokal dasar Latin.",
    options: [
      "A, B, C, D, E",
      "A, E, I, O, U",
      "A, E, F, G, H",
      "A, I, K, L, M",
    ],
    answer: 1,
    explanation: "Huruf hidup Latin adalah A, E, I, O, U.",
  },
  {
    id: 2,
    topic: "AE OE",
    objective: "Memahami pelafalan AE",
    question: "Huruf AE dalam bahasa Latin Gerejawi dibaca …",
    hint: "AE bukan dibaca dua huruf.",
    options: ["A-E", "AE", "E", "A"],
    answer: 2,
    explanation: "AE dibaca sebagai bunyi E.",
  },
  {
    id: 3,
    topic: "AE OE",
    objective: "Memahami pelafalan OE",
    question: "Huruf OE dalam bahasa Latin Gerejawi dibaca …",
    hint: "OE bukan dipisah.",
    options: ["O-E", "O", "E", "OE"],
    answer: 2,
    explanation: "OE dibaca sebagai bunyi E.",
  },
  {
    id: 4,
    topic: "Vokal Tunggal",
    objective: "Mengidentifikasi vokal A",
    question: "Huruf vokal tunggal A dibaca …",
    hint: "A tidak berubah bunyi.",
    options: ["A", "AE", "E", "O"],
    answer: 0,
    explanation: "A tetap dibaca A.",
  },
  {
    id: 5,
    topic: "Vokal Tunggal",
    objective: "Mengidentifikasi vokal E",
    question: "Huruf vokal tunggal E dibaca …",
    hint: "E tetap E.",
    options: ["I", "E", "AE", "OE"],
    answer: 1,
    explanation: "E tetap dibaca E.",
  },
  {
    id: 6,
    topic: "Vokal Tunggal",
    objective: "Mengidentifikasi vokal I",
    question: "Huruf vokal tunggal I dibaca …",
    hint: "I tidak berubah.",
    options: ["I", "E", "A", "O"],
    answer: 0,
    explanation: "I tetap dibaca I.",
  },
  {
    id: 7,
    topic: "AE OE",
    objective: "Mengklasifikasi OE",
    question: "Huruf OE merupakan …",
    hint: "OE terdiri dari dua vokal.",
    options: [
      "huruf mati",
      "vokal tunggal",
      "vokal rangkap",
      "konsonan",
    ],
    answer: 2,
    explanation: "OE adalah vokal rangkap.",
  },
  {
    id: 8,
    topic: "AE OE",
    objective: "Menyamakan AE dan OE",
    question:
      "Huruf AE dan OE dalam Latin Gerejawi sama-sama dibaca …",
    hint: "Keduanya menjadi satu bunyi.",
    options: ["A", "O", "E", "I"],
    answer: 2,
    explanation: "AE dan OE sama-sama dibaca E.",
  },

  // INTERPRETING
  {
    id: 9,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata LAETUS dibaca …",
    hint: "AE dibaca E.",
    options: ["La-e-tus", "Le-tus", "La-tus", "Lo-tus"],
    answer: 1,
    explanation: "LAETUS dibaca LETUS.",
  },
  {
    id: 10,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata TERRAE dibaca …",
    hint: "AE dibaca E.",
    options: ["Ter-ra-e", "Ter-re", "Te-rae", "Ta-re"],
    answer: 1,
    explanation: "TERRAE dibaca TERRE.",
  },
  {
    id: 11,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata POENA dibaca …",
    hint: "OE dibaca E.",
    options: ["Po-e-na", "Pe-na", "Pa-na", "Po-na"],
    answer: 1,
    explanation: "POENA dibaca PENA.",
  },
  {
    id: 12,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata PROELIUM dibaca …",
    hint: "OE dibaca E.",
    options: ["Pro-e-li-um", "Pre-li-um", "Pro-li-um", "Pro-e-lum"],
    answer: 1,
    explanation: "PROELIUM dibaca PRELIUM.",
  },
  {
    id: 13,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata CAELUM dibaca …",
    hint: "AE dibaca E.",
    options: ["Ca-e-lum", "Ce-lum", "Ca-lum", "Coe-lum"],
    answer: 1,
    explanation: "CAELUM dibaca CELUM.",
  },
  {
    id: 14,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata FOEDUS dibaca …",
    hint: "OE dibaca E.",
    options: ["Fo-e-dus", "Fe-dus", "Fa-dus", "Foe-dus"],
    answer: 1,
    explanation: "FOEDUS dibaca FEDUS.",
  },
  {
    id: 15,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata COENA dibaca …",
    hint: "OE dibaca E.",
    options: ["Co-e-na", "Ce-na", "Co-na", "Ca-na"],
    answer: 1,
    explanation: "COENA dibaca CENA.",
  },
  {
    id: 16,
    topic: "Interpretasi",
    objective: "Membaca kata Latin",
    question: "Kata PRAECEPTUM dibaca …",
    hint: "AE dibaca E.",
    options: ["Pra-e-cep-tum", "Pre-sep-tum", "Pra-cep-tum", "Pro-e-cep-tum"],
    answer: 1,
    explanation: "PRAECEPTUM dibaca PRECEPTUM.",
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

const [progressSaved, setProgressSaved] =
  useState(false);

const [showWarning, setShowWarning] = useState(false);
const [showQuizPopup, setShowQuizPopup] = useState(false);


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

useEffect(() => {

  if (!submitted) return;

  if (progressSaved) return;

  const saveProgress = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user?.id) return;

      await trackLesson({
        userId: user.id,
        moduleSlug: "elementa-1",
        lessonSlug: "latihan-2-huruf-hidup",
      });

      setProgressSaved(true);

      console.log(
        "✅ Progress latihan tersimpan"
      );

    } catch (err) {

      console.log(
        "❌ Gagal simpan progress",
        err
      );

    }

  };

  saveProgress();

}, [
  submitted,
  progressSaved,
]);


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

const selectedAnswer = answers[currentQ.id] ?? "";

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

const competencyStatus = {
  "Vokal Dasar": true,
  "AE OE": true,
  "Interpretasi": true,
};

// hitung ulang berdasarkan soal
questions.forEach((q) => {
  const userAnswer = Number(answers[q.id]);

  const isCorrect = userAnswer === q.answer;

  if (!isCorrect) {
    competencyStatus[q.topic as keyof typeof competencyStatus] = false;
  }
});

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

  const handleQuizClick = () => {
  // kalau mau pakai syarat waktu / progress bisa di sini
  setShowWarning(true);
};


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
        LATIHAN 2
      </h1>

      <p className="mt-2 text-2xl font-medium text-slate-500">
        Pelafalan Huruf Hidup
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
      value={answers[currentQ.id] ?? ""}
      onValueChange={handleAnswer}
    >

      {currentQ.options.map(
        (option, index) => {

          const isSelected =
  selectedAnswer === String(index);

          return (

            <div
              key={index}
              onClick={() => handleAnswer(String(index))}
              className={`
                rounded-3xl
                border-2
                p-8
                transition-all
                cursor-pointer
                

                ${
                  isSelected
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-slate-200 hover:border-yellow-400"
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

              
              <Card className="mt-8 rounded-3xl border-0 shadow-lg">
  <CardContent className="p-8">

    <h3 className="text-3xl font-black text-[#0d1333]">
      Objektif Pembelajaran
    </h3>

    <p className="mt-3 text-lg text-slate-600">
      Berikut adalah capaian pembelajaran berdasarkan penguasaan vokal Latin Gerejawi (AE, OE, dan vokal dasar).
    </p>

    <div className="mt-8 space-y-5">

      {[
  {
    topic: "Vokal Dasar",
    title: "Mengidentifikasi vokal dasar Latin (A, E, I, O, U)",
    feedback: "Vokal Latin terdiri dari A, E, I, O, U dan tidak berubah pelafalannya.",
  },
  {
    topic: "AE OE",
    title: "Memahami pelafalan AE dan OE",
    feedback: "AE dan OE dalam Latin Gerejawi dibaca sebagai bunyi 'E'.",
  },
  {
    topic: "Interpretasi",
    title: "Membaca dan menginterpretasi kata Latin sederhana",
    feedback: "Kata Latin dibaca dengan aturan AE → E dan OE → E dalam pengucapan Gerejawi.",
  },
].map((c) => {
  const isWrong = !competencyStatus[c.topic as keyof typeof competencyStatus];

  return (
    <div key={c.topic} className="rounded-2xl bg-slate-50 p-5">

      <div className="flex items-center justify-between">

        <p className="font-bold text-[#0d1333]">
          {c.title}
        </p>

        {isWrong ? (
          <span className="font-bold text-red-600">
            🔴 Perlu Ditinjau
          </span>
        ) : (
          <span className="font-bold text-green-600">
            🟢 Tercapai
          </span>
        )}

      </div>

      {isWrong && (
        <p className="mt-3 text-slate-600">
          {c.feedback}
        </p>
      )}

    </div>
  );
})}

    </div>

  </CardContent>
</Card>
            <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

                <h3 className="text-xl font-bold text-yellow-800">
                  💡 Doa Singkat Mohon Bimbingan Roh Kudus
                </h3>

                <p className="text-lg mt-3 leading-8 text-slate-800">

                 "Datanglah, ya Roh Kudus, penuhi hati umat-Mu, dan nyalakanlah api cinta-Mu di dalam kami.
                 Utuslah Roh-Mu, maka kami akan diciptakan kembali, dan Engkau akan membaharui muka bumi. Amin."

                </p>

              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center sm:gap-6">

  <Link href="/materi/elementa-1">
    <Button
      variant="outline"
      className="
        h-16
        w-full
        sm:w-auto
        rounded-3xl

         border-1
  border-slate-400
  text-slate-800



        px-12
        text-xl
        font-bold
      "
    >
      Kembali ke Materi
    </Button>
  </Link>

  <Button
    onClick={handleReset}
    className="
      h-16
      w-full
      sm:w-auto
      rounded-3xl
      px-12
      text-xl
      font-bold
      bg-red-600 hover:bg-red-700
    "
  >
    Coba Lagi
  </Button>

    <Button
    onClick={handleQuizClick}
      className="
        h-16
        w-full
        sm:w-auto
        rounded-3xl
        px-12
        text-xl
        font-bold
      "
    >
      Quiz 2
    </Button>

</div>
            </CardContent>

          </Card>

        </section>

      )}


{showWarning && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">

    <Card className="w-full max-w-xl rounded-3xl shadow-2xl">
      <CardContent className="p-8 text-center">

        <div className="mb-4 text-6xl">⏳</div>

        <h2 className="text-3xl font-bold text-[#0d1333]">
          Siap mengikut kuis?
        </h2>

        <p className="mt-3 text-xl leading-8 text-slate-900">
           Anda akan dibawah ke halaman informasi quiz
        </p>

        
        <p className="text-xl leading-8 text-slate-900">
           <strong>Latihan masih bisa dilakukan lagi jika belum siap</strong>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Button
            variant="outline"
            className="h-14 rounded-2xl px-8 text-lg"
            onClick={() => setShowWarning(false)}
          >
            Kembali
          </Button>

          <Button
            className="h-14 rounded-2xl bg-[#030326] px-8 text-lg"
            onClick={() => {
               window.location.href =
                "/materi/elementa-1/persiapan-quiz-2";
            }}
          >
            Lanjut ke Quiz
          </Button>

        </div>

      </CardContent>
    </Card>

  </div>
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