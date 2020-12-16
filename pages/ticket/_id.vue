<template>
  <main class="l-main">
    <star />
    <div class="l-main__cont">
      <div ref="ttl" class="m-ttl js-scroll">
        <div class="m-ttl__logo">
          <img src="@/assets/img/logo_top.svg" alt="HAPPY BIRTHDAY 26th" />
        </div>
        <h1 class="m-ttl__txt"><span>SPECAIL TICKET</span></h1>
      </div>
      <ticket
        :id="id"
        ref="ticket"
        :index="index"
        :num="num"
        :ttl="ttl"
        :link-frag="false"
        class="js-scroll"
      />
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
      tickets: ticketLists,
    }
  },
  created() {
    this.getClickedTicket()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('🏂 チケット詳細')
      this.setEvent()
    },

    /**
     * スクロール検知（IntersectionObserver）
     */
    obserber() {
      // 今回の交差を監視する要素
      this.ticketListEl = document.querySelectorAll('.js-scroll')
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
     * clickされた情報を元に値を設定
     */
    getClickedTicket() {
      this.index = this.$store.state.global.clickedTicket - 1
      console.log(this.index)
      this.id = this.tickets[this.index].id
      this.num = this.tickets[this.index].num
      this.ttl = this.tickets[this.index].ttl
    },

    /**
     * イベント付与
     */
    setEvent() {
      const self = this
      const body = document.getElementById('__nuxt')
      // ページ遷移アニメーション終了イベント
      body.addEventListener('afterEnter', () => {
        self.obserber()
      })
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
.m-ttl {
  margin-bottom: pcvw(40px);
}
.p-ticket {
  transition-delay: 1s;
}
.js-scroll {
  // opacity: 0;
  // transform: translateY(10px);
  // transition: opacity 0.3s, transform 0.3s;
  // &.is-view {
  //   opacity: 1;
  //   transform: translateY(0);
  // }
}
</style>
