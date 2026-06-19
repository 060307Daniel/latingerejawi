export type Question =
  | {
      id: string;
      module: string;
      type: "multiple" | "C1" | "C5";
      topic: string;
      question: string;
      options: string[];
      answer: number;
      hint?: string;
    }
  | {
      id: string;
      module: string;
      type: "speech";
      topic: string;
      question: string;
      targetWord: string;
      accepted: string[];
      hint?: string;
    };
    
    export const finalAssessmentQuestionBank = [
  // ==========================
// HURUF MATI
// ==========================

{
  id: 1,
  module: "huruf-mati",
  type: "multiple",
  topic: "C",
  question: "Kata clarus dibaca ....",
  options: ["klarus", "sylarus", "calarus", "selarus"],
  answer: 0,
},

{
  id: 2,
  module: "huruf-mati",
  type: "multiple",
  topic: "C",
  question: "Kata centum dibaca ....",
  options: ["kentum", "sentum", "centum", "syentum"],
  answer: 1,
},

{
  id: 3,
  module: "huruf-mati",
  type: "multiple",
  topic: "C",
  question: "Kata cito dibaca ....",
  options: ["kito", "sito", "cito", "syito"],
  answer: 1,
},

{
  id: 4,
  module: "huruf-mati",
  type: "multiple",
  topic: "C",
  question: "Huruf c pada caedes dibaca ....",
  options: ["a", "ae, oe, e, i", "selalu awal", "u"],
  answer: 1,
},

{
  id: 5,
  module: "huruf-mati",
  type: "multiple",
  topic: "C",
  question: "Huruf c pada coetus berubah karena ....",
  options: ["u", "ae, oe, e, i", "s", "awal"],
  answer: 1,
},

{
  id: 6,
  module: "huruf-mati",
  type: "multiple",
  topic: "G",
  question: "Kata gloria dibaca ....",
  options: ["gloria", "jloria", "nyoria", "geloria"],
  answer: 0,
},

{
  id: 7,
  module: "huruf-mati",
  type: "multiple",
  topic: "G",
  question: "Kata genus dibaca ....",
  options: ["genus", "kenus", "jenus", "senus"],
  answer: 2,
},

{
  id: 8,
  module: "huruf-mati",
  type: "multiple",
  topic: "G",
  question: "Kata agnus dibaca ....",
  options: ["agnus", "agnyus", "anyus", "ayus"],
  answer: 2,
},

{
  id: 9,
  module: "huruf-mati",
  type: "multiple",
  topic: "G",
  question: "Huruf g pada genus dibaca ....",
  options: ["n", "e/i", "awal", "s"],
  answer: 1,
},

{
  id: 10,
  module: "huruf-mati",
  type: "multiple",
  topic: "G",
  question: "Huruf g pada agnosco berubah karena ....",
  options: ["vokal", "n", "akhir", "s"],
  answer: 1,
},

{
  id: 11,
  module: "huruf-mati",
  type: "multiple",
  topic: "S",
  question: "Kata sol dibaca ....",
  options: ["sol", "syol", "zol", "kol"],
  answer: 0,
},

{
  id: 12,
  module: "huruf-mati",
  type: "multiple",
  topic: "S",
  question: "Kata scientia dibaca ....",
  options: ["sientia", "scientia", "syentia", "kentia"],
  answer: 2,
},

{
  id: 13,
  module: "huruf-mati",
  type: "multiple",
  topic: "S",
  question: "Kata satis dibaca ....",
  options: ["syatis", "satis", "katis", "jatis"],
  answer: 1,
},

{
  id: 14,
  module: "huruf-mati",
  type: "multiple",
  topic: "S",
  question: "Huruf s pada scientia dibaca ....",
  options: ["t", "ce/cis", "a", "awal"],
  answer: 1,
},

{
  id: 15,
  module: "huruf-mati",
  type: "multiple",
  topic: "S",
  question: "Huruf s pada scelus berubah karena ....",
  options: ["vokal", "ce/cis", "m", "akhir"],
  answer: 1,
},

{
  id: 16,
  module: "huruf-mati",
  type: "multiple",
  topic: "TI",
  question: "Kata tigris dibaca ....",
  options: ["tigris", "tsi-gris", "tig-ris", "syigris"],
  answer: 0,
},

{
  id: 17,
  module: "huruf-mati",
  type: "multiple",
  topic: "TI",
  question: "Kata motio dibaca ....",
  options: ["motio", "mosio", "motsiyo", "motsio"],
  answer: 2,
},

{
  id: 18,
  module: "huruf-mati",
  type: "multiple",
  topic: "TI",
  question: "Kata ostium dibaca ....",
  options: ["ostsium", "ostium", "osyium", "ostsiyum"],
  answer: 1,
},

{
  id: 19,
  module: "huruf-mati",
  type: "multiple",
  topic: "TI",
  question: "Kata contio dibaca karena ....",
  options: ["selalu ti", "vokal & bukan s", "akhir", "m"],
  answer: 1,
},

{
  id: 20,
  module: "huruf-mati",
  type: "multiple",
  topic: "TI",
  question: "Kata altior dibaca 'altsiyor' karena ....",
  options: ["ti jadi tsi", "selalu ti", "r", "awal"],
  answer: 0,
},

{
  id: 21,
  module: "huruf-hidup",
  type: "multiple",
  topic: "VOKAL",
  question: "Huruf hidup dalam bahasa Latin Gerejawi adalah ...",
  options: [
    "A, B, C, D, E",
    "A, E, I, O, U",
    "A, E, F, G, H",
    "A, I, K, L, M"
  ],
  answer: 1,
},

{
  id: 22,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE",
  question: "Huruf AE dalam bahasa Latin Gerejawi dibaca ...",
  options: ["A-E", "AE", "E", "A"],
  answer: 2,
},

{
  id: 23,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Huruf OE dalam bahasa Latin Gerejawi dibaca ...",
  options: ["O-E", "O", "E", "OE"],
  answer: 2,
},

{
  id: 24,
  module: "huruf-hidup",
  type: "multiple",
  topic: "A",
  question: "Huruf vokal tunggal A dibaca ...",
  options: ["A", "AE", "E", "O"],
  answer: 0,
},

{
  id: 25,
  module: "huruf-hidup",
  type: "multiple",
  topic: "E",
  question: "Huruf vokal tunggal E dibaca ...",
  options: ["I", "E", "AE", "OE"],
  answer: 1,
},

{
  id: 26,
  module: "huruf-hidup",
  type: "multiple",
  topic: "I",
  question: "Huruf vokal tunggal I dibaca ...",
  options: ["I", "E", "A", "O"],
  answer: 0,
},

{
  id: 27,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Huruf OE merupakan ...",
  options: [
    "huruf mati",
    "vokal tunggal",
    "vokal rangkap",
    "konsonan"
  ],
  answer: 2,
},

{
  id: 28,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE-OE",
  question: "Huruf AE dan OE dalam Latin Gerejawi sama-sama dibaca ...",
  options: ["A", "O", "E", "I"],
  answer: 2,
},

// ==========================
// HURUF HIDUP (lanjutan)
// ID 29 - 40
// ==========================

{
  id: 29,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE",
  question: "Kata LAETUS dibaca ...",
  options: ["La-e-tus", "Le-tus", "La-tus", "Lo-tus"],
  answer: 1,
},

{
  id: 30,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE",
  question: "Kata TERRAE dibaca ...",
  options: ["Ter-ra-e", "Ter-re", "Te-rae", "Ta-re"],
  answer: 1,
},

{
  id: 31,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Kata POENA dibaca ...",
  options: ["Po-e-na", "Pe-na", "Pa-na", "Po-na"],
  answer: 1,
},

{
  id: 32,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Kata PROELIUM dibaca ...",
  options: [
    "Pro-e-li-um",
    "Pre-li-um",
    "Pro-li-um",
    "Pro-e-lum"
  ],
  answer: 1,
},

{
  id: 33,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE",
  question: "Kata CAELUM dibaca ...",
  options: ["Ca-e-lum", "Ce-lum", "Ca-lum", "Coe-lum"],
  answer: 1,
},

{
  id: 34,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Kata FOEDUS dibaca ...",
  options: ["Fo-e-dus", "Fe-dus", "Fa-dus", "Foe-dus"],
  answer: 1,
},

{
  id: 35,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Kata COENA dibaca ...",
  options: ["Co-e-na", "Ce-na", "Co-na", "Ca-na"],
  answer: 1,
},

{
  id: 36,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE",
  question: "Kata PRAECEPTUM dibaca ...",
  options: [
    "Pra-e-cep-tum",
    "Pre-sep-tum",
    "Pra-cep-tum",
    "Pro-e-cep-tum"
  ],
  answer: 1,
},

{
  id: 37,
  module: "huruf-hidup",
  type: "multiple",
  topic: "VOKAL",
  question: "Huruf hidup dalam bahasa Latin Gerejawi disebut juga ...",
  options: [
    "Konsonan",
    "Huruf mati",
    "Vokal",
    "Diftong"
  ],
  answer: 2,
},

{
  id: 38,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE-OE",
  question: "Vokal rangkap dalam bahasa Latin Gerejawi adalah ...",
  options: [
    "AI dan AU",
    "AE dan OE",
    "EI dan OU",
    "IA dan IO"
  ],
  answer: 1,
},

{
  id: 39,
  module: "huruf-hidup",
  type: "multiple",
  topic: "OE",
  question: "Manakah pelafalan yang benar untuk kata POENA menurut aturan huruf hidup Latin Gerejawi?",
  options: [
    "Po-e-na",
    "Po-na",
    "Pe-na",
    "Pe-e-na"
  ],
  answer: 2,
},

{
  id: 40,
  module: "huruf-hidup",
  type: "multiple",
  topic: "AE",
  question: 'Kata CAELUM dibaca "Ce-lum" karena ...',
  options: [
    'huruf C selalu dibaca "ce"',
    "huruf AE dibaca seperti huruf E",
    "huruf A tidak dibaca",
    "huruf C berubah menjadi S"
  ],
  answer: 1,
},

// ==========================
// DOA TANDA SALIB
// ID 41 - 56
// ==========================

{
  id: 41,
  module: "doa-tanda-salib",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'In nomine' dengan benar",
  targetWord: "in nomine",
  accepted: [
    "in nomine",
    "in nominé",
    "illuminate",
    "in nominee",
    "in no mine",
    "in nomine patris",
    "i nomine",
    "i nomi né",
  ],
},

{
  id: 42,
  module: "doa-tanda-salib",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Patris' dengan benar",
  targetWord: "patris",
  accepted: [
    "patris",
    "pa tris",
    "patricee",
    "patrice",
    "patriss",
  ],
},

{
  id: 43,
  module: "doa-tanda-salib",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Filii' dengan benar",
  targetWord: "filii",
  accepted: [
    "filii",
    "fi li i",
    "fi lii",
    "fi-li-i",
    "philee",
  ],
},

{
  id: 44,
  module: "doa-tanda-salib",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Spiritus Sancti' dengan benar",
  targetWord: "spiritus sancti",
  accepted: [
    "spiritus sancti",
    "spiritus sankti",
    "spiritus san cti",
    "spiritus sanki",
    "spiritus Santi",
    "spirit to santi",
    "spiritus sangti",
    "Spirito Santo",
  ],
},

{
  id: 45,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pelafalan",
  question: "In nomine Patris, et Filii, et Spiritus Sancti dibaca dengan cara ....",
  options: [
    "Setiap kata dihilangkan sebagian",
    "Semua huruf dibaca jelas tanpa dihilangkan",
    "Hanya bagian akhir yang dibaca",
    "Dibaca cepat tanpa aturan"
  ],
  answer: 1,
},

{
  id: 46,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pelafalan",
  question: "Kata Sancti dibaca ....",
  options: ["san-ti", "sang-ti", "sank-ti", "san-ci"],
  answer: 2,
},

{
  id: 47,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pelafalan",
  question: "Filii dibaca ....",
  options: ["fi-li", "fi-li-i", "fi-lai", "fil-i"],
  answer: 1,
},

{
  id: 48,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pelafalan",
  question: "Patris dibaca ....",
  options: ["pa-tris", "pa-tri", "pat-ris", "pa-teris"],
  answer: 0,
},

{
  id: 49,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Arti Kata",
  question: "Ungkapan In nomine berarti ....",
  options: ["Roh Kudus", "Putra", "Dalam nama", "Bapa"],
  answer: 2,
},

{
  id: 50,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata Patris berarti ....",
  options: ["Roh Kudus", "Putra", "Nama", "Bapa"],
  answer: 3,
},

{
  id: 51,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata Filii berarti ....",
  options: ["Roh Kudus", "Putra", "Bapa", "Nama"],
  answer: 1,
},

{
  id: 52,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Arti Kata",
  question: "Spiritus Sancti berarti ....",
  options: ["Roh Kudus", "Putra", "Bapa", "Dalam nama"],
  answer: 0,
},

{
  id: 53,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pemahaman",
  question: "Dalam doa Tanda Salib, urutan yang benar adalah ....",
  options: [
    "Filii – Patris – Sancti",
    "In nomine – Patris – Filii – Spiritus Sancti – Amen",
    "Patris – Spiritus – Filii",
    "Amen – In nomine – Patris"
  ],
  answer: 1,
},

{
  id: 54,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pelafalan",
  question: "Mengapa dalam bahasa Latin semua kata dibaca jelas?",
  options: [
    "Karena lebih cepat",
    "Karena huruf tertentu dihilangkan",
    "Karena setiap huruf harus diucapkan jelas",
    "Karena hanya untuk tulisan"
  ],
  answer: 2,
},

{
  id: 55,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pelafalan",
  question: "Jika kamu membaca 'Sancti', huruf 'c' harus dibaca sebagai ....",
  options: ["s", "k", "t", "c tetap"],
  answer: 1,
},

{
  id: 56,
  module: "doa-tanda-salib",
  type: "multiple",
  topic: "Pemahaman",
  question: "Dalam konteks doa Tanda Salib, 'Filii' mengacu pada ....",
  options: [
    "Roh Kudus",
    "Putra (Yesus Kristus)",
    "Bapa",
    "Nama Tuhan"
  ],
  answer: 1,
},

// ==========================
// DOA BAPA KAMI
// ID 57 - 86
// ==========================

{
  id: 57,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata Pater berarti ....",
  options: ["Putra", "Roh Kudus", "Bapa", "Surga"],
  answer: 2,
},

{
  id: 58,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata noster berarti ....",
  options: ["Kami", "Nama", "Kerajaan", "Kehendak"],
  answer: 0,
},

{
  id: 59,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata caelis berarti ....",
  options: ["Bumi", "Surga", "Kerajaan", "Langit malam"],
  answer: 1,
},

{
  id: 60,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata nomen berarti ....",
  options: ["Nama", "Bapa", "Dosa", "Hari"],
  answer: 0,
},

{
  id: 61,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata regnum berarti ....",
  options: ["Kehendak", "Kerajaan", "Roti", "Pencobaan"],
  answer: 1,
},

{
  id: 62,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata voluntas berarti ....",
  options: ["Kehendak", "Nama", "Kerajaan", "Surga"],
  answer: 0,
},

{
  id: 63,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata panem berarti ....",
  options: ["Air", "Makanan", "Roti", "Buah"],
  answer: 2,
},

{
  id: 64,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata hodie berarti ....",
  options: ["Besok", "Hari ini", "Kemarin", "Sekarang"],
  answer: 1,
},

{
  id: 65,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata debita berarti ....",
  options: ["Nama", "Kerajaan", "Dosa atau hutang", "Kehendak"],
  answer: 2,
},

{
  id: 66,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata malo berarti ....",
  options: ["Kebaikan", "Kerajaan", "Surga", "Kejahatan"],
  answer: 3,
},

{
  id: 67,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Jika menemukan gabungan huruf qu pada kata qui, cara membacanya adalah ....",
  options: ["ku", "kw", "q", "ki"],
  answer: 1,
},

{
  id: 68,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Gabungan huruf ae pada kata caelis dibaca ....",
  options: ["ae", "ai", "e", "a"],
  answer: 2,
},

{
  id: 69,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Kata tentationem dibaca ....",
  options: [
    "ten-ta-ti-o-nem",
    "ten-ta-si-o-nem",
    "ten-ta-tsi-o-nem",
    "ten-ta-ci-o-nem"
  ],
  answer: 2,
},

{
  id: 70,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: 'Mengapa kata tuum dibaca "tu-um"?',
  options: [
    "Karena huruf u kedua tidak dibaca",
    "Karena vokal digabung",
    "Karena setiap vokal dibaca jelas",
    "Karena dibaca cepat"
  ],
  answer: 2,
},

{
  id: 71,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Saat membaca doa Bapa Kami, huruf-huruf dalam kata Latin harus ....",
  options: [
    "Banyak dihilangkan",
    "Dibaca jelas sesuai tulisan",
    "Diganti ke bahasa Indonesia",
    "Dipersingkat"
  ],
  answer: 1,
},

{
  id: 72,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Jika menemukan kata quotidianum, bunyi awal yang benar adalah ....",
  options: ["ko", "cho", "kwo", "kuo"],
  answer: 2,
},

{
  id: 73,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Kata caelo dibaca ....",
  options: ["ka-e-lo", "cai-lo", "ce-lo", "ka-lo"],
  answer: 2,
},

{
  id: 74,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Saat mendaraskan Adveniat, setiap vokal harus ....",
  options: [
    "Digabung",
    "Dihilangkan",
    "Dibaca terpisah dan jelas",
    "Dipercepat"
  ],
  answer: 2,
},

{
  id: 75,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Kata Sanctificetur mengajarkan bahwa huruf c pada kata tersebut dibaca ....",
  options: ["s", "sy", "k", "c"],
  answer: 2,
},

{
  id: 76,
  module: "doa-bapa-kami",
  type: "multiple",
  topic: "Pelafalan",
  question: "Ketika membaca doa Bapa Kami dalam bahasa Latin, tujuan memahami aturan pelafalan adalah agar ....",
  options: [
    "Dapat membaca dan mendaraskan doa dengan benar",
    "Cepat menghafal tanpa memahami",
    "Tidak perlu memahami arti",
    "Mengubah doa ke bahasa lain"
  ],
  answer: 0,
},

{
  id: 77,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Pater'",
  targetWord: "pater",
  accepted: ["pater", "pa ter", "butter"],
},

{
  id: 78,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Qui tollis'",
  targetWord: "qui tollis",
  accepted: [
    "qui tollis",
    "kwi",
    "kwi tollis",
    "quieto Liszt",
    "kwi tolis",
  ],
},

{
  id: 79,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Caelis'",
  targetWord: "caelis",
  accepted: [
    "celis",
    "ce lis",
    "Cialis",
    "Jalisse",
    "Cervis",
  ],
},

{
  id: 80,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Sanctificetur'",
  targetWord: "sanctificetur",
  accepted: [
    "sanktificetur",
    "sank ti fi ce tur",
    "santificatore",
    "Santi Fischer tour",
    "San tifi Sector",
    "santi pisciaturo",
    "santi pisciatore",
  ],
},

{
  id: 81,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Adveniat'",
  targetWord: "adveniat",
  accepted: [
    "adveniat",
    "ad ve ni at",
    "Atena",
    "astenia",
    "athenia",
  ],
},

{
  id: 82,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Fiat'",
  targetWord: "fiat",
  accepted: [
    "fiat",
    "fi at",
    "fi-at",
  ],
},

{
  id: 83,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Quotidianum'",
  targetWord: "quotidianum",
  accepted: [
    "quotidianum",
    "kwo tidianum",
    "kwo ti di a num",
    "kwotidianum",
    "Quotidiano",
    "call titanium",
    "call TDM",
    "call tina",
    "call adriana",
  ],
},

{
  id: 84,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Hodie'",
  targetWord: "hodie",
  accepted: [
    "hodie",
    "ho di e",
    "ho-di-e",
    "Holiday",
  ],
},

{
  id: 85,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Tentationem'",
  targetWord: "tentationem",
  accepted: [
    "tentationem",
    "ten ta tsi o nem",
    "tentatsionem",
    "ten-ta-tsi-o-nem",
    "tentacion name",
    "tentazione",
  ],
},

{
  id: 86,
  module: "doa-bapa-kami",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan kata 'Nomen Tuum'",
  targetWord: "nomen tuum",
  accepted: [
    "nomen tuum",
    "tu um",
    "tu-um",
    "to home",
    "go home",
    "nomento home",
    "nomentum",
  ],
},

// ==========================
// AGNUS DEI
// ID 87 - 116
// ==========================

{
  id: 87,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata Agnus berarti ....",
  options: ["Allah", "Anak domba", "Dunia", "Damai"],
  answer: 1,
},

{
  id: 88,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata Dei berarti ....",
  options: ["Tuhan", "Bapa", "Allah", "Surga"],
  answer: 2,
},

{
  id: 89,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata qui berarti ....",
  options: ["dan", "yang", "kami", "dunia"],
  answer: 1,
},

{
  id: 90,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata tollis berarti ....",
  options: ["memberi", "menghapus", "mengampuni", "memanggil"],
  answer: 1,
},

{
  id: 91,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata peccata berarti ....",
  options: ["damai", "dunia", "dosa-dosa", "kasih"],
  answer: 2,
},

{
  id: 92,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata mundi berarti ....",
  options: ["dunia", "manusia", "bumi", "surga"],
  answer: 0,
},

{
  id: 93,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata miserere berarti ....",
  options: ["berikanlah", "ampunilah", "kasihanilah", "dengarkanlah"],
  answer: 2,
},

{
  id: 94,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata nobis berarti ....",
  options: ["aku", "kamu", "mereka", "kami"],
  answer: 3,
},

{
  id: 95,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata dona berarti ....",
  options: ["berikanlah", "kasihanilah", "ampunilah", "datanglah"],
  answer: 0,
},

{
  id: 96,
  module: "agnus-dei",
  type: "multiple",
  topic: "Arti Kata",
  question: "Kata pacem berarti ....",
  options: ["sukacita", "damai", "cinta", "keselamatan"],
  answer: 1,
},

{
  id: 97,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Jika membaca kata qui, bunyi yang benar adalah ....",
  options: ["kui", "kwi", "ki", "kwi-i"],
  answer: 1,
},

{
  id: 98,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Pada kata peccata, huruf c dibaca ....",
  options: ["s", "sy", "k", "c"],
  answer: 2,
},

{
  id: 99,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Kata pacem dibaca ....",
  options: ["pa-sem", "pa-kem", "pa-cem", "pa-syem"],
  answer: 1,
},

{
  id: 100,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Mengapa kata Dei dibaca 'De-i'?",
  options: [
    "Huruf e tidak dibaca",
    "Vokal dibaca terpisah",
    "Vokal digabung",
    "Huruf i tidak dibaca"
  ],
  answer: 1,
},

{
  id: 101,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Saat membaca miserere, cara yang benar adalah ....",
  options: ["mis-re-re", "mi-se-re-re", "miser", "mi-ser"],
  answer: 1,
},

{
  id: 102,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Gabungan huruf g dan n pada kata Agnus dibaca ....",
  options: ["gn", "ng", "ny", "g"],
  answer: 2,
},

{
  id: 103,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Jika menemukan kata peccata, cara membaca yang benar adalah ....",
  options: ["pe-sa-ta", "pek-ka-ta", "pe-ca-ta", "pek-sa-ta"],
  answer: 1,
},

{
  id: 104,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Saat melafalkan Agnus Dei, semua huruf harus ....",
  options: [
    "dihilangkan sebagian",
    "dibaca jelas",
    "dipersingkat",
    "digabung"
  ],
  answer: 1,
},

{
  id: 105,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Jika seseorang membaca qui sebagai 'kui', maka ia ....",
  options: [
    "sudah benar",
    "mengikuti aturan qu → kw",
    "belum menerapkan aturan pelafalan dengan tepat",
    "membaca terlalu lambat"
  ],
  answer: 2,
},

{
  id: 106,
  module: "agnus-dei",
  type: "multiple",
  topic: "Pelafalan",
  question: "Tujuan memahami aturan pelafalan Agnus Dei adalah agar ....",
  options: [
    "dapat membaca dan mendaraskan lagu dengan benar",
    "menghafal tanpa memahami",
    "menerjemahkan seluruh lagu",
    "mengganti bahasa Latin"
  ],
  answer: 0,
},

{
  id: 107,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Agnus' dengan benar",
  targetWord: "agnus",
  accepted: [
    "agnus",
    "a nyus",
    "anyus"
  ],
},

{
  id: 108,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Agnus Dei' dengan benar",
  targetWord: "Agnus Dei",
  accepted: [
    "agnus dei",
    "Agnus Dei",
    "dei",
    "de i",
    "deii",
    "anyus dei"
  ],
},

{
  id: 109,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Qui tollis' dengan benar",
  targetWord: "qui tollis",
  accepted: [
    "qui tollis",
    "qui Tollis",
    "quite police",
    "qui",
    "kwi police",
    "kwi",
    "queen"
  ],
},

{
  id: 110,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Tollis' dengan benar",
  targetWord: "tollis",
  accepted: [
    "tollis",
    "Police",
    "tol lis"
  ],
},

{
  id: 111,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Peccata' dengan benar",
  targetWord: "peccata",
  accepted: [
    "peccata",
    "pek kata",
    "pekkata",
    "Tacatà",
    "pecata"
  ],
},

{
  id: 112,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Mundi' dengan benar",
  targetWord: "mundi",
  accepted: [
    "mundi",
    "mun di",
    "Monday",
    "wendy"
  ],
},

{
  id: 113,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Miserere' dengan benar",
  targetWord: "miserere",
  accepted: [
    "miserere",
    "mi se re re"
  ],
},

{
  id: 114,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Nobis' dengan benar",
  targetWord: "nobis",
  accepted: [
    "nobis",
    "no bis",
    "novis"
  ],
},

{
  id: 115,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Dona' dengan benar",
  targetWord: "dona",
  accepted: [
    "dona",
    "do na",
    "donna"
  ],
},

{
  id: 116,
  module: "agnus-dei",
  type: "speech",
  topic: "Pelafalan",
  question: "Lafalkan 'Pacem' dengan benar",
  targetWord: "pacem",
  accepted: [
    "pacem",
    "pa kem",
    "pace"
  ],
},

// =========================
// HAEC DIES
// =========================

{
  id: 117,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata Haec berarti ....",
  options: ["Tuhan", "Hari", "Ini", "Sukacita"],
  answer: 2,
},
{
  id: 118,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata dies berarti ....",
  options: ["Dunia", "Hari", "Surga", "Waktu"],
  answer: 1,
},
{
  id: 119,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata quam berarti ....",
  options: ["dan", "telah dibuat", "Tuhan", "yang"],
  answer: 3,
},
{
  id: 120,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata fecit berarti ....",
  options: ["telah dibuat", "bersukacita", "memuji", "bernyanyi"],
  answer: 0,
},
{
  id: 121,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata Dominus berarti ....",
  options: ["Raja", "Tuhan", "Bapa", "Putra"],
  answer: 1,
},
{
  id: 122,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata exsultemus berarti ....",
  options: [
    "marilah kita berdoa",
    "marilah kita memuji",
    "marilah kita bersukacita",
    "marilah kita bernyanyi",
  ],
  answer: 2,
},
{
  id: 123,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata et berarti ....",
  options: ["atau", "tetapi", "karena", "dan"],
  answer: 3,
},
{
  id: 124,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata laetemur berarti ....",
  options: ["bergembira", "bernyanyi", "berdoa", "berharap"],
  answer: 0,
},
{
  id: 125,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata in berarti ....",
  options: ["untuk", "kepada", "dalam", "dari"],
  answer: 2,
},
{
  id: 126,
  module: "haec-dies",
  topic: "arti-kata",
  type: "multiple",
  question: "Kata ea berarti ....",
  options: ["itu", "ini", "kami", "Tuhan"],
  answer: 0,
},

{
  id: 127,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Kata Haec dibaca ....",
  options: ["ha-ek", "hek", "ha-es", "he-ak"],
  answer: 1,
},
{
  id: 128,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Pada kata quam, gabungan huruf qu dibaca ....",
  options: ["ku", "ki", "kw", "q"],
  answer: 2,
},
{
  id: 129,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Kata laetemur dibaca ....",
  options: ["la-e-te-mur", "le-te-mur", "la-te-mur", "le-temur"],
  answer: 1,
},
{
  id: 130,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Kata Alleluia harus dibaca ....",
  options: [
    "al-le-luia",
    "al-le-lu-ya",
    "al-le-lu-i-a",
    "al-lu-ia",
  ],
  answer: 2,
},
{
  id: 131,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Mengapa kata ea dibaca 'e-a'?",
  options: [
    "Karena huruf a tidak dibaca",
    "Karena vokalnya dipisah",
    "Karena ae dibaca e",
    "Karena huruf e tidak dibaca",
  ],
  answer: 1,
},
{
  id: 132,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Jika seseorang membaca quam sebagai 'kuam', maka ....",
  options: [
    "sudah tepat",
    "belum menerapkan aturan qu → kw dengan benar",
    "terlalu cepat",
    "terlalu lambat",
  ],
  answer: 1,
},
{
  id: 133,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Saat membaca lagu ini, setiap huruf Latin harus ....",
  options: [
    "dihilangkan sebagian",
    "dibaca jelas",
    "dipersingkat",
    "digabung",
  ],
  answer: 1,
},
{
  id: 134,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Kata Haec dan laetemur memiliki aturan pelafalan yang sama, yaitu ....",
  options: [
    "qu dibaca kw",
    "c dibaca k",
    "ae dibaca e",
    "ti dibaca tsi",
  ],
  answer: 2,
},
{
  id: 135,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Jika membaca Alleluia, vokal yang harus dibaca terpisah adalah ....",
  options: ["a dan l", "u dan i", "l dan e", "a dan l"],
  answer: 1,
},
{
  id: 136,
  module: "haec-dies",
  topic: "pelafalan",
  type: "multiple",
  question: "Tujuan memahami aturan membaca lagu Latin adalah agar ....",
  options: [
    "dapat membaca dan menyanyikan lagu dengan benar",
    "menerjemahkan semua lagu",
    "mengganti bahasa Latin",
    "menghafal tanpa memahami",
  ],
  answer: 0,
},

{
  id: 137,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Haec Dies'",
  targetWord: "haec dies",
  accepted: [
    "haec dies",
    "hek dies",
    "Hack DS",
    "et dies",
    "fbs",
    "RDS"
  ],
},
{
  id: 138,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Dies'",
  targetWord: "dies",
  accepted: [
    "dies",
    "di es",
    "diyes",
    "ds"
  ],
},
{
  id: 140,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Fecit'",
  targetWord: "fecit",
  accepted: [
    "fecit",
    "feci"
  ],
},
{
  id: 141,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Dominus'",
  targetWord: "dominus",
  accepted: [
    "dominus",
    "do mi nus"
  ],
},
{
  id: 142,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Exsultemus'",
  targetWord: "exsultemus",
  accepted: [
    "exsultemus",
    "eksultemus",
    "ek sul te mus",
    "Exo thermos",
    "ex Soul demus",
    "Exo temus",
    "Excel temus",
    "exsol thermos",
    "exsol temus"
  ],
},
{
  id: 143,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Laetemur'",
  targetWord: "laetemur",
  accepted: [
    "laetemur",
    "letter more",
    "athlete amor",
    "lei ti amor",
    "leatt amor",
    "let amor",
    "lete moore",
    "Lete more",
    "letti amor",
    "letty Moore",
    "let Moore"
  ],
},
{
  id: 144,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'In Ea'",
  targetWord: "in ea",
  accepted: [
    "in ea",
    "in e a",
    "in ear"
  ],
},
{
  id: 145,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Alleluia'",
  targetWord: "alleluia",
  accepted: [
    "alleluia",
    "al le lu i a",
    "Hallelujah"
  ],
},
{
  id: 146,
  module: "haec-dies",
  topic: "speech",
  type: "speech",
  question: "Lafalkan 'Et laetemur'",
  targetWord: "et laetemur",
  accepted: [
    "et",
    "Apple temor",
    "Lete more",
    "at let amor"
  ],
},

];