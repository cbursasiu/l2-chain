import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const navigate = (name: string, params?: any) => {
  navigationRef.current?.navigate(name, params);
};
