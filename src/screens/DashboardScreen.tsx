import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import L2Screen from '../components/layout/L2Screen';
import {Routes} from '../routes/routes';
import {RouteParams} from '../routes/types';
import {Animated, StyleSheet} from 'react-native';
import L2Text from '../components/L2Text';
import LottieView from 'lottie-react-native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.DashboardScreen>;

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  // const theme = useTheme();

  return (
    <L2Screen noHorizontalMargin={true}>
      <L2Text>HomeScreen</L2Text>
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

export default DashboardScreen;
