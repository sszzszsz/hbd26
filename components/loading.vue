<template>
  <div class="l-loading">
    <p class="m-loading__logo js-loading" :class="{ 'is-animate': animationFlag }">
      <span class="m-loading__logoInr"
        ><span>26th Birthday</span><span>SPECIAL CONTENTS</span></span
      >
    </p>
  </div>
</template>
<script>
import Vue from 'vue'
import gsap from 'gsap'

export default Vue.extend({
  data() {
    return {
      isLoaded: false,
      animationFlag: false,
    }
  },
  mounted() {
    console.log('🐣 loading')
    this.animation()
  },
  methods: {
    setLoadedEvent() {
      const body = document.getElementById('__nuxt')
      const event = new CustomEvent('loaded')
      body.dispatchEvent(event)
    },
    animation() {
      const _this = this
      const timeLine = gsap.timeline()
      timeLine
        .to('.js-loading', {
          duration: 1,
          delay: 2,
          opacity: 0,
          y: -10,
          ease: 'sine.out',
        })
        .to('.l-loading', {
          opacity: 1,
          duration: 0.5,
          ease: 'sine.out',
          onComplete() {
            _this.$store.commit('global/setLodingEnd', true)
          },
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.l-loading {
  display: flex;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10px;
  right: 0;
  bottom: 0;
  left: 10px;
  z-index: 100;
  background-image: url('~@/assets/img/paper_main.png');
}
.m-loading {
  &__logo {
    @include josefin-b();
    font-size: spvw(24px);
    text-shadow: 0 0 5px #fff;
    // background: $brown_pale1;
    background-image: url('~@/assets/img/paper_main.png');
    text-align: center;
    @include mq() {
      font-size: pcfz(24px);
    }
    span {
      display: block;
      position: relative;
    }
  }
}
</style>
