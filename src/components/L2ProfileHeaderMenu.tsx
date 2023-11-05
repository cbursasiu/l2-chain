import * as React from 'react';
import {View} from 'react-native';
import {Divider, Menu, useTheme} from 'react-native-paper';
import L2IconButton from './L2IconButton';
import {QueryClient, useMutation} from '@tanstack/react-query';
import {queryVariants} from '../api/queryConfig';
import {useStore} from '../stores/store';
import {deleteTokensToLocalStorage} from '../stores/localStorage';
import {navigate} from '../services/navigationServices';
import {Routes} from '../routes/routes';

const L2ProfileHeaderMenu: React.FC = () => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const setLoggedIn = useStore(state => state.setLoggedIn);
  const queryClient = new QueryClient();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const localLogout = async () => {
    await deleteTokensToLocalStorage();
    setLoggedIn(false);
    queryClient.removeQueries();
    navigate(Routes.WelcomeScreen);
    console.log('logout onSettled');
  };

  const {mutateAsync: mutateLogout} = useMutation({
    mutationFn: queryVariants.logout.queryFunction,
    onSuccess: () => {
      console.log('logout onSuccess');
    },
    onError: () => {
      console.log('logout onError');
    },
    onSettled: localLogout,
  });

  const {mutateAsync: mutateDelete} = useMutation({
    mutationFn: queryVariants.deleteUser.queryFunction,
    onSuccess: () => {
      console.log('delete onSuccess');
    },
    onError: () => {
      console.log('delete onError');
    },
    onSettled: localLogout,
  });

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={<L2IconButton icon="account" onPress={openMenu} />}>
        <Menu.Item leadingIcon="logout" onPress={() => mutateLogout()} title="Logout" />
        <Divider />
        <Menu.Item
          titleStyle={{color: theme.colors.error}}
          rippleColor={theme.colors.error}
          leadingIcon="delete-alert-outline"
          onPress={() => mutateDelete()}
          title="Delete account"
        />
      </Menu>
    </View>
  );
};

export default L2ProfileHeaderMenu;
