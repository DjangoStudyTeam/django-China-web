import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { CacheUtil } from '../utils/CacheUtils';

const instance = axios.create({
  baseURL: '/api/v1',
  //   baseURL:
  //     process.env.UMI_ENV === 'productiion' ? `${API_SERVER}/api/v1` : '/api/v1/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
  const { authToken: token } = CacheUtil.getLoginInfo() || { authToken: null };
  if (token) {
    config!.headers!.Authorization = `Token ${token}`;
  } else {
    delete config!.headers!.Authorization;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
        return null;
      }
      CacheUtil.clearLoginInfo();
    }
    if (/^5\d{2}$/.test(error.response.status)) {
      window.location.href = '/500';
      return null;
    }

    return Promise.reject(error);
  },
);

export default instance;
