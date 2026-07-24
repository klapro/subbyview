/**
 * Parses a clock timestamp shared across SRT (H:MM:SS,fff), VTT (H:MM:SS.fff
 * or MM:SS.fff), and ASS/SSA (H:MM:SS.cc, centiseconds) into milliseconds.
 */
export function parseClockTime(raw: string): number {
  const cleaned = raw.trim().replace(',', '.');
  const [head, fracStr = '0'] = cleaned.split('.');
  const parts = head.split(':').map(Number);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    [minutes, seconds] = parts;
  } else {
    [seconds] = parts;
  }

  const fracMs = Number(fracStr.padEnd(3, '0').slice(0, 3));

  return hours * 3_600_000 + minutes * 60_000 + seconds * 1000 + fracMs;
}
