import { PermissionsAndroid, Platform } from 'react-native';

/**
 * SAF-backed pickers (DocumentPicker) don't strictly need this on Android
 * 13+, but some OEM file providers still check it, so request the closest
 * equivalent for the running API level.
 */
export async function requestMediaLibraryPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  const apiLevel = Platform.Version;
  const permission =
    apiLevel >= 33
      ? [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ]
      : [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

  const results = await PermissionsAndroid.requestMultiple(permission);
  return Object.values(results).every(
    result => result === PermissionsAndroid.RESULTS.GRANTED,
  );
}
