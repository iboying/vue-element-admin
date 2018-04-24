import Vue from 'vue';
import Router from 'vue-router';
// layouts
import applicationLayout from '@/layouts/ApplicationLayout';
import authLayout from '@/layouts/AuthLayout';
// resources
import auth from '@/pages/auth';
import dashboards from '@/pages/dashboards';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      component: authLayout,
      children: [
        ...auth,
      ],
    },
    {
      path: '/',
      component: applicationLayout,
      children: [
        ...dashboards,
      ],
    },
  ],
});

export default router;
