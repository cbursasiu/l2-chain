import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your token types (modify it based on your actual token structure)
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const deleteTokensToLocalStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    console.log('Tokens deleted from local storage');
  } catch (error) {
    console.error('Error removing keys from local storage:', error);
    throw error;
  }
};

export const saveTokensToLocalStorage = async ({accessToken, refreshToken}: Tokens): Promise<void> => {
  try {
    await AsyncStorage.setItem('access_token', accessToken);
    await AsyncStorage.setItem('refresh_token', refreshToken);
    console.log('Tokens saved to local storage');
  } catch (error) {
    console.error('Error saving tokens to local storage:', error);
    throw error;
  }
};

export const saveAccessTokenToLocalStorage = async (accessToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('access_token', accessToken);
    console.log('Tokens saved to local storage');
  } catch (error) {
    console.error('Error saving tokens to local storage:', error);
    throw error;
  }
};

export const saveRefreshTokenToLocalStorage = async (refreshToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('refresh_token', refreshToken);
    console.log('Tokens saved to local storage');
  } catch (error) {
    console.error('Error saving tokens to local storage:', error);
    throw error;
  }
};

export const getTokensFromLocalStorage = async (): Promise<Tokens | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    const refreshToken = await AsyncStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
      return {accessToken, refreshToken};
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting tokens from local storage:', error);
    throw error as Error;
  }
};

export const getThemeFromLocalStorage = async (): Promise<string | null> => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    return theme;
  } catch (error) {
    console.error('Error getting theme from local storage:', error);
    throw error as Error;
  }
};

export const saveThemeToLocalStorage = async (theme: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('theme', theme);
    console.log('Theme saved to local storage');
  } catch (error) {
    console.error('Error saving theme to local storage:', error);
    throw error;
  }
};
