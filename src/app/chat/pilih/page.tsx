"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
  const created = useRef(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const pastorId = searchParams?.get("pastorId");

  useEffect(() => {
    if (!pastorId) return;

    // cegah useEffect jalan 2x
    if (created.current) return;
    created.current = true;

    async function createRoom() {
      try {
        // ambil token login
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Silakan login terlebih dahulu");
          router.push("/login");
          return;
        }

        // ambil user login
        const meRes = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!meRes.ok) {
          alert("Session login tidak valid");
          router.push("/login");
          return;
        }

        const user = await meRes.json();

        console.log("USER:", user);
        console.log("PASTOR:", pastorId);

        // buat atau cari room
        const res = await fetch("/api/chat-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            pastorId,
          }),
        });

        if (!res.ok) {
          throw new Error("Gagal membuat room");
        }

        const room = await res.json();

        console.log("ROOM:", room);

        // redirect ke room chat
        router.push(`/chat/${room.id}`);
      } catch (error) {
        console.error("ERROR CREATE ROOM:", error);
        alert("Terjadi kesalahan saat membuat chat");
      }
    }

    createRoom();
  }, [pastorId, router]);

  return (
    <div className="p-6">
      <p>Membuat chat dengan pastor...</p>
    </div>
  );
}