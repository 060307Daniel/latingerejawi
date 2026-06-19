"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

type DoaDoaDasarProgressCardProps = {
  totalLessons: number;
  completedLessons: number;
  progress: number;
  completed?: boolean;
};

export default function DoaDoaDasarProgressCard({
  totalLessons,
  completedLessons,
  progress,
  completed = false,
}: DoaDoaDasarProgressCardProps) {
  return (
    <Card
  className={`overflow-hidden border-0 shadow-lg ${
    completed
  ? "border border-yellow-300 bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-100 text-yellow-800"
      : "bg-red-600 text-white"
  }`}
>
  <CardContent className="p-6 lg:p-8">

    {/* HEADER */}
    <div className="flex items-start gap-4">

      <div
  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${
    completed
  ? "bg-yellow-200/40"
      : "bg-white/10"
  }`}
>
        <BookOpen size={36} />
      </div>

      <div className="min-w-0">

        <h1 className="text-3xl font-bold lg:text-5xl">
          Doa-doa Dasar 
        </h1>

        

        <p
  className={`mt-2 text-sm font-semibold uppercase lg:text-2xl ${
    completed
  ? "text-yellow-700"
      : "text-white/95"
  }`}
>
          Pengenalan Doa-doa Dasar Katolik dalam Latin Gerejawi
        </p>

        {/* TUJUAN */}
        <div className="mt-6">

          <h2 className="text-base font-bold uppercase lg:text-2xl">
            Tujuan Pembelajaran:
          </h2>

          <p
  className={`mt-2 max-w-5xl text-base leading-8 lg:text-xl lg:leading-10 ${
    completed
  ? "text-yellow-700"
      : "text-white/95"
  }`}
>
            Setelah mempelajari modul ini, umat beriman mampu memahami, membaca dan mendaraskan beberapa
            doa-doa dasar gereja katolik dalam bahasa latin gerejawi dengan baik dan benar
          </p>

        </div>

      </div>

    </div>

    {/* STATISTIK */}
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">

      <div
  className={`rounded-2xl p-5 ${
    completed
  ? "bg-white/50"
      : "bg-white/10"
  }`}
>
        <h2 className="text-4xl font-bold">
          {totalLessons}
        </h2>

        <p
  className={`mt-2 ${
    completed
      ? "text-yellow-700"
      : "text-white/90"
  }`}
>
          Total Pelajaran
        </p>
      </div>

      <div className={`rounded-2xl p-5 ${
  completed
  ? "bg-white/50"
    : "bg-white/10"
}`}>
        <h2 className="text-4xl font-bold">
          {completedLessons}
        </h2>

        <p
  className={`mt-2 ${
    completed
      ? "text-yellow-700"
      : "text-white/90"
  }`}
>
          Selesai
        </p>
      </div>

      <div className={`rounded-2xl p-5 ${
  completed
  ? "bg-white/50"
    : "bg-white/10"
}`}>
        <h2 className="text-4xl font-bold">
          {progress}%
        </h2>

        <p
  className={`mt-2 ${
    completed
      ? "text-yellow-700"
      : "text-white/90"
  }`}
>
          Progress
        </p>
      </div>

    </div>

    {/* PROGRESS BAR */}
    <div
  className={`mt-8 h-4 w-full overflow-hidden rounded-full ${
    completed
  ? "bg-yellow-600"
      : "bg-white/20"
  }`}
>

      <div className={`h-full rounded-full transition-all duration-500 ${
  completed
    ? "bg-yellow-500"
    : "bg-white"
}`}
  style={{
    width: `${progress}%`,
  }}
/>

    </div>

  </CardContent>
</Card>
  );
}