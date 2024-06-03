import axios, { AxiosError } from 'axios';
import { ApiError } from 'types/index';
import { readToken } from 'services/localStorage.service';

export const httpApi = axios.create({
  baseURL: '/api/',
});

httpApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${readToken()}`;
  return config;
});
httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    const { status, data } = error.response! as {
      status: number;
      data: { msg: string };
    };
    if (status === 401) {
      const alink = document.createElement('a');
      alink.href = '/auth/logout';
      alink.click();
    }
    throw new ApiError<ApiErrorData>(status, data.msg, data as ApiErrorData);
  }
  throw new ApiError<ApiErrorData>(error, 'Not handled');
});

export interface ApiErrorData {
  msg: string;
}
