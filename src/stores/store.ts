import {create} from 'zustand';

interface State {
  isLoggedIn: boolean;
  isApiInitialized: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const useStore = create<State>(set => ({
  isLoggedIn: false,
  isApiInitialized: false,
  setLoggedIn: (value: boolean) => set(state => ({...state, isLoggedIn: value})),
}));
