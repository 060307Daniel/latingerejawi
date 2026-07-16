"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useQuizCooldown } from "@/hooks/useQuizCooldown";

import { ArrowLeft, Clock3, RotateCcw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Question = {
  id: number;
  type: "C1" | "C5";
  topic: string;
  question: string;
  options: string[];
  answer: number;
};



export default function QuizHurufMatiPage() {

  const {
  blocked,
  cooldownLeft,
  registerAttempt,
} = useQuizCooldown("elementa-1-huruf-mati");

const minutes = Math.floor(cooldownLeft / 60000);
const seconds = Math.floor((cooldownLeft % 60000) / 1000);
  
  const questionBank: Question[] = [
    { id: 1, type: "C1", topic: "C", question: "Kata clarus dibaca ....", options: ["klarus", "sylarus", "calarus", "selarus"], answer: 0 },
    { id: 2, type: "C1", topic: "C", question: "Kata centum dibaca ....", options: ["kentum", "sentum", "centum", "syentum"], answer: 1 },
    { id: 3, type: "C1", topic: "C", question: "Kata cito dibaca ....", options: ["kito", "sito", "cito", "syito"], answer: 1 },

    { id: 4, type: "C5", topic: "C", question: "Huruf c pada caedes dibaca ....", options: ["a", "ae, oe, e, i", "selalu awal", "u"], answer: 1 },
    { id: 5, type: "C5", topic: "C", question: "Huruf c pada coetus berubah karena ....", options: ["u", "ae, oe, e, i", "s", "awal"], answer: 1 },

    { id: 6, type: "C1", topic: "G", question: "Kata gloria dibaca ....", options: ["gloria", "jloria", "nyoria", "geloria"], answer: 0 },
    { id: 7, type: "C1", topic: "G", question: "Kata genus dibaca ....", options: ["genus", "kenus", "jenus", "senus"], answer: 2 },
    { id: 8, type: "C1", topic: "G", question: "Kata agnus dibaca ....", options: ["agnus", "agnyus", "anyus", "ayus"], answer: 2 },

    { id: 9, type: "C5", topic: "G", question: "Huruf g pada genus dibaca ....", options: ["j", "e/i", "awal", "s"], answer: 1 },
    { id: 10, type: "C5", topic: "G", question: "Huruf g pada agnosco berubah karena ....", options: ["vokal", "n", "akhir", "s"], answer: 1 },

    { id: 11, type: "C1", topic: "S", question: "Kata sol dibaca ....", options: ["sol", "syol", "zol", "kol"], answer: 0 },
    { id: 12, type: "C1", topic: "S", question: "Kata scientia dibaca ....", options: ["sientia", "scientia", "syentia", "kentia"], answer: 2 },
    { id: 13, type: "C1", topic: "S", question: "Kata satis dibaca ....", options: ["syatis", "satis", "katis", "jatis"], answer: 1 },

    { id: 14, type: "C5", topic: "S", question: "Huruf s pada scientia dibaca ....", options: ["t", "ce/cis", "a", "awal"], answer: 1 },
    { id: 15, type: "C5", topic: "S", question: "Huruf s pada scelus berubah karena ....", options: ["vokal", "ce/cis", "m", "akhir"], answer: 1 },

    { id: 16, type: "C1", topic: "TI", question: "Kata tigris dibaca ....", options: ["tigris", "tsi-gris", "tig-ris", "syigris"], answer: 0 },
    { id: 17, type: "C1", topic: "TI", question: "Kata motio dibaca ....", options: ["motio", "mosio", "motsiyo", "motsio"], answer: 2 },
    { id: 18, type: "C1", topic: "TI", question: "Kata ostium dibaca ....", options: ["ostsium", "ostium", "osyium", "ostsiyum"], answer: 1 },

    { id: 19, type: "C5", topic: "TI", question: "Kata contio dibaca karena ....", options: ["selalu ti", "vokal & bukan s", "akhir", "m"], answer: 1 },
    { id: 20, type: "C5", topic: "TI", question: "Kata altior dibaca 'altsiyor' karena ....", options: ["ti jadi tsi", "selalu ti", "r", "awal"], answer: 0 },
  ];

  const generateQuestions = () => {
    const c1 = questionBank.filter(q => q.type === "C1");
    const c5 = questionBank.filter(q => q.type === "C5");

    const shuffle = (arr: Question[]) =>
      [...arr].sort(() => Math.random() - 0.5);

    return [
      ...shuffle(c1).slice(0, 4),
      ...shuffle(c5).slice(0, 3),
    ];
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(600);
  const [started, setStarted] = useState(false);

  const [showReview, setShowReview] = useState(false);

  const [saving, setSaving] = useState(false);

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
        moduleSlug: "elementa-1",
        lessonSlug: "quiz-1-huruf-mati",
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
    if (!started || submitted) return;

    if (timeLeft <= 0) {
  const correctCount = questions.filter(
    q => answers[q.id] === q.answer
  ).length;

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70;

  saveResult(passed).then(() => {
    registerAttempt(passed); 
    setSubmitted(true);
  });

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
    const correctCount = questions.filter(
      q => answers[q.id] === q.answer
    ).length;

    const score = Math.round((correctCount / questions.length) * 100);

    const passed = score >= 70;

    const getUserId = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return user?.id;
};

    registerAttempt(passed);
saveResult(passed).then(() => setSubmitted(true));
  }
};

  const currentQ = questions[current];
  const selected = answers[currentQ?.id];

  const correctCount = questions?.filter(q => answers[q.id] === q.answer).length ?? 0;
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
        <p>Memuat quiz...</p>
      </main>
    );
  }

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
              Terlalu banyak percobaan
            </h1>

            <p className="text-slate-600 text-base md:text-lg">
              Anda sudah mencapai batas percobaan. Silakan tunggu sebelum mencoba lagi.
            </p>

            <div className="rounded-2xl bg-slate-50 border p-4">
              <p className="text-sm text-slate-500">Waktu tunggu tersisa</p>
              <p className="text-2xl font-black text-slate-900">
                {minutes} menit {seconds} detik
              </p>
            </div>
            
            <Link href="/materi/elementa-1">
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

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      {!submitted && (
        <section className="mx-auto max-w-7xl px-4 py-10">

          {/* HEADER */}
          <div className="mb-6 flex items-center gap-4">
            <Link href="/materi/elementa-1">
              <Button variant="outline" className="h-14 w-14 rounded-2xl">
                <ArrowLeft />
              </Button>
            </Link>

            <h1 className="text-4xl font-black">QUIZ HURUF MATI</h1>
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

  const topicMap: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q) => {
    if (!topicMap[q.topic]) {
      topicMap[q.topic] = { correct: 0, total: 0 };
    }

    topicMap[q.topic].total += 1;

    if (answers[q.id] === q.answer) {
      topicMap[q.topic].correct += 1;
    }
  });

  const weakTopics = Object.keys(topicMap).filter(
    (t) => topicMap[t].correct < topicMap[t].total
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

  <div className="p-10 md:p-14 text-center bg-gradient-to-b from-white to-slate-50"/>

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
  <Link href="/materi/elementa-1" className="w-full sm:w-auto">
    <Button
      variant="outline"
      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold"
    >
      Kembali ke Elementa 1
    </Button>
  </Link>

  {/* RETRY (hanya jika tidak lulus) */}
  {score < 70 && (
    <Button
      onClick={handleReset}
      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold bg-red-600 hover:bg-red-700"
    >
      Coba Lagi
    </Button>
  )}

  {/* NEXT MATERIAL */}
  {score > 70 && (
  <Link href="/materi/elementa-1/pengenalan-huruf-hidup" className="w-full sm:w-auto">
    <Button
      className="h-14 w-full sm:w-auto rounded-2xl px-10 text-lg font-bold bg-slate-900 hover:bg-black"
    >
      Lanjut Materi
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
    const isCorrect = userAnswer === q.answer;

    return (
      <div
        key={q.id}
        className={`relative rounded-3xl border p-8 shadow-sm transition-all
${
  isCorrect
    ? "border-green-200 bg-green-50"
    : "border-red-200 bg-red-50"
}
`}
      >

        {/* STATUS ICON TOP RIGHT */}
        <div className="absolute right-5 top-5">
          <span
            className={`text-2xl font-black ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "✓" : "✕"}
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
            {userAnswer !== undefined ? q.options[userAnswer] : "-"}
          </span>
        </p>

        {/* WRONG ANSWER DETAILS */}
{!isCorrect && (
  <div className="mt-4 space-y-1 text-xl">
    
    <p className="text-1xs font-bold text-red-500">
      Jawaban benar:{" "}
      <span className="font-semibold text-slate-900">
        {q.options[q.answer]}
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
            {weakTopics.length > 0 && (
              <div className="mt-10 rounded-3xl bg-red-50 border border-red-100 p-6">
                <h3 className="text-2xl font-black text-red-700">
                  Materi yang perlu diperhatikan
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">

                  {weakTopics.map((topic) => (
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
