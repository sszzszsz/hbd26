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
  }
  &::after {
    content: '';
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
    z-index: 9;
  }
}
.p {
  &-logo {
    text-align: center;
    margin-bottom: 15vh;
    &__img {
      opacity: 0;
      transform: translateY(10px);
      @include mq() {
        width: 35%;
      }
    }
  }
  &-title {
    padding-top: 10vh;
    margin-bottom: 15vh;

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
    }
    &__txtInr {
      span {
        // overflow: hidden;
        opacity: 0;
        display: inline-block;
        transform: translateY(5px);
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
}
</style>
