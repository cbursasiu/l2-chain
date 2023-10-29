import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import L2Screen from '../components/layout/L2Screen';
import {Routes} from '../routes/routes';
import {RouteParams} from '../routes/types';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const theme = useTheme();

  return (
    <L2Screen style={styles.container} noHorizontalMargin={true}>
      <Button mode="elevated" onPress={() => {}}>
        <Text>Login</Text>
      </Button>
      <View style={styles.viewContainer}></View>
    </L2Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewContainer: {
    width: '100%',
    marginBottom: 20,
    flex: 1,
  },
});

export default WelcomeScreen;
