import React, {FC} from 'react';
import {Button} from 'react-native-paper';

interface L2ButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'primary' | 'secondary' | 'link';
  children: React.ReactNode;
}

const modalMap = {
  primary: 'contained',
  secondary: 'contained-tonal',
  link: 'text',
};

const L2Button: FC<L2ButtonProps> = props => {
  const {variant = 'primary', children, ...restProps} = props;
  return (
    <Button mode={modalMap[variant] as 'contained' | 'contained-tonal' | 'text'} {...restProps}>
      {children}
    </Button>
  );
};

export default L2Button;
