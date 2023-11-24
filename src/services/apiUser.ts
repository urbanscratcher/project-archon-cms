import { request } from './axiosSetting';

const userApi = {
  getList: () => request.get('/users'),
  getDetail: (idx: number) => request.get(`/users/${idx}`),
  delete: (idx: number) => request.delete(`/users/${idx}`),
  update: (idx: number, body: any) => request.patch(`/users/${idx}`, body),
};

// const users = {
//   list: () => request.get<User[]>('/users'),
//   details: (id: string) => request.get<User>(`/users/${id}`),
//   create: (data: User) => request.post<User>('/users', data),
// };

export default userApi;
