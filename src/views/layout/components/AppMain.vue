<template>
  <section ref="appMain" class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.calHeight)
  },
  mounted() {
    this.calHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.calHeight)
  },
  methods: {
    calHeight() {
      this.$store.dispatch('setHeight', this.$refs.appMain.clientHeight)
    }
  }
}
</script>

<style scoped>
  .app-main {
    /*84 = navbar(tags-view) = 50(34) */
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>

