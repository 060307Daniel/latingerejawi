"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownAZ,
  ArrowUpZA,
  Search,
  BookOpen,
  Home,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

type WordItem = {
  latin: string;
  indonesia: string;
};

type SortKey = "latin" | "indonesia";
type SortOrder = "asc" | "desc";

const dummyWords: WordItem[] = [
  // Halaman 140 - Kolom Kiri
  { latin: "ab + abl.", indonesia: "dari" },
  { latin: "abscondo 3", indonesia: "menyembunyikan" },
  { latin: "absolvo 3", indonesia: "melepaskan, mengampuni" },
  { latin: "accuso 1", indonesia: "menuduh" },
  { latin: "acer, acris, acre", indonesia: "tajam ; keras" },
  { latin: "ácies,-ei", indonesia: "barisan perang" },
  { latin: "ad + acc.", indonesia: "ke...., dekat, pada" },
  { latin: "áditus,-us", indonesia: "jalan masuk" },
  { latin: "adiuvo 1", indonesia: "membantu" },
  { latin: "admoneo 2", indonesia: "menasihati" },
  { latin: "adolescens,-entis M", indonesia: "pemuda; remaja" },
  { latin: "adoro 1", indonesia: "menyembah" },
  { latin: "advéntus,-us", indonesia: "kedatangan" },
  { latin: "adversarius,-i", indonesia: "pelawan" },
  { latin: "aedifico 1", indonesia: "membangun" },
  { latin: "aeger,-gra,-grum", indonesia: "sakit" },
  { latin: "aeternus-a-um", indonesia: "abadi" },
  { latin: "ager, agri", indonesia: "ladang" },
  { latin: "agnus,-i", indonesia: "anak domba" },
  { latin: "agricola,-ae", indonesia: "petani" },
  { latin: "alacer,-cris,-cre", indonesia: "riang" },
  { latin: "altare, altaris N", indonesia: "altar" },
  { latin: "altus-a-um", indonesia: "tinggi ; dalam" },
  { latin: "ambo, ambonis F", indonesia: "mimbar" },
  { latin: "ambulo 1", indonesia: "berjalan" },
  { latin: "amens, amentis", indonesia: "gila" },
  { latin: "amicitia,-ae", indonesia: "persahabatan" },
  { latin: "amicus,-i", indonesia: "sahabat" },
  { latin: "amo 1", indonesia: "mengasihi" },
  { latin: "amor, amoris M", indonesia: "cinta-kasih" },
  { latin: "amphitheatrum,-i", indonesia: "stadion" },
  { latin: "ancilla,-ae", indonesia: "abdi per." },
  { latin: "angelicus-a-um", indonesia: "dari malekat" },
  { latin: "angelus,-i", indonesia: "malaikat" },
  { latin: "angustus-a-um", indonesia: "sempit" },
  { latin: "anima,-ae", indonesia: "jiwa" },
  { latin: "animal, animalis N", indonesia: "binatang" },
  { latin: "animus,-i", indonesia: "hati; watak" },
  { latin: "annuntio 1", indonesia: "mengabarkan" },
  { latin: "annus,-i", indonesia: "tahun" },
  { latin: "ante + acc.", indonesia: "1. di muka; 2. sebelum" },
  { latin: "anulus,-i", indonesia: "cincin" },
  { latin: "aperio 4", indonesia: "membuka" },

  // Halaman 140 - Kolom Kanan
  { latin: "apostolus,-i", indonesia: "rasul" },
  { latin: "appello 1", indonesia: "menamai" },
  { latin: "appropinquo 1", indonesia: "mendekati" },
  { latin: "apud + acc.", indonesia: "dekat; pada" },
  { latin: "aqua,-ae", indonesia: "air" },
  { latin: "ara,-ae", indonesia: "altar" },
  { latin: "arbitrer, arbitri", indonesia: "wasit" },
  { latin: "arbor, arboris F", indonesia: "pohon" },
  { latin: "archangelus,-i", indonesia: "malaikat agung" },
  { latin: "arduus-a-um", indonesia: "curam" },
  { latin: "arma,-orum", indonesia: "senjata" },
  { latin: "armo 1", indonesia: "mempersenjatai" },
  { latin: "aro 1", indonesia: "membajak" },
  { latin: "ars, artis F", indonesia: "kesenian" },
  { latin: "artus,-us", indonesia: "anggota" },
  { latin: "arx, arcis F", indonesia: "puri" },
  { latin: "ásinus,-i", indonesia: "keledai" },
  { latin: "asper,-era,-erum", indonesia: "kasar" },
  { latin: "audacia,-ae", indonesia: "keberanian" },
  { latin: "audio 4", indonesia: "mendengar" },
  { latin: "augeo 2", indonesia: "menambahkan" },
  { latin: "auris, auris F", indonesia: "telinga" },
  { latin: "aurum,-i", indonesia: "emas" },
  { latin: "autem", indonesia: "tetapi" },
  { latin: "auxilium,-i", indonesia: "pertolongan" },
  { latin: "avus,-a", indonesia: "kakek, nenek l.l" },
  { latin: "báculum,-i", indonesia: "tongkat" },
  { latin: "baptisma,-matis N", indonesia: "pembaptisan" },
  { latin: "barbarus-a-um", indonesia: "biadab" },
  { latin: "beatus-a-um", indonesia: "berbahagia" },
  { latin: "bello 1", indonesia: "berperang" },
  { latin: "bellum,-i", indonesia: "perang" },
  { latin: "benedico 3", indonesia: "memberkati" },
  { latin: "benedictus-a-um", indonesia: "terberkati" },
  { latin: "benígnus-a-um", indonesia: "murah hati" },
  { latin: "bestia,-ae", indonesia: "binatang" },
  { latin: "bibo 3", indonesia: "minum" },
  { latin: "bonum,-i", indonesia: "harta benda" },
  { latin: "bonus-a,um", indonesia: "baik" },
  { latin: "brevis-e", indonesia: "pendek; singkat" },
  { latin: "cáedere 3", indonesia: "menebang, membunuh;" },
  { latin: "caeli,-orum", indonesia: "surga" },
  { latin: "caelum,-i", indonesia: "langit, surga" },
  { latin: "calcar, calcaris N", indonesia: "pacu" }
];

export default function KamusPage() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("latin");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const filteredAndSorted = useMemo(() => {
    let data = dummyWords.filter(
      (w) =>
        w.latin.toLowerCase().includes(query.toLowerCase()) ||
        w.indonesia.toLowerCase().includes(query.toLowerCase())
    );

    data.sort((a, b) => {
      const aVal = a[sortKey].toLowerCase();
      const bVal = b[sortKey].toLowerCase();

      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    return data;
  }, [query, sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] pb-10">

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white lg:h-14 lg:w-14">
              <BookOpen size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#0d1333] lg:text-4xl">
                LatinGerejawi
              </h1>
              <p className="text-sm text-slate-500 lg:text-lg">
                Belajar Bahasa Latin Gerejawi
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end lg:w-auto lg:gap-4">

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
            >
              <Home size={20} />
              Beranda
            </Link>

            {user ? (
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
              >
                <GraduationCap size={20} />
                {user.name || "Profil"}
              </Link>
            ) : (
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#030326] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:px-8 lg:py-4 lg:text-lg"
              >
                <GraduationCap size={20} />
                Belum Masuk? Daftar Sekarang!
              </Link>
            )}

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="px-10 py-12">

        {/* BACK BUTTON (UNCHANGED DESIGN) */}
        <div className="mx-auto max-w-5xl mb-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold text-[#111827]"
          >
            <ArrowLeft size={22} />
            Kembali ke Dashboard
          </Link>
        </div>

        {/* TITLE */}
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold text-[#030326]">
            Glosarium Latin Gerejawi
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Cari dan pelajari arti kata Latin Gerejawi
          </p>
        </div>

        {/* SEARCH + SORT */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kata Latin atau Indonesia..."
              className="pl-10 py-6 text-base rounded-xl"
            />
          </div>

          <div className="flex gap-3">

            <Button
              variant={sortKey === "latin" ? "default" : "outline"}
              onClick={() => toggleSort("latin")}
              className="flex items-center gap-2 px-5 py-6 text-base"
            >
              {sortKey === "latin" && sortOrder === "asc" ? (
                <ArrowDownAZ size={18} />
              ) : (
                <ArrowUpZA size={18} />
              )}
              Latin Gerejawi
            </Button>

            <Button
              variant={sortKey === "indonesia" ? "default" : "outline"}
              onClick={() => toggleSort("indonesia")}
              className="flex items-center gap-2 px-5 py-6 text-base"
            >
              {sortKey === "indonesia" && sortOrder === "asc" ? (
                <ArrowDownAZ size={18} />
              ) : (
                <ArrowUpZA size={18} />
              )}
              Indonesia
            </Button>

          </div>
        </div>

        {/* TABLE ✅ FIX: SCROLL AREA (ALL DATA STILL EXIST) */}
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border bg-white shadow-md">

          {/* 🔥 THIS IS THE KEY FIX */}
          <div className="max-h-[600px] overflow-y-auto">

            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-base font-semibold py-4">
                    Latin Gerejawi
                  </TableHead>
                  <TableHead className="text-base font-semibold py-4">
                    Indonesia
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredAndSorted.length > 0 ? (
                  filteredAndSorted.map((word, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">

                      <TableCell className="py-5 text-base font-semibold text-[#030326]">
                        {word.latin}
                      </TableCell>

                      <TableCell className="py-5 text-base">
                        {word.indonesia}
                      </TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-gray-500 py-6 text-base">
                      Kata tidak ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>

          </div>
        </div>

      </div>

    

      {/* FOOTER */}
      <div className="mt-16 text-center text-base leading-8 text-slate-500">
        <p>© 2026 Latin Gerejawi. Ad Maiorem Dei Gloriam.</p>
        <p>Untuk Kemuliaan Tuhan - Belajar Bahasa Latin Gereja Katolik</p>
      </div>

    </main>
  );
}