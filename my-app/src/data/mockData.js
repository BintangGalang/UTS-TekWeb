// ======================
// Data Mock Krama, Tagihan, dan Pembayaran
// ======================

// 1️⃣ Data Krama
export const kramaList = [
  {
    kramaId: "KR001",
    nik: "3201123456789001",
    name: "I Wayan Suka",
    gender: "L",
    status: "krama desa",
    address: "Banjar Tengah, Desa Adat Ubud",
  },
  {
    kramaId: "KR002",
    nik: "3201123456789002",
    name: "Ni Putu Rahma",
    gender: "P",
    status: "krama desa",
    address: "Banjar Tengah, Desa Adat Ubud",
  },
  {
    kramaId: "KR003",
    nik: "3201123456789003",
    name: "I Ketut Dana",
    gender: "L",
    status: "krama tamiu",
    address: "Banjar Dangin, Desa Adat Mas",
  },
  {
    kramaId: "KR004",
    nik: "3201123456789004",
    name: "Ni Luh Ayu Sinta",
    gender: "P",
    status: "krama tamiu",
    address: "Banjar Kauh, Desa Adat Peliatan",
  },
  {
    kramaId: "KR005",
    nik: "3201123456789005",
    name: "I Made Gede",
    gender: "L",
    status: "tamiu",
    address: "Banjar Kaja, Desa Adat Lodtunduh",
  },
];

// 2️⃣ Data Tagihan (iuran per krama)
export const tagihanList = [
  {
    tagihanId: "TG001",
    iuran: "Iuran Krama Desa - Tahun 2025",
    dedosan: 50000,
    peturunan: 50000,
    created_by: "USR001",
    kramaId: "KR001",
    tgl: "2025-02-01",
  },
  {
    tagihanId: "TG002",
    iuran: "Iuran Kebersihan & Sampah",
    dedosan: 15000,
    peturunan: 5000,
    created_by: "USR002",
    kramaId: "KR002",
    tgl: "2025-03-01",
  },
  {
    tagihanId: "TG003",
    iuran: "Iuran Gotong Royong Desa",
    dedosan: 20000,
    peturunan: 10000,
    created_by: "USR001",
    kramaId: "KR003",
    tgl: "2025-04-15",
  },
];

// 3️⃣ Data Pembayaran
export const pembayaranList = [
  {
    pembayaranId: "PB001",
    tagihanId: "TG001",
    tgl_bayar: "2025-02-10",
    jumlah: 100000,
    status: "lunas",
    payment_by: "USR010",
  },
  {
    pembayaranId: "PB002",
    tagihanId: "TG002",
    tgl_bayar: null,
    jumlah: 0,
    status: "belum bayar",
    payment_by: null,
  },
  {
    pembayaranId: "PB003",
    tagihanId: "TG003",
    tgl_bayar: null,
    jumlah: 0,
    status: "pending",
    payment_by: null,
  },
];

// 4️⃣ Tambahkan kembali Tagihan Templates (umum)
export const tagihanTemplates = [
  {
    id: "iuran-krama-2025",
    title: "Iuran Krama Desa - Tahun 2025",
    description:
      "Kewajiban iuran tahunan krama desa untuk kegiatan adat dan operasional banjar.",
    amount: 100000,
  },
  {
    id: "iuran-pura-2025",
    title: "Iuran Perawatan Pura",
    description:
      "Iuran bulanan untuk perawatan pura desa dan upacara rutin keagamaan.",
    amount: 25000,
  },
  {
    id: "iuran-sampah-2025",
    title: "Iuran Kebersihan dan Sampah",
    description:
      "Kontribusi rutin untuk pengelolaan sampah dan kebersihan lingkungan desa.",
    amount: 15000,
  },
  {
    id: "iuran-gotongroyong",
    title: "Iuran Gotong Royong",
    description:
      "Dana gotong royong untuk membantu kegiatan sosial masyarakat desa.",
    amount: 20000,
  },
  {
    id: "iuran-pendidikan",
    title: "Iuran Pendidikan Anak Desa",
    description:
      "Bantuan dana untuk mendukung pendidikan anak-anak di wilayah desa adat.",
    amount: 30000,
  },
  {
    id: "iuran-bencana",
    title: "Iuran Dana Sosial dan Bencana",
    description:
      "Dana sosial untuk kesiapsiagaan dan penanggulangan bencana di lingkungan desa.",
    amount: 50000,
  },
];
