import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {deleteTokensToLocalStorage, getTokensFromLocalStorage, saveTokensToLocalStorage} from '../stores/localStorage';

const ENABLE_LOGGING = true;

const LOG_REQUESTS = __DEV__ ? ENABLE_LOGGING : false;

export const API_URL = 'https://bfit.l2-apis.eu';
// export const API_URL = 'http://localhost:3000';

const refreshTokens = async (store: any, originalRequest?: InternalAxiosRequestConfig<any>) => {
  const tokens = await getTokensFromLocalStorage();
  console.log('Refreshing tokens: ', JSON.stringify(tokens));
  if (tokens?.refreshToken && originalRequest?.url !== '/auth/refresh') {
    setAuthorizationHeader(tokens.refreshToken);
    try {
      const response = await axios.get('/auth/refresh');
      const {accessToken, refreshToken} = response.data;
      console.log('Tokens refreshed - saving to local storage');
      saveTokensToLocalStorage({accessToken, refreshToken});
      setAuthorizationHeader(accessToken);
      store.setLoggedIn(true);
      if (originalRequest !== undefined) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios.request(originalRequest);
      }
    } catch (err) {
      store.setLoggedIn(false);
      setAuthorizationHeader(undefined);
      deleteTokensToLocalStorage();
      console.log('Error refreshing token', err);
      return Promise.reject(err);
    }
  } else {
    if (originalRequest?.url === '/auth/refresh') {
      store.setLoggedIn(false);
      deleteTokensToLocalStorage();
      setAuthorizationHeader(undefined);
      console.log('refresh token expired, logging out');
    }
  }
};

export async function initApi(store: any) {
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.delete['Content-Type'] = 'application/json';

  clearInterceptors();

  axios.interceptors.request.use(
    async requestConfig => {
      logRequest(requestConfig);
      return requestConfig;
    },
    async (error: AxiosError) => {
      console.warn(`Request error (${error?.config?.url})`);
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      logResponse(response);
      return response;
    },
    async (error: AxiosError) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.log('Bad request', JSON.stringify(error.response.data));
            break;
          case 401:
            console.log('Unauthorized request', JSON.stringify(error.response.data));
            const originalRequest = error.config;
            refreshTokens(store, originalRequest);
            break;
          case 403:
            console.log('Forbidden request', JSON.stringify(error.response.data));
            break;
          case 404:
            console.log('Not found', JSON.stringify(error.response.data));
            break;
          case 500:
            console.log('Internal server error', JSON.stringify(error.response.data));
            break;
          default:
            console.log('Unhandled error', JSON.stringify(error.response.data));
            break;
        }
        logResponseError(error);
        return Promise.reject(error);
      }

      if (error.request) {
        console.warn('No response received from the server. Probably a network issue.', JSON.stringify(error.request));
      } else if (error.code === 'ERR_CANCELED') {
        console.log('Request was canceled');
      } else {
        console.warn('Error setting up the request:', error.message);
      }
      return Promise.reject(error);
    },
  );

  refreshTokens(store);
}

function clearInterceptors() {
  // @ts-ignore
  axios.interceptors.request.clear();
  // @ts-ignore
  axios.interceptors.response.clear();
}

export function setAuthorizationHeader(token: string | undefined) {
  console.log('setAuthorizationHeader', token);
  axios.defaults.headers.common.Authorization = 'Bearer ' + token;
}

export async function updateAuthorizationHeader(token: string | undefined) {
  setAuthorizationHeader(token);
}

function logRequest(requestConfig: AxiosRequestConfig) {
  if (!LOG_REQUESTS) {
    return;
  }
  console.log('===== SENT API REQUEST =====', Date());
  console.log(`TO: ${requestConfig.baseURL}${requestConfig.url}`);
  console.log(`METHOD:${requestConfig.method}`);
  console.log(`HEADERS:${JSON.stringify(requestConfig.headers)}`);
  if (requestConfig.method?.toLowerCase() === 'get') {
    console.log(`PARAMS:${JSON.stringify(requestConfig.params)}`);
  } else {
    console.log(`BODY:${JSON.stringify(requestConfig.data)}`);
  }
}

function logResponse(response: AxiosResponse) {
  if (!LOG_REQUESTS) {
    return;
  }
  console.log('===== RESPONSE API REQUEST =====', Date());
  console.log(`FROM: ${response.request.responseURL}`);
  console.log(`BODY:${JSON.stringify(response.data)}`);
}

function logResponseError(error: AxiosError) {
  const statusCode = error.response?.status || 'API Error';
  const requestUrl = error.request?.responseURL;
  const responseData = error.response?.data;
  const {data: requestData = ''} = error?.config!;

  if (LOG_REQUESTS) {
    console.log(`===== ${statusCode} API ERROR RESPONSE =====`, Date());
    console.log(`FROM: ${requestUrl} `);
    console.log(`REQUEST_BODY:${JSON.stringify(requestData)}`);
    console.log(`RESPONSE_BODY:${JSON.stringify(responseData)}`);
  }
}
