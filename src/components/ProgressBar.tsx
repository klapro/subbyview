import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { seek } from '../store/slices/playbackSlice';
import { formatTime } from '../utils/formatTime';

export function ProgressBar() {
  const dispatch = useAppDispatch();
  const currentTimeMs = useAppSelector(state => state.playback.currentTimeMs);
  const durationMs = useAppSelector(state => state.playback.durationMs);
  const [seekingValue, setSeekingValue] = useState<number | null>(null);

  const displayedTimeMs = seekingValue ?? currentTimeMs;

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={Math.max(durationMs, 1)}
        value={displayedTimeMs}
        onValueChange={setSeekingValue}
        onSlidingComplete={value => {
          setSeekingValue(null);
          dispatch(seek(value));
        }}
        minimumTrackTintColor="#2563eb"
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(displayedTimeMs)}</Text>
        <Text style={styles.timeText}>{formatTime(durationMs)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
