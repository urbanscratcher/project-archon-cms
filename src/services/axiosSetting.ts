import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '../utils/constants';

// Axios global defaults ------------------------------------------------
export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 3000,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor ----------------------------------------------------
const reqConfigInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // before request
  console.log(`[Req] [${config.method?.toUpperCase()}] ${config.url}`);
  return config;
};

const reqErrorInterceptor = (error: any): Promise<any> => {
  // request error
  console.log(`[ReqError] ${error}`);
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(reqConfigInterceptor, reqErrorInterceptor);

// Response Interceptor ----------------------------------------------------
const resConfigInterceptor = (res: AxiosResponse): AxiosResponse => {
  // before request
  console.log(`[Res]`);
  return res;
};

const resErrorInterceptor = (error: any): Promise<any> => {
  const data = error?.response?.data;
  const status = error?.response?.status;
  const config = error?.response?.config;
  const method = config?.method;
  const url = config?.url;
  const headers = config?.headers;

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

axiosInstance.interceptors.response.use(resConfigInterceptor, resErrorInterceptor);

const responseBody = <T>(response: AxiosResponse<T>): any => response.data;

// Request & methods def ---------------------------------------
export const request = {
  get: <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}, config?: InternalAxiosRequestConfig<any> | undefined) =>
    axiosInstance.post<T>(url, body, (config = undefined)).then(responseBody),
  put: <T>(url: string, body: {}, config?: InternalAxiosRequestConfig<any> | undefined) =>
    axiosInstance.put<T>(url, body, (config = undefined)).then(responseBody),
  patch: <T>(url: string, body: {}, config?: InternalAxiosRequestConfig<any> | undefined) =>
    axiosInstance.patch<T>(url, body, (config = undefined)).then(responseBody),
  delete: <T>(url: string, config?: InternalAxiosRequestConfig<any> | undefined) =>
    axiosInstance.delete<T>(url, (config = undefined)).then(responseBody),
};
