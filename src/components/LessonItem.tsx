"use client";

import Link from "next/link";

import {
  Clock3,
  Lock,
  Play,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type LessonItemProps = {
  number: number;
  title: string;
  duration: string;
  type: "lesson" | "practice" | "quiz";
  locked?: boolean;
  href?: string;
};

export default function LessonItem({
  number,
  title,
  duration,
  type,
  locked = false,
  href = "#",
}: LessonItemProps) {
  const handleLocked = () => {
    alert(
      "Materi ini masih terkunci. Selesaikan materi sebelumnya terlebih dahulu."
    );
  };

  const badgeLabel =
    type === "lesson"
      ? "Materi"
      : type === "practice"
      ? "Latihan"
      : "Quiz";

  return (
    <Card
      className={`
        rounded-3xl
        border
        bg-white
        transition
        hover:shadow-lg
        ${locked ? "opacity-60" : ""}
      `}
      onClick={() => {
        if (locked) {
          handleLocked();
        }
      }}
    >
      <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-6">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-2xl
              font-bold
              text-slate-500
            "
          >
            {number}
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h3
                className={`
                  text-xl
                  font-bold
                  lg:text-2xl
                  ${
                    locked
                      ? "text-slate-500"
                      : "text-red-600"
                  }
                `}
              >
                {title}
              </h3>

              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {badgeLabel}
              </Badge>
            </div>

            <div className="mt-3 flex items-center gap-2 text-base text-slate-500">
              <Clock3 size={18} />
              {duration}
            </div>
          </div>
        </div>

        {locked ? (
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm"
          >
            <Lock size={14} />
            Terkunci
          </Badge>
        ) : (
          <Button
            asChild
            className="px-6 py-6 text-lg font-semibold"
          >
            <Link href={href}>
              <Play size={18} />
              Mulai
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}