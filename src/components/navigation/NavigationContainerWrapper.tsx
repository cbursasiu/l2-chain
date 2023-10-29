import React from 'react';
import {StyleSheet} from 'react-native';
import {adaptNavigationTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../../screens/WelcomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import linking from './linking';
import {navigationRef} from '../../services/navigationServices';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export type AppNavigatorParamsList = {
  WelcomeScreen: undefined;
};

export const Routes: {[key in keyof AppNavigatorParamsList]: key} = {
  WelcomeScreen: 'WelcomeScreen',
};

const Stack = createStackNavigator();

const NavigationContainerWrapper: React.FC = () => {
  const theme = useTheme();
  // const screenOptions: StackNavigationOptions = {
  //   headerBackTitleVisible: false,
  //   headerShadowVisible: false,
  //   headerTintColor: 'red',
  //   headerShown: true,
  //   headerTitleAlign: 'center',
  //   headerTitleContainerStyle: {
  //     maxWidth: '80%',
  //   },
  //   headerLeft: () => <NavigationBackButton />,
  //   headerStyle: {
  //     backgroundColor: theme.colors.background,
  //   },
  //   headerTitleStyle: {
  //     color: theme.colors.onPrimary,
  //     fontWeight: 'bold',
  //     textAlignVertical: 'center',
  //     fontSize: theme.fonts.titleSmall.fontSize,
  //   },
  // };

  // const renderMainHeader = () => (props: StackHeaderProps) => (
  //   <SafeAreaView
  //     style={[
  //       styles.headerContainer,
  //       {
  //         backgroundColor: theme.colors.background,
  //       },
  //     ]}>
  //     <Text style={styles.headerText}>{props.options.title}</Text>
  //     <L2IconButton
  //       // onPress={() => props.navigation.navigate(Routes.Settings)}
  //       style={styles.settingsIcon}
  //       icon="cog"
  //     />
  //     <L2IconButton
  //       style={styles.profileIcon}
  //       // onPress={() => props.navigation.navigate(Routes.Profile)}
  //       icon="account"
  //     />
  //   </SafeAreaView>
  // );

  return (
    <NavigationContainer linking={linking} ref={navigationRef} theme={theme.dark ? DarkTheme : LightTheme}>
      {/* <StatusBar backgroundColor={theme.colors.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
      <Stack.Navigator
        initialRouteName={Routes.WelcomeScreen}
        // screenOptions={{
        //   ...screenOptions,
        //   header: renderMainHeader(),
        // }}
      >
        <Stack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
      </Stack.Navigator>
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
