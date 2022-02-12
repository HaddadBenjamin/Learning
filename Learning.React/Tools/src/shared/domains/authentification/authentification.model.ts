/* eslint-disable @typescript-eslint/no-explicit-any */
interface LoginActionPayload {
  userName : string,
  password : string,
}

export interface IGetRefreshTokenPayload {
  refresh_token : string,
}

export default LoginActionPayload;
