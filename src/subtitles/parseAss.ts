import { SubtitleCue } from '../types/subtitle';
import { parseClockTime } from './time';

function cleanAssText(raw: string): string {
  return raw
    .replace(/\{[^}]*\}/g, '')
    .replace(/\\N/gi, '\n')
    .replace(/\\h/gi, ' ')
    .trim();
}

export function parseAss(content: string): SubtitleCue[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  const eventsStart = lines.findIndex(line =>
    line.trim().toLowerCase() === '[events]',
  );
  if (eventsStart === -1) {
    return [];
  }

  let fields: string[] = [];
  const cues: SubtitleCue[] = [];
  let cueIndex = 0;

  for (let i = eventsStart + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('[') && line.endsWith(']')) {
      break;
    }

    if (/^format:/i.test(line)) {
      fields = line
        .slice(line.indexOf(':') + 1)
        .split(',')
        .map(f => f.trim().toLowerCase());
      continue;
    }

    if (!/^dialogue:/i.test(line) || fields.length === 0) {
      continue;
    }

    const startFieldIdx = fields.indexOf('start');
    const endFieldIdx = fields.indexOf('end');
    const textFieldIdx = fields.indexOf('text');
    if (startFieldIdx === -1 || endFieldIdx === -1 || textFieldIdx === -1) {
      continue;
    }

    const rawValues = line.slice(line.indexOf(':') + 1).split(',');
    if (rawValues.length < fields.length) {
      continue;
    }

    const values = rawValues.slice(0, textFieldIdx);
    values.push(rawValues.slice(textFieldIdx).join(','));

    const text = cleanAssText(values[textFieldIdx]);
    if (!text) {
      continue;
    }

    cues.push({
      id: `ass-${cueIndex++}`,
      startMs: parseClockTime(values[startFieldIdx].trim()),
      endMs: parseClockTime(values[endFieldIdx].trim()),
      text,
    });
  }

  return cues;
}
