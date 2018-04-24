<script>
export default {
  name: 'Uploader',
  data() {
    return {
      medias: [],
      currentPage: 1,
      totalPages: 1,
      config: {
        image: {
          type: 'image',
          name: 'media',
          accept: 'image/png, image/jpeg, image/gif',
          text: '选择本地图片',
          selectText: '选择服务器图片',
          tips: '只能上传 JPG 或 PNG 格式的图片，且不超过 2MB',
        },
        video: {
          type: 'video',
          name: 'media',
          accept: 'video/mp4',
          text: '选择本地视频',
          selectText: '选择服务器视频',
          tips: '只能上传 MP4 格式的视频',
        },
        large_image: {
          type: 'large_image',
          name: 'media',
          accept: 'image/png, image/jpeg, image/gif',
          text: '选择本地图片',
          selectText: '选择服务器图片',
          tips: '只能上传 JPG 或 PNG 格式的图片，且不超过 6MB',
        },
      },
    };
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      default: 'image',
    },
    fileList: {
      type: Array,
      default: () => ([]),
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String,
      default: 'picture',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showServerFiles: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.showServerFiles) {
      this.getMedias(this.currentPage);
    }
  },
  methods: {
    async getMedias(currentPage) {
      try {
        const { data } = await this.$apis.media.index(currentPage, 30, this.mediaType);
        this.currentPage = data.current_page;
        this.totalPages = data.total_pages;
        this.medias = this.medias.concat(data.medias);
      } catch (error) {
        this.$message.error('获取媒体库失败');
      }
    },
    submit() {
      this.$refs.upload.submit();
    },
    onSuccess(response, file, fileList) {
      this.$emit('onSuccess', response, file, fileList);
    },
    onError() {
      this.$emit('onError');
      this.$message.error('上传失败，请重试');
    },
    onChange(file) {
      this.$emit('onChange', file);
    },
    onProgress(event, file, fileList) {
      this.$emit('onProgress', event, file, fileList);
    },
    beforeFileUpload(file) {
      const isImageType = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isLt6M = file.size / 1024 / 1024 < 6;
      let validate = true;
      if (this.option.type === 'video') {
        validate = file.type === 'video/mp4';
        if (!validate) {
          this.$message.error('只能上传 MP4 格式的视频');
        }
      } else if (this.option.type === 'image') {
        validate = isImageType && isLt2M;
        if (!validate) {
          this.$message.error('只能上传 JPG 或 PNG 格式的图片，且不超过 2MB');
        }
      } else if (this.option.type === 'large_image') {
        validate = isImageType && isLt6M;
        if (!validate) {
          this.$message.error('只能上传 JPG 或 PNG 格式的图片，且不超过 6MB');
        }
      }
      return validate;
    },
    getMoreMedias() {
      this.getMedias(this.currentPage + 1);
    },
    onSelectFile(media) {
      this.$emit('onSelectFile', media);
      this.$refs.mediasPopover.doClose();
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
  },
  computed: {
    option() {
      return this.config[this.mediaType];
    },
    otherData() {
      return {
        type: this.option.type,
      };
    },
  },
};
</script>

<template lang="pug">
.uploader-container
  label.uploader-label(v-if="label")
    | {{ label }}
  el-upload.uploader(
    ref="upload",
    :action="`${$config.DOMAIN}admin/medias`",
    :headers="$store.getters.httpHeader",
    :data="otherData",
    :name="option.name",
    :multiple="multiple",
    :accept="option.accept",
    :file-list="fileList",
    :show-file-list="showFileList",
    :list-type="listType",
    :auto-upload="autoUpload",
    :on-error="onError",
    :on-success="onSuccess",
    :on-change="onChange",
    :on-progress="onProgress",
    :before-upload="beforeFileUpload",
    :disabled="disabled"
  )
    .el-upload__tip(slot="tip")
      | {{ option.tips }}
    el-button(type="success", icon="upload2", :disabled="disabled", slot="trigger")
      | {{ option.text }}
    el-popover.media-library-btn(
      ref="mediasPopover",
      placement="bottom-start",
      width="678",
      trigger="click",
      v-if="showServerFiles")
      .medias(v-if="medias.length > 0")
        img.media-thumbnail(
          :src="media.thumbnail",
          v-for="media in medias",
          @click="onSelectFile(media)")
        .more(
          @click="getMoreMedias",
          v-loading="$store.state.loading",
          v-if="currentPage < totalPages")
          i.el-icon-more
      .medias-none(v-else)
        | 还没有上传过任何资源
      el-button(slot="reference", type="primary", icon="search")
        | {{ option.selectText }}
</template>

<style lang="stylus" scoped>
.uploader-container
  .uploader-label
    padding 0 0 10px
    font-size 14px
    color #48576a
    line-height 1
    box-sizing border-box
    display inline-block
    &:before
      content '*'
      color #ff4949
      margin-right 4px
  .uploader
    line-height 1.4
    margin-bottom 22px
    button
      margin-right 10px
    .media-library-btn
      float left

.medias
  .media-thumbnail, .more
    height 78px
    width 78px
    margin-right 6.75px
    margin-bottom 6.75px
    float left
    cursor pointer
    transform scale(1, 1)
    transition transform 0.2s ease
    &:hover
      transform scale(1.06, 1.06)
  .more
    height 76px
    width 76px
    border 1px solid #B1BFD0
    line-height 74px
    text-align center
    font-size 20px
    color #8292A6
.medias-none
  text-align center
  font-size 18px
  line-height 60px
</style>
