import { useEffect } from 'react';
import type { Ayat, Surah, Tafsir } from '../assets/types/surah';
import { Button } from './optimizing/Button';
import { Svg } from './optimizing/Svg';

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  surah: Surah;
  ayat: Ayat;
  tafsirData: Tafsir | null;
}

export const Modal: React.FC<TafsirModalProps> = ({
  isOpen,
  onClose,
  surah,
  ayat,
  tafsirData
}) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
    }

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  
  if (!isOpen || !tafsirData) return null;
  
  const currentTafsir = Array.isArray(tafsirData.tafsir)
  ? tafsirData.tafsir[ayat.nomorAyat - 1]
  : tafsirData.tafsir;


  return (
    <>
      <div className="fixed size-full inset-0 bg-gray-900/75 z-40" />

      <div className="relative size-full">
        <div className="fixed top-1/2 left-1/2 -translate-1/2 z-50 overflow-y-auto size-full max-w-2xl sm:h-[600px] rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl sm:p-6">
          <div className="text-start sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-base font-semibold text-gray-800">
                Tafsir Surat {surah.namaLatin} Ayat {ayat.nomorAyat}
              </h3>

              <div className="mt-2">
                <div className="text-right py-8">
                  <p className="text-4xl font-serif font-medium" dir="rtl" lang="ar">
                    {ayat.teksArab}
                  </p>
                  <p className="text-gray-600 italic mt-2">{ayat.teksLatin}</p>
                  <p className="text-gray-700 mt-2">{ayat.teksIndonesia}</p>
                </div>

                <div aria-hidden="true" className="w-full h-px bg-gray-200 mt-2 mb-8" />

                <div className="w-full space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {typeof currentTafsir === 'string' ? currentTafsir : currentTafsir?.teks}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
              aria-label="Tutup modal"
            >
              <Svg variant="outline" width={24} height={24} draw={["M6 18L18 6M6 6l12 12"]} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
