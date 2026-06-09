import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // cek user ada atau tidak
    if (!user) {
      return NextResponse.json(
        {
          message: "User tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    // cek password
    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Password salah",
        },
        {
          status: 401,
        }
      );
    }

    // buat JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json(
      {
        message: "Login berhasil",
        token,
        user,
      },
      {
        status: 200,
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