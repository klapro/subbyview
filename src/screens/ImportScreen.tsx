import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSubtitleImport } from '../hooks/useSubtitleImport';
import { useAppSelector } from '../store/hooks';

export function ImportScreen() {
  const { importSubtitles } = useSubtitleImport();
  const [error, setError] = useState<string | null>(null);
  const subtitleUri = useAppSelector(state => state.playback.subtitleUri);
  const cueCount = useAppSelector(state => state.playback.cues.length);

  const handleImportSubtitles = async () => {
    setError(null);
    try {
      await importSubtitles();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SubbyView</Text>

      <Button title="Import Subtitle File" onPress={handleImportSubtitles} />

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.status}>
        <Text>Subtitles: {subtitleUri ?? 'none selected'}</Text>
        <Text>Cues parsed: {cueCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
  status: {
    marginTop: 24,
  },
});
