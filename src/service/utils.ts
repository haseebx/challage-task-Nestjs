import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { REQUEST_HEADERS } from '../constants/api';
import { IRequestBody } from './service.types';

const getTokenHeader = () => {
  const extraHeaders: { authorization?: string } = {};
  let token = localStorage.getItem('token');
  if (token) {
    token = JSON.parse(token);
    extraHeaders['authorization'] = `Bearer ${token}`;
  }

  return extraHeaders;
};

export const postRequest = (url: string, body: IRequestBody | any, config?: AxiosRequestConfig) => {
  const extraHeaders = getTokenHeader();

  return axios.post(url, body, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...config?.headers
    }
  });
};

export const putRequest = (url: string, body: IRequestBody | any, config?: AxiosRequestConfig) => {
  const extraHeaders = getTokenHeader();

  return axios.put(url, body, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...config?.headers
    }
  });
};

export const getRequest = (url: string, params?: string | any, config?: AxiosRequestConfig) => {
  const extraHeaders = getTokenHeader();
  let strParams;
  if (typeof params === 'number') {
    strParams = params.toString();
  }
  let routeUrl = url;
  if (params && params.length > 0) {
    routeUrl = routeUrl + params;
  }
  if (strParams && strParams.length > 0) {
    routeUrl = routeUrl + strParams;
  }

  return axios.get(routeUrl, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...config?.headers,
      ...extraHeaders
    }
  });
};

export const deleteRequest = (url: string, params?: string | any, config?: AxiosRequestConfig) => {
  let routeUrl = url;
  if (params.length > 0) {
    routeUrl = routeUrl + params;
  }
  const extraHeaders = getTokenHeader();

  return axios.delete(routeUrl, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...config?.headers,
      ...extraHeaders
    }
  });
};

export const patchRequest = (
  url: string,
  body: IRequestBody | any,
  config?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();

  return axios.patch(url, body, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...config?.headers
    }
  });
};

export interface ErrorResponse {
  status?: string;
  message?: string;
  error?:string;
  detail?:string;
}

export const getErrorMessage = (json: ErrorResponse): string => {

  return json?.error || json?.message || json.detail || "Error while processing your request";
};
