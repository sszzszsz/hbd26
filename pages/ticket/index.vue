<template>
  <main :class="{ dmy: isDmy }" class="l-main">
    <p>Coming Soon...</p>
    <div class="m-btn m-btn--bw">
      <NuxtLink to="/" class="m-btn__inr">
        <span class="m-btn__txt m-btn__txt--main">TOP</span>
      </NuxtLink>
    </div>
  </main>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isDmy: true,
    }
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
  &.dmy {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      @include josefin-b();
      font-size: spfz(16px);
      margin-bottom: 5vh;
    }

    .m-btn {
      width: 70%;
    }
    .m-btn__inr {
      padding: spvw(20px) 0 spvw(20px);
    }
  }
}
</style>
