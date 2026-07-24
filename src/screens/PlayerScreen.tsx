import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SubtitleText } from '../components/SubtitleText';
import { PlayPauseButton } from '../components/PlayPauseButton';
import { ProgressBar } from '../components/ProgressBar';
import { useFileImport } from '../hooks/useFileImport';

export function PlayerScreen() {
  const { importMedia, importSubtitles } = useFileImport();
  const [error, setError] = useState<string | null>(null);

  const runImport = async (fn: () => Promise<void>) => {
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => runImport(importMedia)}>
          <Text style={styles.link}>Change media</Text>
        </Pressable>
        <Pressable onPress={() => runImport(importSubtitles)}>
          <Text style={styles.link}>Change subtitles</Text>
        </Pressable>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <SubtitleText />

      <View style={styles.controls}>
        <PlayPauseButton />
        <ProgressBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: '#2563eb',
    fontSize: 14,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
  controls: {
    gap: 16,
    paddingBottom: 8,
  },
});
