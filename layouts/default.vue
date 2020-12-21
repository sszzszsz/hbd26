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
        <transition name="page" @before-enter="beforeEnter" @after-enter="afterEnter">
          <Nuxt />
        </transition>
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
    console.log('default')
    this.getVh()
    this.setEventLister()
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
      window.addEventListener(
        'load',
        function () {
          setTimeout(function () {
            scrollTo(0, 1)
          }, 100)
        },
        false
      )
    },
    beforeEnter(el) {
      console.log('beforeEnter')
      const body = document.getElementById('__nuxt')
      const event = new CustomEvent('beforeEnter')
      body.dispatchEvent(event)
    },
    afterEnter(el) {
      console.log('enter')
      const body = document.getElementById('__nuxt')
      const event = new CustomEvent('afterEnter')
      body.dispatchEvent(event)
    },
  },
})
</script>

<style lang="scss" scoped>
.l {
  &-wrap {
    position: relative;
    padding: spvw(15px) spvw(12px);
    overflow: hidden;
    min-height: 100vh;
    background-color: $brown_pale1;
    background-image: linear-gradient(
        -45deg,
        #6c655d80 25%,
        transparent 25%,
        transparent 50%,
        #6c655d80 50%,
        #6c655d80 75%,
        transparent 75%,
        transparent 100%
      ),
      linear-gradient(
        45deg,
        #6c655d80 25%,
        transparent 25%,
        transparent 50%,
        #6c655d80 50%,
        #6c655d80 75%,
        transparent 75%,
        transparent 100%
      );
    background-size: 30px 30px;
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }

  &-cont {
    width: 100%;
    min-height: 100vh;
    position: relative;

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }

  &-inr {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    padding: spvw(12px);
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }
}
.index {
  .l-cont {
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: url('~@/assets/img/bg_top.svg') no-repeat;
      background-size: contain;
    }
  }
}
</style>
