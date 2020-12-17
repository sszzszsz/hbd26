<template>
  <main class="l-main">
    <star />
    <div class="l-main__cont" :class="{ 'is-limited': monthLimitFlag }">
      <div class="m-ttl">
        <div class="m-ttl__logo">
          <img src="@/assets/img/logo_top.svg" alt="HAPPY BIRTHDAY 26th" />
        </div>
        <h1 class="m-ttl__txt"><span>SPECAIL TICKET</span></h1>
      </div>
      <p class="p-ticket__count">
        今月の残り使用回数<span>{{ usecount }}</span
        >回
      </p>
      <ul class="p-ticket__list">
        <li
          v-for="(ticket, index) in tickets"
          :id="`${ticket.id}${ticket.num}`"
          :key="ticket.num"
          ref="ticket"
          class="p-ticket__item js-ticket"
          @pointerdown="clickTicket(index + 1)"
        >
          <ticket
            :id="ticket.id"
            :index="index + 1"
            :num="ticket.num"
            :ttl="ticket.ttl"
            :link-frag="true"
          />
        </li>
      </ul>
    </div>
    <div v-if="monthLimitFlag === true" class="p-ticket__limited">
      <p>上限です<br />また来月ご利用ください</p>
    </div>
  </main>
</template>
<script>
import Vue from 'vue'
import ticketLists from '~/assets/tickets.json'
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
      monthLimitFlag: false,
    }
  },
  created() {
    // this.getStorage()
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    console.log('🏂 チケット一覧 beforeDestroy')
  },
  methods: {
    init() {
      console.log('🏂 チケット一覧')
      // 今回の交差を監視する要素
      this.ticketListEl = document.querySelectorAll('.js-ticket')

      this.obserber()
      this.getStorage()
    },

    /**
     * スクロール検知（IntersectionObserver）
     */
    obserber() {
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
            entry.target.classList.add('is-view')
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
      // 初回時にWebStrorageに何もない場合、ticketsInfoを登録する
      if (infos === null) {
        const arry = []
        const item = {
          date: null,
          use: false,
        }
        for (let i = 0; i < 24; i++) {
          arry[i] = item
        }
        this.$store.dispatch('global/writeTicketsInfo', arry)
      } else {
        this.setUsedClass()
        this.coucntMonthLimit()
      }
    },

    /**
     * 使用済みクラスを付与する
     */
    setUsedClass() {
      this.$store.state.global.ticketsInfo.forEach((info, index) => {
        if (info.use === true) {
          this.ticketListEl[index].classList.add('is-used')
        }
      })
    },
    /**
     * 今月の使用回数をカウントする
     * 2回以上使用していた場合、当月は使用不可
     */
    coucntMonthLimit() {
      const today = new Date()
      const curenntMonth = today.getMonth()
      let count = 0
      this.$store.state.global.ticketsInfo.forEach((ticketInfo, index) => {
        if (ticketInfo.date === curenntMonth) {
          count++
        }
      })
      this.usecount -= count
      if (this.usecount === 0) {
        this.monthLimitFlag = true
      }
    },
    /**
     * チケットクリック時
     * 既に上限に達していた場合は遷移しない
     */
    clickTicket(index) {
      console.log('click', index)
      if (this.monthLimitFlag !== true) {
        this.$store.commit('global/setClickTicket', index)
      } else {
        console.log('stop')
      }
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
    z-index: 10;
  }
}
.p-ticket {
  &__list {
    padding-bottom: spvw(30px);
  }
  &__item {
    margin-top: spvw(10px);
  }

  &__count {
    margin: 1em auto 0;
    text-align: center;
    font-size: spfz(14px);
    color: $brown_dark2;
    span {
      display: inline-block;
      padding: 0 0.2em;
      color: transparent;
      @include josefin-b();
      font-size: spfz(30px);
      -webkit-text-stroke: 1px $brown_dark2;
    }
  }
  &__limited {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: #6c655dab;
    color: #fdfaf3;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
