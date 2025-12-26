import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Surah, SurahDetail, Tafsir } from "@/types";

const API_BASE_URL = "https://equran.id/api/v2";

class QuranAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  /**
   * Fetch all surahs
   */
  async getAllSurahs(): Promise<Surah[]> {
    try {
      const response = await this.client.get("/surat");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching surahs:", error);
      throw new Error("Failed to fetch surahs");
    }
  }

  /**
   * Fetch a specific surah with its ayats
   */
  async getSurah(surahNumber: number): Promise<SurahDetail> {
    try {
      const response = await this.client.get(`/surat/${surahNumber}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching surah ${surahNumber}:`, error);
      throw new Error(`Failed to fetch surah ${surahNumber}`);
    }
  }

  /**
   * Search surahs by query
   */
  async searchSurahs(query: string): Promise<Surah[]> {
    try {
      const response = await this.client.get("/surat");
      const allSurahs = response.data.data || [];

      const lowerQuery = query.toLowerCase();
      return allSurahs.filter(
        (surah: Surah) =>
          surah.namaLatin.toLowerCase().includes(lowerQuery) ||
          surah.arti.toLowerCase().includes(lowerQuery) ||
          String(surah.nomor).includes(lowerQuery)
      );
    } catch (error) {
      console.error("Error searching surahs:", error);
      throw new Error("Failed to search surahs");
    }
  }

  /**
   * Fetch tafsir for a specific ayat
   */
  async getTafsir(ayahNumber: number): Promise<Tafsir> {
    try {
      const response = await this.client.get(`/tafsir/${ayahNumber}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching tafsir for ayah ${ayahNumber}:`, error);
      throw new Error(`Failed to fetch tafsir for ayah ${ayahNumber}`);
    }
  }
}

// Export singleton instance
export const quranAPI = new QuranAPI();
