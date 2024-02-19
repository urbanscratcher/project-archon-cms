import { InsightsFilterSchema } from '../models/Insights';
import { QueryParam, getQueryStr } from '../models/QueryParam';
import { request } from './axiosSetting';

const insightApi = {
  create: (body: any, accessToken: string) => request(accessToken).post(`/insights`, body),
  getList: (params: QueryParam) => request().get(`/insights${getQueryStr(InsightsFilterSchema).parse(params)}`),
  getAllList: () => request().get('/insights'),
  getDetail: (idx: number) => request().get(`/insights/${idx}`),
  delete: (idx: number) => request().delete(`/insights/${idx}`),
  update: (idx: number, body: any, accessToken: string) => request(accessToken).patch(`/insights/${idx}`, body),
};

export default insightApi;
