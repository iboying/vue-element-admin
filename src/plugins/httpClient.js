import axios from 'axios';
import store from '@/store';
import router from '@/router';
import qs from 'qs';
import { Message } from 'element-ui';

const instance = axios.create({
  baseURL: process.env.DOMAIN,
  paramsSerializer(params) {
    return qs.stringify(params, {
      encode: true,
      arrayFormat: 'brackets',
      skipNulls: true,
    });
  },
});

instance.interceptors.request.use((config) => {
  store.commit('SET_LOADING', true);
  return {
    ...config,
    headers: {
      Accept: 'application/json',
      'User-Token': store.state.token,
    },
  };
}, (error) => {
  store.commit('SET_LOADING', false);
  Message.error(error);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  store.commit('SET_LOADING', false);
  return response;
}, (error) => {
  store.commit('SET_LOADING', false);
  if (error.response.status === 401) {
    router.replace('/auth/login');
  }
  return Promise.reject(error);
});

export default instance;
