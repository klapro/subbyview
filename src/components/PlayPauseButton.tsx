import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { pause, play } from '../store/slices/playbackSlice';

export function PlayPauseButton() {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(state => state.playback.isPlaying);

  return (
    <Pressable
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
      onPress={() => dispatch(isPlaying ? pause() : play())}
    >
      <Text style={styles.icon}>{isPlaying ? '❚❚' : '▶'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 28,
  },
});
