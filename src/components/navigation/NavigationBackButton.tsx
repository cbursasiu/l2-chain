import React from 'react';
import L2Button from '../L2Button';
import {goBack} from '../../services/navigationServices';
import {Text} from 'react-native-paper';
import L2Text from '../L2Text';

const GoBackNavigationHeaderButton = () => {
  return (
    <L2Button variant="primary" icon="arrow-left" onPress={goBack}>
      <L2Text>&ldquo;&rdquo;</L2Text>
    </L2Button>
  );
};

export default GoBackNavigationHeaderButton;
