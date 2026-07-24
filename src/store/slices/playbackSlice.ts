import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubtitleCue } from '../../types/subtitle';

export interface PlaybackState {
  subtitleUri: string | null;
  cues: SubtitleCue[];
  isPlaying: boolean;
  currentTimeMs: number;
}

const initialState: PlaybackState = {
  subtitleUri: null,
  cues: [],
  isPlaying: false,
  currentTimeMs: 0,
};

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    setSubtitles(
      state,
      action: PayloadAction<{ uri: string; cues: SubtitleCue[] }>,
    ) {
      state.subtitleUri = action.payload.uri;
      state.cues = action.payload.cues;
      state.currentTimeMs = 0;
      state.isPlaying = false;
    },
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    stop(state) {
      state.isPlaying = false;
      state.currentTimeMs = 0;
    },
    seek(state, action: PayloadAction<number>) {
      state.currentTimeMs = action.payload;
    },
    tick(state, action: PayloadAction<number>) {
      state.currentTimeMs = action.payload;
    },
  },
});

export const { setSubtitles, play, pause, stop, seek, tick } =
  playbackSlice.actions;
export default playbackSlice.reducer;
