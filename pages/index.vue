<template>
  <main class="l-main">
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
            <span class="p-title__txtStr">L</span><br /><span class="p-title__txtStr">T</span>
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
import star from '~/components/star.vue'

export default Vue.extend({
  components: {
    star,
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
        _this.afterEnter()
      })
    } else {
      _this.afterEnter()
    }
  },
  methods: {
    afterEnter() {
      console.log('afterEnter')
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
    position: relative;
    width: 100%;
    z-index: 10;
    mix-blend-mode: color-burn;
  }
}
.p {
  &-logo {
    text-align: center;
    margin-bottom: 4vh;
    &__img {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  &-title {
    padding-top: 20vh;
    margin-bottom: 6vh;

    &__txt {
      @include josefin-b();
      font-size: spfz(55px);
      color: $brown_dark2;
      text-align: center;
      text-shadow: 0 0 10px #6c655db3;
      line-height: 1.2;
      letter-spacing: -0.1em;
    }
    &__txtInr {
      span {
        // overflow: hidden;
        opacity: 0;
        display: inline-block;
        transform: translateY(10px);
      }
    }
  }
}
.m-btn {
  opacity: 0;
  transform: translateY(10px);
}
</style>
