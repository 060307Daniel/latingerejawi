import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ========================
// GET Certificate Config
// ========================

export async function GET(req: NextRequest) {
  try {
    const paroki = req.nextUrl.searchParams.get("paroki");

    if (!paroki) {
      return NextResponse.json(
        { message: "Paroki is required." },
        { status: 400 }
      );
    }

    const config = await prisma.certificateConfig.findUnique({
      where: {
        paroki,
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch certificate config." },
      { status: 500 }
    );
  }
}

// ========================
// UPDATE Certificate Config
// ========================

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      paroki,
      pastorName,
      pastorTitle,
      parishLogo,
    } = body;

    if (!paroki) {
      return NextResponse.json(
        { message: "Paroki is required." },
        { status: 400 }
      );
    }

    const config = await prisma.certificateConfig.upsert({
      where: {
        paroki,
      },

      update: {
        pastorName,
        pastorTitle,
        parishLogo,
      },

      create: {
        paroki,
        pastorName,
        pastorTitle,
        parishLogo,
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update certificate config." },
      { status: 500 }
    );
  }
}