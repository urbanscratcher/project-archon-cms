import { request } from './axiosSetting';

export type SignInReq = {
  email: string;
  password: string;
};

// const authConfig: InternalAxiosRequestConfig<any> = undefined;

const authApi = {
  signin: (data: SignInReq) => request.post<SignInReq>('/auth', data),
};

// const users = {
//   list: () => request.get<User[]>('/users'),
//   details: (id: string) => request.get<User>(`/users/${id}`),
//   create: (data: User) => request.post<User>('/users', data),
// };

export default authApi;
