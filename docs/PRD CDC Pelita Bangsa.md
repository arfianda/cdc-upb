# PRD — CDC Pelita Bangsa (Career Development Center)

Disusun untuk Arfianda · Versi 0.1 (draft awal) · 8 Oktober 2026

## 1. Ringkasan

CDC Pelita Bangsa adalah situs layanan karier Universitas Pelita Bangsa (UPB) yang menggantikan layanan vendor Sevima Karirlink. CDC menjadi satu pintu bagi alumni, perusahaan mitra, dan staf kampus untuk tracer study, lowongan kerja, profil alumni, dan informasi karier.

CDC dibangun sebagai **frontend independen** (subdomain sendiri) yang memakai **backend Dirmawa** (database, auth, storage) sehingga data alumni tidak perlu disalin ke sistem lain. Dokumen ini memuat PRD, arsitektur, model data, keamanan, rencana pengujian, roadmap, dan pertanyaan terbuka.

## 2. Latar Belakang dan Masalah

- Tracer study dan lowongan kerja saat ini bergantung pada vendor (Sevima Karirlink), sehingga kontrol atas data, tampilan, dan fitur terbatas.
- Dirmawa sudah punya modul dasar tracer study (dashboard alumni dengan tampilan publik yang aman privasi) dan modul lowongan kerja, tetapi dirancang untuk mahasiswa dan staf internal, bukan untuk alumni dan perusahaan eksternal.
- Alumni dan perusahaan membutuhkan pintu masuk yang jelas dan tepercaya di bawah domain institusi.
- Kampus membutuhkan data tracer study yang rapi untuk akreditasi dan evaluasi program studi.

## 3. Tujuan dan Metrik Keberhasilan

**Tujuan**

1. Kampus memegang penuh data dan alur tracer study.
2. Alumni mudah mengisi tracer study dan menemukan lowongan.
3. Perusahaan terverifikasi dapat memasang lowongan sendiri (Rilis 2).
4. Staf CDC punya dashboard dan ekspor data untuk laporan.

**Metrik** (angka target ditetapkan bersama pihak kampus)

| Metrik | Cara ukur |
| --- | --- |
| Response rate tracer study per angkatan dan prodi | responden dibagi total alumni terdaftar |
| Jumlah perusahaan terverifikasi | baris cdc\_companies berstatus verified |
| Lowongan aktif per bulan | cdc\_job\_postings berstatus published dan belum kedaluwarsa |
| Median waktu verifikasi perusahaan | selisih created\_at dan verified\_at |
| Insiden akses lintas peran / kebocoran data | target 0 |

## 4. Pengguna dan Peran

| Peran | Status | Akses utama |
| --- | --- | --- |
| Publik (anon) | — | Landing, statistik tracer agregat, daftar lowongan publik tanpa data pribadi |
| alumni | sudah ada di schema | Profil sendiri, isi tracer study, lihat dan lamar lowongan, atur visibilitas profil |
| mahasiswa | sudah ada | Lihat lowongan (apakah perlu akses CDC: lihat pertanyaan terbuka) |
| perusahaan | **baru** | Kelola profil perusahaan, lowongan milik sendiri, pelamar ke lowongannya (Rilis 2) |
| staf\_cdc | **baru** | Verifikasi perusahaan, moderasi lowongan, kelola survei, laporan |
| staf\_alumni | sudah ada | Kelola alumni\_records (impor Excel) |
| direktur | sudah ada | Dashboard read-only lintas data |
| superadmin | sudah ada | Override darurat, kelola akun |

Catatan: kolom users.role berupa TEXT dengan CHECK constraint (bukan ENUM), jadi menambah peran perusahaan dan staf\_cdc membutuhkan migrasi pada users\_role\_check.

## 5. Ruang Lingkup

**MVP (Rilis 1)**

- Landing dan halaman informasi CDC.
- Daftar lowongan publik, dikurasi staf CDC (melanjutkan pola form admin semi-manual dengan tautan Instagram yang sudah ada di Dirmawa).
- Akun alumni dan profil dasar.
- Tracer study: survei, pengisian oleh alumni, dashboard agregat publik yang aman privasi.
- Dashboard admin CDC: kelola lowongan, kelola survei, ekspor Excel.

**Rilis 2**

- Akun perusahaan, alur verifikasi oleh staf CDC, posting lowongan oleh perusahaan.
- Lamaran dalam aplikasi (upload CV ke storage) dan status lamaran.

**Rilis 3 (opsional)**

- Event dan job fair, artikel karier, notifikasi email lewat SMTP (termasuk reset password mandiri), rekomendasi lowongan, versi bahasa Inggris.
- Chatbot RAG tetap ditunda seperti di Dirmawa.

**Di luar lingkup**

Lowongan berbayar, CV builder, chat langsung, aplikasi mobile native.

## 6. Kebutuhan Fungsional

Prioritas: P0 wajib untuk rilisnya, P1 penting, P2 bagus jika sempat.

### 6.1 Informasi Publik

- FR-01 \[P0\] Landing berisi profil CDC, layanan, statistik ringkas, lowongan terbaru, dan kontak.
- FR-02 \[P0\] Halaman statistik tracer study publik (agregat per tahun lulus dan prodi) tanpa data yang dapat mengidentifikasi individu.
- FR-03 \[P1\] Halaman FAQ dan panduan untuk alumni dan perusahaan.

### 6.2 Autentikasi dan Akun

- FR-10 \[P0\] Login alumni memakai identitas yang sudah ada (NIM atau email) lewat GoTrue, dengan session key khusus CDC.
- FR-11 \[P0\] Registrasi/klaim akun alumni dengan persetujuan staf (pola registration\_requests yang sudah ada), dicocokkan ke alumni\_records.
- FR-12 \[P0\] Reset password sementara lewat superadmin atau staf (tanpa SMTP), mengikuti mekanisme storage-api yang sudah dibangun; reset mandiri lewat email masuk Rilis 3.
- FR-13 \[P0\] Penanganan sesi kedaluwarsa dengan refresh dan retry satu kali, lalu pesan jelas dan redirect (pelajaran dari bug sesi Dirmawa).
- FR-14 \[P1\] Pembatasan laju (rate limit) dan CAPTCHA (misalnya Cloudflare Turnstile) pada form registrasi publik.

### 6.3 Profil Alumni

- FR-20 \[P0\] Alumni melihat dan memperbarui profil: kontak, status pekerjaan, instansi, jabatan.
- FR-21 \[P1\] Alumni mengatur visibilitas profil (privat, hanya staf CDC, atau terlihat oleh perusahaan terverifikasi).
- FR-22 \[P2\] Unggah CV (PDF) ke storage dengan validasi MIME, ukuran, dan path.

### 6.4 Tracer Study

- FR-30 \[P0\] Staf CDC membuat survei (periode, target angkatan/prodi, daftar pertanyaan dengan tipe pilihan, skala, dan teks).
- FR-31 \[P0\] Alumni mengisi survei satu kali per periode, dapat menyimpan draft, dan melihat status pengisian.
- FR-32 \[P0\] Dashboard staf: response rate per angkatan dan prodi, masa tunggu kerja, kesesuaian bidang, rentang gaji (agregat).
- FR-33 \[P0\] Ekspor hasil ke Excel menggunakan SheetJS dari tarball CDN resmi (sama seperti di Dirmawa).
- FR-34 \[P1\] Pengingat pengisian untuk alumni yang belum mengisi (awal: daftar kontak untuk dikirim manual; otomatis menunggu SMTP).
- FR-35 \[P1\] Instrumen mengacu pada standar tracer study dari Kemdiktisaintek yang berlaku; versi terbaru dicek ke sumber resmi sebelum survei dikunci.
- FR-36 \[P2\] Impor data tracer study lama dari Sevima Karirlink jika kampus bisa mengekspornya.

### 6.5 Lowongan Kerja

- FR-40 \[P0\] Staf CDC membuat, mengubah, dan mengarsipkan lowongan (judul, perusahaan, lokasi, tipe, deadline, deskripsi, tautan lamaran atau tautan Instagram).
- FR-41 \[P0\] Daftar lowongan publik dengan pencarian, filter (bidang, lokasi, tipe), pagination, dan halaman detail.
- FR-42 \[P0\] Lowongan otomatis berstatus kedaluwarsa setelah deadline.
- FR-43 \[P1\] Alumni menyimpan lowongan favorit.
- FR-44 \[P1\] Lamaran dalam aplikasi dengan status (dikirim, diproses, diterima, ditolak) pada Rilis 2.

### 6.6 Perusahaan (Rilis 2)

- FR-50 \[P0\] Perusahaan mendaftar dengan data legal dasar (nama, NIB/legalitas, kontak PIC, situs).
- FR-51 \[P0\] Staf CDC memverifikasi atau menolak perusahaan dengan catatan; hanya perusahaan terverifikasi dapat memposting.
- FR-52 \[P0\] Lowongan buatan perusahaan masuk antrean moderasi sebelum tayang.
- FR-53 \[P0\] Perusahaan hanya melihat data dan pelamar miliknya sendiri.
- FR-54 \[P1\] Perusahaan hanya melihat profil alumni yang visibilitasnya mengizinkan.

### 6.7 Admin dan Laporan

- FR-60 \[P0\] Dashboard staf CDC: ringkasan alumni, survei aktif, lowongan, antrean verifikasi.
- FR-61 \[P0\] Audit log untuk aksi sensitif (verifikasi perusahaan, reset password, ubah peran) tanpa menyimpan password; pastikan tabel log benar-benar ada di database yang dipakai.
- FR-62 \[P1\] Laporan tracer study per prodi untuk akreditasi, dapat diunduh.

## 7. Kebutuhan Non-Fungsional

- **Keamanan:** RLS pada semua tabel cdc\_, tidak ada service role key di frontend, header keamanan dan CSP, validasi upload.
- **Privasi:** mengikuti prinsip UU PDP: minimisasi data, persetujuan eksplisit untuk visibilitas profil, tampilan publik hanya agregat.
- **Performa:** LCP di bawah 2,5 detik pada jaringan mobile umum; daftar lowongan dan tabel admin dipaginasi di sisi server.
- **Ketersediaan:** target mengikuti VPS tunggal; pemulihan dari backup harian dapat dilakukan dan sudah diuji.
- **Aksesibilitas dan responsif:** mobile-first, kontras dan navigasi keyboard sesuai WCAG 2.1 AA untuk elemen utama.
- **Bahasa:** Indonesia untuk MVP; struktur teks disiapkan agar bisa ditambah bahasa Inggris.
- **Observabilitas:** log container, health check, dan pemantauan sederhana lewat Portainer.

## 8. Arsitektur

```
Browser
  -> Cloudflare Tunnel (hostname CDC)
     -> container frontend CDC (Vite build, di-serve nginx)
  -> Cloudflare Tunnel (hostname backend)
     -> nginx gateway Dirmawa :8000
        -> GoTrue (auth) | PostgREST (REST) | Realtime | storage-api | MinIO
        -> PostgreSQL (bersama Dirmawa)
```

| Komponen | Pilihan |
| --- | --- |
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Klien API | Pola drop-in kompatibel supabase-js yang sama dengan Dirmawa |
| Backend | Stack self-hosted Dirmawa (PostgreSQL, GoTrue, PostgREST, Realtime, MinIO, storage-api, nginx) |
| Hosting | VPS Contabo (Portainer), stack baru bernama cdc berisi frontend saja |
| Akses publik | Cloudflare Tunnel, tanpa port inbound terbuka |
| Domain | Sementara subdomain di pelitabangsa.cloud, lalu cdc di domain .ac.id setelah akses domain kampus turun |

**Keputusan arsitektur**

- ADR-1: Frontend CDC dipisah dari Dirmawa agar audiens, siklus rilis, dan permukaan serangan terisolasi.
- ADR-2: Backend dibagi dengan Dirmawa agar data alumni tidak diduplikasi; konsekuensinya RLS menjadi satu-satunya pagar data.
- ADR-3: Tabel baru memakai prefix cdc\_ di schema public agar klien API drop-in tetap sederhana (alternatif schema terpisah membutuhkan konfigurasi PostgREST tambahan).
- ADR-4: Session key localStorage khusus CDC dan origin terpisah untuk mencegah tabrakan sesi antar portal.
- ADR-5: Perubahan skema lewat file migrasi SQL ber-versi di repo, dijalankan manual setelah backup.
- ADR-6: Operasi dengan service role (verifikasi perusahaan, reset password) hanya lewat endpoint storage-api, tidak dari browser.

## 9. Model Data

Nama dan kolom di bawah adalah usulan awal, perlu dicocokkan dengan schema Dirmawa yang sebenarnya sebelum migrasi.

| Tabel | Isi utama |
| --- | --- |
| cdc\_alumni\_profiles | user\_id (ke users), alumni\_record\_id (ke alumni\_records), status\_kerja, instansi, jabatan, kontak, visibility (private, staff, verified\_companies), cv\_path |
| cdc\_companies | id, nama, legal\_ref, website, pic\_nama, pic\_kontak, status (pending, verified, rejected, suspended), verified\_by, verified\_at, catatan |
| cdc\_company\_members | company\_id, user\_id, peran di perusahaan |
| cdc\_job\_postings | id, company\_id (nullable untuk lowongan kurasi), judul, deskripsi, lokasi, tipe, bidang, deadline, sumber (kurasi atau perusahaan), tautan\_lamaran, tautan\_instagram, status (draft, pending, published, archived, expired), created\_by |
| cdc\_job\_applications | id, job\_id, alumni\_user\_id, cv\_path, status, created\_at (Rilis 2) |
| cdc\_saved\_jobs | alumni\_user\_id, job\_id |
| cdc\_tracer\_surveys | id, judul, periode, target\_angkatan, target\_prodi, status, dibuat\_oleh |
| cdc\_tracer\_questions | survey\_id, urutan, tipe, teks, opsi, wajib |
| cdc\_tracer\_responses | survey\_id, alumni\_user\_id, status (draft, submitted), submitted\_at |
| cdc\_tracer\_answers | response\_id, question\_id, nilai |
| cdc\_audit\_logs | actor\_id, aksi, target, metadata (tanpa data rahasia), created\_at |

**View publik agregat:** v\_cdc\_tracer\_public\_stats menyajikan angka agregat per tahun dan prodi dengan ambang minimal (misalnya tidak menampilkan kelompok di bawah jumlah tertentu) agar individu tidak dapat diidentifikasi, mengikuti pola view publik pada tracer study Dirmawa.

**Hubungan dengan Dirmawa:** CDC membaca tabel users dan alumni\_records, tetapi hanya lewat kebijakan RLS atau view yang secara eksplisit dibuka untuk peran CDC. Tabel Dirmawa lain tidak boleh terbuka untuk peran perusahaan.

## 10. Keamanan dan Privasi

**Matriks akses RLS (target)**

| Tabel | anon | alumni | perusahaan | staf\_cdc | superadmin |
| --- | --- | --- | --- | --- | --- |
| cdc\_job\_postings | baca yang published | baca published, simpan favorit | CRUD milik sendiri | CRUD, moderasi | semua |
| cdc\_companies | tidak ada | tidak ada | baca dan ubah milik sendiri | baca, verifikasi | semua |
| cdc\_alumni\_profiles | tidak ada | milik sendiri | baca jika visibilitas mengizinkan | baca semua | semua |
| cdc\_tracer\_\* | tidak ada | isi dan baca milik sendiri | tidak ada | kelola, baca agregat dan detail | semua |
| view agregat tracer | baca | baca | baca | baca | baca |
| cdc\_audit\_logs | tidak ada | tidak ada | tidak ada | baca | semua |

**Kontrol wajib**

- RLS aktif dan diuji pada setiap tabel cdc\_ sejak migrasi pertama; tidak ada kebijakan USING true untuk tabel berisi data pribadi.
- Tidak ada fungsi RPC baru yang dapat dipanggil anon kecuali memang kebutuhan publik; EXECUTE dicabut dari PUBLIC secara default.
- Anon key dianggap publik; service role key tidak pernah masuk bundle frontend.
- CORS memakai whitelist origin CDC dan Dirmawa yang eksplisit; regex dev-only tidak dipakai di produksi.
- Upload (CV, logo) divalidasi MIME, ukuran, dan path di storage-api; bucket tidak dibuat publik tanpa alasan.
- Header keamanan dan CSP diterapkan untuk hostname CDC.
- Registrasi publik dilindungi rate limit dan CAPTCHA.
- Password tidak pernah ditulis ke log atau audit log.

**Privasi (UU PDP)**

- Persetujuan eksplisit saat alumni memilih visibilitas profil bagi perusahaan.
- Data tracer study hanya ditampilkan publik sebagai agregat.
- Kebijakan retensi: data pelamar dan CV dihapus sesuai kebijakan yang disepakati kampus (lihat pertanyaan terbuka).
- Hak akses dan penghapusan data oleh alumni diproses lewat staf CDC.

## 11. Alur Utama

**A. Onboarding alumni:** alumni membuka CDC, mengajukan klaim akun dengan NIM dan data pencocokan, staf memverifikasi terhadap alumni\_records, akun aktif, alumni melengkapi profil dan mengisi tracer study.

**B. Registrasi perusahaan (Rilis 2):** perusahaan mendaftar, status pending, staf CDC memeriksa legalitas lalu memverifikasi atau menolak dengan catatan, perusahaan terverifikasi dapat memasang lowongan.

**C. Pengisian tracer study:** staf membuka survei, alumni mengisi dan dapat menyimpan draft, submit mengunci jawaban, dashboard memperbarui agregat.

**D. Posting lowongan:** lowongan dibuat oleh staf (langsung published) atau perusahaan (pending, lalu moderasi), tayang sampai deadline, lalu kedaluwarsa otomatis.

## 12. Informasi Arsitektur dan UI

**Sitemap publik:** Beranda, Tentang CDC, Lowongan (daftar dan detail), Tracer Study (statistik), Panduan dan FAQ, Kontak, Masuk.

**Area alumni:** Dashboard, Profil, Tracer Study, Lowongan Tersimpan, Lamaran (Rilis 2).

**Area perusahaan (Rilis 2):** Profil Perusahaan, Lowongan Saya, Pelamar.

**Area staf CDC:** Ringkasan, Alumni, Survei, Lowongan, Verifikasi Perusahaan, Laporan, Audit Log.

**Prinsip desain:** identitas visual selaras dengan UPB, mobile-first, bahasa Indonesia yang sederhana, tabel admin dengan pencarian dan filter, status selalu jelas (loading, kosong, error, sesi berakhir).

## 13. Deployment dan Operasional

- Repo baru untuk frontend CDC, dengan GitHub sebagai sumber kebenaran dan alur git pull sebelum kerja serta git push setelah kerja di VM maupun laptop.
- File migrasi SQL disimpan di repo (misalnya folder db/migrations) dan dijalankan berurutan setelah backup.
- Stack Portainer bernama cdc: satu container frontend, network dan env sendiri, tanpa port inbound; hostname baru ditambahkan di Cloudflare Tunnel.
- Variabel env frontend (URL backend dan anon key) ditanam saat build, jadi setiap perubahan env berarti build ulang tanpa cache, bukan sekadar restart.
- Rotasi kredensial backend (JWT secret, anon key, service role key, password admin dan DB) dilakukan sekali sebelum CDC live, karena menyentuh dua frontend.
- Backup: pg\_dump ke MinIO lalu rclone ke Google Drive, terjadwal, dan uji restore minimal sekali sebelum go-live.
- Migrasi domain ke .ac.id: ubah hostname tunnel, whitelist CORS, SITE\_URL dan daftar redirect GoTrue, lalu build ulang kedua frontend.

## 14. Strategi Pengujian

- **Matriks RBAC dengan JWT asli** untuk peran anon, alumni, perusahaan (dua perusahaan berbeda), staf\_cdc, dan superadmin: uji positif dan negatif, termasuk isolasi horizontal antar perusahaan dan vertikal antar peran.
- **Bukti nyata:** setiap klaim perbaikan diverifikasi dengan curl, termasuk preflight CORS (OPTIONS), bukan hanya GET.
- **Uji RPC dan storage:** pastikan anon ditolak di gateway untuk fungsi non-publik, validasi upload (MIME, ukuran, path traversal).
- **Uji fungsional per peran** di browser, diverifikasi manual sebelum lanjut ke langkah berikutnya.
- **Uji sesi:** token kedaluwarsa, refresh, login di perangkat lain.
- **Pemindaian keamanan:** jalankan ulang pentest otomatis (seperti Strix) pada CDC dan batas data bersama sebelum go-live; npm audit dengan triage dependency produksi vs dev.
- **Uji beban ringan** pada daftar lowongan dan dashboard admin.
- **Uji restore backup** sebelum data asli masuk.

## 15. Roadmap

Estimasi kasar; sesuaikan dengan ketersediaan waktu.

| Tahap | Isi | Estimasi |
| --- | --- | --- |
| 0. Persiapan | Verifikasi perbaikan pentest di stack bersama, rotasi kredensial, jadwal backup aktif, repo dan struktur proyek, finalisasi PRD | 1 minggu |
| 1. Fondasi | Skeleton frontend, auth dan session key CDC, migrasi peran baru, skema dasar dan RLS, uji RBAC awal | 1–2 minggu |
| 2. MVP publik | Landing, lowongan (kurasi staf), profil alumni, klaim akun alumni | 2 minggu |
| 3. Tracer study | Survei, pengisian, dashboard agregat, ekspor Excel | 2 minggu |
| 4. Hardening dan go-live MVP | Uji RBAC penuh, pentest ulang, header dan CORS produksi, uji restore, deploy stack cdc | 1–2 minggu |
| 5. Rilis 2 | Akun perusahaan, verifikasi, moderasi, lamaran | 3–4 minggu |

## 16. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Backend dibagi dengan Dirmawa | Celah RLS di CDC dapat membuka data mahasiswa | RLS wajib dan uji RBAC per tabel, peran perusahaan tidak punya akses ke tabel Dirmawa lain, backup sebelum migrasi |
| Migrasi pada database yang akan menjadi produksi | Kehilangan atau korusi data | Backup dahulu, migrasi diuji di stack lokal, guardrail DB untuk agent |
| Kredensial lama sempat terekspos | Pemalsuan token | Rotasi sebelum CDC live |
| Akses domain .ac.id belum ada | Jadwal go-live tertunda | Jalan dulu di subdomain .cloud, rancang perpindahan sebagai konfigurasi |
| Tidak ada SMTP | Reset mandiri dan notifikasi manual | Reset oleh staf, SMTP masuk Rilis 3 |
| Satu VPS | Resource terbatas | Pantau pemakaian di Portainer, frontend CDC ringan |
| Data alumni dari Sevima tidak bisa diekspor | Riwayat tracer hilang | Tanyakan ke vendor lebih awal, fallback mulai periode baru |
| Agent AI mengklaim perbaikan tanpa bukti | Celah lolos | Aturan kerja pada bagian 18 |

## 17. Pertanyaan Terbuka dan Asumsi

**Pertanyaan terbuka**

1. Apakah perusahaan perlu punya akun dan login sendiri pada MVP, atau lowongan tetap dimasukkan staf lewat form (menentukan apakah Rilis 2 diperlukan)?
2. Apakah sudah ada nama atau unit resmi layanan karier di UPB yang harus dipakai?
3. Bagaimana alumni diidentifikasi saat klaim akun (NIM, tahun lulus, data lain), dan apakah alumni\_records sudah memuat NIM dengan lengkap?
4. Apakah data lama Sevima Karirlink dapat diekspor, dan dalam format apa?
5. Instrumen tracer study mana yang diminta kampus untuk akreditasi (versi dan pertanyaan wajib)?
6. Kebijakan retensi data pelamar dan CV, serta pihak yang bertanggung jawab atas data (pengendali data).
7. Apakah mahasiswa tingkat akhir ikut memakai CDC?
8. Kapan akses domain .ac.id diharapkan tersedia?

**Asumsi saat ini**

- Backend yang dipakai adalah stack Dirmawa di Portainer yang databasenya akan sama setelah pindah ke .ac.id.
- Nama situs adalah CDC Pelita Bangsa.
- Skema dan nama tabel di bagian 9 masih usulan dan akan dicocokkan dengan database sebenarnya.
- Estimasi waktu bersifat kasar.

## 18. Definition of Done dan Aturan Kerja dengan Agent

**Definition of Done sebuah fitur:** kode ter-commit dengan pesan jelas, migrasi bersifat idempoten dan ada file-nya, RLS ada dan diuji dengan JWT asli, tidak ada secret di git, diuji manual di browser, dan dicatat di dokumen status proyek.

**Aturan kerja dengan agent (Antigravity):**

- Tempel dokumen status proyek di awal setiap sesi agar konteks tidak hilang.
- Jangan percaya klaim sudah diperbaiki tanpa bukti yang dapat direproduksi (curl, termasuk preflight OPTIONS).
- Perubahan env membutuhkan docker compose down, build tanpa cache, lalu up.
- Backup database sebelum perubahan skema atau RLS; operasi destruktif pada database dilarang sesuai berkas guardrail.
- Agent berhenti dan bertanya jika tidak yakin sesuatu akan merusak.
- Setiap sesi ditutup dengan checklist: cek kesehatan container, perbarui dokumen status, catat sisa pekerjaan, dan ambil backup baru.
