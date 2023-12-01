import { QueryParam, getQueryStr } from '../models/QueryParam';
import { UsersFilter, UsersFilterSchema } from '../models/Users';
import { request } from './axiosSetting';

const userApi = {
  getList: (params: QueryParam<UsersFilter>) => request().get(`/users${getQueryStr(UsersFilterSchema).parse(params)}`),
  getAllList: () => request().get('/users'),
  getDetail: (idx: number) => request().get(`/users/${idx}`),
  delete: (idx: number) => request().delete(`/users/${idx}`),
  update: (idx: number, body: any, accessToken: string) => request(accessToken).patch(`/users/${idx}`, body),
  getMe: (accessToken: string) => request(accessToken).get('/me'),
};

export default userApi;
