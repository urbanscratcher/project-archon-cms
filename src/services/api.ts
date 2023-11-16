import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '../utils/constants';

export interface SignIn {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
}

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use((config): InternalAxiosRequestConfig => {
  // set token headers
  return config;
});

axios.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  (error: AxiosError): Promise<AxiosError> => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;
      case 401:
        console.error('unauthorised');
        break;
      case 404:
        console.error('/not-found');
        break;
      case 500:
        console.error('/server-error');
        break;
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>): any => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
};

const auth = {
  signin: (data: SignIn) => request.post<SignIn>('/auth', data),
};

const users = {
  list: () => request.get<User[]>('/users'),
  details: (id: string) => request.get<User>(`/users/${id}`),
  create: (data: User) => request.post<User>('/users', data),
};

const api = {
  auth,
  users,
};

export default api;
