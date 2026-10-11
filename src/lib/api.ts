/**
 * Lapisan Abstraksi Akses Data CDC Pelita Bangsa (API Layer)
 * 
 * Sesuai batas pekerjaan dan ADR di PRD:
 * Komponen frontend HANYA memanggil fungsi-fungsi di modul ini.
 * Saat backend asli (PostgREST / Supabase client Dirmawa) siap dipasangkan,
 * cukup ubah implementasi internal di file ini tanpa mengubah kode komponen.
 */

import { mockJobs } from '../data/mockJobs';
import { mockTracerStats, impactMetrics } from '../data/mockTracer';
import { mockPartners } from '../data/mockPartners';
import { mockAlumniStories } from '../data/mockStories';
import type {
  CdcJobPosting,
  VTracerPublicStats,
  PartnerCompany,
  AlumniStory,
} from '../types/database';

export interface GetJobsFilter {
  query?: string;
  bidang?: string;
  lokasi?: string;
  tipe?: string;
  is_featured?: boolean;
}

export const cdcApi = {
  /**
   * Mengambil daftar lowongan kerja terpublikasi
   * Meniru endpoint: GET /rest/v1/cdc_job_postings?status=eq.published
   */
  async getPublishedJobs(filter?: GetJobsFilter): Promise<CdcJobPosting[]> {
    // Simulasi delay jaringan realistis 80ms untuk menguji state
    await new Promise((resolve) => setTimeout(resolve, 80));

    let jobs = [...mockJobs].filter((j) => j.status === 'published');

    if (filter?.is_featured !== undefined) {
      jobs = jobs.filter((j) => !!j.is_featured === filter.is_featured);
    }

    if (filter?.bidang) {
      jobs = jobs.filter((j) =>
        j.bidang.toLowerCase().includes(filter.bidang!.toLowerCase())
      );
    }

    if (filter?.lokasi) {
      jobs = jobs.filter((j) =>
        j.lokasi.toLowerCase().includes(filter.lokasi!.toLowerCase())
      );
    }

    if (filter?.tipe) {
      jobs = jobs.filter((j) => j.tipe === filter.tipe);
    }

    if (filter?.query) {
      const q = filter.query.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.judul.toLowerCase().includes(q) ||
          j.company_name.toLowerCase().includes(q) ||
          j.bidang.toLowerCase().includes(q)
      );
    }

    return jobs;
  },

  /**
   * Mengambil detail satu lowongan kerja berdasarkan ID
   * Meniru endpoint: GET /rest/v1/cdc_job_postings?id=eq.{id}
   */
  async getJobById(id: string): Promise<CdcJobPosting | null> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    const job = mockJobs.find((j) => j.id === id);
    return job || null;
  },

  /**
   * Mengambil statistik agregat publik tracer study (privasi aman, tanpa data personal)
   * Meniru view: GET /rest/v1/v_cdc_tracer_public_stats
   */
  async getPublicTracerStats(): Promise<VTracerPublicStats> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return mockTracerStats;
  },

  /**
   * Mengambil metrik dampak institusional (KPI serapan kerja & mitra)
   */
  async getImpactMetrics() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return impactMetrics;
  },

  /**
   * Mengambil daftar mitra industri terverifikasi di kawasan Cikarang/Bekasi
   * Meniru tabel: GET /rest/v1/cdc_companies?status=eq.verified
   */
  async getPartnerCompanies(): Promise<PartnerCompany[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockPartners;
  },

  /**
   * Mengambil cerita dan rekam jejak lulusan UPB
   */
  async getAlumniStories(): Promise<AlumniStory[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockAlumniStories;
  },
};
