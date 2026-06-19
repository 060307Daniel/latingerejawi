/*"use client";

import { generateCertificate } from "@/lib/generate-certificate";

export default function SertifikatPage() {
  const downloadCertificate = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Silakan login terlebih dahulu"
        );
        return;
      }

      const res = await fetch(
        "/api/certificate/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        alert(
          "Gagal mengambil data sertifikat"
        );
        return;
      }

      const user =
        await res.json();

      console.log("USER DARI API:", user);
console.log(
  "TANGGAL SERTIFIKAT:",
  user.certificateIssuedAt
);

      if (!user?.name) {
        alert(
          "Nama user tidak ditemukan"
        );
        return;
      }

      await generateCertificate(
        user.name,
        user.certificateIssuedAt
      );
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat membuat sertifikat"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-3xl bg-white shadow-xl p-10 text-center">

        <div className="text-7xl mb-6">
          🎓
        </div>

        <h1 className="text-4xl font-black text-[#0d1333]">
          Sertifikat Kelulusan
        </h1>

        <p className="mt-4 text-slate-600 text-lg">
          Selamat! Anda telah menyelesaikan seluruh pembelajaran Latin Gerejawi.
        </p>

        <button
          onClick={downloadCertificate}
          className="mt-8 h-14 px-8 rounded-2xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition"
        >
          Download Sertifikat PDF
        </button>

      </div>
    </main>
  );
}*/