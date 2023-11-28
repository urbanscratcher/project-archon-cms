import { request } from './axiosSetting';

export type QueryParams = {
  filter?: any;
  sorts?: any;
  offset?: number;
  limit?: number;
};

const userApi = {
  getList: (params: QueryParams) => {
    const baseUri = '/users';
    const paramList = [];

    if (params?.filter) {
      const filterStr = JSON.stringify(params.filter);
      paramList.push(`filter=${filterStr}`);
    }

    // if (sorts) {
    //   params.push(`sorts=${sorts}`);
    // }

    if (params?.offset) {
      paramList.push(`offset=${params.offset}`);
    }

    if (params?.limit) {
      paramList.push(`limit=${params.limit}`);
    }

    const finalUri = paramList.length > 0 ? baseUri + '?' + paramList.join('&') : baseUri;

    return request().get(finalUri);
  },
  getAllList: () => request().get('/users'),
  getDetail: (idx: number) => request().get(`/users/${idx}`),
  delete: (idx: number) => request().delete(`/users/${idx}`),
  update: (idx: number, body: any, accessToken: string) => request(accessToken).patch(`/users/${idx}`, body),
  getMe: (accessToken: string) => request(accessToken).get('/me'),
};

export default userApi;
