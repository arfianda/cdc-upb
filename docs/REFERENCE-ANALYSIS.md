# Analisis Desain Situs Referensi: SquareDash (squaredash.com)

Dokumen ini memuat analisis langsung terhadap CSS, JS, hierarki tipografi, palet warna, spasi, dan sistem interaksi dari [https://www.squaredash.com/](https://www.squaredash.com/).

---

## 1. Ekstraksi Langsung Token CSS & Tipografi

### A. Tipografi (Typography Stack)
* **Font Family Utama**: `Inter, "DM Sans", system-ui, -apple-system, sans-serif`
* **Headline H1 (Desktop 1440px)**:
  * `font-size`: **72px**
  * `font-weight`: **800** (Extra Bold)
  * `line-height`: **1.02** (73.44px) — *sangat rapat (tight leading)*
  * `letter-spacing`: **-0.03em** (-2.16px) — *tracking negatif ketat*
  * `color`: `#21201F` (`rgb(33, 32, 31)`) — *off-black hangat, bukan #000 pekat*
* **Headline H1 (Mobile 390px)**:
  * `font-size`: **34px**
  * `line-height`: **1.02** (34.68px)
  * `letter-spacing`: **-0.03em** (-1.02px)
* **Subteks Hero (`p`)**:
  * `font-size`: **16px**
  * `font-weight`: **400** (Regular)
  * `line-height`: **1.5** (24px)
  * `color`: `#736D68` (`rgb(115, 109, 104)`) — *warm slate, kontras lembut terhadap H1*
  * `margin-top`: **20px**
* **Label / Badge Pill**:
  * `font-size`: **13px**
  * `font-weight`: **600** (Semi Bold)
  * `color`: `#15803D` (`rgb(21, 128, 61)`)
* **Input Field**:
  * `font-size`: **15px**
  * `height`: **52px**
  * `border-radius`: **9999px** (Full pill)
* **Micro-Trust / Keterangan di Bawah Input**:
  * `font-size`: **13px**
  * `color`: `#9D9893` (`rgb(157, 152, 147)`)

---

### B. Palet Warna Sebenarnya & Estimasi Luas Permukaan
1. **Putih Bersih (`#FFFFFF`) — ±75% permukaan**:
   * Kanvas dasar latar belakang hero, navbar, dan section utama.
2. **Off-White / Paper Hangat (`#F5F5F5` / `#FAF8F7`) — ±15% permukaan**:
   * Digunakan untuk kartu testimonial, input field background, dan kontainer section sekunder.
3. **Teks Utama Dark Charcoal (`#21201F`) — Kontras tinggi**:
   * Menghindari hitam murni `#000000` untuk menghasilkan kehangatan dan kehalusan visual.
4. **Teks Pendukung Slate Warm (`#736D68`) & Muted (`#9D9893`)**:
   * Membangun hierarki pembacaan sekunder tanpa membuat teks terlihat redup atau sulit dibaca.
5. **Aksen Hijau Hutan (`#15803D` / `#22C55E`) — < 4% permukaan**:
   * Sangat hemat: hanya untuk titik status aktif (6px dot), tombol submit aksi, dan latar ikon badge nilai.
6. **Dark Charcoal / Deep Night (`#0A0E17`) — ±6% permukaan**:
   * Khusus untuk penutup footer di bagian bawah halaman.

---

### C. Skala Spasi & Kontainer
* **Max Container Width**: `1200px` (`max-width: 1200px; margin: 0 auto; padding: 0 48px;`)
* **Padding Hero**: `padding-top: 140px; padding-bottom: 80px;`
* **Grid Hero**: `display: grid; grid-template-columns: 5fr 6fr; gap: 40px; align-items: center;`
* **Ritme Spasi Vertikal Elemen Kiri**:
  * Badge ke H1: `20px`
  * H1 ke Paragraf: `20px`
  * Paragraf ke Input Pill: `32px`
  * Input ke Micro-Trust: `12px`

---

### D. Radius, Bayangan, & Garis
* **Pill Shape (`9999px`)**: Digunakan secara ketat pada elemen tindakan: pill tag, input field, tombol CTA, dan floating status badges.
* **Arched Mask Radius**: Visual kanan menggunakan kurva asimetris unik:
  `border-radius: 40% 16px 16px 40% / 50% 16px 16px 50%;` dengan tinggi `520px` dan menjorok keluar batas kanan (`margin-right: -48px`).
* **Glassmorphism Overlay Badges**:
  * Latar: `rgba(255, 255, 255, 0.55)`
  * Efek: `backdrop-filter: blur(16px) saturate(180%)`
  * Border: `1px solid rgba(255, 255, 255, 0.5)`
  * Bayangan: `0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)`
  * Ikon: Lingkaran 34x34px hijau dengan ikon putih.

---

### E. Sistem Animasi & Motion
* **Tidak memakai library berat**: Didominasi CSS transitions native dan Framer Motion ringan.
* **Entrance Stagger**:
  * Hero input: `opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s`
  * Micro-trust: `opacity 0.4s ease-out 0.45s, transform 0.4s ease-out 0.45s`
  * Floating badge 1: `opacity 0.4s ease-out 0.6s, transform 0.4s ease-out 0.6s`
* **Continuous Keyframes**:
  * Infinite review marquee: `duration: 50s; timing: linear`
  * Subtle pulse pada indicator dot: `duration: 2s; timing: ease-in-out`
  * Shimmer halus: `duration: 3s; timing: ease-in-out`

---

## 2. Tangkapan Layar Referensi (Screenshots)

* **Desktop 1440px**:
  * Hero Section: [`screenshots/reference/01_desktop_hero_1440px.webp`](file:///home/arfiandastr/Documents/work/cdc-upb/screenshots/reference/01_desktop_hero_1440px.webp)
  * Section Review Marquee: [`screenshots/reference/desktop_sec_2.webp`](file:///home/arfiandastr/Documents/work/cdc-upb/screenshots/reference/desktop_sec_2.webp)
  * Section "How it works": [`screenshots/reference/desktop_sec_3.webp`](file:///home/arfiandastr/Documents/work/cdc-upb/screenshots/reference/desktop_sec_3.webp)
  * Footer: [`screenshots/reference/desktop_sec_8.webp`](file:///home/arfiandastr/Documents/work/cdc-upb/screenshots/reference/desktop_sec_8.webp)
* **Mobile 390px**:
  * Mobile Hero: [`screenshots/reference/02_mobile_hero_390px.webp`](file:///home/arfiandastr/Documents/work/cdc-upb/screenshots/reference/02_mobile_hero_390px.webp)
  * Mobile Steps Stack: [`screenshots/reference/mobile_sec_3.webp`](file:///home/arfiandastr/Documents/work/cdc-upb/screenshots/reference/mobile_sec_3.webp)

---

## 3. 9 Prinsip yang Membuat Situs Terasa "Mahal" & Premium

1. **Extreme Restraint (Kekangan Warna Ekstrem)**:
   Lebih dari 90% kanvas adalah putih murni dan abu-abu hangat. Warna aksen ditahan ketat di bawah 4% hanya untuk pemicu aksi dan bukti keberhasilan. Menolak godaan mewarnai setiap kartu atau tombol dengan warna-warni berbeda.
2. **Typographic Scale Decisiveness (Skala Tipografi yang Berani & Rapat)**:
   H1 berukuran raksasa (72px) dengan bobot 800 dan leading sangat rapat (1.02) serta tracking negatif (-0.03em) menciptakan wibawa editorial yang solid. Tidak ada kompromi dengan teks berukuran nanggung.
3. **Single Focused Interaction (Satu Aksi Utama yang Sangat Jelas)**:
   Pengguna tidak disuguhi pilihan yang bercabang. Seluruh hero difokuskan pada satu formulir kapsul terpadu dengan tombol lingkaran di dalamnya.
4. **Architectural Asymmetry (Geometri Asimetris yang Berkarakter)**:
   Visual di sisi kanan tidak dikurung dalam kotak persegi generik atau mockup perangkat klise, melainkan dipotong kurva kubah asimetris (*arched mask*) yang menembus margin kanan.
5. **Contextual Floating Proof (Cuplikan Data Nyata Mengambang)**:
   Alih-alih deskripsi panjang, nilai produk diperlihatkan lewat 3 kartu kaca mengambang (*floating pill badges*) yang menempel di atas visual utama, mendemonstrasikan angka hasil akhir.
6. **Breathing Negative Space (Ruang Bernapas yang Murah Hati)**:
   Jarak vertikal di atas dan di bawah hero sangat lega (140px / 80px), memberikan kesan ketenangan institusional tanpa rasa terburu-buru.
7. **Warm Off-Black (Warna Hitam Hangat, Bukan #000 Murni)**:
   Penggunaan warna `#21201F` menghilangkan digital harshness dan memberikan kesan tinta cetak editorial berkualitas tinggi.
8. **Micro-Trust Placement (Pereda Keraguan di Bawah Tindakan)**:
   Pernyataan jaminan (gratis, durasi waktu, tanpa risiko) ditempatkan tepat di bawah input dengan tipografi kecil 13px untuk langsung menghilangkan keraguan pengguna saat hendak mengetik.
9. **Eliminasi AI Gimmick & Noise**:
   Nihil gradien ungu-pink, nihil background grid blueprint, nihil bento grid acak. Keseluruhan tata letak murni didorong oleh kejelasan pesan dan kemudahan akses.
