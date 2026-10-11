/**
 * Konfigurasi Global Situs CDC Pelita Bangsa
 */

export const siteConfig = {
  name: 'CDC Pelita Bangsa',
  shortName: 'CDC UPB',
  fullName: 'Career Development Center Universitas Pelita Bangsa',
  description:
    'Pusat pengembangan karier, kemitraan industri terverifikasi, dan pelacakan tracer study alumni Universitas Pelita Bangsa.',
  url: 'https://cdc.pelitabangsa.ac.id',
  
  /**
   * PENTING: Flag pengontrol badge "Data contoh" di UI.
   * Ketika backend asli telah terhubung dan data resmi kampus telah diisi,
   * ubah nilai ini menjadi `false` untuk menyembunyikan semua indikator data contoh secara global.
   */
  SHOW_DUMMY_BADGES: true,

  navLinks: [
    { label: 'Beranda', href: '/' },
    { label: 'Lowongan', href: '/#lowongan' },
    { label: 'Layanan', href: '/#layanan' },
    { label: 'Tracer Study', href: '/#tracer-study' },
    { label: 'Alumni', href: '/#cerita-alumni' },
    { label: 'Kemitraan', href: '/#mitra-industri' },
  ],

  contact: {
    email: 'cdc@pelitabangsa.ac.id',
    phone: '(021) 2851-8181',
    addressPlaceholder: '[LOKASI KAMPUS: Jl. Inspeksi Kalimalang No.9, Cibatu, Cikarang Pusat, Kab. Bekasi - BELUM DIVERIFIKASI RESMI]',
  },
  
  legal: {
    privacyNotice: '[KEBIJAKAN PRIVASI: Merujuk UU No. 27/2022 tentang Pelindungan Data Pribadi - DRAFT INTERNAL UPB]',
    accreditationNotice: '[STATUS AKREDITASI: Data akreditasi institusi dan program studi sedang dalam proses sinkronisasi PDDikti]',
    copyright: '© 2026 Career Development Center Universitas Pelita Bangsa. Hak cipta dilindungi.',
  }
};
