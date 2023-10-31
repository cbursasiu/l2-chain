import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import L2Screen from '../components/layout/L2Screen';
import {Routes} from '../routes/routes';
import {RouteParams} from '../routes/types';
import {Animated, Linking, Platform, StyleSheet} from 'react-native';
import {View} from 'react-native';
import L2Button from '../components/L2Button';
import L2Text from '../components/L2Text';
import WebView from 'react-native-webview';
import LottieView from 'lottie-react-native';
import {setAuthorizationHeader} from '../api/api';
import {useStore} from '../stores/store';
import {saveTokensToLocalStorage} from '../stores/localStorage';

type RoutePropType = StackNavigationProp<RouteParams, Routes.WelcomeScreen>;

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [uri, setURL] = useState('');
  const store = useStore();

  const loginGoogleUser = () => {
    setURL(`https://bfit.l2-apis.eu/auth/google`);
  };

  const handleOpenURL = useCallback((url: string) => {
    console.log('handleOpenURL', url);
    const userData = decodeURI(url).match(/accessToken=([^#]+)\/refreshToken=([^#]+)\/email=([^#]+)\/newUser=([^#]+)/);
    if (userData) {
      const JWTS = {
        accessToken: userData[1],
        refreshToken: userData[2],
      };
      console.log('userData', JWTS);
      setURL('');
      navigation.navigate(Routes.DashboardScreen);
      setAuthorizationHeader(JWTS.accessToken);
      saveTokensToLocalStorage(JWTS);
      store.setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', url => handleOpenURL(url.url));
    Linking.getInitialURL().then((url: any) => {
      if (url) {
        handleOpenURL(url);
      }
    });
    return () => {
      console.log('remove listener ', Linking.listenerCount('url'));
    };
  }, [handleOpenURL]);

  return (
    <L2Screen noHorizontalMargin={true}>
      {uri !== '' ? (
        <View style={[styles.flex1]}>
          <WebView
            userAgent={
              Platform.OS === 'android'
                ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
                : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
            }
            source={{uri}}
          />
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <View>
            <L2Text variant="displayMedium">Streak Guardian</L2Text>
          </View>
          <LottieView style={{flex: 1, width: '100%'}} source={require('../assets/lottie/chain.json')} autoPlay loop />

          <L2Button style={{width: '100%'}} icon="google" variant="primary" onPress={loginGoogleUser}>
            Continue with Google
          </L2Button>
        </View>
      )}
    </L2Screen>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    margin: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
    flexGrow: 1,
  },
});

export default WelcomeScreen;
