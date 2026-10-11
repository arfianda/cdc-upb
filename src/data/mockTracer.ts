import type { VTracerPublicStats } from '../types/database';

export const mockTracerStats: VTracerPublicStats = {
  periode_tahun: 2024,
  total_responden: 1248,
  persentase_bekerja: 84.2,
  persentase_wirausaha: 8.6,
  persentase_studi_lanjut: 4.8,
  persentase_mencari_kerja: 2.4,
  rata_masa_tunggu_bulan: 2.7,
  kesesuaian_bidang_persen: 89.1,
  distribusi_sektor: [
    { nama: 'Manufaktur & Otomotif Presisi', persentase: 38.5, jumlah: 480 },
    { nama: 'Teknologi Informasi & Perangkat Lunak', persentase: 26.2, jumlah: 327 },
    { nama: 'Perbankan, Keuangan & Asuransi', persentase: 18.8, jumlah: 235 },
    { nama: 'Wirausaha & Bisnis Ritel Mandiri', persentase: 8.6, jumlah: 107 },
    { nama: 'Konsultan & Layanan Profesional', persentase: 7.9, jumlah: 99 },
  ],
  isDummy: true,
};

export const impactMetrics = [
  {
    id: 'metric-1',
    label: 'Keterserapan Karier Lulusan',
    value: 84.2,
    unit: '%',
    suffix: '',
    keterangan: 'Alumni memperoleh pekerjaan tetap dalam waktu kurang dari 6 bulan pasca kelulusan',
    isDummy: true,
  },
  {
    id: 'metric-2',
    label: 'Rata-rata Waktu Tunggu',
    value: 2.7,
    unit: 'Bulan',
    suffix: '',
    keterangan: 'Masa transisi alumni dari wisuda hingga penandatanganan kontrak kerja pertama',
    isDummy: true,
  },
  {
    id: 'metric-3',
    label: 'Kesesuaian Bidang Studi',
    value: 89.1,
    unit: '%',
    suffix: '',
    keterangan: 'Kesesuaian antara kompetensi program studi dengan bidang tanggung jawab profesional',
    isDummy: true,
  },
  {
    id: 'metric-4',
    label: 'Mitra Industri Aktif',
    value: 350,
    unit: '+',
    suffix: '',
    keterangan: 'Perusahaan kawasan industri Cikarang dan nasional dalam kemitraan rekrutmen terverifikasi',
    isDummy: true,
  },
];
