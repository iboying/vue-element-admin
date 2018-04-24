<script>
export default {
  name: 'AuthLayout',
};
</script>

<template lang="pug">
.login-layout
  router-view
</template>

<style lang="stylus" scoped>
.login-layout
  height 100%
  background url('/static/auth/login_bg.svg') #2b3137
  background-repeat no-repeat
  background-size cover
  background-position center
</style>
