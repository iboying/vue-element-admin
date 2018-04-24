<script>
export default {
  name: 'Login',
  data() {
    return {
      account: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入登录邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return valid;
        this.login();
        return true;
      });
    },
    async login() {
      try {
        const { data } = await this.$apis.auth.login(this.account);
        this.$store.commit('SET_TOKEN', data.token);
        const redirectPath = this.$route.query.redirect_path || '/';
        this.$router.push(redirectPath);
      } catch (error) {
        this.$message.warning('登录失败，请检查邮箱和密码是否正确！');
      }
    },
  },
};
</script>

<template lang="pug">
.form-container
  el-form(
    ref="form",
    :model="account",
    :rules="rules",
    label-width="100px",
    label-position="top",
    class="login-form"
  )
    .logo
    el-form-item(prop="email")
      el-input(v-model="account.email", placeholder="请输入管理员邮箱", type="email", auto-complete)
        template(slot="prepend")
          i.fa.fa-envelope
    el-form-item(prop="password")
      el-input(v-model="account.password", placeholder="请输入管理员密码", type="password", @keyup.enter.native="submitForm")
        template(slot="prepend")
          i.fa.fa-key
    el-form-item
      el-button#login-btn(@click="submitForm", :loading="$store.state.loading")
        | 登 录
</template>

<style lang="stylus" scoped>
minWidth = 360px

.form-container
  width 50%
  min-width minWidth
  height 100%
  float right
  display flex
  align-items center
  justify-content center
  .login-form
    box-sizing border-box
    width: minWidth
    height 330px
    padding 24px
    border-radius 10px
    background #fff
    .logo
      height 50px
      background url('/static/common/logo_dark.svg') no-repeat
      background-position center
      background-size contain
      margin-bottom 40px
    #login-btn
      width 100%
      margin-top 10px
      padding 12px 15px
      background-color #0F9D58
      border-color #0F9D58
      font-size 16px
      font-weight bold
      color #fff
      &:hover
        background-color #0D8A4D
    .fa
      font-size 16px
</style>
