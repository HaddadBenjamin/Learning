/* eslint-disable @typescript-eslint/no-explicit-any */
interface LoginActionPayload {
  userName : string,
  password : string,
}

export interface IGetRefreshTokenPayload {
  refreshToken : string,
}

export default LoginActionPayload;
