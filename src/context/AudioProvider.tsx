import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { AudioContext, type AudioContextType } from "@/context/AudioContext";

export function AudioProvider({ children }: Readonly<{ children: ReactNode }>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<string>("");
  const audioEndedCallbackRef = useRef<(() => void) | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack("");
  }, []);

  const playAudio = useCallback(
    (url: string, trackId: string) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      if (currentTrack === trackId && isPlaying) {
        stopAudio();
        return;
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
      setCurrentTrack(trackId);

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTrack("");
        if (audioEndedCallbackRef.current) {
          audioEndedCallbackRef.current();
        }
      };
    },
    [currentTrack, isPlaying, stopAudio]
  );

  const registerAudioEndedCallback = useCallback((callback: () => void) => {
    audioEndedCallbackRef.current = callback;
  }, []);

  const unregisterAudioEndedCallback = useCallback(() => {
    audioEndedCallbackRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const value = useMemo<AudioContextType>(
    () => ({
      playAudio,
      stopAudio,
      isPlaying,
      currentTrack,
      registerAudioEndedCallback,
      unregisterAudioEndedCallback,
    }),
    [
      currentTrack,
      isPlaying,
      playAudio,
      stopAudio,
      registerAudioEndedCallback,
      unregisterAudioEndedCallback,
    ]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
