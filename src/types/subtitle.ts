export type SubtitleFormat = 'srt' | 'vtt' | 'ass' | 'ssa';

export interface SubtitleCue {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
}
