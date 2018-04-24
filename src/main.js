// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import ElementUI from 'element-ui';
import '@/element-variables.scss';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from '@/i18n';
import apis from '@/apis';

Vue.config.productionTip = false;

Vue.prototype.$apis = apis;
Vue.use(ElementUI, {
  i18n: (key, value) => i18n._t(key, value),
  size: 'small',
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
