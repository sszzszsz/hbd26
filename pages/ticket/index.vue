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
      <p class="p-ticket__count">今月の残り使用回数{{ usecount }}回</p>
      <ul class="p-ticket__list">
        <li
          v-for="ticket in tickets"
          :id="`${ticket.id}${ticket.num}`"
          :key="ticket.num"
          ref="ticket"
          class="p-ticket__item js-ticket"
        >
          <ticket :id="ticket.id" :num="ticket.num" :ttl="ticket.ttl" />
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import Vue from 'vue'
import ticketLists from '../../assets/tickets.json'
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
      tickets: ticketLists,
      usecount: 2,
    }
  },
  created() {
    this.getStorage()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('init')
      this.obserber()
      this.setUsedClass()
    },

    /**
     * スクロール検知（IntersectionObserver）
     */
    obserber() {
      // 今回の交差を監視する要素
      this.ticketListEl = document.querySelectorAll('.js-ticket')
      const options = {
        root: document.querySelector('.l-inr'),
        rootMargin: '-3%',
        threshold: 0.5,
      }

      const observer = new IntersectionObserver(doWhenIntersect, options)
      // それぞれのboxを監視する
      this.ticketListEl.forEach((item) => {
        observer.observe(item)
      })

      /**
       * 交差したときに呼び出す関数
       * @param entries
       */
      function doWhenIntersect(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inter')
          }
        })
      }
    },

    /**
     * WebStrorageを読み込んでstoreに登録する
     */
    getStorage() {
      const infos = JSON.parse(localStorage.getItem('ticketsInfo'))
      this.$store.dispatch('global/writeTicketsInfo', infos)
    },

    /**
     * 使用済みクラスを付与する
     */
    setUsedClass() {
      let usecount = 0
      this.$store.state.global.ticketsInfo.forEach((ticketInfo, index) => {
        if (ticketInfo.use === true) {
          this.ticketListEl[index].classList.add('is-used')
          usecount++
          this.usecount -= usecount
        }
      })
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
.p-ticket {
  &__list {
    padding: 10px;
  }

  &__item {
    margin-top: 10px;
  }

  &__count {
    margin: 1em auto 0;
    text-align: center;
    font-size: spfz(14px);
  }
}
</style>
