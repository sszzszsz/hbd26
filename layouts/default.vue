<template>
  <div
    :class="[
      this.$route.name,
      this.$route.params.id,
      [$ua.browser() == 'Internet Explorer' ? 'IE' : $ua.browser()],
      [$ua.isFromPc() == true ? 'PC' : null],
      [$ua.isFromTablet() == true ? 'TB' : null],
      [$ua.isFromSmartphone() == true ? 'SP' : null],
    ]"
    class="l-wrap"
  >
    <div ref="l-cont" class="l-cont">
      <frame />
      <div class="l-inr">
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import frame from '~/components/frame.vue'

export default Vue.extend({
  components: {
    frame,
  },
  data() {
    return {
      vh: 0,
      ipadFlag: false,
      browser: '',
      classList: '',
    }
  },
  created() {
    this.browser = this.$ua.browser()
    if (this.browser === 'Internet Explorer') {
      this.browser = 'IE'
    }
    this.$store.dispatch('global/writePageName', this.$route.name)
    this.$store.dispatch('global/writeBrowser', this.browser)
  },
  mounted() {
    this.getVh()
  },
  methods: {
    getVh() {
      this.vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${this.vh}px`)
    },
    setEventLister() {
      window.addEventListener('resize', () => {
        this.getVh()
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.l {
  &-wrap {
    position: relative;
    min-height: 100vh;
    height: 100vh;
    padding: 10px;
    @include stripe();
  }

  &-cont {
    width: 100%;
    height: 100%;
    position: relative;
    // border: 2px solid $brown_dark1;
  }

  &-inr {
    position: relative;
    z-index: 2;
  }
}
</style>
