import { request } from './axiosSetting';

const insightImgsApi = {
  imgUpsert: (accessToken: string, formData: any) => request(accessToken).post(`/imgs/insights`, formData),
  thumbnailUpsert: (accessToken: string, formData: any) => request(accessToken).post(`/imgs/thumbnails`, formData),
};

export default insightImgsApi;
