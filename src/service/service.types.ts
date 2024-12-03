export interface IRequestBody {
  [string: string]: string | undefined;
}

export interface ILoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
}