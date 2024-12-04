import { API_ADD_CAR, API_BASE_URL, API_SIGNIN } from "@/constants/api";
import { getErrorMessage, postRequest } from "./utils";
import { ICarRequest, ILoginRequest, ILoginResponse } from "./service.types";

export const signinService = async (
  data: ILoginRequest
): Promise<ILoginResponse> => {
  try {
    const resp = await postRequest(API_BASE_URL + API_SIGNIN, data);
    return { ...resp.data };
  } catch (err: any) {
    throw new Error(getErrorMessage(err.response.data));
  }
};


export const addCarsService = async (
  data: ICarRequest
): Promise<any> => {
  try {
    const resp = await postRequest(API_BASE_URL + API_ADD_CAR, data);
    return { ...resp.data };
  } catch (err: any) {
    throw new Error(getErrorMessage(err.response.data));
  }
};
