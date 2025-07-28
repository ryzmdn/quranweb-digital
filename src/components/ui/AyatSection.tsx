import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/optimizing/Button";
import { Svg } from "@/components/optimizing/Svg";
import { LoadingState } from "@/components/animation/Loading";
import { ErrorState } from "@/components/animation/Error";
import { Modal } from "@/components/Modal";
import type { Ayat, Surah, Tafsir } from "@/assets/types/surah";
import { arabicNumber } from "@/utils/arabicNumber";

interface AyahCardProps {
  surah: Surah;
  ayat: Ayat;
  isPlaying: boolean;
  onPlay: (ayat: Ayat) => void;
  forwardRef?: React.Ref<HTMLDivElement>;
}

export const AyahCard: React.FC<AyahCardProps> = ({
  surah,
  ayat,
  isPlaying,
  onPlay,
  forwardRef,
}) => {
  const [isTafsirOpen, setIsTafsirOpen] = useState(false);
  const [tafsirData, setTafsirData] = useState<Tafsir | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTafsir = async (ayahNumber: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://equran.id/api/v2/tafsir/${ayahNumber}`
      );
      const data = response.data.data;
      setTafsirData(data);
      setIsTafsirOpen(true);
    } catch (err) {
      setError("Gagal memuat tafsir. Silakan coba lagi.");
      console.error("Error fetching tafsir:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTafsirClick = () => {
    fetchTafsir(surah.nomor);
  };

  const closeModal = () => {
    setIsTafsirOpen(false);
    setTafsirData(null);
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error="gak tawu" />;

  return (
    <>
      <article
        ref={forwardRef}
        id={`ayah-${ayat.nomorAyat}`}
        className={`bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors ${
          isPlaying
            ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950"
            : "hover:bg-gray-50 dark:hover:bg-gray-950"
        }`}
        aria-labelledby={`ayah-${ayat.nomorAyat}-header`}
      >
        <header
          className="flex items-center justify-between mb-4"
          id={`ayah-${ayat.nomorAyat}-header`}
        >
          <div className="flex items-center gap-x-3">
            <span
              className={`${
                isPlaying
                  ? "bg-emerald-200 dark:bg-emerald-800"
                  : "bg-emerald-100 dark:bg-emerald-900"
              } inline-flex justify-center items-center font-serif size-7 rounded-full font-medium text-emerald-700 dark:text-emerald-300 sm:size-8`}
              aria-label={`Ayah number ${ayat.nomorAyat}`}
            >
              {arabicNumber(ayat.nomorAyat)}
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              Ayat {ayat.nomorAyat}
            </p>
          </div>

          <div className="flex items-center gap-x-3.5">
            <Button
              variant="ghost"
              onClick={() => onPlay(ayat)}
              className="size-8"
              aria-label={isPlaying ? "Stop ayah" : "Play ayah"}
            >
              {isPlaying ? (
                <Svg
                  variant="outline"
                  width={20}
                  height={20}
                  draw={[
                    "M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z",
                  ]}
                  className="text-red-500"
                />
              ) : (
                <Svg
                  variant="outline"
                  width={20}
                  height={20}
                  draw={[
                    "M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z",
                  ]}
                />
              )}
            </Button>
            <Button
              variant="ghost"
              className="size-8"
              onClick={handleTafsirClick}
              aria-label="Bookmark ayah"
            >
              <Svg
                variant="outline"
                width={20}
                height={20}
                draw={[
                  "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
                ]}
              />
            </Button>
          </div>
        </header>

        <div className="text-right py-6">
          <p
            className={`text-4xl/loose font-serif ${
              isPlaying
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-gray-800 dark:text-gray-200"
            } font-arabic`}
            dir="rtl"
            lang="ar"
          >
            {ayat.teksArab}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="h-px w-full bg-gray-200 dark:bg-gray-800 mt-1 mb-6 rounded-full"
        />

        <div className="space-y-3">
          <p
            className={`${
              isPlaying
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-600 dark:text-gray-400"
            } italic`}
          >
            {ayat.teksLatin}
          </p>
          <p
            className={`${
              isPlaying
                ? "text-emerald-800 dark:text-emerald-400 font-medium"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {ayat.teksIndonesia}
          </p>
        </div>
      </article>

      {isTafsirOpen && (
        <Modal
          isOpen={isTafsirOpen}
          onClose={closeModal}
          surah={surah}
          ayat={ayat}
          tafsirData={tafsirData}
        />
      )}
    </>
  );
};
