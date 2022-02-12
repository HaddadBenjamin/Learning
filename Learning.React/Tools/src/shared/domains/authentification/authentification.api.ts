/* eslint-disable camelcase */
import axios from 'axios';
import qs from 'qs';
import LoginActionPayload, { IGetRefreshTokenPayload } from './authentification.model';
import { IJwtToken } from './authentification.state';
import LOGIN_ENDPOINT, {GET_REFRESH_TOKEN_ENDPOINT} from "./authentification.constant";

const login = async ({ userName, password } : LoginActionPayload) : Promise<IJwtToken> =>
  (await axios.get(`${LOGIN_ENDPOINT}?${qs.stringify({ userName, password })}`)).data;

export default login;

export const getRefreshToken = async ({ refreshToken } : IGetRefreshTokenPayload) : Promise<IJwtToken> =>
  (await axios.get(`${GET_REFRESH_TOKEN_ENDPOINT}?${qs.stringify({ refreshToken })}`)).data
