import { useEffect, useState } from "react";
import axios from "axios";
import type { Surah } from "@/assets/types/surah";
import { Search } from "@/components/Search";
import { Card } from "@/components/ui/Card";

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat");
        setSurahs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surahs:", error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data Al-Quran@.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="text-center max-w-2xl mx-auto bg-transparent pt-28 px-6 pb-12 lg:px-8">
        <div className="hidden items-center gap-x-2 rounded-full bg-green-100 dark:bg-green-900 px-4 py-2 text-sm font-medium text-green-700 dark:text-gray-300 sm:inline-flex">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 dark:bg-green-600 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>{" "}
          Baca, dengarkan, dan pelajari Al-Quran dengan mudah
        </div>
        <h2 className="my-8 text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Jelajahi <span className="text-emerald-600 dark:text-emerald-400">114 Surah</span> Al-Quran
        </h2>
        <p className="text-base font-medium text-pretty text-gray-600 dark:text-gray-400 sm:text-lg/8">
          Nikmati pengalaman membaca Al-Quran digital yang modern dengan
          terjemahan, tafsir, dan audio berkualitas tinggi
        </p>

        <Search />
      </header>

      <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {surahs.map((surah) => (
          <Card key={surah.nomor} surah={surah} />
        ))}
      </div>

      <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
    </>
  );
}
