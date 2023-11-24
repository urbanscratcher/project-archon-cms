import { request } from './axiosSetting';

export type SignInReq = {
  email: string;
  password: string;
};

const authApi = {
  signin: (data: SignInReq) => request.post<SignInReq>('/auth', data),
};

export default authApi;
