import React from 'react';
import L2Button from '../layout/L2Button';
import {goBack} from '../../services/navigationServices';
import {Text} from 'react-native-paper';

const GoBackNavigationHeaderButton = () => {
  return (
    <L2Button variant="primary" icon="arrow-left" onPress={goBack}>
      <Text>&ldquo;&rdquo;</Text>
    </L2Button>
  );
};

export default GoBackNavigationHeaderButton;
