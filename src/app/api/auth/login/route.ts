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
      where: { email },
    });

    // user tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // cek password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    // payload JWT (sudah include paroki & wilayah)
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        paroki: user.paroki,
        wilayah: user.wilayah,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // sanitize user (JANGAN kirim password ke frontend)
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      paroki: user.paroki,
      wilayah: user.wilayah,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        message: "Login berhasil",
        token,
        user: safeUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Terjadi error" },
      { status: 500 }
    );
  }
}