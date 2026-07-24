import { parseSrt } from '../../src/subtitles/parseSrt';

describe('parseSrt', () => {
  it('parses basic cues with single and multi-line text', () => {
    const srt = [
      '1',
      '00:00:01,000 --> 00:00:04,000',
      'Hello world',
      '',
      '2',
      '00:00:05,500 --> 00:00:07,250',
      'Second line',
      'continued',
      '',
    ].join('\n');

    const cues = parseSrt(srt);

    expect(cues).toEqual([
      { id: 'srt-0', startMs: 1000, endMs: 4000, text: 'Hello world' },
      {
        id: 'srt-1',
        startMs: 5500,
        endMs: 7250,
        text: 'Second line\ncontinued',
      },
    ]);
  });

  it('skips blocks without a timing line', () => {
    const srt = ['not a cue block', '', '1', '00:00:01,000 --> 00:00:02,000', 'Ok'].join(
      '\n',
    );

    const cues = parseSrt(srt);

    expect(cues).toEqual([
      { id: 'srt-1', startMs: 1000, endMs: 2000, text: 'Ok' },
    ]);
  });
});
