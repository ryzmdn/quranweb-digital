// Types untuk Al-Quran API

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: "Mekah" | "Madinah";
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

export interface Tafsir {
  ayat: number;
  tafsir: string | Array<{ kemenangan: string } | { tafsir: string }>;
}

export interface SurahDetail extends Surah {
  ayat: Ayat[];
  tafsir: Tafsir[];
  suratSelanjutnya: Pick<
    Surah,
    "nomor" | "nama" | "namaLatin" | "jumlahAyat"
  > | null;
  suratSebelumnya: Pick<
    Surah,
    "nomor" | "nama" | "namaLatin" | "jumlahAyat"
  > | null;
}

export interface ReciterAudio {
  name: string;
  url: string;
}
