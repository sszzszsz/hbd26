<template>
  <main class="l-main">
    <star />
    <h1 class="p-title">SPECAIL<br />TICKET</h1>
    <div class="m-btn m-btn--wt">
      <NuxtLink to="/ticket/" class="m-btn__inr">
        <span class="m-btn__txt m-btn__txt--main">TICKET LIST</span>
        <span class="m-btn__txt m-btn__txt--sub">チケット一覧</span>
      </NuxtLink>
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
.cont {
  width: 100%;
}
.p {
  &-title {
    padding-top: 22vh;
    margin-bottom: 8vh;
    @include josefin-b();
    font-size: spfz(55px);
    color: $brown_dark2;
    text-align: center;
    text-shadow: 0 0 10px #fff;
    line-height: 1.2;
    letter-spacing: 0.05em;
  }
}
</style>
