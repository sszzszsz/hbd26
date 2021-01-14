<template>
  <main class="l-main">
    <div class="l-main__cont" :class="{ 'is-limited': monthLimitFlag }">
      <div class="m-ttl">
        <div class="m-ttl__logo">
          <img src="@/assets/img/logo_top.svg" alt="HAPPY BIRTHDAY 26th" />
        </div>
        <h1 class="m-ttl__txt"><span>SPECAIL TICKET</span></h1>
      </div>
      <p v-if="monthLimitFlag === false" class="p-ticket__count">
        今月の残り使用回数<span>{{ usecount }}</span
        >回
      </p>
      <p v-else class="p-ticket__count">利用上限数に達しました<br />来月にまたご利用ください</p>
      <ul class="p-ticket__list">
        <li
          v-for="(ticket, index) in tickets"
          :id="`${ticket.id}${ticket.num}`"
          :key="ticket.num"
          ref="ticket"
          class="p-ticket__item js-scroll is-fadeUp"
          @pointerup="clickTicket($event, index + 1)"
        >
          <ticket
            :id="ticket.id"
            :index="index + 1"
            :num="ticket.num"
            :ttl="ticket.ttl"
            :link-frag="linkFrag"
          />
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import Vue from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ticketLists from '~/assets/data/tickets.json'
import ticket from '~/components/ticket.vue'

export default Vue.extend({
  components: {
    ticket,
  },
  transition: {
    name: 'ticket',
    mode: 'out-in',
    afterEnter(el) {
      console.log('🏂 チケット一覧 afterEnter')
      this.$children[0].obserber()
    },
    beforeLeave(el) {
      console.log('🏂 チケット一覧 beforeLeave')
    },
  },
  data() {
    return {
      isDmy: false,
      tickets: ticketLists,
      usecount: 2,
      monthLimitFlag: false,
      month: '',
      date: '',
      linkFrag: true,
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('🏂 チケット一覧')
      this.ticketListEl = document.querySelectorAll('.js-scroll')

      this.setTicketInfo()
      this.setTicketEvent()

      if (
        this.$store.state.global.prevPageName === 'ticket-id' &&
        this.$store.state.global.prevPageParam !== null
      ) {
        window.scrollTo(0, this.$store.state.global.scrollY)
      }
    },

    /**
     * スクロール検知
     */
    obserber() {
      gsap.registerPlugin(ScrollTrigger)
      this.ticketListEl.forEach((el, index) => {
        scroll(el)
      })
      function scroll(el) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: el, // 要素".a"がビューポートに入ったときにアニメーション開始
            start: 'top 80%', // アニメーション開始位置
            // markers: true, // マーカー表示
          },
        })
      }
    },
    /**
     * 使用済みクラスを付与する
     * 今月の使用回数をカウントする(2回以上使用していた場合、当月は使用不可)
     */
    setTicketInfo() {
      const today = new Date()
      const curenntMonth = today.getMonth() + 1
      let count = 0

      this.$store.state.global.ticketsInfo.forEach((info, index) => {
        if (info.use === true) {
          this.ticketListEl[index].classList.add('is-used')
        }
        if (info.month === curenntMonth) {
          count++
        }
      })
      // 上限の２回から使用回数分を引く
      this.usecount -= count
      if (this.usecount === 0) {
        this.monthLimitFlag = true
      }
    },
    /**
     * 使用上限時ticketコンポーネントをリンクなしにする
     */
    setTicketEvent() {
      if (this.monthLimitFlag) {
        this.linkFrag = false
      }
    },
    /**
     * チケットクリック時
     * どのチケットをクリックしたのか記録するため
     * クリックしたチケットのindexをstroeに登録
     */
    clickTicket(event, index) {
      if (this.monthLimitFlag !== true) {
        this.$store.commit('global/setClickTicket', index)
        const tciketPos = event.currentTarget.offsetTop - window.scrollY
        this.$store.commit('global/setScrollY', tciketPos)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.l-main {
  &__cont {
    position: relative;
    z-index: 10;
  }
}
.p-ticket {
  &__list {
    padding: spvw(15px) spvw(5px) spvw(30px);
    @include mq() {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 15px 0 30px;
    }
  }
  &__item {
    margin-top: spvw(15px);
    transform: translateY(10px);
    @include mq() {
      margin-top: 2%;
      width: auto;
      padding: 0 2%;
      display: inline-flex;
      justify-content: center;
    }
  }

  &__count {
    margin: 1em auto 0;
    text-align: center;
    font-size: spfz(14px);
    color: $brown_dark2;
    @include mq() {
      font-size: pcfz(16px);
    }
    span {
      display: inline-block;
      padding: 0 0.2em;
      color: transparent;
      @include josefin-b();
      font-size: spfz(34px);
      -webkit-text-stroke: 1px $brown_dark2;
      @include mq() {
        font-size: pcfz(34px);
      }
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
