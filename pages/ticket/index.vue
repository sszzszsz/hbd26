<template>
  <main class="l-main">
    <star />
    <div class="l-main__cont">
      <div class="m-ttl">
        <div class="m-ttl__logo">
          <img src="@/assets/img/logo_top.svg" alt="HAPPY BIRTHDAY 26th" />
        </div>
        <h1 class="m-ttl__txt"><span>SPECAIL TICKET</span></h1>
      </div>
      <ul class="p-ticket__list">
        <li class="m-ticket">
          <ticket />
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import Vue from 'vue'
import star from '~/components/star.vue'
import ticket from '~/components/ticket.vue'

export default Vue.extend({
  components: {
    star,
    ticket,
  },
  data() {
    return {
      isDmy: false,
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
  &__cont {
    position: relative;
    z-index: 50;
  }
}
.p-ticket__list {
  padding: 10px;
}
</style>
