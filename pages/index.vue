<template>
  <main class="l-main">
    <frame />
    <star />
    <div class="l-main__cont">
      <div class="p-title">
        <div class="p-logo">
          <img src="@/assets/img/logo_top.svg" alt="HAPPY BIRTHDAY 26th" class="p-logo__img" />
        </div>
        <h1 class="p-title__txt">
          <span class="p-title__txtInr"
            ><span class="p-title__txtStr">S</span>
            <span class="p-title__txtStr">P</span>
            <span class="p-title__txtStr">E</span>
            <span class="p-title__txtStr">C</span>
            <span class="p-title__txtStr">I</span>
            <span class="p-title__txtStr">A</span>
            <span class="p-title__txtStr">L</span>
            <br class="spNon" />
            <span class="p-title__txtStr">T</span>
            <span class="p-title__txtStr">I</span>
            <span class="p-title__txtStr">C</span>
            <span class="p-title__txtStr">K</span>
            <span class="p-title__txtStr">E</span>
            <span class="p-title__txtStr">T</span></span
          >
        </h1>
      </div>
      <div class="m-btn m-btn--bw">
        <NuxtLink to="/ticket/" class="m-btn__inr">
          <span class="m-btn__txt m-btn__txt--main">TICKET LIST</span>
          <span class="m-btn__txt m-btn__txt--sub">チケット一覧</span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import gsap from 'gsap'
import frame from '~/components/frame.vue'
import Star from '~/components/star.vue'

export default Vue.extend({
  components: {
    frame,
    Star,
  },
  transition: {
    name: 'home',
    mode: 'out-in',
    afterEnter(el) {
      console.log('🏂 TOP afterEnter')
    },
    beforeLeave(el) {
      console.log('🏂 TOP beforeLeave')
    },
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log('top')
    const _this = this
    if (this.$store.state.global.prevPageName === null) {
      document.body.addEventListener('loaded', () => {
        _this.doAnimation()
      })
    } else {
      _this.doAnimation()
    }
  },
  methods: {
    doAnimation() {
      const timeLine = gsap.timeline()
      timeLine
        .to('.l-cont', {
          duration: 0.5,
          opacity: 1,
          ease: 'power2.in',
        })
        .to('.p-logo__img', {
          opacity: 1,
          y: -10,
          stagger: {
            each: 0.1,
            ease: 'power2.in',
          },
        })
        .to('.p-title__txtStr', {
          opacity: 1,
          y: -10,
          stagger: {
            each: 0.1,
          },
        })
        .to('.m-btn', {
          duration: 0.5,
          opacity: 1,
          y: -10,
          ease: 'power2.in',
          delay: -1,
        })
    },
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'ja',
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.l-main {
  &__cont {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 20px);
    background: url('~@/assets/img/bg_top.svg') no-repeat;
    background-size: cover;
    @include mq(lg) {
      background: url('~@/assets/img/bg_top_pc.svg') no-repeat;
      background-size: cover;
      max-width: 100%;
      border-radius: 17%;
      overflow: hidden;
    }
  }
}
.p {
  &-logo {
    text-align: center;
    margin-bottom: 15vh;
    @include mq(lg) {
      margin: 20vh 0 5vh;
    }
    &__img {
      opacity: 0;
      transform: translateY(10px);
      @include mq() {
        width: 35%;
      }
      @include mq(lg) {
        width: 200px;
      }
    }
  }
  &-title {
    padding-top: 10vh;
    margin-bottom: 15vh;
    @include mq(lg) {
      padding-top: 8vh;
      margin-bottom: 8vh;
    }

    &__txt {
      @include josefin-b();
      font-size: spfz(45px);
      color: $brown_dark2;
      text-align: center;
      text-shadow: 0 0 10px #6c655db3;
      line-height: 1.2;
      letter-spacing: -0.13em;
      @include mq() {
        font-size: pcfz(40px);
      }
      @include mq(lg) {
        font-size: 48px;
        letter-spacing: -0.1em;
      }
    }
    &__txtInr {
      span {
        // overflow: hidden;
        opacity: 0;
        display: inline-block;
        transform: translateY(5px);
        @include mq(lg) {
          &:nth-child(7) {
            padding-right: 0.5em;
          }
        }
      }
    }
  }
}
.m-btn {
  opacity: 0;
  transform: translateY(10px);
  @include mq() {
    max-width: 500px;
  }
  @include mq(lg) {
    max-width: 300px;
  }
}
</style>
