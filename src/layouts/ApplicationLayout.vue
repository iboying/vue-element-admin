<script>
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';

export default {
  name: 'ApplicationLayout',
  components: {
    Sidebar,
    Toolbar,
  },
  computed: {
    keepAliveInclude() {
      return [];
    },
    keepAliveExclude() {
      return [];
    },
  },
};
</script>

<template lang="pug">
el-container.application
  el-header.app-header
    toolbar
  el-container
    el-aside(width="initial").app-side
      sidebar
    el-main.app-main
      keep-alive(:include="keepAliveInclude", :exclude="keepAliveExclude")
        router-view
</template>

<style lang="stylus" scoped>
.application
  height 100%
  width 100%
  .app-header
    width 100%
    padding 0
    z-index 10
  .app-side
    display block
  .app-main
    position relative
    width 100%
    height 100%
    overflow auto
    padding 0
</style>
