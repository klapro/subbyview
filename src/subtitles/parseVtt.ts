import { SubtitleCue } from '../types/subtitle';
import { parseClockTime } from './time';

const TIMING_LINE = /(\S+)\s*-->\s*(\S+)/;

export function parseVtt(content: string): SubtitleCue[] {
  const withoutBom = content.replace(/^﻿/, '');
  const blocks = withoutBom.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const cues: SubtitleCue[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0 || /^(WEBVTT|NOTE|STYLE|REGION)\b/.test(lines[0])) {
      return;
    }

    const timingIndex = lines.findIndex(line => TIMING_LINE.test(line));
    if (timingIndex === -1) {
      return;
    }

    const match = lines[timingIndex].match(TIMING_LINE);
    if (!match) {
      return;
    }

    const text = lines.slice(timingIndex + 1).join('\n').trim();
    if (!text) {
      return;
    }

    cues.push({
      id: `vtt-${index}`,
      startMs: parseClockTime(match[1]),
      endMs: parseClockTime(match[2]),
      text,
    });
  });

  return cues;
}
