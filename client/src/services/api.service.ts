import { AxiosError } from 'axios';

import { EResult, IResult } from '../models';

import axios from './axios.service';

const api = {
  get: async <T>(url: string): Promise<IResult<T>> => {
    try {
      const req = await axios.get(url);

      if (req.status === 200) {
        return { type: EResult.SUCCESS, value: req.data };
      }

      throw new Error(`Data fetching error -> ${url}`);
    } catch (_error) {
      return {
        type: EResult.ERROR,
        value: _error as AxiosError,
      };
    }
  },
  post: async <T, R>(url: string, data: T): Promise<IResult<R>> => {
    try {
      const req = await axios.post(url, data);

      if (req.status === 200 || req.status === 201) {
        return { type: EResult.SUCCESS, value: req.data };
      }

      throw new Error(`Data fetching error -> ${url}`);
    } catch (_error) {
      return {
        type: EResult.ERROR,
        value: _error as AxiosError,
      };
    }
  },

  put: async <T, R>(url: string, id: string, data: T): Promise<IResult<R>> => {
    try {
      const req = await axios.put(`${url}?id=${id}`, data);

      if (req.status === 200 || req.status === 201) {
        return { type: EResult.SUCCESS, value: req.data };
      }

      throw new Error(`Data fetching error -> ${url}`);
    } catch (_error) {
      return {
        type: EResult.ERROR,
        value: _error as AxiosError,
      };
    }
  },

  delete: async <R>(url: string, id: string): Promise<IResult<R>> => {
    try {
      const req = await axios.delete(`${url}?id=${id}`);

      if (req.status === 200 || req.status === 201) {
        return { type: EResult.SUCCESS, value: req.data };
      }

      throw new Error(`Data fetching error -> ${url}`);
    } catch (_error) {
      return {
        type: EResult.ERROR,
        value: _error as AxiosError,
      };
    }
  },
};

export default api;
