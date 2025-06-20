import { Button } from '../optimizing/Button';
import { Svg } from '../optimizing/Svg';
import { ReciterSelector } from './ReciterSelector';
import type { SurahDetail } from '../../assets/types/surah';

interface SurahInfoProps {
  surah: SurahDetail;
  selectedReciter: string;
  availableReciters: string[];
  isPlaying: boolean;
  currentTrack: string | null;
  onPlayFullSurah: () => void;
  onReciterChange: (reciterId: string) => void;
}

export const SurahInfo: React.FC<SurahInfoProps> = ({
  surah,
  selectedReciter,
  availableReciters,
  isPlaying,
  currentTrack,
  onPlayFullSurah,
  onReciterChange
}) => {
  const isPlayingFullSurah = isPlaying && currentTrack === `full-${surah.nomor}`;

  return (
    <section className="rounded-2xl bg-emerald-50 dark:bg-emerald-950 px-4 py-10 ring-1 ring-emerald-600/20 dark:ring-emerald-400/20 ring-inset">
      <div className="flex justify-center items-center gap-x-3 text-emerald-900 dark:text-emerald-100">
        <Svg variant="outline" width={36} height={36} draw={["M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"]} />
        <h2 className="text-3xl font-semibold sm:text-4xl">
          <span className="font-serif font-medium mx-2">{surah.nama}</span>
          {surah.namaLatin}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-3.5 my-5">
        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-gray-300 sm:text-sm">
          {surah.arti}
        </span>
        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-green-600/20 dark:ring-green-400/20 ring-inset sm:text-sm">
          {surah.tempatTurun}
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">{surah.ayat.length} Ayat</span>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md mx-auto md:flex-row md:items-center">
        <ReciterSelector
          selectedReciter={selectedReciter}
          availableReciters={availableReciters}
          onReciterChange={onReciterChange}
        />

        <Button
          onClick={onPlayFullSurah}
          disabled={!surah.audioFull[selectedReciter]}
          className="px-4 py-1.5 flex items-center gap-2"
          aria-label={isPlayingFullSurah ? "Stop surah" : "Play full surah"}
        >
          {isPlayingFullSurah ? (
            <Svg width={20} height={20} draw={["M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"]} />
          ) : (
            <Svg width={20} height={20} draw={[
              "M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z",
              "M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"
            ]} />
          )}
          {isPlayingFullSurah ? "Stop" : "Play Surah"}
        </Button>
      </div>
    </section>
  );
};