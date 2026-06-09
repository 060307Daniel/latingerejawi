import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      paroki,
      wilayah,
    } = body;

    // cek apakah email sudah digunakan
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email sudah digunakan",
        },
        {
          status: 400,
        }
      );
    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // simpan user ke database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        paroki,
        wilayah,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Terjadi error",
      },
      {
        status: 500,
      }
    );
  }
}
