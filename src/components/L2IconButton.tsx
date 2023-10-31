import React, {FC} from 'react';
import {Button, IconButton} from 'react-native-paper';

const L2IconButton: FC<React.ComponentProps<typeof IconButton>> = props => {
  return <IconButton {...props} />;
};

export default L2IconButton;
