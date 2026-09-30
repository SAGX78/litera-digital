export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  subCategory?: string;
  categoryLabel?: string;
  badgeLabel?: string;
  pages?: number;
  coverImage: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  format: string;
  edition: string;
  fileSize: string;
  language: string;
  license: string;
  discountLabel: string;
  isNewArrival: boolean;
  isRecommendation: boolean;
  hasFreeSample?: boolean;
  hasSourceCode?: boolean;
  hasFreeUpdates?: boolean;
  synopsis?: string[];
  tableOfContents?: { title: string; pages: string }[];
  authorBio?: string;
  sampleChapter?: string;
  pdfUrl?: string;
}

export const mockCatalog: Book[] = [
  {
    id: "b1",
    slug: "arsitektur-frontend",
    title: "Arsitektur Frontend Modern dengan React 19 & Next.js",
    author: "Budi Santoso",
    category: "Teknologi & Coding",
    subCategory: "Web & Frontend Dev",
    categoryLabel: "Frontend & Next.js",
    badgeLabel: "BESTSELLER",
    pages: 380,
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeKzNBKAJsMDefQmEMhx5IuRNbs5g6wt0G5203Qgk5eWd9mVP13zsqxU2g2aaG62iR9sq92DtiB7yxhQBM6sA4S5LXh84B0C21aVEp4he6klUQ7V11s8Nu8aptrkESAIWhC0bvhyfmu61RclkbjWf03ZJ0YOyOPyhpKV1rsgnxSRWvMfo2EtO4ypew0tv93b6eP_deGgYWWC_OqOD83-9bPKtlW4qscjad8Ld3W96P09inXEP_ow2c1Q",
    price: 48000,
    originalPrice: 80000,
    rating: 4.9,
    reviewsCount: 142,
    format: "EPUB + PDF",
    edition: "Edisi Lengkap",
    fileSize: "28.4 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Personal Seumur Hidup",
    discountLabel: "-40%",
    isNewArrival: true,
    isRecommendation: true,
    hasFreeSample: true,
    hasSourceCode: true,
    synopsis: [
      "Dunia frontend telah melampaui era sekadar mengatur tampilan antarmuka. Dengan peluncuran React 19 dan adopsi luas Server Actions, React Server Components (RSC), batas antara komputasi server dan perenderan klien kini telah lebur. Buku ini hadir sebagai panduan komprehensif bagi para software engineer yang ingin membangun sistem frontend modular, berkinerja ultra-cepat, dan siap melayani jutaan transaksi harian tanpa friksi.",
      "Penulis membongkar anatomi sistem frontend dari nol: mulai dari pemilihan pola state management modern, penerapan arsitektur Micro-Frontend berbasis Module Federation, hingga teknik optimasi Web Vitals mendalam yang menjamin skor performa sempurna di mesin telusur."
    ],
    tableOfContents: [
      { title: "Bab 1: Evolusi Frontend di Era Komputasi Modern", pages: "Hal 1 - 32" },
      { title: "Bab 2: React 19 Core: Compiler & Perubahan Siklus Hidup", pages: "Hal 33 - 64" },
      { title: "Bab 3: Paradigma Server Components & Model Mental RSC", pages: "Hal 65 - 98" }
    ],
    authorBio: "Budi Santoso berpengalaman lebih dari 12 tahun merancang arsitektur sistem berbasis web untuk berbagai unicorn teknologi di Asia Tenggara. Ia aktif sebagai pembicara di konferensi teknologi internasional, kontributor open-source di ekosistem React, serta inisiator komunitas arsitektur perangkat lunak nasional.",
    sampleChapter: "Di bab ini kita akan membahas dasar-dasar komponen server pada React 19. Sebuah komponen server tidak pernah dikirimkan ke browser sebagai bundel JavaScript. Alih-alih, ia dieksekusi di server dan hanya menghasilkan representasi UI akhir. Ini sangat membantu untuk memperkecil ukuran bundel yang harus diunduh oleh klien.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b2",
    slug: "laut-bercerita",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    category: "Fiksi & Sastra",
    subCategory: "Novel Sejarah",
    categoryLabel: "Fiksi Sejarah",
    badgeLabel: "EDITOR'S CHOICE",
    pages: 380,
    coverImage: "https://static.mizanstore.com/d/img/book/cover/laut-bercerita-leila-s-chudori.jpg",
    price: 86000,
    originalPrice: 108000,
    rating: 4.8,
    reviewsCount: 95,
    format: "PDF High-Res",
    edition: "Diagram Interaktif",
    fileSize: "19.8 MB",
    language: "Bahasa Indonesia",
    license: "Kode Sumber Terlampir",
    discountLabel: "-28%",
    isNewArrival: false,
    isRecommendation: true,
    hasFreeSample: true,
    hasSourceCode: true,
    synopsis: [
      "Laut Bercerita bertutur tentang kisah keluarga yang kehilangan, sekumpulan sahabat yang merasakan kekosongan di dada, kelompok orang yang gemar menyiksa dan lancang menculik, sejumlah keluarga yang mencari kejelasan jalan anaknya, dan tentang cinta yang tak pernah luntur.",
      "Novel ini terbagi menjadi dua bagian: bagian pertama dari sudut pandang Biru Laut yang diculik bersama kawan-kawannya, dan bagian kedua dari sudut pandang Asmara Jati, adik Laut yang berjuang mencari keadilan."
    ],
    tableOfContents: [
      { title: "Bagian Pertama: Biru Laut", pages: "Hal 1 - 180" },
      { title: "Bagian Kedua: Asmara Jati", pages: "Hal 181 - 380" }
    ],
    authorBio: "Leila S. Chudori adalah jurnalis dan penulis senior Indonesia yang dikenal lewat karya-karya sastra berbobot seperti Pulang dan Laut Bercerita.",
    sampleChapter: "Matahari belum sepenuhnya terbit ketika lima pria berbadan tegap memaksa masuk ke dalam kamar kontrakan kami. Dalam hitungan detik, dunia yang kami kenal seketika menjadi gelap.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b3",
    slug: "atomic-habits",
    title: "Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa",
    author: "James Clear",
    category: "Self-Improvement",
    subCategory: "Pengembangan Diri",
    categoryLabel: "Perbaikan Diri",
    badgeLabel: "BARU TIBA",
    pages: 352,
    coverImage: "https://jamesclear.com/wp-content/uploads/2026/07/atomic-habits-dots.png",
    price: 88000,
    originalPrice: 110000,
    rating: 4.5,
    reviewsCount: 64,
    format: "EPUB + PDF",
    edition: "Edisi Lengkap",
    fileSize: "18 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Personal",
    discountLabel: "",
    isNewArrival: true,
    isRecommendation: true,
    hasFreeSample: true,
    hasSourceCode: true,
    synopsis: [
      "Atomic Habits menyajikan sistem praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk dengan perbaikan 1% setiap hari.",
      "James Clear mengungkapkan bagaimana perubahan-perubahan kecil yang tampaknya sepele dapat berakumulasi menjadi hasil yang mengubah hidup."
    ],
    tableOfContents: [
      { title: "Kaidah 1: Jadikan Terlihat (Make It Obvious)", pages: "Hal 1 - 80" },
      { title: "Kaidah 2: Jadikan Menarik (Make It Attractive)", pages: "Hal 81 - 160" },
      { title: "Kaidah 3: Jadikan Mudah (Make It Easy)", pages: "Hal 161 - 240" }
    ],
    authorBio: "James Clear adalah salah satu pakar terkemuka dunia dalam hal pembentukan kebiasaan dan peningkatan kinerja mandiri.",
    sampleChapter: "Perubahan kecil tidak akan terasa berdampak pada hari pertama, namun jika konsisten dilakukan selama setahun, hasilnya akan menjadi ratusan kali lipat lebih baik.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b4",
    slug: "hujan-tere-liye",
    title: "Hujan",
    author: "Tere Liye",
    category: "Fiksi & Sastra",
    subCategory: "Fiksi Distopia",
    categoryLabel: "Novel Distopia",
    badgeLabel: "PROMO",
    pages: 320,
    coverImage: "https://down-id.img.susercontent.com/file/4caeaf9bb90aac3e14f3f6ca1ac0f0d4",
    price: 79000,
    originalPrice: 99000,
    rating: 4.85,
    reviewsCount: 118,
    format: "EPUB + CODE",
    edition: "Edisi Lengkap",
    fileSize: "14 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Personal",
    discountLabel: "-30%",
    isNewArrival: false,
    isRecommendation: true,
    hasSourceCode: true,
    synopsis: [
      "Novel ini menceritakan kisah Lail di dunia masa depan tahun 2042 yang dilanda bencana alam gunung berapi raksasa yang mengubah iklim global.",
      "Di tengah perjuangan bertahan hidup dan teknologi penghapus kenangan, Lail harus memilih antara melupakan kenangan pahit bersama Esok atau tetap menyimpannya."
    ],
    tableOfContents: [
      { title: "Bab 1: Ruang Modifikasi Kenangan", pages: "Hal 1 - 45" },
      { title: "Bab 2: Bencana Gunung Berapi 2042", pages: "Hal 46 - 110" },
      { title: "Bab 3: Persahabatan dan Hujan", pages: "Hal 111 - 180" }
    ],
    authorBio: "Tere Liye adalah salah satu penulis fiksi paling produktif dan paling dicintai di Indonesia dengan puluhan karya populer.",
    sampleChapter: "Bukan melupakan yang membuat kita kuat, melainkan menerima. Ketika kita bisa menerima, kenangan seburuk apa pun tidak akan menyakiti kita lagi.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b5",
    slug: "berani-tidak-disukai",
    title: "Berani Tidak Disukai",
    author: "Ichiro Kishimi & Fumitake Koga",
    category: "Self-Improvement",
    subCategory: "Psikologi Adlerian",
    categoryLabel: "Psikologi & Mental",
    badgeLabel: "UNGGULAN",
    pages: 320,
    coverImage: "https://cdn.gramedia.com/uploads/items/9786020633213.jpg",
    price: 82000,
    originalPrice: 102000,
    rating: 4.8,
    reviewsCount: 210,
    format: "PDF + EPUB",
    edition: "Edisi Akademik",
    fileSize: "45.1 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Personal",
    discountLabel: "-38%",
    isNewArrival: false,
    isRecommendation: true,
    synopsis: [
      "Menggunakan narasi dialog antara seorang filsuf dan pemuda, buku ini memaparkan ajaran psikologi Alfred Adler tentang kebebasan sejati.",
      "Pembaca diajak memahami bahwa kebahagiaan berakar dari keberanian untuk menjadi diri sendiri dan ketidakbergantungan pada penilaian orang lain."
    ],
    tableOfContents: [
      { title: "Malam Pertama: Jangan Percaya Trauma", pages: "Hal 1 - 60" },
      { title: "Malam Kedua: Semua Masalah Adalah Masalah Hubungan", pages: "Hal 61 - 120" },
      { title: "Malam Ketiga: Memisah Tugas Diri dan Orang Lain", pages: "Hal 121 - 180" }
    ],
    authorBio: "Ichiro Kishimi adalah filsuf dan psikolog ahli teori Adler, sedangkan Fumitake Koga adalah penulis dan komunikator ternama dari Jepang.",
    sampleChapter: "Masalah dalam hidup manusia hampir semuanya berakar dari hubungan antarpribadi. Ketika Anda berhenti mencampuri tugas orang lain, hidup Anda akan menjadi jauh lebih ringan.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b6",
    slug: "cantik-itu-luka",
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    category: "Fiksi & Sastra",
    subCategory: "Sastra Realisme Magis",
    categoryLabel: "Sastra Klasik Modern",
    pages: 508,
    coverImage: "https://upload.wikimedia.org/wikipedia/id/d/d2/CiL_%28sampul%29.jpg?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original",
    price: 110000,
    originalPrice: 138000,
    rating: 4.75,
    reviewsCount: 78,
    format: "EPUB + PDF",
    edition: "Edisi Standar",
    fileSize: "22 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Pribadi",
    discountLabel: "",
    isNewArrival: false,
    isRecommendation: true,
    hasFreeUpdates: true,
    synopsis: [
      "Sebuah karya sastra realisme magis yang menceritakan tentang Dewi Ayu, seorang perempuan cantik yang bangkit dari kuburnya setelah dua belas tahun kematian.",
      "Kisah epik ini merajut tragedi keluarga, sejarah kelam masa kolonialisme hingga pendudukan Jepang di Indonesia."
    ],
    tableOfContents: [
      { title: "Bab 1: Kebangkitan dari Kubur", pages: "Hal 1 - 120" },
      { title: "Bab 2: Kota Halimunda dan Masa Kolonial", pages: "Hal 121 - 280" },
      { title: "Bab 3: Putri-Putri Dewi Ayu", pages: "Hal 281 - 508" }
    ],
    authorBio: "Eka Kurniawan adalah novelis Indonesia yang karyanya telah diterjemahkan ke lebih dari 30 bahasa dan meraih penghargaan Internasional Man Booker International Prize nominee.",
    sampleChapter: "Satu sore di hari akhir pekan, Dewi Ayu bangkit dari kuburnya setelah dua belas tahun mati. Anjing-anjing menggonggong gila dan angin bertiup kencang membawa aroma tanah basah.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b7",
    slug: "bicara-itu-ada-seninya",
    title: "Bicara Itu Ada Seninya: Rahasia Komunikasi yang Efektif",
    author: "Oh Su Hyang",
    category: "Self-Improvement",
    subCategory: "Komunikasi",
    categoryLabel: "Komunikasi & Hubungan",
    badgeLabel: "DISAIN & KODE",
    pages: 238,
    coverImage: "https://cdn.gramedia.com/uploads/items/9786024553920.png",
    price: 68000,
    originalPrice: 85000,
    rating: 4.7,
    reviewsCount: 62,
    format: "FIGMA + CODE",
    edition: "Edisi Desainer",
    fileSize: "55 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Komersial Terbatas",
    discountLabel: "-40%",
    isNewArrival: true,
    isRecommendation: false,
    synopsis: [
      "Buku ini menyajikan rahasia teknik percakapan, persuasi, dan presentasi dari pakar ucapan Korea Selatan, Oh Su Hyang.",
      "Panduan praktis ini membantu Anda mengubah cara bicara agar lebih percaya diri, persuasif, dan disukai dalam situasi profesional maupun sosial."
    ],
    tableOfContents: [
      { title: "Bab 1: Perbedaan Orang yang Pintar Bicara", pages: "Hal 1 - 50" },
      { title: "Bab 2: Teknik Mendengarkan dengan Empati", pages: "Hal 51 - 110" },
      { title: "Bab 3: Komunikasi dalam Dunia Kerja", pages: "Hal 111 - 180" }
    ],
    authorBio: "Oh Su Hyang adalah dosen dan pakar pembinaan komunikasi vokal serta teknik wicara terkemuka di Korea Selatan.",
    sampleChapter: "Bicara bukan sekadar mengeluarkan kata-kata dari mulut. Bicara yang efektif adalah seni menyentuh perasaan pendengar dan membangkitkan rasa percaya.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b8",
    slug: "sebuah-seni-untuk-bersikap-bodo-amat",
    title: "Sebuah Seni untuk Bersikap Bodo Amat",
    author: "Mark Manson",
    category: "Self-Improvement",
    subCategory: "Psikologi Popular",
    categoryLabel: "Self Improvement",
    pages: 246,
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Sebuah-seni-untuk-bersikap-bodoh-amat.jpg?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original",
    price: 72000,
    originalPrice: 90000,
    rating: 4.4,
    reviewsCount: 89,
    format: "EPUB + PDF",
    edition: "Edisi Lengkap",
    fileSize: "16 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Pribadi",
    discountLabel: "",
    isNewArrival: false,
    isRecommendation: true,
    hasFreeSample: true,
    synopsis: [
      "Mark Manson mengajak kita untuk bersikap jujur pada diri sendiri dan tidak terus-menerus memaksakan kepositifan yang toksik.",
      "Buku ini mengajarkan bagaimana memprioritaskan hal-hal yang benar-benar bernilai dan membiarkan hal-hal tak penting berlalu."
    ],
    tableOfContents: [
      { title: "Bab 1: Jangan Berusaha", pages: "Hal 1 - 35" },
      { title: "Bab 2: Kebahagiaan Adalah Masalah", pages: "Hal 36 - 80" },
      { title: "Bab 3: Anda Tidak Istimewa", pages: "Hal 81 - 120" }
    ],
    authorBio: "Mark Manson adalah penulis blog populer dan pengarang beberapa buku motivasi terlaris New York Times.",
    sampleChapter: "Keinginan untuk pengalaman yang lebih positif itu sendiri adalah pengalaman negatif. Sebaliknya, penerimaan seseorang atas pengalaman negatifnya adalah pengalaman positif.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b9",
    slug: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Bisnis & Keuangan",
    subCategory: "Manajemen Keuangan",
    categoryLabel: "Keuangan & Investasi",
    badgeLabel: "HIGH CONCURRENCY",
    pages: 262,
    coverImage: "https://mabhak.sch.id/wp-content/uploads/2026/06/BU-ANDESNIA.jpg",
    price: 76000,
    originalPrice: 95000,
    rating: 4.95,
    reviewsCount: 104,
    format: "EPUB + PDF",
    edition: "Edisi Profesional",
    fileSize: "24 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Pribadi",
    discountLabel: "",
    isNewArrival: false,
    isRecommendation: true,
    synopsis: [
      "Keberhasilan finansial tidak melulu ditentukan oleh seberapa pintar Anda, melainkan oleh bagaimana perilaku Anda terhadap uang.",
      "Melalui 19 cerita pendek, Morgan Housel membedah sifat dasar manusia saat mengelola uang, mengambil risiko, dan mengumpulkan kekayaan jangka panjang."
    ],
    tableOfContents: [
      { title: "Bab 1: Tak Ada Orang Gila", pages: "Hal 1 - 30" },
      { title: "Bab 2: Keberuntungan & Risiko", pages: "Hal 31 - 65" },
      { title: "Bab 3: Tak Pernah Cukup", pages: "Hal 66 - 100" }
    ],
    authorBio: "Morgan Housel adalah mantan kolumnis Wall Street Journal dan partner di The Collaborative Fund.",
    sampleChapter: "Mengelola uang secara baik tidak banyak berhubungan dengan kepintaran Anda, tetapi sangat berhubungan dengan bagaimana perilaku dan emosi Anda bekerja.",
    pdfUrl: "https://dn710109.ca.archive.org/0/items/documentations_20230623/The%20Psychology%20of%20Money%20%28Morgan%20Housel%29%20%28Z-Library%29.pdf"
  },
  {
    id: "b10",
    slug: "filosofi-teras",
    title: "Filosofi Teras: Hidup Tenang Tanpa Cemas",
    author: "Henry Manampiring",
    category: "Self-Improvement",
    subCategory: "Kesehatan Mental",
    categoryLabel: "Stoikisme",
    pages: 320,
    coverImage: "https://down-id.img.susercontent.com/file/id-11134207-7rbk6-m88y9wkylukrec",
    price: 38000,
    originalPrice: 50666,
    rating: 5.0,
    reviewsCount: 210,
    format: "EPUB",
    edition: "Edisi Standar",
    fileSize: "15.2 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Personal Seumur Hidup",
    discountLabel: "-25%",
    isNewArrival: true,
    isRecommendation: false,
    synopsis: [
      "Buku ini mengenalkan filsafat Stoisisme (Filosofi Stoa/Teras) secara populer dan relevan untuk kehidupan masyarakat modern saat ini.",
      "Penulis membedah bagaimana Stoisisme membantu mengendalikan emosi negatif dan mengolah mental yang tangguh dalam menghadapi masalah hidup harian."
    ],
    tableOfContents: [
      { title: "Bab 1: Survei Khawatir Nasional", pages: "Hal 1 - 40" },
      { title: "Bab 2: Dikotomi Kendali", pages: "Hal 41 - 95" },
      { title: "Bab 3: Paradigma Server Components & Model Mental RSC", pages: "Hal 65 - 98" }
    ],
    authorBio: "Budi Santoso berpengalaman lebih dari 12 tahun merancang arsitektur sistem berbasis web untuk berbagai unicorn teknologi di Asia Tenggara. Ia aktif sebagai pembicara di konferensi teknologi internasional, kontributor open-source di ekosistem React, serta inisiator komunitas arsitektur perangkat lunak nasional.",
    sampleChapter: "Banyak hal di dunia ini yang membuat kita cemas. Namun, Stoisisme mengajarkan bahwa penderitaan kita sering kali bukan disebabkan oleh peristiwa itu sendiri, melainkan oleh persepsi kita terhadapnya.",
    pdfUrl: "https://dn721701.ca.archive.org/0/items/filosofi-teras-henry-manampiring/Filosofi%20Teras%20-%20Henry%20Manampiring_text.pdf"
  },
  {
    id: "b11",
    slug: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad: Edisi Peringatan 20 Tahun",
    author: "Robert T. Kiyosaki",
    category: "Bisnis & Keuangan",
    subCategory: "Investasi & Edukasi Finansial",
    categoryLabel: "Keuangan & Bisnis",
    pages: 336,
    coverImage: "https://cdn.gramedia.com/uploads/items/9786020333175_rich-dad-poor-dad-_edisi-revisi_.jpg",
    price: 85000,
    originalPrice: 105000,
    rating: 4.8,
    reviewsCount: 92,
    format: "PDF",
    edition: "Edisi Revisi",
    fileSize: "12.8 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Pribadi",
    discountLabel: "-15%",
    isNewArrival: false,
    isRecommendation: false,
    synopsis: [
      "Buku finansial legendaris yang membandingkan pandangan dua sosok ayah tentang uang dan investasi.",
      "Kiyosaki mematahkan mitos bahwa Anda harus berpenghasilan tinggi untuk menjadi kaya serta menjelaskan perbedaan mendasar antara aset dan liabilitas."
    ],
    tableOfContents: [
      { title: "Pelajaran 1: Orang Kaya Tidak Bekerja Demi Uang", pages: "Hal 1 - 50" },
      { title: "Pelajaran 2: Mengapa Mengajarkan Melek Finansial?", pages: "Hal 51 - 110" },
      { title: "Pelajaran 3: Urusi Bisnis Anda Sendiri", pages: "Hal 111 - 170" }
    ],
    authorBio: "Robert T. Kiyosaki adalah investor, pengusaha, dan penulis buku edukasi finansial terlaris sepanjang masa.",
    sampleChapter: "Orang miskin dan kelas menengah bekerja untuk uang. Orang kaya membuat uang bekerja untuk mereka.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "b12",
    slug: "dunia-sophie",
    title: "Dunia Sophie: Misteri Filsafat Abadi",
    author: "Jostein Gaarder",
    category: "Fiksi & Sastra",
    subCategory: "Novel Filsafat",
    categoryLabel: "Fiksi Terjemahan",
    pages: 800,
    coverImage: "https://mizan.com//storage/images/book/Dunia-Sophie.jpg",
    price: 120000,
    originalPrice: 150000,
    rating: 4.7,
    reviewsCount: 340,
    format: "EPUB",
    edition: "Edisi Standar",
    fileSize: "8.5 MB",
    language: "Bahasa Indonesia",
    license: "Lisensi Pribadi",
    discountLabel: "-30%",
    isNewArrival: false,
    isRecommendation: false,
    synopsis: [
      "Novel luar biasa yang mengemas sejarah filsafat Barat selama ribuan tahun ke dalam kisah fiksi misteri yang memikat.",
      "Mengikuti perjalanan Sophie Amundsen, seorang gadis 14 tahun yang menerima surat-surat rahasia berisi pertanyaan filosofis mendasar dan pelajaran sejarah pemikiran dari sosok misterius Alberto Knox."
    ],
    tableOfContents: [
      { title: "Bab 1: Taman Eden & Topi Pesulap", pages: "Hal 1 - 35" },
      { title: "Bab 2: Mitos & Filsuf-Filsuf Alam", pages: "Hal 36 - 80" },
      { title: "Bab 3: Demokritos, Socrates & Plato", pages: "Hal 81 - 160" },
      { title: "Bab 4: Aristoteles, Abad Pertengahan & Pencerahan", pages: "Hal 161 - 340" },
      { title: "Bab 5: Kant, Hegel, Marx, Darwin, Freud & Eksistensialisme", pages: "Hal 341 - 598" }
    ],
    authorBio: "Jostein Gaarder adalah seorang penulis novel dan mantan pengajar filsafat asal Norwegia. Dunia Sophie merupakan karya terbesarnya yang telah diterjemahkan ke dalam lebih dari 60 bahasa.",
    sampleChapter: "Satu-satunya hal yang kita butuhkan untuk menjadi filsuf yang baik adalah kemampuan untuk merasa takjub. Anak-anak memiliki kemampuan ini, namun saat tumbuh dewasa, manusia terbiasa dengan dunia dan kehilangan rasa kagum tersebut.",
    pdfUrl: "https://drive.google.com/file/d/0BwqGWrRLWTaGbWl4dzJpNFQyU2c/view?usp=sharing&resourcekey=0-TkMd5k7iustiwiJKO2LM4g"
  }
];
