import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import axios from "axios";
import type { Ayat, SurahDetail } from "../assets/types/surah";
import { useAudio } from "../context/AudioProvider";
import { Pagination } from "../components/Pagination";
import { AyahCard } from "../components/ui/AyatSection";
import { SurahHeader } from "../components/ui/SurahHeader";
import { SurahInfo } from "../components/ui/SurahDetail";
import { LoadingState } from "../components/animation/Loading";
import { ErrorState } from "../components/animation/Error";

export default function Surah() {
  const { id } = useParams<{ id: string }>();
  
  const {
    playAudio,
    stopAudio,
    isPlaying,
    currentTrack,
    registerAudioEndedCallback,
    unregisterAudioEndedCallback
  } = useAudio();
  
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState("01");
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null);
  
  const ayatRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const availableReciters = useMemo(() => {
    if (!surah?.ayat.length) return [];
    return Object.keys(surah.ayat[0].audio);
  }, [surah]);

  const fetchSurah = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
      const surahData = response.data.data;
      
      setSurah(surahData);
      
      const reciters = Object.keys(surahData.ayat[0]?.audio || {});
      if (reciters.length > 0 && !reciters.includes(selectedReciter)) {
        setSelectedReciter(reciters[0]);
      }
    } catch (err) {
      console.error("Error fetching surah detail:", err);
      setError("Failed to load surah. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id, selectedReciter]);

  useEffect(() => {
    fetchSurah();
    window.scrollTo(0, 0);
  }, [fetchSurah]);

  useEffect(() => {
    if (!isPlaying) {
      setCurrentPlayingAyah(null);
    } else if (currentPlayingAyah && ayatRefs.current[currentPlayingAyah]) {
      ayatRefs.current[currentPlayingAyah]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentPlayingAyah, isPlaying]);

  useEffect(() => {
    const handleAudioEnded = () => {
      if (currentPlayingAyah && surah) {
        const nextAyah = currentPlayingAyah + 1;
        if (nextAyah <= surah.ayat.length) {
          const nextAyahData = surah.ayat.find(a => a.nomorAyat === nextAyah);
          if (nextAyahData?.audio[selectedReciter]) {
            playAudio(
              nextAyahData.audio[selectedReciter], 
              `ayah-${surah.nomor}-${nextAyah}`
            );
            setCurrentPlayingAyah(nextAyah);
            return;
          }
        }
      }
      setCurrentPlayingAyah(null);
    };

    registerAudioEndedCallback(handleAudioEnded);
    
    return () => {
      unregisterAudioEndedCallback();
    };
  }, [currentPlayingAyah, surah, selectedReciter, playAudio, registerAudioEndedCallback, unregisterAudioEndedCallback]);

  const handlePlayFullSurah = useCallback(() => {
    if (!surah?.audioFull[selectedReciter]) return;
    
    const audioUrl = surah.audioFull[selectedReciter];
    playAudio(audioUrl, `full-${surah.nomor}`);
    setCurrentPlayingAyah(null);
  }, [surah, selectedReciter, playAudio]);

  const handlePlayAyah = useCallback((ayat: Ayat) => {
    if (isPlaying && currentPlayingAyah === ayat.nomorAyat) {
      stopAudio();
      return;
    }

    const audioUrl = ayat.audio[selectedReciter];
    if (audioUrl) {
      playAudio(audioUrl, `ayah-${surah?.nomor}-${ayat.nomorAyat}`);
      setCurrentPlayingAyah(ayat.nomorAyat);
    }
  }, [isPlaying, currentPlayingAyah, selectedReciter, surah?.nomor, playAudio, stopAudio]);

  const handleReciterChange = useCallback((reciterId: string) => {
    setSelectedReciter(reciterId);
    if (isPlaying) {
      stopAudio();
    }
  }, [isPlaying, stopAudio]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!surah) return <ErrorState error="Surah not found" />;

  return (
    <div className="flex flex-col gap-y-10 py-6">
      <SurahHeader />

      <SurahInfo
        surah={surah}
        selectedReciter={selectedReciter}
        availableReciters={availableReciters}
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        onPlayFullSurah={handlePlayFullSurah}
        onReciterChange={handleReciterChange}
      />

      <div className="flex flex-col gap-y-6 w-full">
        {surah.ayat.map((ayat) => {
          const isCurrentAyahPlaying = isPlaying && currentPlayingAyah === ayat.nomorAyat;
          
          return (
            <AyahCard
              key={ayat.nomorAyat}
              surah={surah}
              ayat={ayat}
              isPlaying={isCurrentAyahPlaying}
              onPlay={handlePlayAyah}
              forwardRef={(el: HTMLDivElement | null) => {
                ayatRefs.current[ayat.nomorAyat] = el;
              }}
            />
          );
        })}
      </div>

      <Pagination currentId={id} content={surah} />
    </div>
  );
}