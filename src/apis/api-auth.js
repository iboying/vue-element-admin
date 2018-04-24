import engine from '@/plugins/httpClient';

export default {
  logout() {
    return engine.delete('logout');
  },
};
