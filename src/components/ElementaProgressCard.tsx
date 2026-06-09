"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

type ElementaProgressCardProps = {
  totalLessons: number;
  completedLessons: number;
  progress: number;
};

export default function ElementaProgressCard({
  totalLessons,
  completedLessons,
  progress,
}: ElementaProgressCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-red-600 text-white shadow-lg">
  <CardContent className="p-6 lg:p-8">

    {/* HEADER */}
    <div className="flex items-start gap-4">

      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/10">
        <BookOpen size={36} />
      </div>

      <div className="min-w-0">

        <h1 className="text-3xl font-bold lg:text-5xl">
          Elementa 1
        </h1>

        <p className="mt-2 text-sm font-semibold uppercase text-white/95 lg:text-2xl">
          Pengenalan Huruf Mati dan Huruf Hidup dalam Bahasa Latin Gerejawi
        </p>

        {/* TUJUAN */}
        <div className="mt-6">

          <h2 className="text-base font-bold uppercase lg:text-2xl">
            Tujuan Pembelajaran:
          </h2>

          <p className="mt-2 max-w-5xl text-base leading-8 text-white/95 lg:text-xl lg:leading-10">
            Setelah mempelajari modul ini, umat beriman
            mampu mengidentifikasi aturan-aturan pelafalan
            konsonan dan vokal dalam bahasa Latin Gerejawi
            sehingga dapat melafalkannya dengan benar dalam
            doa maupun nyanyian.
          </p>

        </div>

      </div>

    </div>

    {/* STATISTIK */}
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">

      <div className="rounded-2xl bg-white/10 p-5">
        <h2 className="text-4xl font-bold">
          {totalLessons}
        </h2>

        <p className="mt-2 text-white/90">
          Total Pelajaran
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 p-5">
        <h2 className="text-4xl font-bold">
          {completedLessons}
        </h2>

        <p className="mt-2 text-white/90">
          Selesai
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 p-5">
        <h2 className="text-4xl font-bold">
          {progress}%
        </h2>

        <p className="mt-2 text-white/90">
          Progress
        </p>
      </div>

    </div>

    {/* PROGRESS BAR */}
    <div className="mt-8 h-4 w-full overflow-hidden rounded-full bg-white/20">

      <div
        className="h-full rounded-full bg-white transition-all duration-500"
        style={{
          width: `${progress}%`,
        }}
      />

    </div>

  </CardContent>
</Card>
  );
}