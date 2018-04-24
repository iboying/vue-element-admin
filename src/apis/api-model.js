import engine from '@/plugins/httpClient';

export default {
  index(currentPage, perPage = 10) {
    return engine.get('acticles', {
      per_page: perPage,
      current_page: currentPage,
    });
  },
};
