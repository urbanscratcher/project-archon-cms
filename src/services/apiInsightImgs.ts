import { imgRequest } from './axiosSetting';

const insightImgsApi = {
  imgUpsert: (accessToken: string, formData: any) => imgRequest(accessToken).post(`/imgs/insights`, formData),
  thumbnailUpsert: (accessToken: string, formData: any) => imgRequest(accessToken).post(`/imgs/thumbnails`, formData),
};

export default insightImgsApi;
