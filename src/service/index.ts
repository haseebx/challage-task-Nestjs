import { API_SIGNIN } from "@/constants/api";
import { getErrorMessage, postRequest } from "./utils";
import { ILoginRequest, ILoginResponse } from "./service.types";


export const signinService = async (
  data: ILoginRequest
): Promise<ILoginResponse> => {
  try {
    const resp = await postRequest(API_SIGNIN, data);
    return { ...resp.data };
  } catch (err: any) {
    throw new Error(getErrorMessage(err.response.data));
  }
};
