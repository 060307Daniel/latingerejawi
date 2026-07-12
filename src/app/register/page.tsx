"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { parokiList, wilayahRohani } from "@/data/paroki";

export default function RegisterPage() {
  const router = useRouter();

  const [selectedParoki, setSelectedParoki] =
    useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [wilayah, setWilayah] =
    useState("");

  const wilayahOptions =
    wilayahRohani[selectedParoki] || [];

  const [successModal, setSuccessModal] =
  useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            paroki: selectedParoki,
            wilayah,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
  setSuccessModal(true);
} else {
  alert(data.message);
}
    } catch (error) {
      console.log(error);

      alert("Terjadi kesalahan");
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white">
            <BookOpen size={30} />
          </div>

          <h1 className="text-4xl font-bold text-[#0f172a]">
            LatinGerejawi
          </h1>
        </div>

        <p className="mt-4 text-xl text-slate-500">
          Belajar Bahasa Latin Gerejawi
        </p>
      </div>

      {/* BACK */}
      <div className="mx-auto mt-10 max-w-xl">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold text-[#111827]"
        >
          <ArrowLeft size={28} />
          Kembali ke Menu Utama
        </Link>
      </div>

      {/* CARD */}
      <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <h2 className="text-center text-5xl font-bold text-black">
          DAFTAR SEKARANG!
        </h2>

        <p className="mt-5 text-center text-xl leading-10 text-slate-500">
          Dengan mendaftar, anda sudah bisa untuk
          bergabung dan mengakses coursenya!
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-10 space-y-6"
        >
          {/* NAMA */}
          <div>
            <label className="text-2xl font-semibold text-slate-700">
              Nama Anda
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Kode Nama Pertama dan Belakang Anda disini"
              className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-2xl font-semibold text-slate-700">
              Alamat Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Kode Email Anda disini"
              className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-2xl font-semibold text-slate-700">
              Password Yang Ingin Digunakan:
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Kode Password Anda disini"
              className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
              required
            />
          </div>

          {/* DROPDOWN */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* PAROKI */}
            <div>
              <label className="text-xl font-semibold text-slate-700">
                Umat dari Paroki:
              </label>

              <select
                value={selectedParoki}
                onChange={(e) =>
                  setSelectedParoki(
                    e.target.value
                  )
                }
                className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
                required
              >
                <option value="">Pilih</option>

                {parokiList.map((paroki) => (
                  <option
                    key={paroki}
                    value={paroki}
                  >
                    {paroki}
                  </option>
                ))}
              </select>
            </div>

            {/* WR */}
            <div>
              <label className="text-xl font-semibold text-slate-700">
                Wilayah Rohani:
              </label>

              <select
                value={wilayah}
                onChange={(e) =>
                  setWilayah(e.target.value)
                }
                className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
                required
              >
                <option value="">Pilih</option>

                {wilayahOptions.map((wr) => (
                  <option key={wr} value={wr}>
                    {wr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* INFO */}
          <div className="rounded-full bg-[#f5f7fb] py-3 text-center text-lg text-slate-500">
            Untuk menyelesaikan pendaftaran tekan tombol dibawah ini:
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="h-20 w-full rounded-2xl bg-[#16233f] text-3xl font-bold text-white transition hover:opacity-90"
          >
            DAFTAR SEKARANG
          </button>
        </form>

        {/* LOGIN */}
        <div className="mt-10 text-center text-xl text-slate-500">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600"
          >
            Masuk disini! →
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-10 text-center text-lg leading-9 text-slate-500">
        <p>
          © 2026 Latin Gerejawi. Ad Maiorem Dei
          Gloriam.
        </p>

        <p>
          Untuk Kemuliaan Tuhan - Belajar Bahasa
          Latin Gereja Katolik
        </p>
      </div>
{successModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">

    <div className="w-[90%] max-w-md rounded-3xl bg-white p-8 shadow-xl">

      <div className="text-center">

        <h2 className="mt-4 text-3xl font-bold text-[#0d1333]">
          Registrasi Berhasil!
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-900">
          Akun Anda berhasil dibuat.
          <br />
          Silakan masuk menggunakan email dan password yang telah didaftarkan untuk mulai belajar di LatinGerejawi.
        </p>

      </div>

      <button
        onClick={() => router.push("/login")}
        className="mt-8 w-full rounded-xl bg-red-600 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
      >
        Login Sekarang
      </button>

    </div>

  </div>
)}


    </main>
  );
}