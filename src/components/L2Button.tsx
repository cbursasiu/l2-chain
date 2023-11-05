import React, {FC} from 'react';
import {Button, useTheme} from 'react-native-paper';

interface L2ButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'primary' | 'secondary' | 'link' | 'outline' | 'noBackground' | 'danger';
  children: React.ReactNode;
}

const modalMap = {
  primary: 'contained',
  secondary: 'contained-tonal',
  outline: 'outlined',
  noBackground: 'text',
  link: 'text',
  danger: 'contained',
};

const L2Button: FC<L2ButtonProps> = props => {
  const theme = useTheme();
  const {variant = 'primary', children, ...restProps} = props;
  return variant === 'danger' ? (
    <Button mode="contained" buttonColor={theme.colors.errorContainer} textColor={theme.colors.error} {...restProps}>
      {children}
    </Button>
  ) : (
    <Button mode={modalMap[variant] as 'contained' | 'contained-tonal' | 'text'} {...restProps}>
      {children}
    </Button>
  );
};

export default L2Button;
