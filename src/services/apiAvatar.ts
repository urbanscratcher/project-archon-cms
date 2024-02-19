import { request } from './axiosSetting';

const avatarApi = {
  upsert: (accessToken: string, formData: any) => request(accessToken).post(`/imgs/avatars`, formData),
  remove: (accessToken: string) => request(accessToken).delete('/imgs/avatars'),
};

export default avatarApi;
