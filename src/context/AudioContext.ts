import { createContext } from "react";

export interface AudioContextType {
  playAudio: (url: string, trackId: string) => void;
  stopAudio: () => void;
  isPlaying: boolean;
  currentTrack: string;
  registerAudioEndedCallback: (callback: () => void) => void;
  unregisterAudioEndedCallback: () => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(
  undefined
);
