import axios from 'axios';
import {liquidsSchema} from './schemas';
import {liquidsList} from '../../types';
// import {refreshJWR} from './schemas';

export const queryVariants = {
  logout: {
    queryKey: 'logout',
    queryFunction: async () => {
      const response = await axios.post('auth/logout/');
      return response.status === 200;
    },
  },
  deleteUser: {
    queryKey: 'deleteUser',
    queryFunction: async () => {
      const response = await axios.delete('users');
      return response.status === 200;
    },
  },
  getLiquid: {
    queryKey: 'getLiquid',
    queryFunction: async (date: Date) => {
      console.log('//////////////////date', date);
      const response = await axios.get('liquids', {
        params: {
          date: date.toISOString(),
        },
      });
      // return response.data as liquidsList;
      console.log('aaaaaaaaaaaaa', response.data);
      const ret = liquidsSchema.parse(response.data);
      console.log('kkkkkkkkkkkk', ret);
      return ret;
    },
  },
  updateLiquidEntry: {
    queryKey: 'updateLiquidEntry',
    queryFunction: async (payload: {name: string; quantity: number; date: Date; id: number}) => {
      const response = await axios.put('liquids', payload);
      return response.status === 200;
    },
  },
  addLiquidEntry: {
    queryKey: 'addLiquidEntry',
    queryFunction: async (payload: {name: string; quantity: number; date: Date}) => {
      const response = await axios.post('liquids', payload);
      return response.status === 200;
    },
  },
};
