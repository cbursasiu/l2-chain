// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import L2Screen from '../components/layout/L2Screen';
// import {Routes} from '../routes/routes';
// import {RouteParams} from '../../types';
import {View} from 'react-native';
import L2Text from '../components/L2Text';
import {QueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {queryVariants} from '../api/queryConfig';
import {TextInput} from 'react-native-paper';
import L2IconButton from '../components/L2IconButton';

// type RoutePropType = StackNavigationProp<RouteParams, Routes.DashboardScreen>;

const DashboardScreen: React.FC = () => {
  const [currentCups, setCurrentCups] = React.useState(0);
  // const navigation = useNavigation<RoutePropType>();
  const queryClient = new QueryClient();
  const {data, isLoading} = useQuery({
    staleTime: Infinity,
    queryKey: [queryVariants.getLiquid.queryKey],
    queryFn: () => queryVariants.getLiquid.queryFunction(new Date(new Date().setHours(0, 0, 0, 0))),
  });

  const {mutateAsync: addLiquidEntry} = useMutation({
    mutationFn: () =>
      queryVariants.addLiquidEntry.queryFunction({
        name: 'pepsi',
        quantity: 1,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
      }),
    onSuccess: () => {
      console.log('logout onSuccess');
    },
    onError: () => {
      console.log('logout onError');
    },
    onMutate: () => {
      console.log('addLiquidEntry onMutate');
    },
    onSettled: () => {},
  });

  const {mutateAsync: updateLiquidEntry} = useMutation({
    mutationFn: () =>
      queryVariants.updateLiquidEntry.queryFunction({
        name: 'pepsi',
        quantity: 1,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        id: data && data[0] ? data[0].id : 0,
      }),
    onSuccess: () => {
      console.log('updateLiquidEntry onSuccess');
    },
    onError: () => {
      console.log('updateLiquidEntry onError');
    },
    onSettled: () => {},
  });

  const addCup = () => {
    if (data && data[0]) {
      updateLiquidEntry();
    } else {
      addLiquidEntry().then(() => {
        queryClient.invalidateQueries({queryKey: [queryVariants.getLiquid.queryKey]});
      });
    }
  };

  let pepsiCups: number = 0;
  if (!isLoading && data) {
    console.log(']]]]]]]]]]]]]]]]]]]]', data);
    data.forEach(liquid => {
      if (liquid.name === 'pepsi' && liquid.quantity) {
        pepsiCups += liquid.quantity;
      }
    });
    if (currentCups !== pepsiCups) {
      setCurrentCups(pepsiCups);
    }
  }
  // const cups = data?.reduce(
  //   (previousValue, currentValue) => {
  //     console.log('reducer ', currentValue, previousValue);
  //     previousValue.quantity += currentValue?.quantity ? currentValue.quantity : 0;
  //     return previousValue;
  //   },
  //   {quantity: 0, name: 'pepsi'},
  // ).quantity;
  // console.log('++++++++++++++++++' + data);
  return (
    <L2Screen noHorizontalMargin={true}>
      <View>
        <L2Text>Soda Cups</L2Text>
        {isLoading ? (
          <L2Text>Loading...</L2Text>
        ) : (
          <L2Text>
            {data
              ?.reduce(
                (previousValue: {quantity: number}, currentValue: {quantity: number}) => {
                  previousValue.quantity += currentValue?.quantity ? currentValue.quantity : 0;
                  return previousValue;
                },
                {quantity: 0, name: 'pepsi'},
              )
              .quantity?.toString()}
          </L2Text>
        )}
        {/* <TextInput value={currentCups.toString()} /> */}
        <L2IconButton icon="plus" onPress={addCup} />
      </View>
    </L2Screen>
  );
};

// const styles = StyleSheet.create({
//   viewContainer: {
//     margin: 20,
//     flex: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   flex1: {
//     flex: 1,
//     flexGrow: 1,
//   },
// });

export default DashboardScreen;
