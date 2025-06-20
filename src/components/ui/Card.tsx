import type { Surah } from "../../assets/types/surah";
import { arabicNumber } from "../../utils/arabicNumber";
import { Button } from "../optimizing/Button";
import { Svg } from "../optimizing/Svg";

export function Card({ surah }: Readonly<{ surah: Surah }>) {
  const { nomor, tempatTurun, nama, namaLatin, arti, jumlahAyat } = surah;
  
  return (
    <div
      className="group relative p-6 rounded-2xl shadow-sm hover:-translate-y-1 border border-gray-200/60 hover:border-emerald-500 dark:border-gray-800/60 bg-gray-50/70 dark:bg-gray-950/70"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <div className="font-serif size-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-gray-100 text-lg shadow-lg">
            {arabicNumber(nomor)}
          </div>
        </div>
        <div
          className={`${
            tempatTurun === "Mekah"
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-600/20 dark:ring-emerald-500/20"
              : "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20 dark:ring-green-500/20"
          } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}
        >
          {tempatTurun}
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 font-serif">
          {nama}
        </h3>
        <div className="w-12 group-hover:w-14 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 my-1.5 mx-auto rounded-full" />
      </div>

      <div className="text-center mb-4">
        <h4 className="mb-1">
          <Button
            variant="default"
            href={`/surat/${nomor}`}
            className="text-lg font-semibold text-gray-700 dark:text-gray-300"
          >
            <span className="absolute inset-0" />
            {namaLatin}
          </Button>
        </h4>
        <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">{arti}</p>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
        <Svg
          variant="outline"
          width={20}
          height={20}
          draw={[
            "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
          ]}
        />
        <span className="font-medium">{jumlahAyat} ayat</span>
      </div>
    </div>
  );
}
