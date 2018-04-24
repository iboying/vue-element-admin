const login = r => require.ensure([], () => r(require('./Login.vue')), 'group-auth');

export default [{
  path: '/auth/login',
  name: 'login',
  component: login,
  meta: {
    title: '登录',
  },
}];
