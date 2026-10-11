/**
 * Tipe data skema CDC Pelita Bangsa sesuai PRD Bagian 9
 * Digunakan untuk lapisan abstraksi API (src/lib/api.ts) dan data mock (src/data/)
 */

export type WorkStatus =
  | 'bekerja'
  | 'wirausaha'
  | 'studi_lanjut'
  | 'mencari_kerja'
  | 'lainnya';

export type ProfileVisibility = 'private' | 'staff' | 'verified_companies';

export type CompanyStatus = 'pending' | 'verified' | 'rejected' | 'suspended';

export type JobType = 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';

export type JobStatus = 'draft' | 'pending' | 'published' | 'archived' | 'expired';

export type JobSource = 'kurasi' | 'perusahaan';

export interface CdcAlumniProfile {
  user_id: string;
  alumni_record_id: string;
  nama: string;
  nim: string;
  prodi: string;
  tahun_lulus: number;
  status_kerja: WorkStatus;
  instansi: string | null;
  jabatan: string | null;
  kontak: string | null;
  visibility: ProfileVisibility;
  cv_path: string | null;
  avatar_url?: string | null;
  isDummy?: boolean;
}

export interface CdcCompany {
  id: string;
  nama: string;
  legal_ref: string;
  website: string | null;
  logo_url?: string | null;
  industri: string;
  lokasi: string;
  pic_nama: string;
  pic_kontak: string;
  status: CompanyStatus;
  verified_by: string | null;
  verified_at: string | null;
  catatan: string | null;
  isDummy?: boolean;
}

export interface CdcJobPosting {
  id: string;
  company_id: string | null;
  company_name: string;
  company_logo?: string | null;
  company_verified: boolean;
  judul: string;
  deskripsi: string;
  persyaratan?: string[];
  keuntungan?: string[];
  lokasi: string;
  tipe: JobType;
  bidang: string;
  gaji_display: string | null;
  deadline: string; // ISO date string
  sumber: JobSource;
  tautan_lamaran: string | null;
  tautan_instagram: string | null;
  status: JobStatus;
  created_at: string;
  is_featured?: boolean;
  isDummy?: boolean;
}

export interface SektorDistribusi {
  nama: string;
  persentase: number;
  jumlah: number;
}

export interface VTracerPublicStats {
  periode_tahun: number;
  total_responden: number;
  persentase_bekerja: number;
  persentase_wirausaha: number;
  persentase_studi_lanjut: number;
  persentase_mencari_kerja: number;
  rata_masa_tunggu_bulan: number;
  kesesuaian_bidang_persen: number;
  distribusi_sektor: SektorDistribusi[];
  isDummy?: boolean;
}

export interface AlumniStory {
  id: string;
  nama: string;
  prodi: string;
  angkatan: string;
  jabatan: string;
  perusahaan: string;
  kutipan: string;
  foto_url?: string | null;
  isDummy?: boolean;
}

export interface PartnerCompany {
  id: string;
  nama: string;
  kategori: string;
  kawasan: string; // misal: 'Kawasan Industri GIIC Cikarang'
  logo_svg?: string;
  isDummy?: boolean;
}
