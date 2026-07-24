import { parseVtt } from '../../src/subtitles/parseVtt';

describe('parseVtt', () => {
  it('parses cues, ignoring header and cue identifiers/settings', () => {
    const vtt = [
      'WEBVTT',
      '',
      'NOTE this is a comment block',
      '',
      'cue-1',
      '00:00:01.000 --> 00:00:04.000 align:start line:0',
      'Hello world',
      '',
      '00:01:05.500 --> 00:01:07.250',
      'Second line',
      '',
    ].join('\n');

    const cues = parseVtt(vtt);

    expect(cues).toEqual([
      { id: 'vtt-2', startMs: 1000, endMs: 4000, text: 'Hello world' },
      { id: 'vtt-3', startMs: 65500, endMs: 67250, text: 'Second line' },
    ]);
  });
});
