<script>
export default {
  name: 'Toolbar',
  data() {
    return {
      langs: [{
        label: 'English',
        lang: 'en',
      }, {
        label: '中文',
        lang: 'zh',
      }],
    };
  },
  methods: {
    async logout() {
      const loading = this.$loading({ fullscreen: true, text: '正在退出...' });
      try {
        await this.$apis.auth.logout();
        this.$store.commit('SET_TOKEN', '');
        loading.close();
        this.$router.replace('/auth/login');
      } catch (error) {
        loading.close();
        this.$router.replace('/auth/login');
      }
    },
    toggleSideMenu() {
      this.$store.commit('TOGGLE_SIDE_MENU');
    },
    changeLang(lang) {
      if (this.$store.state.lang !== lang) {
        this.$store.commit('SET_LANG', lang);
        location.reload();
      }
    },
  },
};
</script>

<template lang="pug">
.nav-bar
  .brand
    button.btn.menu-btn(@click="toggleSideMenu")
      i.fa.fa-navicon
    img.logo(src="/static/common/logo.svg", alt="logo")
  ul.menus
    //- li.menu-item
    //-   el-dropdown
    //-     span.lang-text
    //-       | {{ $t(`components.toolbar.${$store.state.lang}`) }}
    //-       i.el-icon-arrow-down.el-icon--right
    //-     el-dropdown-menu(slot="dropdown")
    //-       el-dropdown-item(v-for="item in langs", :key="item.label", @click.native="changeLang(item.lang)")
    //-         | {{ item.label }}
    li.menu-item
      router-link.menu__item(to="/")
        i.fa.fa-bell
        .badge
    li.menu-item
      el-popover(
        ref="profile",
        placement="bottom-end",
        width="280",
        trigger="click")
        img.menu__item(src="/static/common/photo.jpeg", slot="reference")
        .profile
          img.photo(src="/static/common/photo.jpeg")
          .info
            p.info__item
              i.fa.fa-user
              | someone
            p.info__item
              i.fa.fa-envelope
              | someone@gmail.com
        el-button.float-right(type="warning" size="small", @click="logout")
          | 退 出

</template>

<style lang="stylus" scoped>
barHeight = 60px
bgColor = #2F2F2F
bgDarkColor = #1f1f1f

.nav-bar
  height barHeight
  background bgColor
  box-sizing border-box
  box-shadow 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28)
  display flex
  .brand
    width 200px
    height 100%
    flex-shrink 0
    line-height barHeight
    display inline-blcok
    .menu-btn
      color #fff
      line-height 1
      padding 6px
      border-radius 50%
      text-align center
      cursor pointer
      margin 12px 14px
      &:active
        background bgDarkColor
      .fa
        font-size 20px
        height 24px
        width 24px
        line-height 24px
    img.logo
      height 50%
      vertical-align middle
      display inline-blcok
  .menus
    box-sizing border-box
    list-style none
    text-align right
    width 100%
    padding 0 20px
    li.menu-item
      display inline-block
      position relative
      padding-top 15px
      vertical-align middle
      .menu__item
        position relative
        display inline-block
        height 30px
        width 30px
        line-height 30px
        margin-left 20px
        font-size 16px
        font-weight bold
        color #fff
        cursor pointer
        text-align center
        border-radius 50%
        &:hover, &:focus
          background bgDarkColor
        .badge
          position absolute
          top 2px
          right 2px
          height 6px
          width 6px
          border-radius 50%
          background red
          border 1px solid #fff

.profile
  display flex
  padding-bottom 10px
  margin-bottom 10px
  .photo
    border-radius 50%
    height 60px
    width 60px
  .info
    padding 10px
    .info__item
      margin 0px
      line-height 20px
      font-size 14px
      i
        margin-right 10px
</style>
