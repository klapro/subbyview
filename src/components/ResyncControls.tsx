import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { seek } from '../store/slices/playbackSlice';

const RESYNC_EPSILON_MS = 250;

export function ResyncControls() {
  const dispatch = useAppDispatch();
  const cues = useAppSelector(state => state.playback.cues);
  const currentTimeMs = useAppSelector(state => state.playback.currentTimeMs);

  const jumpToPreviousLine = () => {
    const previous = [...cues]
      .reverse()
      .find(cue => cue.startMs < currentTimeMs - RESYNC_EPSILON_MS);
    dispatch(seek(previous ? previous.startMs : 0));
  };

  const jumpToNextLine = () => {
    const next = cues.find(
      cue => cue.startMs > currentTimeMs + RESYNC_EPSILON_MS,
    );
    if (next) {
      dispatch(seek(next.startMs));
    }
  };

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Resync to previous line"
        onPress={jumpToPreviousLine}
      >
        <Text style={styles.label}>⏮ Prev line</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Resync to next line"
        onPress={jumpToNextLine}
      >
        <Text style={styles.label}>Next line ⏭</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    color: '#2563eb',
    fontSize: 14,
  },
});
