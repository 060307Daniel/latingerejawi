"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Home,
  BookText,
  GraduationCap,
  ShieldCheck,
  Users,
  Search,
  Award,
  Eye,
  XCircle,
  X,
  CheckCircle2,
  Info
} from "lucide-react";

/* =====================================================
   TYPES 
===================================================== */

interface ModuleProgress {
  slug: string;
  title: string;
  completed: number;
  total: number;
  progress: number;
  completedFully: boolean;
}

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  paroki: string;
  wilayah: string;
  joinedAt: string;

  completedLessons: number;
  totalLessons: number;
  lessonProgress: number;

  completedModules: number;
  totalModules: number;

  modules: ModuleProgress[];

  certificate: {
    issued: boolean;
    issuedAt?: string | null;
    status: string;
  };
}

interface DashboardResponse {
  statistics: {
    totalUsers: number;
    activeUsers: number;
    completedUsers: number;
    issuedCertificates: number;
  };

  filters: {
    paroki: string[];
    wilayah: string[];
  };

  users: DashboardUser[];
}

/* =====================================================
   COMPONENT
===================================================== */

export default function AdminDashboardPage() {
  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  const [selectedParoki, setSelectedParoki] = useState("");
  const [selectedWilayah, setSelectedWilayah] = useState("");

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<DashboardUser | null>(null);

  const [sortBy, setSortBy] = useState("az");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
const logoInputRef = useRef<HTMLInputElement>(null);

const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);

const [currentConfig, setCurrentConfig] = useState<any>(null);

const [editPastorName, setEditPastorName] = useState("");
const [editPastorTitle, setEditPastorTitle] = useState("Pastor Paroki");
const [saving, setSaving] = useState(false);

const [selectedCertificateParoki, setSelectedCertificateParoki] =
  useState("");


const saveCertificateConfig = async () => {
  if (!selectedCertificateParoki) {
    alert("Silakan pilih paroki terlebih dahulu.");
    return;
  }

  try {
    setSaving(true);

    let logoUrl = currentConfig?.parishLogo ?? null;

    // ============================
    // Upload logo jika ada file baru
    // ============================
    if (selectedLogoFile) {
      const formData = new FormData();

      formData.append("file", selectedLogoFile);

      const uploadRes = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload logo gagal");
      }

      const uploadData = await uploadRes.json();

      logoUrl = uploadData.url;
    }

    // ============================
    // Simpan ke database
    // ============================
    const res = await fetch(
      "/api/admin/dashboard/certificate-config",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paroki: selectedCertificateParoki,
          pastorName: editPastorName,
          pastorTitle: editPastorTitle,
          parishLogo: logoUrl,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Pengaturan berhasil disimpan.");

    fetchCertificateConfig(selectedCertificateParoki);
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan.");
  } finally {
    setSaving(false);
  }
};

useEffect(() => {
  if (selectedCertificateParoki) {
    fetchCertificateConfig(selectedCertificateParoki);
  }
}, [selectedCertificateParoki]);

  /* =====================================================
     AUTH + FETCH DASHBOARD
  ===================================================== */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const me = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!me.ok) {
          window.location.href = "/login";
          return;
        }

        const meData = await me.json();

        if (meData.role !== "ADMIN") {
          window.location.href = "/";
          return;
        }

        setUser(meData);

        const res = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: DashboardResponse = await res.json();

setDashboard(data);


      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

const fetchCertificateConfig = async (paroki: string) => {
  if (!paroki) return;

  try {
    const res = await fetch(
      `/api/admin/dashboard/certificate-config?paroki=${encodeURIComponent(paroki)}`
    );

    const data = await res.json();

    if (!data) {
      setCurrentConfig(null);

      setEditPastorName("");
      setEditPastorTitle("Pastor Paroki");

      setLogoPreview(null);

      return;
    }

    setCurrentConfig(data);

    setEditPastorName(data.pastorName);
    setEditPastorTitle(data.pastorTitle);

    setLogoPreview(data.parishLogo ?? null);
  } catch (err) {
    console.error(err);
  }
};


  /* =====================================================
     FILTER USERS
  ===================================================== */
  const filteredUsers = useMemo(() => {
    const users = dashboard?.users ?? [];
    const keyword = search.toLowerCase();

    let result = users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword);

      const matchParoki = !selectedParoki || u.paroki === selectedParoki;
      const matchWilayah = !selectedWilayah || u.wilayah === selectedWilayah;

      return matchSearch && matchParoki && matchWilayah;
    });

    // ===== SORTING =====
    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
        );
        break;
      case "progressHigh":
        result.sort((a, b) => b.lessonProgress - a.lessonProgress);
        break;
      case "progressLow":
        result.sort((a, b) => a.lessonProgress - b.lessonProgress);
        break;
    }

    return result;
  }, [dashboard, search, selectedParoki, selectedWilayah, sortBy]);

  /* =====================================================
     LOADING STATE
  ===================================================== */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-red-600"></div>
          <div className="text-xl font-semibold text-slate-600">Memuat Dashboard...</div>
        </div>
      </div>
    );
  }

  const handleLogoChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setSelectedLogoFile(file);

  setLogoPreview(URL.createObjectURL(file));
};

const removeLogo = () => {
  setLogoPreview(null);

  if (logoInputRef.current) {
    logoInputRef.current.value = "";
  }
};

  /* =====================================================
     MAIN RETURN START
  ===================================================== */
  return (
    <main className="min-h-screen bg-[#f5f7fb] pb-10">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0d1333]">LatinGerejawi</h1>
              <p className="text-slate-500 font-medium">Dashboard Administrator</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-6 py-3 text-white transition hover:bg-red-600">
              <Home size={18} /> Beranda
            </Link>
            <Link href="/glosarium" className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-6 py-3 text-white transition hover:bg-red-600">
              <BookText size={18} /> Glosarium
            </Link>
            <Link href="/profile" className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-6 py-3 text-white transition hover:bg-red-600">
              <GraduationCap size={18} /> {user?.name}
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
        
        {/* ================= HERO & STATISTICS (GLASSMORPHISM STYLE) ================= */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#dc2626] to-[#b91c1c] p-6 shadow-xl lg:p-10">
          
          {/* Ornamen Background */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
       <div className="flex flex-col items-center justify-center text-center">
  <div className="max-w-4xl">
    <div className="flex justify-center">
      <h2 className="text-5xl font-extrabold text-white lg:text-5xl">
        Dashboard Admin
      </h2>
    </div>

    <p className="mt-4 text-lg font-medium leading-relaxed text-white/90">
      Monitor perkembangan seluruh pengguna LatinGerejawi, pantau progress
      pembelajaran, serta kelola penerbitan sertifikat dari satu pusat kendali.
    </p>
  </div>
</div>

            {/* KARTU STATISTIK (3 Kolom - Glassmorphism) */}
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              
              {/* TOTAL PENGGUNA */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center gap-4 text-white">
                  <Users size={36} className="opacity-90" />
                  <div>
                    <h3 className="text-4xl font-extrabold">{dashboard?.statistics?.totalUsers ?? 0}</h3>
                    <p className="text-sm font-medium text-white/90">Total Pengguna Terdaftar</p>
                  </div>
                </div>
              </div>

              {/* KURSUS SELESAI */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center gap-4 text-white">
                  <CheckCircle2 size={36} className="opacity-90" />
                  <div>
                    <h3 className="text-4xl font-extrabold">{dashboard?.statistics?.completedUsers ?? 0}</h3>
                    <p className="text-sm font-medium text-white/90">Umat Selesai</p>
                  </div>
                </div>
              </div>

              {/* SERTIFIKAT */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="flex items-center gap-4 text-white">
                  <Award size={36} className="opacity-90" />
                  <div>
                    <h3 className="text-4xl font-extrabold">{dashboard?.statistics?.issuedCertificates ?? 0}</h3>
                    <p className="text-sm font-medium text-white/90">Sertifikat Diterbitkan</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      {/* ================= USER MANAGEMENT ================= */}
<div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

  {/* HEADER */}
  <div className="flex flex-col items-center text-center">

    <h2 className="text-4xl font-bold text-[#0d1333]">
      Progress Pengguna
    </h2>

    <p className="mt-3 max-w-5xl text-xl leading-relaxed text-slate-700"> Gunakan filter untuk menemukan data pengguna dengan lebih cepat.
    </p>
          </div>

      {/* FILTER SECTION */}
<div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">

  {/* SEARCH */}
  <div className="relative lg:col-span-5">
    <Search
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400"
    />

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Cari nama umat..."
      className="w-full rounded-2xl border-2 border-red-200 bg-white py-4 pl-12 pr-4 text-lg text-[#0d1333] outline-none transition-all duration-300 hover:border-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
    />
  </div>

  {/* PAROKI */}
  <div className="lg:col-span-3">
    <select
      value={selectedParoki}
      onChange={(e) => setSelectedParoki(e.target.value)}
      className="w-full rounded-2xl border-2 border-red-200 bg-white px-4 py-4 text-lg text-[#0d1333] outline-none transition-all duration-300 hover:border-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
    >
      <option value="">Semua Paroki</option>

      {dashboard?.filters?.paroki?.map((paroki) => (
        <option key={paroki} value={paroki}>
          {paroki}
        </option>
      ))}
    </select>
  </div>

  {/* SORT */}
  <div className="lg:col-span-3">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="w-full rounded-2xl border-2 border-red-200 bg-white px-4 py-4 text-lg text-[#0d1333] outline-none transition-all duration-300 hover:border-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
    >
      <option value="az">Nama A - Z</option>
      <option value="za">Nama Z - A</option>
      <option value="newest">Terbaru (Join)</option>
      <option value="oldest">Terlama (Join)</option>
      <option value="progressHigh">Progress Tertinggi</option>
      <option value="progressLow">Progress Terendah</option>
    </select>
  </div>

  {/* RESET */}
  <div className="lg:col-span-1">
    <button
  onClick={() => {
    setSearch("");
    setSelectedParoki("");
    setSelectedWilayah("");
    setSortBy("az");
  }}
  title="Reset Semua Filter"
  className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-red-500 bg-white text-red-600 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg"
>
  <XCircle size={22} />
</button>
  </div>

</div>


          {/* ================= DESKTOP TABLE ================= */}
          <div className="mt-8 hidden overflow-hidden rounded-3xl border border-slate-200 xl:block">

  <div className="max-h-[700px] overflow-y-auto overflow-x-auto">

    <table className="min-w-full">
                  <thead className="sticky top-0 z-10 bg-[#030326] text-white">
                  <tr>
                    <th className="px-6 py-5 text-left text-lg font-semibold">Umat</th>
                    <th className="px-6 py-5 text-left text-lg font-semibold">Paroki</th>
                    <th className="px-6 py-5 text-left text-lg font-semibold">Progress</th>
                    <th className="px-6 py-5 text-left text-lg font-semibold">Modul</th>
                    <th className="px-6 py-5 text-left text-lg font-semibold">Sertifikat</th>
                    {/*<th className="px-6 py-5 text-center text-lg font-semibold">Detail</th>*/}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredUsers.map((user) => {
                    const progress = Math.min(100, Math.max(0, Number(user.lessonProgress || 0)));

                    return (
                      <tr key={user.id} className="transition hover:bg-red-50">
                        {/* USER + INFO ICON */}
<td className="px-8 py-7">
  <div className="flex items-center justify-between">

    <div className="min-w-0">
      <h3 className="truncate text-xl font-bold text-[#030326]">
        {user.name}
      </h3>
    </div>

    <button
      onClick={() => setSelectedUser(user)}
      className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition hover:bg-red-100 hover:text-red-600"
      title="Lihat Detail Progres"
    >
      <Info size={22} />
    </button>

  </div>
</td>

                        {/* PAROKI */}
                        <td className="px-6 py-6">
                          <span className=" px-4 py-2 text-lg font-semibold text-[#030326]">
                            {user.paroki}
                          </span>
                        </td>

                        {/* PROGRESS */}
                        <td className="w-[260px] px-6 py-6">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-[#0d1333]">{progress}%</span>
                            <span className="text-sm font-medium text-slate-500">
                              {user.completedLessons} / {user.totalLessons}
                            </span>
                          </div>
                          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${progress >= 100 ? "bg-green-500" : "bg-red-600"}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </td>

                        {/* MODULE */}
                        <td className="px-6 py-6 font-bold text-[#0d1333]">
                          {user.completedModules} <span className="text-sm font-medium text-slate-500">/ {user.totalModules}</span>
                        </td>

                        {/* CERTIFICATE */}
                        <td className="px-6 py-6">
                          {user.certificate.issued ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                              🏆 Issued
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">
                              <XCircle size={14} /> Belum
                            </span>
                          )}
                        </td>

                        {/* DETAIL 
                        <td className="px-6 py-6 text-center">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d1333] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 hover:-translate-y-0.5"
                          >
                            <Eye size={16} /> Detail
                          </button>
                        </td>*/}
                      </tr>
                    );
                  })}
                  
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center">
                        <Users size={60} className="mx-auto mb-5 text-slate-300" />
                        <h3 className="text-2xl font-bold text-slate-700">Tidak ada pengguna</h3>
                        <p className="mt-3 text-lg text-slate-500">Tidak ditemukan pengguna yang sesuai dengan filter.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= MOBILE CARDS ================= */}
         <div className="mt-8 xl:hidden">

  <div className="max-h-[700px] space-y-5 overflow-y-auto pr-2">
            {filteredUsers.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <Users size={54} className="mx-auto mb-5 text-slate-300" />
                <h3 className="text-2xl font-bold text-slate-700">Tidak ada pengguna</h3>
                <p className="mt-3 text-slate-500">Tidak ditemukan pengguna sesuai filter.</p>
              </div>
              
            ) : (
              filteredUsers.map((user) => {
  const progress = Math.min(
    100,
    Math.max(0, Number(user.lessonProgress || 0))
  );

  return (
    <div
      key={user.id}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
    >

      {/* HEADER */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-4">

        <div className="min-w-0">
          <h3 className="truncate text-2xl font-bold text-[#0d1333]">
            {user.name}
          </h3>

          {/*(<p className="truncate text-sm text-slate-500">
            {user.email}
          </p>*/}
        </div>

        <button
          onClick={() => setSelectedUser(user)}
          className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition hover:bg-red-100 hover:text-red-600"
        >
          <Info size={20} />
        </button>

      </div>

      {/* INFO */}
      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase text-slate-400">
            Paroki
          </p>

          <p className="mt-1 font-semibold">
            {user.paroki}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase text-slate-400">
            Sertifikat
          </p>

          {user.certificate.issued ? (
            <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
              🏆 Issued
            </span>
          ) : (
            <span className="mt-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">
              Belum
            </span>
          )}
        </div>

      </div>

      {/* PROGRESS */}
      <div className="mt-6">

        <div className="mb-2 flex justify-between">
          <span className="font-medium text-slate-500">
            Progress
          </span>

          <span className="font-bold text-[#0d1333]">
            {progress}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              progress >= 100
                ? "bg-green-500"
                : "bg-red-600"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>
                  </div>
                );
              })
            )}
          </div>
         </div>
        </div>

        {/* ======================================
            MODAL (HYBRID STYLE)
        ====================================== */}
        {selectedUser && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1333]/60 p-4 backdrop-blur-sm transition-all">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
              
              {/* HEADER */}
              <div className="flex justify-between border-b border-slate-100 bg-slate-50 p-6">
                <div>
                     <h3 className="text-3xl font-bold text-[#0d1333]">Detail Umat</h3>

                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm border border-slate-100 transition hover:bg-red-50 hover:text-red-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="max-h-[75vh] overflow-y-auto p-6">
                
               {/* USER INFO */}
<div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  
  {/* Header */}
      <h3 className="text-2xl text-center font-bold text-[#0d1333]">PROFIL UMAT</h3>

  {/* Information Grid - Dibuat lebih lega dengan gap yang pas */}
  <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
    
    {/* Nama */}
    <div className="space-y-1">
      <p className="text-lg font-bold uppercase tracking-[0.15em] text-slate-500 mt-6">
        Nama Lengkap:
      </p>
      <p className="text-xl font-bold text-[#0d1333]">
        {selectedUser.name}
      </p>
    </div>

    {/* Email */}
    <div className="space-y-1">
      <p className="text-lg font-bold uppercase tracking-[0.15em] text-slate-500 mt-6">
        Email:
      </p>
      <p className="text-xl font-bold text-slate-700 break-all">
        {selectedUser.email}
      </p>
    </div>

    {/* Paroki */}
    <div className="space-y-1">
      <p className="text-lg font-bold uppercase tracking-[0.15em] text-slate-500">
        Paroki
      </p>
      <div>
       <p className="text-xl font-bold text-slate-700 break-all">
          {selectedUser.paroki}
        </p>
      </div>
    </div>

    {/* Wilayah */}
    <div className="space-y-1">
      <p className="text-lg font-bold uppercase tracking-[0.15em] text-slate-500">
        Wilayah Rohani
      </p>
     <p className="text-xl font-bold text-slate-700 break-all">
        {selectedUser.wilayah || "-"}
      </p>
    </div>
  </div>

</div>


                {/* MODULES */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 text-2xl font-bold text-center text-[#0d1333] gap-2">
                    PROGRESS PEMBELAJARAN
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedUser.modules.map((m) => {
                      const isModComplete = m.progress >= 100;
                      return (
                        <div key={m.slug} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-[#0d1333] leading-tight">{m.title}</p>
                            <span className={`text-sm font-extrabold ${isModComplete ? 'text-green-600' : 'text-red-600'}`}>
                              {m.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className={`h-full rounded-full ${isModComplete ? 'bg-green-500' : 'bg-red-600'}`}
                              style={{ width: `${m.progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                 {/* Certificate - Kartu Status */}
  {selectedUser.certificate.issued && selectedUser.certificate.issuedAt && (
    <div className="mt-10 rounded-2xl border border-green-100 bg-green-50/50 p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
              Status Sertifikat
            </p>
            <p className="mt-1 text-base font-extrabold text-green-900">
              Sertifikat Telah Diterbitkan
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 border-green-100 pt-4 sm:pt-0">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
            Tanggal Terbit
          </p>
          <p className="mt-1 text-base font-bold text-green-900">
            {new Date(selectedUser.certificate.issuedAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  )}

              </div>
            </div>
          </div>
        )}

        {/* LOADING GUARD */}
        {!dashboard && !loading && (
          <div className="flex min-h-[30vh] items-center justify-center text-slate-500 font-medium">
            Gagal memuat data direktori umat.
          </div>
        )}

{/* ================= PENGATURAN SERTIFIKAT PAROKI ================= */}
<div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

  {/* HEADER */}
  <div className="text-center">
    <h2 className="text-4xl font-bold text-[#030326]">
      Pengaturan Sertifikat Paroki
    </h2>

    <p className="mt-3 text-lg text-slate-600">
      Pilih paroki untuk mengubah identitas yang akan ditampilkan pada
      sertifikat kelulusan umat.
    </p>
  </div>

  {/* SELECT PAROKI */}
  <div className="mx-auto mt-10 max-w-xl">

    <select
  value={selectedCertificateParoki}
  onChange={(e) => setSelectedCertificateParoki(e.target.value)}
  className="w-full rounded-2xl border-2 border-red-200 bg-white px-5 py-4 text-lg text-[#030326] outline-none transition-all duration-300 hover:border-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
>
  <option value="">Pilih Paroki</option>

  {dashboard?.filters.paroki.map((paroki) => (
    <option key={paroki} value={paroki}>
      {paroki}
    </option>
  ))}
</select>

  </div>

  {/* CONTENT */}
  <div className="mt-10 grid gap-8 lg:grid-cols-2">

    {/* ================= DATA SAAT INI ================= */}
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

      <h3 className="mb-6 text-2xl font-bold text-[#030326]">
        Data Saat Ini
      </h3>

      <div className="space-y-6">

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Pastor Paroki
          </p>

         <p className="mt-2 text-xl font-bold text-[#030326]">
 {currentConfig?.pastorName ?? "-"}
</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-500">
            Logo Paroki
          </p>

          <div className="flex h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white">
{currentConfig?.parishLogo ? (
  <img
    src={currentConfig.parishLogo}
    className="max-h-48 object-contain"
  />
) : (
  <span className="text-slate-400">
    Belum ada logo
  </span>
)}

          </div>
        </div>

      </div>

    </div>

    {/* ================= EDIT ================= */}
    <div className="rounded-3xl border border-red-200 bg-white p-6">

      <h3 className="mb-6 text-2xl font-bold text-[#030326]">
        Edit Identitas
      </h3>

      {/* Pastor */}
      <div>

        <label className="mb-3 block text-lg font-semibold text-[#030326]">
          Nama Pastor Paroki
        </label>

        <input
  type="text"
  value={editPastorName}
  onChange={(e) => setEditPastorName(e.target.value)}
  placeholder="Masukkan nama pastor..."
  className="w-full rounded-2xl border-2 border-red-200 px-5 py-4 text-lg outline-none transition-all duration-300 hover:border-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
/>

      </div>

     {/* Logo */}
<div className="mt-8">

  <label className="mb-3 block text-lg font-semibold text-[#030326]">
    Logo Paroki Baru
  </label>

  {/* Preview */}
  <div className="relative flex h-72 items-center justify-center rounded-2xl border-2 border-dashed border-red-300 bg-red-50">

    {/* Tombol Hapus */}
    {logoPreview && (
      <button
        type="button"
        onClick={removeLogo}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow transition hover:bg-red-600 hover:text-white"
        title="Hapus Logo"
      >
        <X size={18} />
      </button>
    )}

    {/* Preview */}
    {logoPreview ? (
      <img
        src={logoPreview}
        alt="Preview Logo"
        className="max-h-52 max-w-[80%] object-contain"
      />
    ) : (
      <div className="text-center">

        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow">
          <Award size={36} className="text-red-500" />
        </div>

        <p className="font-semibold text-slate-700">
          Belum ada logo dipilih
        </p>

        <p className="mt-2 text-sm text-slate-500">
          PNG, JPG atau WEBP
        </p>

      </div>
    )}

  </div>

  {/* Hidden Input */}
  <input
    ref={logoInputRef}
    type="file"
    accept="image/png,image/jpeg,image/jpg,image/webp"
    className="hidden"
    onChange={handleLogoChange}
  />

  {/* Tombol Upload */}
  <button
    type="button"
    onClick={() => logoInputRef.current?.click()}
    className="mt-5 w-full rounded-2xl border-2 border-red-500 py-4 text-lg font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
  >
    {logoPreview ? "Ganti Logo" : "Upload Logo"}
  </button>

</div>
    </div>

  </div>

  {/* BUTTON */}
  <div className="mt-10 flex justify-end">

    <button
  onClick={saveCertificateConfig}
  disabled={saving}
  className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-red-700 disabled:opacity-50"
>
  {saving ? "Menyimpan..." : "Simpan Perubahan"}
</button>

  </div>

</div>

        

        {/* ================= FOOTER ================= */}
        <footer className="mt-16 border-t border-slate-200 py-10 text-center text-sm text-slate-500">
          <p className="text-lg font-bold text-[#0d1333]">© 2026 Latin Gerejawi.</p>
          <p className="mt-2 font-medium">Ad Maiorem Dei Gloriam — Belajar Bahasa Latin Gereja Katolik</p>
        </footer>

      </section>
    </main>
  );
}