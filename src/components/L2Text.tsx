import React, {FC} from 'react';
import {Text} from 'react-native-paper';

interface L2TextProp extends React.ComponentProps<typeof Text> {
  children: React.ReactNode;
}

const L2Text: FC<L2TextProp> = props => {
  const {children, ...restProps} = props;
  return <Text {...restProps}>{children}</Text>;
};

export default L2Text;
