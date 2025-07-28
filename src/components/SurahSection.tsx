import type { Surah } from "@/assets/types/surah";

export const SurahList: React.FC<{
  surahs: Surah[];
  onSelectSurah: (surah: Surah) => void;
}> = ({ surahs, onSelectSurah }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Al-Quran Digital
      </h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {surahs.map((surah) => (
          <div
            key={surah.nomor}
            onClick={() => onSelectSurah(surah)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {surah.nomor}
              </div>
              <div className="text-2xl font-arabic text-green-700">
                {surah.nama}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-1">
              {surah.namaLatin}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {surah.arti} • {surah.jumlahAyat} ayat
            </p>
            <p className="text-xs text-gray-500">
              {surah.tempatTurun}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};