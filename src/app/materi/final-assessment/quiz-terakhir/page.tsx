"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useQuizCooldown } from "@/hooks/useQuizCooldown";

import { ArrowLeft, Clock3, RotateCcw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


import { finalAssessmentQuestionBank } from "@/lib/bank-soal/final-assesment-bank-soal";

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

export default function QuizTerakhirPage() {

const {
  blocked,
  cooldownLeft,
  registerAttempt,
} = useQuizCooldown("final-assessment");
  
  const questionBank = finalAssessmentQuestionBank;

const minutes = Math.floor(cooldownLeft / 60000);
const seconds = Math.floor((cooldownLeft % 60000) / 1000);

 const getCategory = (q: any) => {
  if (q.type === "speech") return "C1";
  if (q.topic === "Arti Kata") return "C2";
  if (q.topic === "Pelafalan") return "C3";
  return "";
};

 const generateQuestions = () => {
  const shuffle = (arr: any[]) =>
    [...arr].sort(() => Math.random() - 0.5);

  const multiple = questionBank.filter(q => q.type === "multiple");
  const speech = questionBank.filter(q => q.type === "speech");

  // 🔥 GROUP BY TOPIC
  const grouped: Record<string, any[]> = {};

  multiple.forEach(q => {
    if (!grouped[q.topic]) grouped[q.topic] = [];
    grouped[q.topic].push(q);
  });

  // ambil 5 topic (atau semua kalau mau)
  const topics = Object.keys(grouped);

  const selectedMultiple: any[] = [];

  // 🔥 ambil seimbang dari semua materi
  topics.forEach(topic => {
    const pool = shuffle(grouped[topic]).slice(0, 4); 
    selectedMultiple.push(...pool);
  });

  // kalau belum 20, isi random tambahan
  while (selectedMultiple.length < 20) {
    const random = multiple[Math.floor(Math.random() * multiple.length)];
    selectedMultiple.push(random);
  }

  // potong jadi 20
  const finalMultiple = shuffle(selectedMultiple).slice(0, 20);

  // speech 15
  const finalSpeech = shuffle(speech).slice(0, 15);

  return [...finalMultiple, ...finalSpeech];
};

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(3600);
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
        moduleSlug: "final-assessment",
        lessonSlug: "quiz-terakhir",
      }),
    });

    // ==========================
    // SIMPAN TANGGAL SERTIFIKAT
    // ==========================
    const token =
      localStorage.getItem("token");

    await fetch(
      "/api/certificate/issue",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  } finally {
    setSaving(false);
  }
};


  useEffect(() => {
    setQuestions(generateQuestions());
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started || submitted) return;

    if (timeLeft <= 0) {
  const correctCount = questions.filter(q =>
    isCorrect(q, answers[q.id])
  ).length;

  const score = Math.round((correctCount / questions.length) * 100);

  const passed = score >= 80;

  Promise.all([
    registerAttempt(passed),
    saveResult(passed),
  ]).finally(() => setSubmitted(true));

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

      const passed = score >= 80;

      const getUserId = () => {
        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        return user?.id;
      };

      Promise.all([
  registerAttempt(passed),
  saveResult(passed),
]).finally(() => setSubmitted(true));
    }
  };

  const currentQ = questions[current];
  const selected = currentQ ? answers[currentQ.id] : undefined;

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

  if (!started || questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Memuat ujian...</p>
      </main>
    );
  }

if (blocked) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
      <div className="w-full max-w-md">
        <Card className="rounded-3xl border-0 shadow-xl">
          <CardContent className="p-8 text-center space-y-6">

            {/* ICON */}
            <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <Clock3 className="w-10 h-10 text-red-600" />
            </div>

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-black text-red-600">
             Terlalu banyak percobaan
            </h1>

            {/* DESCRIPTION */}
            <p className="text-slate-900 text-base md:text-lg">
              Anda sudah menggunakan 3 kali kesempatan Ujian tapi masih belum lulus. Silakan tunggu sebelum mencoba lagi.
            </p>

            {/* TIMER CARD */}
            <div className="rounded-2xl bg-slate-50 border p-4">
              <p className="text-base text-slate-900">Waktu tunggu tersisa</p>
              <p className="text-2xl font-black text-slate-900">
                {minutes} menit {seconds} detik
              </p>
            </div>

            {/* BUTTON BACK */}
            <div className="pt-2">
              <Link href="/materi/final-assessment">
                <Button className="w-full h-12 rounded-2xl bg-black text-white text-base font-bold hover:bg-black/90">
                  Kembali ke Materi
                </Button>
              </Link>
            </div>

            

            {/* INFO SMALL */}
            <p className="text-base text-slate-900">
               Ujian akan otomatis terbuka jika waktu tunggu telah selesai
            </p>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {!submitted && (
        <section className="mx-auto max-w-7xl px-4 py-10">

          {/* HEADER */}
          <div className="mb-6 flex items-center gap-4">
            <Link href="/materi/final-assessment">
              <Button variant="outline" className="h-14 w-14 rounded-2xl">
                <ArrowLeft />
              </Button>
            </Link>

            <h1 className="text-4xl font-black">UJIAN TERAKHIR</h1>
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
  const key = `${q.id}-${i}`;
                    const isCurrent = i === current;
                    const isAnswered = answers[q.id] !== undefined;

                    let style = "border-2 border-red-600 text-red-600";

                    if (isAnswered) style = "bg-yellow-400 text-black border-yellow-400";
                    if (isCurrent) style = "bg-red-600 text-white border-red-600";

                    return (
                      <button
  key={key}
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
  const c = getCategory(q);

  if (!categoryMap[c]) {
    categoryMap[c] = { correct: 0, total: 0 };
  }

  categoryMap[c].total += 1;

  if (isCorrect(q, answers[q.id])) {
    categoryMap[c].correct += 1;
  }
});

const weakCategories = Object.keys(categoryMap).filter(
  (c) => {
    const data = categoryMap[c];
    const accuracy = data.correct / data.total;
    return accuracy < 0.7; // threshold 70%
  }
);


        const score = Math.round((correctCount / questions.length) * 100);

        const passed = score >= 80; //daniel

        /*const getGrade = (score: number) => {
          if (score >= 85) return { label: "A", color: "text-green-600" };
          if (score >= 70) return { label: "B", color: "text-blue-600" };
          if (score >= 55) return { label: "C", color: "text-yellow-600" };
          return { label: "D", color: "text-red-600" };
        };*/

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
              return "Lulus tapi masih perlu belajar lebih giat";
            default:
              return "Maaf ya, anda masih perlu untuk mengulang lagi :(";
          }
        };

        const levelLabel = getLevelLabel(grade.label); /*const saveResult = async () => {*/

        /*const level =
          score >= 80
            ? { label: "Nilai A - Mastery", color: "text-green-600" }
            : score >= 50
            ? { label: "Level B - Developing", color: "text-yellow-600" }
            : { label: "Level C - Needs Improvement", color: "text-red-600" };*/


        return (
          <section className="mx-auto max-w-4xl px-4 py-12">

            {/* HEADER */}
            <div className="text-center mb-12">

              <div className="text-7xl mb-4">
                {score >= 90 ? "🏆" : score >= 80 ? "🎉" : "📚"} 
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-[#0d1333]">
                Hasil Ujian
              </h2>

              <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
                Berikut adalah performa Anda pada Ujian ini
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
                  <Link href="/materi/final-assessment" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold"
                    >
                      Kembali ke Halaman Modul
                    </Button>
                  </Link>

                  {/* RETRY (hanya jika tidak lulus) */}
                  {score < 10 && (
                    <Button
                      onClick={handleReset}
                      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold bg-red-600 hover:bg-red-700"
                    >
                      Coba Lagi
                    </Button>
                  )}

                  {/* NEXT MATERIAL */}
                {passed && (
  <Link href="/sertifikat" className="w-full sm:w-auto">
    <Button
      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold bg-green-600 hover:bg-green-700"
    >
      Download Sertifikat
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
  const key = `${q.id}-${i}`;
                      const userAnswer = answers[q.id];
                      const answerCorrect = isCorrect(q, userAnswer);

                      return (
                        <div
                          key={`${q.id}-${i}`}
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

                  {/* MATERIAL SUMMARY (ONLY WRONG)
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
                  )}*/}


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
