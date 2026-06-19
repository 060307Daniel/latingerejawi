"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ArrowLeft, Clock3, RotateCcw } from "lucide-react";

import { useQuizCooldown } from "@/hooks/useQuizCooldown";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Question = {
  id: number;
  type: "multiple" | "speech";
  topic: string;
  question: string;
  options?: string[];
  answer?: number;
  targetWord?: string;
  accepted?: string[];
};

export default function QuizDoaBapaKamiPage() {

   const {
    blocked,
    cooldownLeft,
    registerAttempt,
  } = useQuizCooldown("quiz-2-bapa-kami");
  
  
  const minutes = Math.floor(cooldownLeft / 60000);
  const seconds = Math.floor((cooldownLeft % 60000) / 1000);
  

  const questionBank = [
  // ================= C2 – INTERPRETING =================
  {
    id: 1,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata Pater berarti ....",
    options: ["Putra", "Roh Kudus", "Bapa", "Surga"],
    answer: 2,
  },
  {
    id: 2,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata noster berarti ....",
    options: ["Kami", "Nama", "Kerajaan", "Kehendak"],
    answer: 0,
  },
  {
    id: 3,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata caelis berarti ....",
    options: ["Bumi", "Surga", "Kerajaan", "Langit malam"],
    answer: 1,
  },
  {
    id: 4,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata nomen berarti ....",
    options: ["Nama", "Bapa", "Dosa", "Hari"],
    answer: 0,
  },
  {
    id: 5,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata regnum berarti ....",
    options: ["Kehendak", "Kerajaan", "Roti", "Pencobaan"],
    answer: 1,
  },
  {
    id: 6,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata voluntas berarti ....",
    options: ["Kehendak", "Nama", "Kerajaan", "Surga"],
    answer: 0,
  },
  {
    id: 7,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata panem berarti ....",
    options: ["Air", "Makanan", "Roti", "Buah"],
    answer: 2,
  },
  {
    id: 8,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata hodie berarti ....",
    options: ["Besok", "Hari ini", "Kemarin", "Sekarang"],
    answer: 1,
  },
  {
    id: 9,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata debita berarti ....",
    options: ["Nama", "Kerajaan", "Dosa atau hutang", "Kehendak"],
    answer: 2,
  },
  {
    id: 10,
    type: "multiple",
    topic: "Arti Kata",
    question: "Kata malo berarti ....",
    options: ["Kebaikan", "Kerajaan", "Surga", "Kejahatan"],
    answer: 3,
  },

  // ================= C3 – APPLYING =================
  {
    id: 11,
    type: "multiple",
    topic: "Pelafalan",
    question: "Jika menemukan gabungan huruf qu pada kata qui, cara membacanya adalah ....",
    options: ["ku", "kw", "q", "ki"],
    answer: 1,
  },
  {
    id: 12,
    type: "multiple",
    topic: "Pelafalan",
    question: "Gabungan huruf ae pada kata caelis dibaca ....",
    options: ["ae", "ai", "e", "a"],
    answer: 2,
  },
  {
    id: 13,
    type: "multiple",
    topic: "Pelafalan",
    question: "Kata tentationem dibaca ....",
    options: ["ten-ta-ti-o-nem", "ten-ta-si-o-nem", "ten-ta-tsi-o-nem", "ten-ta-ci-o-nem"],
    answer: 2,
  },
  {
    id: 14,
    type: "multiple",
    topic: "Pelafalan",
    question: 'Mengapa kata tuum dibaca "tu-um"?',
    options: [
      "Karena huruf u kedua tidak dibaca",
      "Karena vokal digabung",
      "Karena setiap vokal dibaca jelas",
      "Karena dibaca cepat"
    ],
    answer: 2,
  },
  {
    id: 15,
    type: "multiple",
    topic: "Pelafalan",
    question: "Saat membaca doa Bapa Kami, huruf-huruf dalam kata Latin harus ....",
    options: [
      "Banyak dihilangkan",
      "Dibaca jelas sesuai tulisan",
      "Diganti ke bahasa Indonesia",
      "Dipersingkat"
    ],
    answer: 1,
  },
  {
    id: 16,
    type: "multiple",
    topic: "Pelafalan",
    question: "Jika menemukan kata quotidianum, bunyi awal yang benar adalah ....",
    options: ["ko", "cho", "kwo", "kuo"],
    answer: 2,
  },
  {
    id: 17,
    type: "multiple",
    topic: "Pelafalan",
    question: "Kata caelo dibaca ....",
    options: ["ka-e-lo", "cai-lo", "ce-lo", "ka-lo"],
    answer: 2,
  },
  {
    id: 18,
    type: "multiple",
    topic: "Pelafalan",
    question: "Saat mendaraskan Adveniat, setiap vokal harus ....",
    options: ["Digabung", "Dihilangkan", "Dibaca terpisah dan jelas", "Dipercepat"],
    answer: 2,
  },
  {
    id: 19,
    type: "multiple",
    topic: "Pelafalan",
    question: "Kata Sanctificetur mengajarkan bahwa huruf c pada kata tersebut dibaca ....",
    options: ["s", "sy", "k", "c"],
    answer: 2,
  },
  {
    id: 20,
    type: "multiple",
    topic: "Pelafalan",
    question: "Ketika membaca doa Bapa Kami dalam bahasa Latin, tujuan memahami aturan pelafalan adalah agar ....",
    options: [
      "Dapat membaca dan mendaraskan doa dengan benar",
      "Cepat menghafal tanpa memahami",
      "Tidak perlu memahami arti",
      "Mengubah doa ke bahasa lain"
    ],
    answer: 0,
  },

  // ================= C1 – SPEECH =================
  {
  id: 21,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Pater'",
  targetWord: "pater",
  accepted: [
    "pater",
    "pa ter",
    "butter",
  ],
},
{
  id: 22,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kalimat 'Qui Tollis'",
  targetWord: "qui tollis",
  accepted: [
    "qui tollis",
    "kwi tollis",
    "quieto Liszt",
    "kwi tolis",
  ],
},
{
  id: 23,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Caelis'",
  targetWord: "caelis",
  accepted: [
    "celis",
    "ce lis",
    "Cialis",
    "Jalisse",
    "Cervis",
  ],
},
{
  id: 24,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Sanctificetur'",
  targetWord: "sanctificetur",
  accepted: [
    "sanktificetur",
    "sank ti fi ce tur",
    "santificatore",
    "Santi Fischer tour",
    "San tifi Sector",
    "santi pisciaturo",
    " santi pisciatore"
  ],
},
{
  id: 25,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Adveniat'",
  targetWord: "adveniat",
  accepted: [
    "adveniat",
    "ad ve ni at",
    "Atena",
    "astenia",
    "athenia",
  ],
},
{
  id: 26,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Fiat'",
  targetWord: "fiat",
  accepted: [
    "fiat",
    "fi at",
    "fi-at",
  ],
},
{
  id: 27,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Quotidianum'",
  targetWord: "quotidianum",
  accepted: [
    "quotidianum",
    "kwo tidianum",
    "kwo ti di a num",
    "Quotidiano",
    "kwotidianum",
    "call titanium",
    "call TDM",
    "call tina",
    "call adriana",
  ],
},
{
  id: 28,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Hodie'",
  targetWord: "hodie",
  accepted: [
    "hodie",
    "ho di e",
    "ho-di-e",
    "Holiday",
  ],
},
{
  id: 29,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Tentationem'",
  targetWord: "tentationem",
  accepted: [
    "tentationem",
    "ten ta tsi o nem",
    "tentatsionem",
    "ten-ta-tsi-o-nem",
    "tentacion name",
    "tentazione",
  ],
},
{
  id: 30,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Nomen Tuum'",
  targetWord: "Nomen Tuum",
  accepted: [
    "nomen tuum",
    "nomento home",
    "nomentum",
  ],
},

    
  ];

  const getCategory = (id: number) => {
  if (id >= 1 && id <= 10) return "C2";
  if (id >= 11 && id <= 20) return "C3";
  if (id >= 21 && id <= 30) return "C1";
  return "";
};

  const generateQuestions = () => {
  const shuffle = (arr: any[]) =>
    [...arr].sort(() => Math.random() - 0.5);

  const c2 = questionBank.filter(q => q.type === "multiple" && q.id >= 1 && q.id <= 10);
  const c3 = questionBank.filter(q => q.type === "multiple" && q.id >= 11 && q.id <= 20);
  const speech = questionBank.filter(q => q.type === "speech");

  const selectedC2 = shuffle(c2).slice(0, 3);
  const selectedC3 = shuffle(c3).slice(0, 3);
  const selectedSpeech = shuffle(speech).slice(0, 4);

  return [...selectedC2, ...selectedC3, ...selectedSpeech];
};

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(600);
  const [started, setStarted] = useState(false);

  const [showReview, setShowReview] = useState(false);

  const [saving, setSaving] = useState(false);

  const isCorrect = (q: any, answer: any) => {
    if (q.type === "multiple") {
      return Number(answer) === q.answer;
    }

    if (q.type === "speech") {
  const text = (answer || "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim();

  return q.accepted.some((a: string) => {
    const normalized = a.toLowerCase().trim();
    return text === normalized;
  });
}

    return false;
  };

  const startSpeechRecognition = (id: number) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser tidak support speech recognition");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "it-IT";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
  const raw = event.results[0][0].transcript.toLowerCase();

  const cleaned = raw
    .replace(/[^a-z\s]/g, "")
    .trim();

  const question = questions.find(q => q.id === id);

  let finalAnswer = cleaned;

  if (question?.type === "speech") {
    const matched = question.accepted?.find(a => {
      const normA = a.toLowerCase().replace(/[^a-z]/g, "");
      const normB = cleaned.replace(/[^a-z]/g, "");
      return normB.includes(normA) || normA.includes(normB);
    });

    if (matched) {
      finalAnswer = question.targetWord || matched;
    }
  }

  setAnswers(prev => ({
    ...prev,
    [id]: finalAnswer,
  }));
};

    recognition.start();
  };

  // ✅ TARUH INI DI SINI
  const saveResult = async (passed: boolean) => {


    if (saving) return;

    setSaving(true);

    try {

      if (!passed) return;

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user?.id) return;

      await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          moduleSlug: "doa-doa-dasar",
          lessonSlug: "quiz-2-bapa-kami",
        }),
      });

    } finally {
      setSaving(false);
    }
  };



  useEffect(() => {
    setQuestions(generateQuestions());
    setStarted(true);
  }, []);

  useEffect(() => {
 if (timeLeft <= 0) {
  const correctCount = questions.filter(q =>
    isCorrect(q, answers[q.id])
  ).length;

  const score = Math.round(
    (correctCount / questions.length) * 100
  );

  const passed = score >= 70;

  registerAttempt(passed);

  saveResult(passed).then(() =>
    setSubmitted(true)
  );

  return;
}

    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, started, submitted]);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[current].id]: Number(value),
    }));
  };

  const goToQuestion = (index: number) => {
    setCurrent(index);
  };


  const handleNext = () => {
    if (submitted) return;
    if (current < questions.length - 1) {
      setCurrent(p => p + 1);
    } else {
      const correctCount = questions.filter(q =>
        isCorrect(q, answers[q.id])
      ).length;

      const score = Math.round((correctCount / questions.length) * 100);

   const passed = score >= 70;

registerAttempt(passed);

saveResult(passed).then(() =>
  setSubmitted(true)
);
    }
  };

  const currentQ = questions[current];
  const selected = answers[currentQ?.id];

  const correctCount =
  questions?.filter(q => isCorrect(q, answers[q.id])).length ?? 0;
  const wrongCount = (questions?.length ?? 0) - correctCount;

  const handleReset = () => {
    setQuestions(generateQuestions());
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setTimeLeft(600);
  };

  const isWarningTime = timeLeft <= 300;

  const isLabelRed = timeLeft <= 300;

   if (blocked) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
      <div className="w-full max-w-md">
        <Card className="rounded-3xl border-0 shadow-xl">
          <CardContent className="p-8 text-center space-y-6">

            <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <Clock3 className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-red-600">
              Terlalu banyak percobaan gagal
            </h1>

            <p className="text-slate-600 text-base md:text-lg">
              Anda sudah mencapai 3x batas gagal Silakan tunggu sebelum mencoba lagi.
            </p>

            <div className="rounded-2xl bg-slate-50 border p-4">
              <p className="text-sm text-slate-500">Waktu tunggu tersisa</p>
              <p className="text-2xl font-black text-slate-900">
                {minutes} menit {seconds} detik
              </p>
            </div>
            
            <Link href="/materi/doa-doa-dasar">
              <Button className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-black">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Kembali ke Materi
              </Button>
            </Link>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}

  if (!started || questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Memuat quiz...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {!submitted && (
        <section className="mx-auto max-w-7xl px-4 py-10">

          {/* HEADER */}
          <div className="mb-6 flex items-center gap-4">
            <Link href="/materi/doa-doa-dasar">
              <Button variant="outline" className="h-14 w-14 rounded-2xl">
                <ArrowLeft />
              </Button>
            </Link>

            <h1 className="text-4xl font-black">QUIZ DOA BAPA KAMI</h1>
          </div>

          {/* CARD INFO */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              {/* LEFT */}
              <div>
                <p className="text-xl font-bold text-slate-1200">
                  Soal {current + 1} / {questions.length}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {questions.map((q, i) => {
                    const isCurrent = i === current;
                    const isAnswered = answers[q.id] !== undefined;

                    let style = "border-2 border-red-600 text-red-600";

                    if (isAnswered) style = "bg-yellow-400 text-black border-yellow-400";
                    if (isCurrent) style = "bg-red-600 text-white border-red-600";

                    return (
                      <button
                        key={q.id}
                        onClick={() => goToQuestion(i)}
                        className={`w-10 h-10 rounded-xl font-bold ${style}`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT TIMER (FIXED ALIGNMENT) */}
              <div className="flex flex-col items-end">
                <p className={`text-xl font-bold ${isLabelRed ? "text-red-600" : "text-black"}`}>
                  WAKTU TERSISA
                </p>

                <div className={`flex items-center gap-2 text-4xl font-black ${isWarningTime ? "text-red-600" : "text-black"}`}>
                  <Clock3 />
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* QUESTION */}
          <Card className="mt-8 rounded-3xl border-0 shadow-xl">
            <CardContent className="p-10">

              <h2 className="text-3xl font-black text-[#0d1333]">
  {currentQ.question}
</h2>

{/* MULTIPLE */}
{currentQ.type === "multiple" && currentQ.options && (
  <RadioGroup
    className="mt-8 space-y-5"
    value={selected?.toString() ?? ""}
    onValueChange={handleAnswer}
  >
    {currentQ.options.map((option, index) => {
      const isSelected = selected === index;

      return (
        <div
          key={index}
          onClick={() => handleAnswer(String(index))}
          className={`rounded-3xl border-2 p-8 cursor-pointer transition-all ${
            isSelected
              ? "border-yellow-500 bg-yellow-50"
              : "border-slate-200 hover:border-yellow-400"
          }`}
        >
          <div className="flex items-center gap-5">
            <RadioGroupItem value={String(index)} />
            <Label className="text-xl font-semibold w-full cursor-pointer">
              {String.fromCharCode(65 + index)}. {option}
            </Label>
          </div>
        </div>
      );
    })}
  </RadioGroup>
)}

{/* SPEECH */}
{currentQ.type === "speech" && (
  <div className="mt-8 flex flex-col items-center text-center space-y-6">

    {/* KATA YANG HARUS DILAFALKAN *  
    <p className="text-4xl font-black text-[#0d1333]">
      {currentQ.question}
    </p>

    {/* INSTRUKSI FIX (TIDAK DOBEL LAGI) */}
    <p className="text-lg text-slate-600">
      Tekan tombol <b>Mulai Rekam</b> untuk melafalkan kata di atas
    </p>

    {/* BUTTON */}
    <Button
      className="h-16 px-10 rounded-2xl bg-black text-white text-lg"
      onClick={() => startSpeechRecognition(currentQ.id)}
    >
      🎤 Mulai Rekam
    </Button>

    {/* HASIL */}
    {answers[currentQ.id] && (
      <p className="text-green-700 font-bold text-lg">
        Hasil: {answers[currentQ.id]}
      </p>
    )}

  </div>
)}


                  <div className="mt-10 flex justify-end">
                    <Button
                      onClick={handleNext}
                      disabled={selected === undefined}
                      className="h-16 px-12 text-xl font-bold rounded-3xl bg-red-600 hover:bg-red-700"
                    >
                      Lanjut
                    </Button>
                  </div>

                </CardContent>
          </Card>

        </section>
      )}

      {/* RESULT */}
      {submitted && (() => {

        const categoryMap: Record<string, { correct: number; total: number }> = {};

questions.forEach((q) => {
  const c = getCategory(q.id); // <-- penting

  if (!categoryMap[c]) {
    categoryMap[c] = { correct: 0, total: 0 };
  }

  categoryMap[c].total += 1;

  if (isCorrect(q, answers[q.id])) {
    categoryMap[c].correct += 1;
  }
});

const weakCategories = Object.keys(categoryMap).filter(
  (c) => categoryMap[c].correct < categoryMap[c].total
);


        const score = Math.round((correctCount / questions.length) * 100);

        const passed = score >= 70;

         const getGrade = (score: number) => {
          if (score >= 90) return { label: "A", color: "text-green-600" };
          if (score >= 80) return { label: "B", color: "text-blue-600" };
          if (score >= 70) return { label: "C", color: "text-yellow-600" };
          return { label: "D", color: "text-red-600" };
        };


        const grade = getGrade(score);

        const getLevelLabel = (grade: string) => {
          switch (grade) {
            case "A":
              return "WOW! Rupanya Kamu Seorang Ahli";
            case "B":
              return "Mantap, Hasil Kamu Baik!";
            case "C":
              return "Hampir!! Anda harus mengulang lagi";
            default:
              return "Maaf ya, anda masih perlu untuk mengulang lagi :(";
          }
        };

        const levelLabel = getLevelLabel(grade.label); 

        return (
          <section className="mx-auto max-w-4xl px-4 py-12">

            {/* HEADER */}
            <div className="text-center mb-12">

              <div className="text-7xl mb-4">
                {score >= 90 ? "🏆" : score >= 70 ? "🎉" : "📚"}
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-[#0d1333]">
                Hasil Quiz
              </h2>

              <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
                Berikut adalah performa Anda pada quiz ini
              </p>

            </div>

            {/* SUMMARY CARD */}
            <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">

              <div className="relative overflow-hidden p-10 md:p-14 text-center bg-gradient-to-br from-slate-50 to-white">

                <div className="p-10 md:p-14 text-center bg-gradient-to-b from-white to-slate-50" />

                <p className="text-4xl uppercase tracking-widest text-slate-800 font-semibold">
                  Skor Akhir
                </p>

                <div className="mt-4 flex flex-col items-center justify-center">

                  {/* GRADE BESAR */}
                  <h1 className={`text-[120px] md:text-[180px] leading-none font-black ${grade.color}`} >
                    {grade.label}
                  </h1>

                  {/* NUMERIC SCORE (tanpa %) */}
                  <div className="mt-5 inline-flex items-center rounded-full bg-white px-6 py-3 shadow-md border">
                    <span className="text-xl font-bold text-slate-800">
                      Nilai {score}
                    </span>
                  </div>

                  {/* LEVEL TEXT */}
                  <p className={`mt-2 text-xl font-bold ${grade.color}`}>
                    {levelLabel}
                  </p>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">

                  <div className="rounded-3xl bg-white shadow-md p-6">
                    <p className="text-xl text-slate-800">Benar</p>
                    <p className="text-5xl font-black text-green-600">{correctCount}</p>
                  </div>

                  <div className="rounded-3xl bg-white shadow-md p-6">
                    <p className="text-xl text-slate-800">Salah</p>
                    <p className="text-5xl font-black text-red-600">{wrongCount}</p>
                  </div>

                  <div className="rounded-3xl bg-white shadow-md p-6">
                    <p className="text-xl text-slate-800">Soal</p>
                    <p className="text-4xl font-black text-[#0d1333]">{questions.length}</p>
                  </div>

                </div>

                {/* ACTION BUTTONS (OUTSIDE REVIEW) */}
                <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

                  {/* KEMBALI */}
                  <Link href="/materi/doa-doa-dasar" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold"
                    >
                      Kembali ke Doa doa Dasar
                    </Button>
                  </Link>

                  {/* RETRY (hanya jika tidak lulus) */}
                {score < 50 && !blocked && (
                    <Button
                      onClick={handleReset}
                      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold bg-red-600 hover:bg-red-700"
                    >
                      Coba Lagi
                    </Button>
                  )}

                  {/* NEXT MATERIAL */}
                  {score > 40 && (
                    <Link href="/materi/ordinarium-misa" className="w-full sm:w-auto">
                      <Button
                        className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold bg-slate-900 hover:bg-black"
                      >
                        Lanjut Materi Ordinarium
                      </Button>
                    </Link>
                  )}

                </div>

                {/*toogle*/}
                <button
                  onClick={() => setShowReview(prev => !prev)}
                  className="
mt-10
w-full
rounded-2xl
border
bg-white
p-5
flex
items-center
justify-center
gap-2
font-bold
shadow-sm
hover:shadow-md
transition
"
                >
                  {showReview ? (
                    <>
                      Tutup Review Jawaban <span className="text-xl">▲</span>
                    </>
                  ) : (
                    <>
                      Lihat Review Jawaban <span className="text-xl">▼</span>
                    </>
                  )}
                </button>


              </div>

              {/* REVIEW SECTION */}
              {showReview && (
                <CardContent className="p-8 space-y-8">

                  {/* REVIEW TITLE */}
                  <div>
                    <h3 className="text-3xl font-black text-[#0d1333]">
                      Review Jawaban:
                    </h3>
                    <p className="text-lg text-slate-800 mt-2">
                      Lihat kembali jawaban yang perlu diperbaiki
                    </p>
                  </div>

                  {/* QUESTIONS */}
                  <div className="space-y-5">
                    {questions.map((q, i) => {
                      const userAnswer = answers[q.id];
                      const answerCorrect = isCorrect(q, userAnswer);

                      return (
                        <div
                          key={q.id}
                          className={`relative rounded-3xl border p-8 shadow-sm transition-all
${answerCorrect
                              ? "border-green-200 bg-green-50"
                              : "border-red-200 bg-red-50"
                            }
`}
                        >

                          {/* STATUS ICON TOP RIGHT */}
                          <div className="absolute right-5 top-5">
                            <span
                              className={`text-2xl font-black ${answerCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                                }`}
                            >
                              {answerCorrect ? "✓" : "✕"}
                            </span>
                          </div>

                          {/* QUESTION */}
                          <p className="pr-10 text-2xl font-bold text-[#0d1333]">
                            {i + 1}. {q.question}
                          </p>

                          {/* USER ANSWER */}
                          <p className="mt-4 text-base text-slate-1200 text-2xl">
                            Anda memilih:{" "}
                            <span className="font-semibold text-slate-900 text-xl">
                              {userAnswer !== undefined && q.options
                                ? q.options[userAnswer]
                                : "-"}
                            </span>
                          </p>

                          {/* WRONG ANSWER DETAILS */}
                          {!answerCorrect && (
                            <div className="mt-4 space-y-1 text-xl">

                              <p className="text-1xs font-bold text-red-500">
                                Jawaban benar:{" "}
                                <span className="font-semibold text-slate-900">
                                  {q.options?.[q.answer ?? 0] ?? "-"}
                                </span>
                              </p>

                              <p className="text-1xs font-bold text-red-500">
                                ⚠ Materi {q.topic} perlu ditinjau ulang
                              </p>

                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                  {/* MATERIAL SUMMARY (ONLY WRONG) */}
                  {weakCategories.length > 0 && (
                    <div className="mt-10 rounded-3xl bg-red-50 border border-red-100 p-6">
                      <h3 className="text-2xl font-black text-red-700">
                        Materi yang perlu diperhatikan
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-3">

                        {weakCategories.map((topic) => (
                          <span
                            key={topic}
                            className="text-lg font-bold px-4 py-2 rounded-full bg-red-100 text-red-700"
                          >
                            Huruf {topic}
                          </span>
                        ))}

                      </div>
                    </div>
                  )}


                </CardContent>
              )}

            </Card>

          </section>


        );
      })()}

      {/* FOOTER */}
      <footer className="mt-16 border-t py-10 text-center text-slate-500">

        <p>
          © 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.
        </p>

        <p className="mt-2">
          Untuk Kemuliaan Tuhan - Belajar Bahasa Latin Gereja Katolik
        </p>
      </footer>
    </main>

  );
}
