import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SubtitleText } from '../components/SubtitleText';
import { PlayPauseButton } from '../components/PlayPauseButton';
import { ProgressBar } from '../components/ProgressBar';
import { ResyncControls } from '../components/ResyncControls';
import { useSubtitleImport } from '../hooks/useSubtitleImport';
import { usePlaybackClock } from '../hooks/usePlaybackClock';

export function PlayerScreen() {
  usePlaybackClock();
  const { importSubtitles } = useSubtitleImport();
  const [error, setError] = useState<string | null>(null);

  const handleChangeSubtitles = async () => {
    setError(null);
    try {
      await importSubtitles();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={handleChangeSubtitles}>
          <Text style={styles.link}>Change subtitles</Text>
        </Pressable>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <SubtitleText />

      <View style={styles.controls}>
        <PlayPauseButton />
        <ProgressBar />
        <ResyncControls />
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
    justifyContent: 'flex-end',
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
