import { RootState } from './index';
import { SubtitleCue } from '../types/subtitle';

export function selectActiveCue(state: RootState): SubtitleCue | null {
  const { cues, currentTimeMs } = state.playback;
  return (
    cues.find(
      cue => currentTimeMs >= cue.startMs && currentTimeMs < cue.endMs,
    ) ?? null
  );
}
