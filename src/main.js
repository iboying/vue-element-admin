// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import apis from '@/apis';
import { i18n } from '@/i18n';
// plugins
import '@/plugins/mixin';
import '@/plugins/utils';
// UI
import ElementUI from 'element-ui';
import '@/assets/stylesheets/element-variables.scss';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$config = process.env;
Vue.prototype.$apis = apis;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'mini',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App },
});
