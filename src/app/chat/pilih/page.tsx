"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
  const created = useRef(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const pastorId = searchParams?.get("pastorId");

  useEffect(() => {
  if (typeof window === "undefined") return;
  if (!pastorId) return;

  if (created.current) return;
  created.current = true;

  async function createRoom() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const meRes = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!meRes.ok) {
        router.push("/login");
        return;
      }

      const user = await meRes.json();

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

      if (!res.ok) throw new Error("Gagal membuat room");

      const room = await res.json();

      router.push(`/chat/${room.id}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
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