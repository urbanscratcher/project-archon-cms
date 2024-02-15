import { request } from './axiosSetting';

const avatarApi = {
  upsert: (accessToken: string, formData: any) => request(accessToken).post(`/avatars`, formData),
  remove: (accessToken: string) => request(accessToken).delete('/avatars'),
};

export default avatarApi;
