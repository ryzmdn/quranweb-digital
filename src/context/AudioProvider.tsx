import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  useMemo,
  useRef,
} from "react";

type AudioContextType = {
  playAudio: (url: string, trackId: string) => void;
  stopAudio: () => void;
  isPlaying: boolean;
  currentTrack: string;
  registerAudioEndedCallback: (callback: () => void) => void;
  unregisterAudioEndedCallback: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
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

  const value = useMemo(
    () => ({ playAudio, stopAudio, isPlaying, currentTrack, registerAudioEndedCallback, unregisterAudioEndedCallback }),
    [currentTrack, isPlaying, playAudio, stopAudio, registerAudioEndedCallback, unregisterAudioEndedCallback]
  );
  
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
