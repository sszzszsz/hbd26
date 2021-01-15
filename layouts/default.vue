<template>
  <div
    :class="[
      [this.$route.name == 'ticket-id' ? 'ticket-detail' : this.$route.name],
      [$store.state.global.loadingEnd == true ? 'is-loaded' : null],
    ]"
    class="l-wrap"
  >
    <theLoading v-if="this.$route.name === 'index' && $store.state.global.loadingEnd !== true" />
    <div ref="l-cont" class="l-cont">
      <!-- <frame v-if="this.$route.name === 'index'" /> -->
      <star />
      <div class="l-inr">
        <Nuxt />
        <theFooter v-if="this.$route.name !== 'index'" class="js-scroll" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// import frame from '~/components/frame.vue'
import star from '~/components/star.vue'
import theLoading from '~/components/loading.vue'
import theFooter from '~/components/footer.vue'

export default Vue.extend({
  components: {
    // frame,
    star,
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
    this.$store.dispatch('global/writePageName', this.$route.name)
    this.getStorage()
  },
  mounted() {
    console.log('🐣 default')
    this.getVh()
    this.setEventLister()
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
      // window.scrollTo(this.vh, 0)
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
  },
})
</script>

<style lang="scss" scoped>
.l {
  &-wrap {
    position: relative;
    padding: spvw(10px) spvw(10px);
    overflow: hidden;
    min-height: 100vh;
    background-color: $brown_pale1;
    &.is-load {
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
    }

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
    @include mq() {
      padding: 15px;
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
    z-index: 6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }
}

// TOP
.index {
  .l-cont {
    opacity: 0;
  }
  .l-inr {
    padding: spvw(12px);
    @include mq() {
      padding: 12px;
    }
  }
}
// チケット詳細
.ticket-detail {
  transition: opacity 0.25s;
  .m-frame {
    display: none;
  }
}
</style>
