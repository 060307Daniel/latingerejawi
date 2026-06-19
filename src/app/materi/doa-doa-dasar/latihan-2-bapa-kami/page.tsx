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

const normalize = (text: string) =>
    text.toLowerCase().trim();

const similarity = (a: string, b: string) => {
    const setA = new Set(a.split(" "));
    const setB = new Set(b.split(" "));

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    return intersection.size / union.size;
};

export default function LatihanBapaKami() {

    type SpeechQuestion = {
        id: number;
        type: "speech";
        topic?: string;
        question: string;
        targetWord: string;
        accepted?: string[]; 
        hint: string;
    };

    type MultipleQuestion = {
        id: number;
        type: "multiple";
        topic?: string;
        question: string;
        options: string[];
        answer: number;
        hint: string;
    };

    type Question = SpeechQuestion | MultipleQuestion;

    const questionBank = [
        // ================= SPEECH =================
        {
  id: 1,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata Pater berarti ....",
  options: [
    "Putra",
    "Roh Kudus",
    "Bapa",
    "Surga",
  ],
  answer: 2,
  hint: "Kata pertama dalam doa Bapa Kami.",
},

{
  id: 2,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata noster berarti ....",
  options: [
    "Kami",
    "Nama",
    "Kerajaan",
    "Kehendak",
  ],
  answer: 0,
  hint: "Menunjukkan kepunyaan bersama.",
},

{
  id: 3,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata caelis berarti ....",
  options: [
    "Bumi",
    "Surga",
    "Kerajaan",
    "Langit malam",
  ],
  answer: 1,
  hint: "Tempat Allah berada.",
},

{
  id: 4,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata nomen berarti ....",
  options: [
    "Nama",
    "Bapa",
    "Dosa",
    "Hari",
  ],
  answer: 0,
  hint: "Sanctificetur nomen tuum.",
},

{
  id: 5,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata regnum berarti ....",
  options: [
    "Kehendak",
    "Kerajaan",
    "Roti",
    "Pencobaan",
  ],
  answer: 1,
  hint: "Datanglah kerajaan-Mu.",
},

{
  id: 6,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata voluntas berarti ....",
  options: [
    "Kehendak",
    "Nama",
    "Kerajaan",
    "Surga",
  ],
  answer: 0,
  hint: "Jadilah kehendak-Mu.",
},

{
  id: 7,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata panem berarti ....",
  options: [
    "Air",
    "Makanan",
    "Roti",
    "Buah",
  ],
  answer: 2,
  hint: "Permohonan kebutuhan sehari-hari.",
},

{
  id: 8,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata hodie berarti ....",
  options: [
    "Besok",
    "Hari ini",
    "Kemarin",
    "Sekarang",
  ],
  answer: 1,
  hint: "Panem nostrum quotidianum da nobis hodie.",
},

{
  id: 9,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata debita berarti ....",
  options: [
    "Nama",
    "Kerajaan",
    "Dosa atau hutang",
    "Kehendak",
  ],
  answer: 2,
  hint: "Berkaitan dengan pengampunan.",
},

{
  id: 10,
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata malo berarti ....",
  options: [
    "Kebaikan",
    "Kerajaan",
    "Surga",
    "Kejahatan",
  ],
  answer: 3,
  hint: "Sed libera nos a malo.",
},
{
  id: 11,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Jika menemukan gabungan huruf qu pada kata qui, cara membacanya adalah ....",
  options: [
    "ku",
    "kw",
    "q",
    "ki",
  ],
  answer: 1,
  hint: "Aturan pelafalan Latin Gerejawi.",
},

{
  id: 12,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Gabungan huruf ae pada kata caelis dibaca ....",
  options: [
    "ae",
    "ai",
    "e",
    "a",
  ],
  answer: 2,
  hint: "Sama seperti pada kata caelo.",
},

{
  id: 13,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Kata tentationem dibaca ....",
  options: [
    "ten-ta-ti-o-nem",
    "ten-ta-si-o-nem",
    "ten-ta-tsi-o-nem",
    "ten-ta-ci-o-nem",
  ],
  answer: 2,
  hint: "Perhatikan aturan huruf ti sebelum vokal.",
},

{
  id: 14,
  type: "multiple",
  topic: "Pelafalan",
  question:
    'Mengapa kata tuum dibaca "tu-um"?',
  options: [
    "Karena huruf u kedua tidak dibaca",
    "Karena vokal digabung",
    "Karena setiap vokal dibaca jelas",
    "Karena dibaca cepat",
  ],
  answer: 2,
  hint: "Aturan dasar pelafalan Latin.",
},

{
  id: 15,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Saat membaca doa Bapa Kami, huruf-huruf dalam kata Latin harus ....",
  options: [
    "Banyak dihilangkan",
    "Dibaca jelas sesuai tulisan",
    "Diganti ke bahasa Indonesia",
    "Dipersingkat",
  ],
  answer: 1,
  hint: "Prinsip utama pelafalan Latin Gerejawi.",
},

{
  id: 16,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Jika menemukan kata quotidianum, bunyi awal yang benar adalah ....",
  options: [
    "ko",
    "cho",
    "kwo",
    "kuo",
  ],
  answer: 2,
  hint: "Perhatikan gabungan huruf qu.",
},

{
  id: 17,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Kata caelo dibaca ....",
  options: [
    "ka-e-lo",
    "cai-lo",
    "ce-lo",
    "ka-lo",
  ],
  answer: 2,
  hint: "Gabungan ae dibaca e.",
},

{
  id: 18,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Saat mendaraskan Adveniat, setiap vokal harus ....",
  options: [
    "Digabung",
    "Dihilangkan",
    "Dibaca terpisah dan jelas",
    "Dipercepat",
  ],
  answer: 2,
  hint: "Ad-ve-ni-at.",
},

{
  id: 19,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Kata Sanctificetur mengajarkan bahwa huruf c pada kata tersebut dibaca ....",
  options: [
    "s",
    "sy",
    "k",
    "c",
  ],
  answer: 2,
  hint: "Sank-ti-fi-ce-tur.",
},

{
  id: 20,
  type: "multiple",
  topic: "Pelafalan",
  question:
    "Ketika membaca doa Bapa Kami dalam bahasa Latin, tujuan memahami aturan pelafalan adalah agar ....",
  options: [
    "Dapat membaca dan mendaraskan doa dengan benar",
    "Cepat menghafal tanpa memahami",
    "Tidak perlu memahami arti",
    "Mengubah doa ke bahasa lain",
  ],
  answer: 0,
  hint: "Sesuai tujuan pembelajaran doa dasar.",
},
// speech
{
  id: 21,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Pater'",
  targetWord: "pater",
  accepted: [
    "pater",
    "pa ter",
  ],
  hint: "Dibaca pa-ter.",
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
    "quieto Liszt ",
    "kwi tolis"
  ],
  hint: "Gabungan QU dibaca KW.",
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
    "Cialis ",
    "Jalisse ",
    "Cervis"
  ],
  hint: "AE dibaca E.",
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
    "San tifi Sector"
  ],
  hint: "C dibaca K.",
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
"astenia ",
"athenia"
  ],
  hint: "Semua vokal dibaca jelas.",
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
  hint: "Huruf i dan a dibaca terpisah: fi-at.",
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
    "Quotidiano ",
    "kwotidianum",
    "call titanium ",
"call TDM", 
"call tina"
  ],
  hint: "Awalan QU dibaca KW.",
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
  hint: "Setiap vokal dibaca satu per satu: ho-di-e.",
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
    "tentazione ",
  ],
  hint: "TI yang diikuti vokal dibaca TSI.",
},

{
  id: 30,
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kalimat 'Nomen Tuum'",
  targetWord: "nomen tuum",
  accepted: [
    "nomen tuum",
    " nomento home ",
    " nomentum "
  ],
  hint: "Kedua huruf U tetap dibaca terpisah: tu-um.",
},

    ];

    const learningObjectives = {
        C1: {
            title: "Kemampuan Pelafalan Doa Bapa Kami",
            desc: "Mengucapkan doa Bapa Kami dalam bahasa Latin dengan pelafalan yang benar.",
        },
        C2: {
            title: "Pemahaman Arti Kata Latin",
            desc: "Memahami arti kata-kata dalam doa Bapa kami.",
        },
        C3: {
            title: "Penerapan Doa Bapa Kami",
            desc: "Menerapkan urutan doa Bapa Kami dengan benar dalam praktik.",
        },
    };

    const speechQuestions = questionBank.filter(
        (q) => q.type === "speech"
    );

    const multipleQuestions = questionBank.filter(
        (q) => q.type === "multiple"
    );

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
        const speech = shuffleArray(speechQuestions).slice(0, 4);
        const multiple = shuffleArray(multipleQuestions).slice(0, 4);

        return shuffleArray([...speech, ...multiple]);
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

    const handleQuizClick = () => {
        setShowWarning(true);
    };


    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [speechResult, setSpeechResult] = useState<
        "idle" | "correct" | "almost" | "wrong"
    >("idle");

    const normalizeSpeech = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z\s]/g, "")
            .replace(/\bph\b/g, "f")     // ph -> f (philly -> filly)
            .replace(/\bth\b/g, "t")     // the -> te
            .replace(/\bch\b/g, "k")     // chorus -> korus
            .replace(/\bll\b/g, "l")     // fii lli -> fili
            .replace(/\s+/g, " ")
            .trim();
    };

    const startListening = () => {
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
        recognition.maxAlternatives = 3;

        setIsListening(true);
        setSpeechResult("idle");

        recognition.start();

        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);

            // ✅ FIX 1: normalize
            const user = normalizeSpeech(text);

            // ❌ FIX 2: accepted jangan pakai .accepted
            const accepted = currentQ.accepted?.length
                ? currentQ.accepted
                : [currentQ.targetWord || ""];

            const score = Math.max(
                ...accepted.map((a) =>
                    similarity(user, normalizeSpeech(a))
                )
            );

            let result: "correct" | "almost" | "wrong" = "wrong";

            if (score >= 0.85) result = "correct";
            else if (score >= 0.65) result = "almost";

            setSpeechResult(result);

            setAnswers((prev) => ({
                ...prev,
                [currentQ.id]: text,
            }));

            setIsListening(false);
        };

        recognition.onerror = () => {
            setIsListening(false);
            setSpeechResult("wrong");
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };


    /* ===================================
       LOAD SOAL ACAK
    =================================== */

    useEffect(() => {

        setQuestions(
            generateQuestions()
        );

        setMounted(true);

    }, []);

    useEffect(() => {
        setSpeechResult("idle");
        setTranscript("");
        setShowHint(false);
    }, [currentQuestion]);

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
                    moduleSlug: "doa-doa-dasar",
                    lessonSlug: "latihan-2-bapa-kami",
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

    const isMultiple = currentQ.type === "multiple";
    const isSpeech = currentQ.type === "speech";

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

        setShowHint(false);

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

    const weakCategories = Array.from(
        new Set(
            questions
                .filter(q => Number(answers[q.id]) !== q.answer)
                .map(q => {
                    if (q.id <= 4) return "C1";
                    if (q.id <= 8) return "C2";
                    return "C3";
                })
        )
    );

    return (

        <main className="min-h-screen bg-[#f5f7fb]">

            {!submitted && (

                <section className="mx-auto max-w-5xl px-6 py-10">

                    <div className="mb-10 flex items-center gap-4">

                        <Link href="/materi/doa-doa-dasar">

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
                                Doa Bapa Kami
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

                            {isMultiple && (
                                <RadioGroup
                                    value={selectedAnswer}
                                    onValueChange={handleAnswer}
                                    className="mt-6 space-y-4"
                                >
                                    {currentQ.options?.map((option, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`
            rounded-3xl
            border-2
            p-8
            transition-all
            cursor-pointer
            ${selectedAnswer === String(index)
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
                                                        className="w-full cursor-pointer text-xl font-semibold leading-9"
                                                    >
                                                        {String.fromCharCode(65 + index)}. {option}
                                                    </Label>

                                                </div>
                                            </div>
                                        );
                                    })}
                                </RadioGroup>
                            )}

                            {isSpeech && (
                                <div className="mt-8 text-center space-y-6">

                                    <Button
                                        onClick={startListening}
                                        disabled={isListening}
                                        className="h-16 rounded-3xl px-10 text-lg font-bold"
                                    >
                                        {isListening ? "🎤 Mendengarkan..." : "🎤 Mulai Rekam"}
                                    </Button>

                                   {transcript &&
  (speechResult === "almost" ||
    speechResult === "wrong") && (
    <p className="text-xl text-slate-600">
      Kamu berkata: <b>{transcript}</b>
    </p>
)}

                                    {speechResult !== "idle" && (
                                        <div
                                            className={`p-4 rounded-2xl font-bold text-lg ${speechResult === "correct"
                                                ? "bg-green-100 text-green-700"
                                                : speechResult === "almost"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {speechResult === "correct" && "✅ Benar!"}
                                            {speechResult === "almost" && "⚠️ Hampir benar"}
                                            {speechResult === "wrong" && "❌ Coba ulangi"}
                                        </div>
                                    )}

                                </div>
                            )}


                            <div className="mt-10 flex justify-end">

                                <Button
                                    onClick={handleNext}
                                    disabled={!selectedAnswer
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

                                        Berikut adalah capaian pembelajaran berdasarkan
                                        hasil latihan yang telah Anda kerjakan.

                                    </p>/

                                    <div className="mt-8 space-y-5">

                                        {/* C1 */}
                                        <div className="rounded-2xl bg-slate-50 p-5">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-xl text-[#0d1333]">
                                                    Kemampuan Pelafalan Doa Bapa Kami
                                                </p>

                                                {weakCategories.includes("C1") ? (
                                                    <span className="font-bold text-red-600">
                                                        🔴 Belum Tercapai
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-green-600">
                                                        🟢 Tercapai
                                                    </span>
                                                )}
                                            </div>

                                            {weakCategories.includes("C1") && (
                                                <p className="mt-3 text-lgtext-slate-800">
                                                    Masih perlu melatih pelafalan doa Bapa Kami dalam bahasa Latin dengan pengucapan yang jelas dan benar.
                                                </p>
                                            )}
                                        </div>

                                        {/* C2 */}
                                        <div className="rounded-2xl bg-slate-50 p-5">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-[#0d1333]">
                                                    Pemahaman Arti Kata Latin
                                                </p>

                                                {weakCategories.includes("C2") ? (
                                                    <span className="font-bold text-red-600">
                                                        🔴 Belum Tercapai
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-green-600">
                                                        🟢 Tercapai
                                                    </span>
                                                )}
                                            </div>

                                            {weakCategories.includes("C2") && (
                                                <p className="mt-3 text-slate-800">
                                                    Masih perlu meningkatkan pemahaman arti kata dalam doa Bapa Kami seperti Patris, Filii, dan Spiritus Sancti.
                                                </p>
                                            )}
                                        </div>

                                        {/* C3 */}
                                        <div className="rounded-2xl bg-slate-50 p-5">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-[#0d1333]">
                                                    Penerapan Doa Bapa Kami
                                                </p>

                                                {weakCategories.includes("C3") ? (
                                                    <span className="font-bold text-red-600">
                                                        🔴 Belum Tercapai
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-green-600">
                                                        🟢 Tercapai
                                                    </span>
                                                )}
                                            </div>

                                            {weakCategories.includes("C3") && (
                                                <p className="mt-3 text-slate-800">
                                                    Masih perlu memahami dan menerapkan urutan doa Bapa Kami dengan benar dalam praktik.
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                </CardContent>

                            </Card>

                            <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

                                <h3 className="text-2xl font-bold text-yellow-800">
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

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center sm:gap-6">

                                <Link href="/materi/doa-doa-dasar">
                                    <Button
                                        variant="outline"
                                        className="
        h-16
        w-full
        sm:w-auto
        rounded-3xl
        border border-slate-400
        text-slate-800
        px-12
        text-xl
        font-bold
        hover:bg-slate-50
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
      bg-[#030326] hover:bg-[#1a1a3a]
    "
                                >
                                    Quiz 1
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

                            <p className="mt-1 text-lg leading-8 text-slate-800">
                                Pastikan Anda sudah memahami materi latihan ini.
                            </p>

                            <p className="mt-5 text-2xl text-slate-900">
                                Anda akan melanjutkan ke <strong>Quiz Bapa Kami</strong>.
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
                                        setShowWarning(false);
                                        setShowQuizPopup(true);
                                    }}
                                >
                                    Lanjut ke Quiz
                                </Button>

                            </div>

                        </CardContent>
                    </Card>

                </div>
            )}

            {showQuizPopup && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">

                    <Card className="w-full max-w-xl rounded-3xl shadow-2xl">
                        <CardContent className="p-6 sm:p-8 text-center">

                            {/* ICON */}
                            <div className="text-5xl sm:text-6xl mb-4">📚</div>

                            {/* TITLE */}
                            <h2 className="text-2xl sm:text-3xl font-black text-[#0d1333]">
                                Quiz 1: Bapa Kami
                            </h2>

                            {/* DESCRIPTION */}
                            <p className="mt-3 text-sm sm:text-lg text-slate-900 leading-7">
                                Anda akan memulai quiz dengan materi <strong>"Doa Bapa Kami"</strong>
                            </p>

                            {/* SEPARATOR */}
                            <div className="my-6 h-px bg-slate-200" />

                            {/* INFO SECTION */}
                            <div className="space-y-4 text-left">

                                <div className="flex items-start justify-between gap-4">
                                    <p className="text-xl text-slate-900">Jumlah Soal</p>
                                    <p className="text-xl sm:text-base font-semibold text-[#0d1333] text-right">
                                        7 Nomor
                                    </p>
                                </div>

                                <div className="flex items-start justify-between gap-4">
                                    <p className="text-xl text-slate-900">Waktu Pengerjaan</p>
                                    <p className="text-xl sm:text-base font-semibold text-[#0d1333] text-right">
                                        10 Menit
                                    </p>
                                </div>
                            </div>
                            {/* SEPARATOR */}
                            <div className="my-6 h-px bg-slate-200" />

                            <p className="mt-3 text-sm sm:text-lg text-slate-900 leading-7">
                                Jika sudah siap, silahkan tekan <strong>"Mulai Quiz"</strong>
                            </p>

                            {/* BUTTON AREA */}
                            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">

                                <Button
                                    variant="outline"
                                    className="h-14 rounded-2xl px-8 text-lg"
                                    onClick={() => setShowQuizPopup(false)}
                                >
                                    Batal
                                </Button>

                                <Button
                                    className="h-14 rounded-2xl bg-red-600 px-8 text-lg"
                                    onClick={() => {
                                        window.location.href =
                                            "/materi/doa-doa-dasar/quiz-2-tanda-salib";
                                    }}
                                >
                                    Mulai Quiz
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