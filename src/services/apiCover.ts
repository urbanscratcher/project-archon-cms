import { request } from './axiosSetting';

const coverApi = {
  create: (body: any, accessToken: string) => request(accessToken).post('/covers', body),
  updateMain: (idx: number, accessToken: string) => request(accessToken).patch(`/covers/${idx}`, {}),
  getAllList: () => request().get('/covers'),
  remove: (idx: number, accessToken: string) => request(accessToken).delete(`/covers/${idx}`),
};

export default coverApi;
