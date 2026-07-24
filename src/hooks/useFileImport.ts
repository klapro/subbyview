import { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setMedia, setSubtitles } from '../store/slices/playbackSlice';
import { requestMediaLibraryPermission } from '../services/permissions';
import { pickMediaFile, pickSubtitleFile } from '../services/filePicker';
import { detectSubtitleFormat, parseSubtitles } from '../subtitles';

export function useFileImport() {
  const dispatch = useAppDispatch();

  const importMedia = useCallback(async () => {
    const granted = await requestMediaLibraryPermission();
    if (!granted) {
      throw new Error('Media permission was denied');
    }

    const file = await pickMediaFile();
    if (!file) {
      return;
    }

    dispatch(setMedia({ uri: file.uri }));
  }, [dispatch]);

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

  return { importMedia, importSubtitles };
}
