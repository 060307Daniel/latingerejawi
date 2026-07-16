import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    // ==========================================
    // LOCALHOST → simpan ke public/uploads
    // ==========================================
    if (process.env.NODE_ENV === "development") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename =
        Date.now() + "-" + file.name.replace(/\s+/g, "-");

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads"
      );

      await fs.ensureDir(uploadDir);

      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      return NextResponse.json({
        url: `/uploads/${filename}`,
      });
    }

    // ==========================================
    // VERCEL → upload ke Blob
    // ==========================================
   const filename =
  Date.now() + "-" + file.name.replace(/\s+/g, "-");

const blob = await put(filename, file, {
  access: "public",
});

    return NextResponse.json({
      url: blob.url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Upload gagal",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}