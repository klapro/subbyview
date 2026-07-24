import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { selectActiveCue } from '../store/selectors';

export function SubtitleText() {
  const activeCue = useAppSelector(selectActiveCue);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.text}>{activeCue?.text ?? ''}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 30,
  },
});
