import { parseAss } from '../../src/subtitles/parseAss';

describe('parseAss', () => {
  it('parses Dialogue lines using the Format field order, stripping override tags', () => {
    const ass = [
      '[Script Info]',
      'Title: Example',
      '',
      '[V4+ Styles]',
      'Format: Name, Fontname, Fontsize',
      'Style: Default,Arial,20',
      '',
      '[Events]',
      'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
      'Dialogue: 0,0:00:01.00,0:00:04.00,Default,,0,0,0,,{\\i1}Hello world{\\i0}',
      'Dialogue: 0,0:00:05.50,0:00:07.25,Default,,0,0,0,,Line one\\NLine two',
    ].join('\n');

    const cues = parseAss(ass);

    expect(cues).toEqual([
      { id: 'ass-0', startMs: 1000, endMs: 4000, text: 'Hello world' },
      {
        id: 'ass-1',
        startMs: 5500,
        endMs: 7250,
        text: 'Line one\nLine two',
      },
    ]);
  });

  it('returns an empty array when there is no [Events] section', () => {
    expect(parseAss('[Script Info]\nTitle: Example')).toEqual([]);
  });
});
