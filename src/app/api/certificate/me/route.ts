import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest
) {
  try {
    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token =
      authHeader.split(" ")[1];

    console.log(
  "JWT EXISTS:",
  !!process.env.JWT_SECRET
);

    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

  const user =
  await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      paroki: true,
      certificateIssuedAt: true,
    },
  });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "User tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    const certificateConfig =
  await prisma.certificateConfig.findUnique({
    where: {
      paroki: user.paroki ?? "",
    },
  });

    return NextResponse.json({
  ...user,

  pastorName: certificateConfig?.pastorName,
  pastorTitle: certificateConfig?.pastorTitle,
  parishLogo: certificateConfig?.parishLogo,
});
  } catch (error) {

    console.error("Certificate API Error:", error);

    return NextResponse.json(
      {
        message: "Unauthorized",
        error: String(error),
      },
      {
        status: 401,
      }
    );

  }
}