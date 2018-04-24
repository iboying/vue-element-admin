<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      backgroundColor: '#EAEEF1',
      textColor: '#424e67',
      activeTextColor: '#3b8cff',
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<template lang="pug">
.app-side-menu
  el-menu.menu.collapse-menu(
    :default-active="$route.path"
    router
    :collapse="isCollapse"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
  )
    el-menu-item(index="/dashboards")
      i.fa.fa-pie-chart
      span.menu-name(slot="title") 数据面板
    el-menu-item(index="/categories")
      i.fa.fa-th-large
      span.menu-name(slot="title") 分类管理
    el-menu-item(index="/commodities")
      i.fa.fa-shopping-bag
      span.menu-name(slot="title") 商品管理
    el-menu-item(index="/orders")
      i.fa.fa-file-text
      span.menu-name(slot="title") 订单管理
    el-menu-item(index="/comments")
      i.fa.fa-comments
      span.menu-name(slot="title") 评价管理
    el-menu-item(index="/services")
      i.fa.fa-headphones
      span.menu-name(slot="title") 售后服务
</template>

<style lang="stylus" scoped>
$collapseWidth = 64px
$sideWidth = 200px

.app-side-menu
  height 100%
  .menu
    height 100%
    border none
    .el-menu-item
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      &:hover
        background-color #DDE2E5 !important
    .is-active
      font-weight bold
    .fa
      box-sizing content-box
      padding 5px
      width 14px
      height 14px
      text-align center
    .menu-name
      width 100%
      padding-left 10px
  .collapse-menu:not(.el-menu--collapse)
    width $sideWidth
  .collapse-menu
    width $collapseWidth
</style>
