import { pick, types, errorCodes, isErrorWithCode } from '@react-native-documents/picker';

export interface PickedFile {
  uri: string;
  name: string;
}

export async function pickMediaFile(): Promise<PickedFile | null> {
  try {
    const [result] = await pick({ type: [types.video, types.audio] });
    return { uri: result.uri, name: result.name ?? 'media' };
  } catch (error) {
    if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) {
      return null;
    }
    throw error;
  }
}

const SUBTITLE_EXTENSIONS = ['.srt', '.vtt', '.ass', '.ssa'];

export async function pickSubtitleFile(): Promise<PickedFile | null> {
  try {
    const [result] = await pick({ type: [types.plainText, types.allFiles] });
    const name = result.name ?? '';
    const isSubtitleFile = SUBTITLE_EXTENSIONS.some(ext =>
      name.toLowerCase().endsWith(ext),
    );
    if (!isSubtitleFile) {
      throw new Error(
        `Unsupported subtitle file "${name}". Expected one of: ${SUBTITLE_EXTENSIONS.join(', ')}`,
      );
    }
    return { uri: result.uri, name };
  } catch (error) {
    if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) {
      return null;
    }
    throw error;
  }
}
