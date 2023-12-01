import { SignIn, SignUp } from '../models/Auth';
import { request } from './axiosSetting';

const authApi = {
  signin: (data: SignIn) => request().post<SignIn>('/auth', data),
  signup: (data: SignUp) => request().post<SignUp>('/users', data),
};

export default authApi;
