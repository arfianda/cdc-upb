import type { AlumniStory } from '../types/database';

export const mockAlumniStories: AlumniStory[] = [
  {
    id: 'story-1',
    nama: 'Fajar Ardiansyah, S.Kom.',
    prodi: 'Teknik Informatika',
    angkatan: 'Lulusan 2021',
    jabatan: 'Senior Frontend Engineer',
    perusahaan: 'Ekosistem Teknologi Jabodetabek',
    kutipan:
      'Layanan kurasi karier dan pembekalan portofolio di CDC Pelita Bangsa membuka jalur langsung menuju standar seleksi industri rekayasa perangkat lunak modern. Kesiapan teknis dan etika kerja menjadi modal terkuat saya saat bersaing di tingkat regional.',
    isDummy: true,
  },
  {
    id: 'story-2',
    nama: 'Rina Nurhaliza, S.M.',
    prodi: 'Manajemen Sumber Daya Manusia',
    angkatan: 'Lulusan 2020',
    jabatan: 'People Operations Specialist',
    perusahaan: 'Manufaktur Multinasional Kawasan MM2100',
    kutipan:
      'Posisi strategis kampus di episentrum industri Cikarang yang dijembatani oleh CDC memberikan peluang nyata untuk memahami dinamika ketenagakerjaan pabrik dan korporasi bahkan sebelum prosesi wisuda berlangsung.',
    isDummy: true,
  },
  {
    id: 'story-3',
    nama: 'Dimas Prasetyo, S.Ak.',
    prodi: 'Akuntansi',
    angkatan: 'Lulusan 2021',
    jabatan: 'Corporate Financial Analyst',
    perusahaan: 'Perbankan Nasional Terkemuka',
    kutipan:
      'Program Tracer Study yang rapi serta jejaring alumni UPB memungkinkan adanya ruang diskusi dan pendampingan karier nyata. Akses informasi loker terverifikasi membebaskan alumni dari kekhawatiran rekrutmen abal-abal.',
    isDummy: true,
  },
];
