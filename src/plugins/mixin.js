import Vue from 'vue';

Vue.mixin({
  methods: {
    onConfirm(message, callback, mType = 'warning') {
      const classes = {
        warning: 'el-button--danger',
        info: 'el-button--primary',
        error: 'el-button--danger',
        success: 'el-button--success',
      };
      this.$confirm(message, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        confirmButtonClass: classes[mType],
        type: mType,
      }).then(() => {
        callback();
      }).catch(() => {
      });
    },
  },
});
