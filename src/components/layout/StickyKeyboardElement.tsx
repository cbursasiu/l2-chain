import React, {useRef} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useKeyboardHandler} from 'react-native-keyboard-controller';
import Animated, {StyleProps, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Platform} from 'react-native';

interface StickyKeyboardElementProps {
  children: React.ReactNode;
  containerStyle?: StyleProps;
}

const StickyKeyboardElement: React.FC<StickyKeyboardElementProps> = props => {
  const {children, containerStyle} = props;
  const initialPosition = useSharedValue(0);
  const heightValue = useSharedValue(0);
  const containerRef = useRef<Animated.View>(null);
  const {height: screenHeight} = useWindowDimensions();
  console.log('screenHeight', screenHeight);
  useKeyboardHandler(
    {
      onMove: e => {
        'worklet';
        heightValue.value = Math.max(0, e.height - (initialPosition?.value || 0));
      },
      onInteractive: e => {
        'worklet';
        heightValue.value = Math.max(0, e.height - (initialPosition?.value || 0));
      },
    },
    [],
  );
  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{translateY: -heightValue.value}],
    }),
    [],
  );

  return (
    <Animated.View
      ref={containerRef}
      onLayout={_event => {
        containerRef.current?.measureInWindow((_x, y, _width, height) => {
          console.log('onLayout ', y, height);
          initialPosition.value =
            Platform.OS === 'android' ? screenHeight - y - height - 24 : screenHeight - y - height;
        });
      }}
      style={[styles.container, containerStyle, scrollViewStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default StickyKeyboardElement;
