<script>
export default {
  name: 'AdminTable',
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    name: String,
    tips: String,
    loading: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: String,
      default: 'create show edit delete',
    },
    deleteConfirmText: {
      type: String,
      default: '此操作将删除该条目, 是否继续？',
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    tableStyle: String,
    stripe: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    height: String,
    maxHeight: String,
    rowClassName: Function,
    highlightCurrentRow: Boolean,
    formatter: Function,
    defaultSort: Object,
    showSummary: Boolean,
    summaryMethod: Function,
  },
  methods: {
    handlePaginate(val) {
      this.$emit('onPaginate', val);
    },
    handleRowSelect(newRow, oldRow) {
      this.$emit('current-change', newRow, oldRow);
    },
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    },
    sortChange(val) {
      this.$emit('sort-change', val);
    },
    setCurrentRow(row) {
      this.$refs.adminTable.setCurrentRow(row);
    },
    toggleRowSelection(row, selected) {
      this.$refs.adminTable.toggleRowSelection(row, selected);
    },
    onSummaryMethod(param) {
      this.$emit('summary-method', param);
    },
    rowClick(row, event, column) {
      this.$emit('row-click', row, event, column);
    },
    onCreate() {
      this.$emit('onCreate');
    },
    onShow(index, news) {
      this.$emit('onShow', index, news);
    },
    onEdit(index, news) {
      this.$emit('onEdit', index, news);
    },
    onDelete(index, news) {
      this.$confirm(this.deleteConfirmText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$emit('onDelete', index, news);
      });
    },
    isMatchedAction(action) {
      return this.actions.split(' ').includes(action);
    },
  },
};
</script>

<template lang="pug">
.admin-table
  .actions(v-if="isMatchedAction('create')")
    slot(name="create")
      el-button(type="success", icon="plus", @click.native="onCreate")
        | 创建{{ name }}
    slot(name="topActions")
  slot(name="header")
  el-table.records-table(
    :data="data",
    ref="adminTable",
    v-loading="loading",
    element-loading-text="数据加载中...",
    :style="tableStyle",
    :stripe="stripe",
    :border="border",
    :height="height",
    :max-height="maxHeight",
    :row-class-name="rowClassName",
    :formatter="formatter",
    :highlight-current-row="highlightCurrentRow",
    @current-change="handleRowSelect",
    @selection-change="handleSelectionChange",
    :default-sort="defaultSort",
    @sort-change="sortChange",
    :show-summary="showSummary",
    :summary-method="onSummaryMethod",
    @row-click="rowClick")
    slot
    el-table-column(label="管理", width="200", v-if="actions")
      template(scope="scope")
        slot(name="actions", :row="scope.row")
        el-button(
          v-if="isMatchedAction('show')",
          size="small",
          type="info",
          @click="onShow(scope.$index, scope.row)")
          | 查看
        el-button(
          v-if="isMatchedAction('edit')",
          size="small",
          type="warning",
          @click="onEdit(scope.$index, scope.row)")
          | 编辑
        el-button(
          v-if="isMatchedAction('delete')",
          size="small",
          type="danger",
          @click="onDelete(scope.$index, scope.row)")
          | 删除
  .paginate(v-if="totalPages > 1")
    el-pagination(
      @current-change="handlePaginate",
      :page-count="totalPages",
      :current-page="currentPage",
      layout="prev, pager, next, jumper")
</template>

<style lang="stylus" scoped>
.admin-table
  .actions
    margin-bottom 22px
  .tips
    color #1C76D8
    float right
    height 36px
    line-height 36px
    overflow hidden
  .paginate
    margin-top 16px
    text-align right
</style>
