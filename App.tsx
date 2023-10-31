import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import NavigationContainerWrapper from './src/components/navigation/NavigationContainerWrapper';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {initApi} from './src/api/api';
import {useStore} from 'zustand';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const colorScheme = useColorScheme();
  const {theme} = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? {...MD3DarkTheme, colors: {...theme.dark, primary: 'rgb(104, 71, 192)', onPrimary: 'rgb(255, 255, 255)'}}
      : {...MD3LightTheme, colors: theme.light};

  return (
    <PaperProvider theme={paperTheme}>
      <GestureHandlerRootView style={styles.mainContainer}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainerWrapper />
          </QueryClientProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default App;
