import { request } from './axiosSetting';

const topicApi = {
  getAllList: () => request().get('/topics'),
  create: (body: any, accessToken: string) => request(accessToken).post(`/topics`, body),
  delete: (idx: number, accessToken: string) => request(accessToken).delete(`/topics/${idx}`),
  updateName: (idx: number, body: any, accessToken: string) => request(accessToken).patch(`/topics/${idx}`, body),
  updateSequence: (body: any, accessToken: string) => request(accessToken).put(`/topics`, body),
};

export default topicApi;
