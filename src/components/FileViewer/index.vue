<template>
  <div v-show="isShow" class="file-viewer-container">
    <div class="closeDiv" @click="close">
      <i class="el-icon-close"/>
    </div>
    <div class="context">
      <!-- <img :src='downUrl'/> -->
      <iframe :src="fileUrl" width="100%" height="100%"/>
    </div>
    <div class="footer"/>
  </div>
</template>

<script>
import * as PDocApi from "@/api/pdoc"
export default {
  name: "FileViewer",
  props: {
    files: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: -1
    }
  },

  data() {
    return {
      isShow: true,
      showIndex: this.index
    }
  },

  computed: {
    fileUrl() {
      const temp = []
      this.files.forEach(item => {
        temp.push(item.svcDocId)
      })
      let currentDocId = this.files[this.showIndex].svcDocId
      if (!currentDocId) {
        currentDocId = ''
      }
      return PDocApi.getViewFrame(temp.join(','), currentDocId)
    }
  },

  mounted() {
  },

  methods: {
    show() {
      this.isShow = true
    },
    close() {
      this.isShow = false
      this.$emit('close', this.showIndex)
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.file-viewer-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  .closeDiv {
    position: fixed;
    font-size: 20;
    background-color: rgba(0, 0, 0, 0.6);
    right: 0;
    top: 0;
    border-radius: 40px;
    margin: 10px;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
  .context {
    width: 100%;
    height: 100%;
  }
}
</style>
