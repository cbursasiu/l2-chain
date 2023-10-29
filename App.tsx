import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PaperProvider, useTheme} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import WelcomeScreen from './src/screens/WelcomeScreen';
import NavigationContainerWrapper from './src/components/navigation/NavigationContainerWrapper';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.mainContainer}>
        <KeyboardProvider>
          <NavigationContainerWrapper />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default App;
