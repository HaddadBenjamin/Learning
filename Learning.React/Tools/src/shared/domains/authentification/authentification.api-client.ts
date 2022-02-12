/* eslint-disable no-underscore-dangle, no-param-reassign, @typescript-eslint/ban-ts-comment */
import axios, { AxiosRequestConfig } from 'axios';
import store from '../global-state/global-state.store';
import { getRefreshToken } from './authentification.api';
import {
  getRefreshTokenFailedAction,
  getRefreshTokenRequestAction,
  getRefreshTokenSuccessAction,
} from './authentification.action';
import LOGIN_ENDPOINT from './authentification.constant';
import { getAuthentificationFromLocalStorage } from './authentification.local-storage';
import { IJwtToken } from './authentification.state';

const selectJwtToken = () : IJwtToken | undefined => (store.getState()?.authentification?.parsedAccessToken
  ? store.getState()?.authentification?.jwtToken : getAuthentificationFromLocalStorage().jwtToken);
const selectAccessToken = () : string | undefined => selectJwtToken()?.access_token;
const selectRefreshToken = () : string | undefined => selectJwtToken()?.refresh_token;

const authenticatedApiClient = axios.create();

authenticatedApiClient.interceptors.request.use((requestConfiguration : AxiosRequestConfig) => {
  const accessToken = selectAccessToken();
  if (accessToken) {
    // @ts-ignore
    // Cette ligne peut causer des erreurs CORS
    requestConfiguration.headers.Authorization = `Bearer ${accessToken}`;
  }
  return requestConfiguration;
},
(error) => Promise.reject(error));

authenticatedApiClient.interceptors.response.use((axiosResponse) => axiosResponse,
  async (previousError) => {
    const previousApiClientConfiguration = previousError.config;
    const shouldGetRefreshToken = !previousApiClientConfiguration.url.includes(`${process.env.API_ACCOUNT}${LOGIN_ENDPOINT}`)
      && previousError.response?.status === 401
      && !previousApiClientConfiguration._retry;

    if (shouldGetRefreshToken) {
      previousApiClientConfiguration._retry = true;

      try {
        store.dispatch(getRefreshTokenRequestAction());
        // eslint-disable-next-line
        const jwtToken = await getRefreshToken({ refresh_token: selectRefreshToken()! });
        store.dispatch(getRefreshTokenSuccessAction(jwtToken));

        return authenticatedApiClient(previousApiClientConfiguration);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error : any) {
        store.dispatch(getRefreshTokenFailedAction(error.message));

        return Promise.reject(error);
      }
    }

    return Promise.reject(previousError);
  });

export default authenticatedApiClient;