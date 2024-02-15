import { request } from './axiosSetting';

const avatarApi = {
  upsert: (accessToken: string, formData: any) => request(accessToken).post(`/avatars`, formData),
  delete: (accessToken: string) => request(accessToken).get('/me'),
};

export default avatarApi;
