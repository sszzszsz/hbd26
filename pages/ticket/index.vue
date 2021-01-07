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
          @pointerdown="clickTicket($event, index + 1)"
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
  </main>
</template>
<script>
import Vue from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ticketLists from '~/assets/data/tickets.json'
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
      month: '',
      date: '',
    }
  },
  created() {
    console.log('🏂 チケット一覧 created')
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    console.log('🏂 チケット一覧 beforeDestroy')
    const scrollY = window.scrollY
    this.$store.dispatch('global/writeScrollY', scrollY)
  },
  methods: {
    init() {
      console.log('🏂 チケット一覧')
      // 今回の交差を監視する要素
      this.ticketListEl = document.querySelectorAll('.js-scroll')

      this.obserber()
      this.setTicketInfo()

      if (
        this.$store.state.global.prevPageName === 'ticket-id' &&
        this.$store.state.global.prevPageParam !== null
      ) {
        const prevTicketNum = Number(this.$store.state.global.prevPageParam) - 1
        const targetPos = this.ticketListEl[prevTicketNum].getBoundingClientRect()
        const scrollPos = targetPos.top + window.pageYOffset
        window.scrollTo(0, scrollPos)
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
          // 動かしたい要素は".a"
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
      console.log(this.usecount)
      if (this.usecount === 0) {
        this.monthLimitFlag = true
      }
    },
    /**
     * チケットクリック時
     * 既に上限に達していた場合は遷移しない
     */
    clickTicket(event, index) {
      console.log('click', index)
      if (this.monthLimitFlag !== true) {
        this.$store.commit('global/setClickTicket', index)
        // const targetHtml = event.currentTarget.outerHTML
        // const targetPosY = event.pageY
        // event.currentTarget.insertAdjacentHTML('afterend', targetHtml)
        // event.currentTarget.nextElementSibling.classList.add('copy')
        // gsap.set(event.currentTarget.nextElementSibling, {
        //   y: targetPosY,
        // })
        // writeScrollY
      } else {
        event.preventDefault()
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
  }
  &__item {
    margin-top: spvw(10px);
    transform: translateY(10px);
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
      font-size: spfz(34px);
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
