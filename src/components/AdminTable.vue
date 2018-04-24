<script>
export default {
  name: 'AdminTable',
  data() {
    return {
      keyword: '',
      showBatchActions: false,
    };
  },
  props: {
    name: String,
    data: {
      type: Array,
      default: () => ([]),
    },
    permissionModel: String,  // 权限模块
    totalPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: String,
      default: 'new show edit delete',
    },
    actionsObject: {
      type: Object,
      default: () => ({}),
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    searchInputPlaceholder: {
      type: String,
      default: '请输入关键词',
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'mini',
    },
    border: {
      type: Boolean,
      default: false,
    },
    actionFixed: {
      type: String,
      default: 'right',
    },
    align: {
      type: String,
      default: 'center',
    },
    height: String,
    maxHeight: String,
    rowClassName: String,
    rowStyle: Function,
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    formatter: Function,
    defaultSort: Object,
    showSummary: Boolean,
    summaryMethod: Function,
  },
  computed: {
    actionsWidth() {
      const array = this.actions.split(' ');
      if (array.includes('new')) {
        array.splice(array.indexOf('new'), 1);
      }
      return String((array.length * 36) + 20 + 12);
    },
  },
  methods: {
    handlePaginate(val) {
      this.$emit('onPaginate', val);
    },
    currentChange(newRow, oldRow) {
      this.$emit('currentChange', newRow, oldRow);
    },
    selectionChange(val) {
      this.showBatchActions = val.length > 0;
      this.$emit('selectionChange', val);
    },
    sortChange(rowObj) {
      const ransackQs = [`${rowObj.prop} ${rowObj.order === 'descending' ? 'desc' : 'asc'}`];
      this.$emit('sortChange', ransackQs, rowObj);
    },
    onSummaryMethod(param) {
      this.$emit('summaryMethod', param);
    },
    rowClick(row, event, column) {
      this.$emit('rowClick', row, event, column);
    },
    expandChange(row, expandedRow) {
      this.$emit('expandChange', row, expandedRow);
    },
    onNew() {
      this.$emit('onNew');
    },
    onEdit(record, index) {
      this.$emit('onEdit', { ...record }, index);
    },
    onShow(record, index) {
      this.$emit('onShow', { ...record }, index);
    },
    onDelete(record, index) {
      this.$confirm(
        `确定要${this.actionsObject.delete || '删除'}此${name || '数据'}吗？`,
        this.$t('common.warning'),
        {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
        })
        .then(() => {
          this.$emit('onDelete', { ...record }, index);
        })
        .catch(() => { });
    },
    isMatchedAction(action) {
      return this.actions.split(' ').includes(action);
    },
    onSearch() {
      this.$emit('onSearch', this.keyword);
    },
    setCurrentRow(row) {
      this.$refs.adminTable.setCurrentRow(row);
    },
    toggleRowSelection(row, selected) {
      this.$refs.adminTable.toggleRowSelection(row, selected);
    },
    filterChange(...args) {
      this.$emit('filterChange', ...args);
    },
  },
};
</script>

<template lang="pug">
.admin-table
  .table-top
    .action-box
      slot(name="first-actions")
      slot(name="new", v-if="isMatchedAction('new')")
        el-button.new-btn(
          v-can:manage="permissionModel"
          type="primary"
          icon="el-icon-plus"
          @click.native="onNew"
          :size="size")
          | {{ actionsObject.new ? actionsObject.new : $t('common.new') }}
      slot(name="actions")
      slot(name="batch" v-if="showBatchActions")
    .search-box
      slot(name="right-actions")
      el-input.search-input(
        v-if="searchable"
        :placeholder="searchInputPlaceholder"
        v-model="keyword"
        :size="size"
        @keyup.enter.native="onSearch")
        el-button(slot="append" icon="el-icon-search", @click="onSearch", :size="size")
  //- 表格模式
  el-table.records-table(
    ref="adminTable",
    :data="data",
    v-loading="loading",
    :element-loading-text="$t('common.loading')",
    :stripe="stripe",
    :border="border",
    :height="height",
    :max-height="maxHeight",
    :row-class-name="rowClassName",
    :row-style="rowStyle",
    :formatter="formatter",
    :highlight-current-row="highlightCurrentRow",
    @expand-change="expandChange"
    @current-change="currentChange",
    @selection-change="selectionChange",
    :default-sort="defaultSort",
    @sort-change="sortChange",
    :show-summary="showSummary",
    :summary-method="onSummaryMethod",
    :filter-change="filterChange"
    @row-click="rowClick",
    :size="size",
    :cell-style="{ 'padding-left': '12px' }",
    :header-cell-style="{ 'padding-left': '12px' }")
    //- table columns slot
    slot
    //- table row operations
    el-table-column.actions-column(
      :label="$t('common.operation')",
      :width="actionsWidth",
      :fixed="actionFixed",
      :align="align",
      v-if="isMatchedAction('show') || isMatchedAction('edit') || isMatchedAction('delete')")
      template(slot-scope="scope")
        .actions
          el-button.action-btn(
            v-if="isMatchedAction('show')",
            :style="{ marginRight: '10px' }"
            type="text",
            :size="size",
            @click.native="onShow(scope.row, scope.$index)")
            span.show-button {{ actionsObject.show ? actionsObject.show : $t('common.show') }}
          el-button.action-btn(
            v-if="isMatchedAction('edit')",
            v-can:manage="permissionModel"
            type="text",
            :size="size",
            @click.native="onEdit(scope.row, scope.$index)")
            span.edit-button {{ actionsObject.edit ? actionsObject.edit : $t('common.edit') }}
          el-button.action-btn(
            v-if="isMatchedAction('delete')",
            v-can:manage="permissionModel"
            type="text",
            :size="size",
            @click.native="onDelete(scope.row, scope.$index)")
            span.delete-button {{ actionsObject.delete ? actionsObject.delete : $t('common.delete') }}
  //- pagination
  .paginate(v-if="totalPages > 1")
    el-pagination(
      @current-change="handlePaginate",
      :page-count="totalPages",
      :current-page="currentPage",
      layout="prev, pager, next, jumper")
</template>

<style lang="stylus" scoped>
.admin-table
  .table-top
    display flex
    justify-content space-between
    align-items center
    .action-box
      width 100%
    .search-box
      width 100%
      text-align right
      .search-input
        width 300px
    .new-btn, .search-input
      margin-bottom 8px
  .records-table
    border 1px solid #E6EBF5
    border-bottom none
  .paginate
    margin-top 16px
    text-align right

.actions
  .action-btn
    margin-right 10px !important
    margin-left 0px
  .show-button
    color #46A0FC
  .edit-button
    color #E99D27
  .delete-button
    color #F75659
</style>
