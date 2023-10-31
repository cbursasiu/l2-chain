import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {adaptNavigationTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../../screens/WelcomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import linking from './linking';
import {navigationRef} from '../../services/navigationServices';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {Routes} from '../../routes/routes';
import DashboardScreen from '../../screens/DashboardScreen';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {initApi, setAuthorizationHeader} from '../../api/api';
import {getTokensFromLocalStorage} from '../../stores/localStorage';
import {useStore} from '../../stores/store';
import {queryVariants} from '../../api/queryConfig';

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
  }, []);

  return (
    <NavigationContainer linking={linking} ref={navigationRef} theme={theme.dark ? DarkTheme : LightTheme}>
      {isLoggedIn ? (
        <Stack.Navigator initialRouteName={Routes.DashboardScreen}>
          <Stack.Screen name={Routes.DashboardScreen} component={DashboardScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={Routes.WelcomeScreen}>
          <Stack.Screen
            name={Routes.WelcomeScreen}
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name={Routes.DashboardScreen} component={DashboardScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    width: '100%',
  },
  profileIcon: {
    position: 'absolute',
    bottom: 0,
  },
  settingsIcon: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    margin: 0,
  },
});

export default NavigationContainerWrapper;
