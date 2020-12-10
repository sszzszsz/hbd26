<template>
  <main class="l-main">
    <star />
    <div class="l-main__cont">
      <div class="p-title">
        <div class="p-logo">
          <img src="@/assets/img/logo_top.svg" alt="" />
        </div>
        <h1 class="p-title__txt">SPECAIL<br />TICKET</h1>
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
    this.init()
  },
  methods: {
    init() {
      console.log('init')
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
      letter-spacing: 0.07em;
      padding-left: 0.3em;
    }
  }
}
</style>
