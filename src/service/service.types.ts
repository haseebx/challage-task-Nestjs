export interface IRequestBody {
  [string: string]: string | undefined;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
}

export interface ICarRequest {
  carModel: string,
  price: number,
  phoneNumber: number,
  city: string,
  maxPictures: number,
  pictures: string[]
}
