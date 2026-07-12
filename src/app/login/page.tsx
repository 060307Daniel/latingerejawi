"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // simpan token
        localStorage.setItem(
          "token",
          data.token
        );

        // simpan user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

       toast.success("Login berhasil! Selamat datang kembali.");

setTimeout(() => {
  switch (data.user.role) {
    case "ADMIN":
      router.push("/admin/dashboard");
      break;

    case "PASTOR":
      router.push("/pastor/chat");
      break;

    default:
      router.push("/");
      break;
  }
}, 800);
      } else {
        toast.error("Login gagal", {
  description: data.message,
});
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
          MASUK KE AKUN
        </h2>

        <p className="mt-5 text-center text-xl leading-10 text-slate-500">
          Jika anda sudah membuat dan memiliki akun,
          silahkan masukkan email yang anda daftarkan
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >
          {/* EMAIL */}
          <div>
            <label className="text-2xl font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Kode Pemberitaan dan Belakang Anda disini"
              className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-2xl font-semibold text-slate-700">
              Password:
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Kata Password Anda disini"
              className="mt-3 h-16 w-full rounded-2xl bg-[#f5f7fb] px-5 text-lg outline-none"
              required
            />
          </div>

          {/* RESET 
          <button
            type="button"
            className="text-lg text-blue-600"
          >
            Lupa atau Reset Password
          </button>

          {/* BUTTON */}
          <button
            type="submit"
            className="h-20 w-full rounded-2xl bg-[#16233f] text-3xl font-bold text-white transition hover:opacity-90"
          >
            MASUK
          </button>
        </form>

        {/* REGISTER */}
        <div className="mt-10 text-center text-xl text-slate-500">
          Belum mempunyai akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600"
          >
            Daftar disini! →
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
    </main>
  );
}

