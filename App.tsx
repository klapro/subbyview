/**
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { useAppSelector } from './src/store/hooks';
import { ImportScreen } from './src/screens/ImportScreen';
import { PlayerScreen } from './src/screens/PlayerScreen';

function RootScreen() {
  const subtitleUri = useAppSelector(state => state.playback.subtitleUri);
  return subtitleUri ? <PlayerScreen /> : <ImportScreen />;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container}>
          <RootScreen />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
