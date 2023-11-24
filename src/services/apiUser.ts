import { request } from './axiosSetting';

const userApi = {
  getList: () => request.get('/users'),
};

export default userApi;
