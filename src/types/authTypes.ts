import { ITokenPayload } from "./tokenType";

export interface IRegistration {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse extends ITokenPayload {
  accessToken?: string;
  refreshToken?: string;
}
