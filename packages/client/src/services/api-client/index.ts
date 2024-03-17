import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { getAccessKey } from '@data';

import { rootStore } from '../root-store.ts';

class ApiClient {
  client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);

    this.client.interceptors.request.use((request) => {
      const accessToken = getAccessKey();

      request.headers['Authorization'] = `Bearer ${accessToken}`;
      return request;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const err = error as AxiosError;
        const { loginStore } = rootStore;

        if (err.response?.status === 401) {
          loginStore.setAuth(false);
        }
      },
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config).then(({ data }) => data);
  }

  post<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, body, config).then(({ data }) => data);
  }

  put<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, body, config).then(({ data }) => data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config).then(({ data }) => data);
  }
}

const apiClient = new ApiClient({ baseURL: 'http://localhost:3001' });

export { apiClient };
