import Vue from 'vue';
import store from '@/store';
import VueI18n from 'vue-i18n';
// element-ui locale
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
// custom locale
import enStrings from './en/index';
import zhStrings from './zh/index';

Vue.use(VueI18n);

const strings = {
  zh: {
    ...zhLocale,
    ...zhStrings,
  },
  en: {
    ...enLocale,
    ...enStrings,
  },
};

const i18n = new VueI18n({
  locale: store.state.lang || 'en',
  messages: strings,
});

export { i18n, strings };

