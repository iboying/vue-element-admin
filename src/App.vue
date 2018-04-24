<template lang="pug">
#app
  router-view
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route() {
      document.title = this.$route.meta.title || 'Admin';
    },
  },
};
</script>

<style lang="stylus">
@import './assets/stylesheets/global.styl'

#app
  font-family PingFangSC-Regular, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  overflow auto
  height 100%
</style>
