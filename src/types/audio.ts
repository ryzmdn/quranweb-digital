// Types untuk Audio

export interface AudioPlaybackState {
  isPlaying: boolean;
  currentTrack: string;
  currentTime: number;
  duration: number;
}

export interface AudioErrorEvent extends Event {
  error: MediaError | null;
}
