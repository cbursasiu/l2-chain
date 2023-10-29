import * as React from 'react';
import {ReactNode} from 'react';
import {SafeAreaView, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

interface ScreenProps {
  style?: StyleProp<ViewStyle>;
  noHorizontalMargin?: boolean;
  children: ReactNode;
}

const L2Screen: React.FC<ScreenProps> = ScreenProps => {
  const {style, children, noHorizontalMargin: noMargin = false} = ScreenProps;
  const theme = useTheme();
  console.log('render L2Screen 2 noMargin:', noMargin);
  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingTop: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});

export default L2Screen;
