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
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<string>("");
  const audioEndedCallbackRef = useRef<(() => void) | null>(null);

  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack("");
    setCurrentAudio(null);
  }, [currentAudio]);

  const playAudio = useCallback(
    (url: string, trackId: string) => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      if (currentTrack === trackId && isPlaying) {
        stopAudio();
        return;
      }

      const audio = new Audio(url);
      audio.play();
      setCurrentAudio(audio);
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
    [currentAudio, currentTrack, isPlaying, stopAudio]
  );

  const registerAudioEndedCallback = useCallback((callback: () => void) => {
    audioEndedCallbackRef.current = callback;
  }, []);

  const unregisterAudioEndedCallback = useCallback(() => {
    audioEndedCallbackRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

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
