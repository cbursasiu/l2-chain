import React, {useEffect} from 'react';
import {adaptNavigationTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../../screens/WelcomeScreen';
import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack';
import linking from './linking';
import {navigationRef} from '../../services/navigationServices';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {Routes} from '../../routes/routes';
import DashboardScreen from '../../screens/DashboardScreen';
import {initApi} from '../../api/api';
import {useStore} from '../../stores/store';
import NavigationBackButton from './NavigationBackButton';
import L2ProfileHeaderMenu from '../L2ProfileHeaderMenu';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export type AppNavigatorParamsList = {
  WelcomeScreen: undefined;
};

const Stack = createStackNavigator();

const NavigationContainerWrapper: React.FC = () => {
  const theme = useTheme();
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const state = useStore();

  useEffect(() => {
    initApi(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const screenOptions: StackNavigationOptions = {
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    headerTintColor: 'red',
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
      maxWidth: '80%',
    },
    headerLeft: () => <NavigationBackButton />,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      textAlignVertical: 'center',
      fontSize: theme.fonts.headlineMedium.fontSize,
    },
  };

  return (
    <NavigationContainer linking={linking} ref={navigationRef} theme={theme.dark ? DarkTheme : LightTheme}>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName={Routes.DashboardScreen}
          screenOptions={{
            ...screenOptions,
          }}>
          <Stack.Screen
            name={Routes.DashboardScreen}
            component={DashboardScreen}
            options={{
              title: 'Streak Guardian',
              headerLeft: () => <></>,
              headerRight: () => <L2ProfileHeaderMenu />,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={Routes.WelcomeScreen}
          screenOptions={{
            ...screenOptions,
          }}>
          <Stack.Screen
            name={Routes.WelcomeScreen}
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.DashboardScreen}
            component={DashboardScreen}
            options={{
              title: 'Streak Guardian',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;
