import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";
import { COURSE_STRUCTURE } from "@/lib/course-structure";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

const MODULE_TITLES: Record<string, string> = {
  "elementa-1": "Elementa",
  "doa-doa-dasar": "Doa-doa Dasar",
  "ordinarium-misa": "Ordinarium Misa",
  "puji-syukur": "Puji Syukur",
  "final-assessment": "Ujian Terakhir",
};

export async function GET(req: NextRequest) {
  try {
    /* ==========================================
       AUTHENTICATION
    ========================================== */

    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

    /* ==========================================
       ONLY ADMIN
    ========================================== */

    if (decoded.role !== "ADMIN") {
      return NextResponse.json(
        {
          message:
            "Anda tidak memiliki akses.",
        },
        {
          status: 403,
        }
      );
    }

    /* ==========================================
       TOTAL LESSONS & MODULES
    ========================================== */

    const totalLessons =
      Object.values(
        COURSE_STRUCTURE
      ).reduce(
        (acc, module) =>
          acc + module.length,
        0
      );

    const totalModules =
      Object.keys(
        COURSE_STRUCTURE
      ).length;

    /* ==========================================
       GET ALL USERS
    ========================================== */

    const users =
      await prisma.user.findMany({
        where: {
          role: "USER",
        },

        include: {
          progress: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    /* ==========================================
       FORMAT USERS
    ========================================== */

    const formattedUsers =
      users.map((user) => {

        /* -----------------------------
           TOTAL COMPLETED LESSONS
        ----------------------------- */

        const completedLessons =
          user.progress.filter(
            (lesson) =>
              lesson.completed
          ).length;

        const lessonProgress =
          totalLessons > 0
            ? Math.round(
                (completedLessons /
                  totalLessons) *
                  100
              )
            : 0;

        /* -----------------------------
           MODULE PROGRESS
        ----------------------------- */

        const moduleProgress =
          Object.entries(
            COURSE_STRUCTURE
          ).map(
            ([slug, lessons]) => {

              const completed =
                user.progress.filter(
                  (lesson) =>
                    lesson.completed &&
                    lesson.moduleSlug ===
                      slug
                ).length;

              const total =
                lessons.length;

              const progress =
                total > 0
                  ? Math.round(
                      (completed /
                        total) *
                        100
                    )
                  : 0;

              return {
                slug,

                title:
                  MODULE_TITLES[
                    slug
                  ] ?? slug,

                completed,

                total,

                progress,

                completedFully:
                  progress >= 100,
              };
            }
          );

        /* -----------------------------
           COMPLETED MODULES
        ----------------------------- */

        const completedModules =
          moduleProgress.filter(
            (module) =>
              module.completedFully
          ).length;

        /* -----------------------------
           RETURN USER
        ----------------------------- */

        return {

          id: user.id,

          name: user.name,

          email: user.email,

          role: user.role,

          paroki:
            user.paroki ?? "-",

          wilayah:
            user.wilayah ?? "-",

          joinedAt:
            user.createdAt,

          completedLessons,

          totalLessons,

          lessonProgress,

          completedModules,

          totalModules,

          modules:
            moduleProgress,

          certificate: {

            issued:
              !!user.certificateIssuedAt,

            issuedAt:
              user.certificateIssuedAt,

            status:
              user.certificateIssuedAt
                ? "Issued"
                : "Not Issued",

            template: null,

            parishTemplate: null,

          },

        };

      });

       /* ==========================================
       DASHBOARD STATISTICS
    ========================================== */

    const totalUsers =
      formattedUsers.length;

    const activeUsers =
      formattedUsers.filter(
        (user) =>
          user.completedLessons > 0 &&
          user.lessonProgress < 100
      ).length;

    const completedUsers =
      formattedUsers.filter(
        (user) =>
          user.lessonProgress >= 100
      ).length;

    const issuedCertificates =
      formattedUsers.filter(
        (user) =>
          user.certificate.issued
      ).length;

    const averageProgress =
      totalUsers > 0
        ? Math.round(
            formattedUsers.reduce(
              (total, user) =>
                total +
                user.lessonProgress,
              0
            ) / totalUsers
          )
        : 0;

    /* ==========================================
       FILTER OPTIONS
    ========================================== */

    const parokiList = [
      ...new Set(
        formattedUsers
          .map(
            (user) =>
              user.paroki
          )
          .filter(
            (value) =>
              value !== "-"
          )
      ),
    ].sort();

    const wilayahList = [
      ...new Set(
        formattedUsers
          .map(
            (user) =>
              user.wilayah
          )
          .filter(
            (value) =>
              value !== "-"
          )
      ),
    ].sort();

    /* ==========================================
       FUTURE CERTIFICATE MANAGEMENT
    ========================================== */

    const certificateTemplates = [
      {
        id: "default",
        name:
          "Template Default LatinGerejawi",
      },
    ];

    /* ==========================================
       RESPONSE
    ========================================== */

    return NextResponse.json({

      statistics: {

        totalUsers,

        activeUsers,

        completedUsers,

        averageProgress,

        issuedCertificates,

      },

      filters: {

        paroki:
          parokiList,

        wilayah:
          wilayahList,

      },

      certificateManagement: {

        templates:
          certificateTemplates,

      },

      users:
        formattedUsers,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message:
          "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      }
    );

  }
}