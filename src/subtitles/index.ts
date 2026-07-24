import { SubtitleCue, SubtitleFormat } from '../types/subtitle';
import { parseSrt } from './parseSrt';
import { parseVtt } from './parseVtt';
import { parseAss } from './parseAss';

export function detectSubtitleFormat(filename: string): SubtitleFormat | null {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!match) {
    return null;
  }

  const ext = match[1];
  if (ext === 'srt' || ext === 'vtt' || ext === 'ass' || ext === 'ssa') {
    return ext;
  }
  return null;
}

export function parseSubtitles(
  content: string,
  format: SubtitleFormat,
): SubtitleCue[] {
  switch (format) {
    case 'srt':
      return parseSrt(content);
    case 'vtt':
      return parseVtt(content);
    case 'ass':
    case 'ssa':
      return parseAss(content);
    default:
      return [];
  }
}

export { parseSrt, parseVtt, parseAss };
export type { SubtitleCue, SubtitleFormat };
