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
    <theLoading v-if="this.$route.name === 'index' && $store.state.global.loadingEnd !== true" />
    <div ref="l-cont" class="l-cont">
      <frame />
      <div class="l-inr">
        <transition
          name="page"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
        >
          <Nuxt />
        </transition>
        <theFooter v-if="this.$route.name !== 'index'" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import frame from '~/components/frame.vue'
import theLoading from '~/components/loading.vue'
import theFooter from '~/components/footer.vue'

export default Vue.extend({
  components: {
    frame,
    theLoading,
    theFooter,
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
    console.log('default created')
    this.browser = this.$ua.browser()
    if (this.browser === 'Internet Explorer') {
      this.browser = 'IE'
    }
    this.$store.dispatch('global/writePageName', this.$route.name)
    this.$store.dispatch('global/writeBrowser', this.browser)
    this.getStorage()
  },
  mounted() {
    console.log('🐣 default')
    this.getVh()
    this.setEventLister()
  },
  beforeDestroy() {
    const scrollY = window.scrollY
    this.$store.dispatch('global/writeScrollY', scrollY)
  },
  methods: {
    getVh() {
      this.vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${this.vh}px`)
    },
    /**
     * 各イベント付与
     */
    setEventLister() {
      window.addEventListener('resize', () => {
        this.getVh()
      })
      document.body.addEventListener('loaded', () => {
        console.log('loaded')
      })
    },
    /**
     * WebStrorageを読み込んでstoreに登録する
     */
    getStorage() {
      const infos = JSON.parse(localStorage.getItem('ticketsInfo'))
      // 初回時にWebStrorageに何もない場合、ticketsInfoを登録する
      if (infos === null) {
        const arry = []
        for (let i = 0; i < 24; i++) {
          const item = {
            id: i,
            month: null,
            date: null,
            use: false,
          }
          arry[i] = item
        }
        this.$store.commit('global/setTicketsInfo', arry)
      } else {
        this.$store.commit('global/setTicketsInfo', infos)
      }
    },
    // --------
    // ENTERING
    // --------

    beforeEnter(el) {
      const event = new CustomEvent('beforeEnter')
      document.body.dispatchEvent(event)
    },
    // CSS と組み合わせて使う時、done コールバックはオプションです
    enter(el, done) {
      const event = new Event('enter', { bubbles: true })
      document.body.dispatchEvent(event)
      done()
    },
    afterEnter(el) {
      const event = new CustomEvent('afterEnter')
      document.body.dispatchEvent(event)
    },
    enterCancelled(el) {
      // ...
    },

    // --------
    // LEAVING
    // --------

    beforeLeave(el) {
      // ...
    },
    // CSS と組み合わせて使う時、done コールバックはオプションです
    leave(el, done) {
      // ...
      done()
    },
    afterLeave(el) {
      // ...
    },
    // v-show と共に使うときだけ leaveCancelled は有効です
    leaveCancelled(el) {
      // ...
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      background-size: cover;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 2;
    }
  }
}
</style>
