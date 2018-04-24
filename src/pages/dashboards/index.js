const index = r => require.ensure([], () => r(require('./Index.vue')), 'dashboards');

export default [{
  path: '/dashboards',
  name: 'dashboards_index',
  component: index,
  meta: {
    title: '数据面板',
  },
}];
