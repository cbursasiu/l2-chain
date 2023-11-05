import React from 'react';
import {goBack} from '../../services/navigationServices';
import L2IconButton from '../L2IconButton';

const GoBackNavigationHeaderButton = () => {
  return <L2IconButton icon="arrow-left" onPress={goBack} />;
};

export default GoBackNavigationHeaderButton;
