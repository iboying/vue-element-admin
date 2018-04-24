import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';

const instance = axios.create({
  baseURL: process.env.DOMAIN,
  timeout: 3000,
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
  Message.error('错误啦');
  return Promise.reject(error);
});

export default instance;
