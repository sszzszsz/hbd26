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

      <form
        v-if="isSubmit === false"
        name="contact"
        method="POST"
        netlify
        netlify-honeypot="bot-field"
        @submit.prevent
      >
        <section class="p-sec">
          <div class="m-secTtl">
            <span class="m-secTtl--sub"
              ><span class="m-secTtl--subInr">TICKET {{ num }}</span></span
            >
            <h2 class="m-secTtl--main">DETAIL</h2>
          </div>
          <p class="p-detail--txt">{{ detail }}</p>
        </section>

        <section class="p-sec--skew">
          <div class="p-sec--inr">
            <div class="m-secTtl">
              <span class="m-secTtl--sub"
                ><span class="m-secTtl--subInr">TICKET {{ num }}</span></span
              >
              <h2 class="m-secTtl--main">AGREEMENT</h2>
            </div>
            <ul class="p-agrList">
              <li v-for="(rule, index) in rules" :key="index" class="p-agrList--item">
                <span>{{ rule }}</span>
              </li>
            </ul>
            <div class="p-checkBox">
              <label for="agree" class="p-checkBox--label">
                <input id="agree" type="checkbox" />
                <span class="p-checkBox--txt">上記に同意する</span>
              </label>
            </div>
          </div>
        </section>

        <section>
          <p class="p-hope--txt">希望がある場合、以下に記入してください</p>
          <textarea
            id="hope"
            v-model="message"
            class="p-hope--txtarea"
            name="message"
            cols="5"
            rows="10"
          />

          <div class="m-btn m-btn--bw">
            <button type="submit" class="m-btn__inr" @click="submit()">
              <span class="m-btn__txt m-btn__txt--main">REQUEST</span>
              <span class="m-btn__txt m-btn__txt--sub">お願いする</span>
            </button>
          </div>
        </section>
      </form>

      <div v-if="isSubmit === true">
        <p>サンクス</p>
        <p><nuxt-link to="/" v-text="'TOPへ'" /></p>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
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
      tickets: ticketLists,
      id: null,
      num: null,
      ttl: null,
      detail: null,
      rules: null,
      isSubmit: false,
      message: '',
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
      this.detail = this.tickets[this.index].detail
      this.rules = this.tickets[this.index].rules
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
    encode(data) {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&')
    },
    submit() {
      console.log('send')
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'contact',
            ticketName: this.ttl,
            messege: this.message,
          }),
          axiosConfig
        )
        .then(() => {
          this.isSubmit = true
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
  margin-bottom: spvw(40px);
}
.m-btn {
  margin-bottom: spvw(60px);
}

.p {
  &-ticket {
    transition-delay: 1s;
  }
  &-detail--txt {
    text-align: center;
    font-size: spfz(14px);
  }
  &-sec {
    &--skew {
      position: relative;
      margin: spvw(50px) 0 spvw(50px);
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 200vw;
        height: 100%;
        background: #e4e2d9;
        transform: rotate(-8deg);
        left: -50%;
        background-image: url('~@/assets/img/line_dot_wt.svg'), url('~@/assets/img/line_dot_wt.svg');
        background-repeat: repeat-x, repeat-x;
        background-position: center 2.5%, center 97.5%;
        border: 1px solid #6c655d;
        box-shadow: 0 2px 3px #6c655d63;
      }
    }
    &--inr {
      position: relative;
      z-index: 100;
      padding: spvw(50px) 0 spvw(70px);
      font-size: spfz(14px);
    }
  }

  &-agrList {
    padding: 0 spvw(10px);
    &--item {
      margin-bottom: 0.5em;
      display: flex;
      &::before {
        content: '・';
      }
    }
  }

  &-checkBox {
    text-align: center;
    margin-top: 2em;
    &--label {
      position: relative;
      display: inline-flex;
      align-items: center;
      &:before {
        content: '';
        display: inline-block;
        width: 1.25em;
        height: 1.25em;
        border: 1px solid $brown_dark2;
        background: $brown_pale1;
        margin-right: 0.5em;
        border-radius: 2px;
      }
    }
    &--txt {
      display: inline-block;
      &::after {
        content: '';
        display: inline-block;
        width: 0.6em;
        height: 1.4em;
        border-right: 2px solid $brown_dark2;
        border-bottom: 2px solid $brown_dark2;
        transform: rotate(45deg);
        position: absolute;
        top: -0.2em;
        left: 0.6em;
        opacity: 0;
      }
    }
    input[type='checkbox']:checked + .p-checkBox--txt:after {
      opacity: 1;
    }
  }
  &-hope--txt {
    text-align: center;
    font-size: spfz(14px);
    margin-bottom: 1em;
  }
  &-hope--txtarea {
    font-size: spfz(14px);
    border: 1px solid $brown_dark2;
    border-radius: 2px;
    background: $brown_pale1;
    width: 100%;
    padding: 1em;
    max-height: 150px;
    min-height: 150px;
    overflow-y: auto;
    margin-bottom: 1em;
    color: $brown_dark2;
  }
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
