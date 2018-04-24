import Vue from 'vue';
import VueHtml5Editor from 'vue-html5-editor';
import store from '@/store';
import { Message } from 'element-ui';

Vue.use(VueHtml5Editor, {
  showModuleName: true,
  image: {
    sizeLimit: 2 * 1024 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    upload: {
      url: `${process.env.DOMAIN}admin/medias`,
      headers: store.getters.httpHeader,
      params: {
        type: 'image',
      },
      fieldName: 'media',
    },
    compress: {
      width: 1200,
      height: 1200,
      quality: 80,
    },
    uploadHandler(responseText) {
      const json = JSON.parse(responseText);
      if (!json.url) {
        Message.error('上传失败');
      }
      return json.url;
    },
  },
  hiddenModules: ['info'],
  language: 'zh-cn',
  i18n: {
    'zh-cn': {
      align: '对齐方式',
      image: '图片',
      list: '列表',
      link: '链接',
      unlink: '去除链接',
      table: '表格',
      font: '文字',
      'full screen': '全屏',
      text: '排版',
      eraser: '格式清除',
      info: '关于',
      color: '颜色',
      'please enter a url': '请输入地址',
      'create link': '创建链接',
      bold: '加粗',
      italic: '倾斜',
      underline: '下划线',
      'strike through': '删除线',
      subscript: '上标',
      superscript: '下标',
      heading: '标题',
      'font name': '字体',
      'font size': '文字大小',
      'left justify': '左对齐',
      'center justify': '居中',
      'right justify': '右对齐',
      'ordered list': '有序列表',
      'unordered list': '无序列表',
      'fore color': '前景色',
      'background color': '背景色',
      'row count': '行数',
      'column count': '列数',
      save: '确定',
      upload: '上传',
      progress: '进度',
      unknown: '未知',
      'please wait': '请稍等',
      error: '错误',
      abort: '中断',
      reset: '重置',
    },
  },
});
