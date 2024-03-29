import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '../utils/constants';

// Request Interceptor Setting -------------------------------------------
const reqConfigInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  console.log(`[Requesting] [${config.method?.toUpperCase()}] ${config.url}`);
  return config;
};

const reqErrorInterceptor = (error: any): Promise<any> => {
  // request error
  console.log(`[ReqError] ${error}`);
  return Promise.reject(error);
};

// Response Interceptor Setting -------------------------------------------
const resConfigInterceptor = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const resErrorInterceptor = (error: any): Promise<any> => {
  const data = error?.response?.data;
  const status = error?.response?.status;
  const config = error?.response?.config;
  const method = config?.method;
  const url = config?.url;

  switch (status) {
    case 400:
      console.error('BadRequest', `[ResError] ${method?.toUpperCase()} ${url} ${data}`);
      break;
    case 401:
      console.error('Unauthenticated', `[ResError] ${method?.toUpperCase()} ${url} ${data}`);
      break;
    case 404:
      console.error('NotFound', `[ResError] ${method?.toUpperCase()} ${url} ${data}`);
      break;
    default:
      console.error('InternalError', `[ResError] ${method?.toUpperCase()} ${url} ${data}`);
      break;
  }

  return Promise.reject(error);
};

const responseBody = <T>(response: AxiosResponse<T>): any => response.data;

// Axios defaults ------------------------------------------------
export const axiosInstance = (token?: string, timeout?: number) => {
  // create instance
  const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: timeout,
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: token ? true : false,
  });

  // set interceptors
  instance.interceptors.request.use(reqConfigInterceptor, reqErrorInterceptor);
  instance.interceptors.response.use(resConfigInterceptor, resErrorInterceptor);

  return instance;
};

// Request & methods def ---------------------------------------
export const request = (token?: string) => {
  return {
    get: <T>(url: string) => axiosInstance(token, 3000).get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}, _config?: InternalAxiosRequestConfig<any> | undefined) =>
      axiosInstance(token, 3000)
        .post<T>(url, body, (_config = undefined))
        .then(responseBody),
    put: <T>(url: string, body: {}, _config?: InternalAxiosRequestConfig<any> | undefined) =>
      axiosInstance(token, 3000)
        .put<T>(url, body, (_config = undefined))
        .then(responseBody),
    patch: <T>(url: string, body: {}, _config?: InternalAxiosRequestConfig<any> | undefined) =>
      axiosInstance(token, 3000)
        .patch<T>(url, body, (_config = undefined))
        .then(responseBody),
    delete: <T>(url: string, _config?: InternalAxiosRequestConfig<any> | undefined) =>
      axiosInstance(token, 3000)
        .delete<T>(url, (_config = undefined))
        .then(responseBody),
  };
};

export const imgRequest = (token?: string) => {
  return {
    post: <T>(url: string, body: {}, _config?: InternalAxiosRequestConfig<any> | undefined) =>
      axiosInstance(token, 10000)
        .post<T>(url, body, (_config = undefined))
        .then(responseBody),
  };
};
