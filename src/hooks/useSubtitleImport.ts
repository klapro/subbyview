import { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setSubtitles } from '../store/slices/playbackSlice';
import { pickSubtitleFile } from '../services/filePicker';
import { detectSubtitleFormat, parseSubtitles } from '../subtitles';

export function useSubtitleImport() {
  const dispatch = useAppDispatch();

  const importSubtitles = useCallback(async () => {
    const file = await pickSubtitleFile();
    if (!file) {
      return;
    }

    const format = detectSubtitleFormat(file.name);
    if (!format) {
      throw new Error(`Could not detect subtitle format for "${file.name}"`);
    }

    const content = await (await fetch(file.uri)).text();
    const cues = parseSubtitles(content, format);
    dispatch(setSubtitles({ uri: file.uri, cues }));
  }, [dispatch]);

  return { importSubtitles };
}
