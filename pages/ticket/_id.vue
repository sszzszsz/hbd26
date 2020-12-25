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
        name="ticket"
        netlify
        netlify-honeypot="bot-field"
        @submit.prevent
      >
        <section class="p-sec js-scroll is-fadeUp">
          <div class="m-secTtl">
            <span class="m-secTtl--sub"
              ><span class="m-secTtl--subInr">TICKET {{ num }}</span></span
            >
            <h2 class="m-secTtl--main">DETAIL</h2>
          </div>
          <p class="p-detail--txt">{{ detail }}</p>
        </section>

        <section class="p-sec--skew js-scroll is-fadeUp">
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
                <input id="agree" v-model="checkBox" type="checkbox" @change="changeCheckBox()" />
                <span class="p-checkBox--txt">上記に同意する</span>
              </label>
            </div>
          </div>
        </section>

        <section class="js-scroll is-fadeUp">
          <p class="p-hope--txt">希望がある場合、以下に記入してください</p>
          <textarea
            id="message"
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
          <div class="m-link">
            <NuxtLink to="/ticket/" class="m-link__inr">
              <span class="m-link__txt">戻る</span>
            </NuxtLink>
          </div>
        </section>
      </form>

      <div v-if="isSubmit === true" class="p-sec--done">
        <p>ご利用ありがとうございます</p>
        <p>上記のお願いをうけたまわりました<br />実行されるまでしばしおまちください</p>
        <div class="m-btn m-btn--small">
          <NuxtLink to="/ticket/" class="m-btn__inr">
            <span class="m-btn__txt m-btn__txt--main">一覧にもどる</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
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
      tickets: ticketLists,
      id: null,
      num: null,
      ttl: null,
      detail: null,
      rules: null,
      isSubmit: false,
      checkBox: false,
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
      this.scrollEl = document.querySelectorAll('.js-scroll')
      window.scrollTo(0, 0)
      this.obserber()
    },

    /**
     * スクロール検知（IntersectionObserver）
     */
    obserber() {
      gsap.registerPlugin(ScrollTrigger)
      this.scrollEl.forEach((el, index) => {
        scroll(el)
      })
      function scroll(el) {
        gsap.to(el, {
          // 動かしたい要素は".a"
          opacity: 1,
          y: 10,
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
     * URLを元に値を設定
     */
    getClickedTicket() {
      const id = window.location.href.split('/')[4]
      this.index = Number(id) - 1
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
    /**
     * 同意ボタン
     */
    changeCheckBox() {
      console.log('changed')
      this.checkBox = true
    },
    /**
     * Ajaxで送信するようにエンコードする
     * netlifyのフォームをAjaxで利用するためにはエンコードが必要
     * https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax
     */
    encode(data) {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&')
    },
    /**
     * リクエストボタン
     */
    submit() {
      const formData = {
        'form-name': 'ticket',
        ticketName: this.ttl,
        message: this.message,
      }
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      // 同意ボタンにチェックがついていたらAjaxで送信
      if (this.checkBox) {
        axios.post('/', this.encode(formData), axiosConfig).then(() => {
          this.isSubmit = true
          this.updateTicketsInfo()
        })
      }
    },
    /**
     * WebStrorageの更新
     */
    updateTicketsInfo() {
      const today = new Date()
      const curenntMonth = today.getMonth()
      const curenntDay = today.getDate()
      const arrNum = Number(this.$route.params.id) - 1
      this.$store.commit('global/updateTicketsInfo', {
        index: arrNum,
        month: curenntMonth,
        date: curenntDay,
        flag: true,
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
  margin-bottom: spvw(20px);
}
.m-link {
  margin: spvw(30px) 0 spvw(40px);
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
      margin: spvw(60px) 0 spvw(60px);
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 200vw;
        height: 100%;
        background: #fdfcf3;
        transform: rotate(-8deg);
        left: -50%;
        background-image: url('~@/assets/img/line_stitch.svg'), url('~@/assets/img/line_stitch.svg');
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
    &--done {
      margin-top: spvw(30px);
      p {
        font-size: spfz(14px);
        text-align: center;

        & + p {
          margin-top: 1em;
        }
      }
      .m-btn {
        margin-top: spvw(30px);
      }
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
    color: $brown_dark2;
    margin-bottom: spvw(30px);
  }
}
</style>
