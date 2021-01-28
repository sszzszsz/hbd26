<template>
  <main class="l-main">
    <div>
      <div class="l-main__cont">
        <div ref="ttl" class="m-ttl">
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
          class="m-ticket"
        />

        <form
          v-if="isSubmit === false"
          name="ticket"
          netlify
          netlify-honeypot="bot-field"
          @submit.prevent
        >
          <div class="p-sec__wrap">
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
                    <input id="agree" v-model="checkBox" type="checkbox" />
                    <span class="p-checkBox--txt">上記に同意する</span>
                  </label>
                </div>
                <p v-if="errorFlag === true" class="p-checkBox--error">
                  同意ボタンをチェックしてください
                </p>
              </div>
            </section>
          </div>
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
          <div class="p-send">
            <svg
              ref="sendIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="84.749"
              height="78.365"
              viewBox="0 0 84.749 78.365"
              class="p-send__icon"
            >
              <g transform="translate(-119.467 -25.997)">
                <g ref="dec" class="p-send__icon__dec">
                  <path
                    d="M178.765,37.644l11.8-5.055-4.887-5.9Z"
                    transform="translate(11.699 0.137)"
                    fill="#e3d182"
                  />
                  <path
                    d="M181.087,42.964l10.972,1.316-1.1-6.5Z"
                    transform="translate(12.157 2.324)"
                    fill="#e3d182"
                  />
                  <path
                    d="M173.422,35.486,177.679,27,172.1,26Z"
                    transform="translate(10.385)"
                    fill="#e3d182"
                  />
                </g>
                <path
                  d="M119.467,62.088v40.428h68.49l.066-40.428-34.1-26.731Z"
                  transform="translate(0 1.847)"
                  fill="#928d82"
                />
                <g class="p-send__icon__letter">
                  <rect
                    width="55.443"
                    height="57.358"
                    transform="translate(126.023 43.348)"
                    fill="#fdfcf3"
                  />
                  <rect
                    width="36.103"
                    height="1.862"
                    transform="translate(135.808 52.111)"
                    fill="#e4e2d9"
                  />
                  <rect
                    width="36.103"
                    height="1.862"
                    transform="translate(135.808 58.586)"
                    fill="#e4e2d9"
                  />
                  <rect
                    width="36.103"
                    height="1.862"
                    transform="translate(135.808 65.062)"
                    fill="#e4e2d9"
                  />
                </g>
                <path
                  d="M119.467,57.683V98.111L153.746,77.9Z"
                  transform="translate(0 6.251)"
                  fill="#b3b0a7"
                />
                <path
                  d="M182.374,57.683V98.111L148.1,77.9Z"
                  transform="translate(5.649 6.251)"
                  fill="#b3b0a7"
                />
                <path
                  d="M119.516,94.75l34.22-20.184L188.013,94.78Z"
                  transform="translate(0.01 9.582)"
                  fill="#928d82"
                />
              </g>
            </svg>
          </div>
          <p>上記のお願いをうけたまわりました<br />実行されるまでしばしおまちください</p>
          <div class="m-btn m-btn--small">
            <NuxtLink to="/ticket/" class="m-btn__inr">
              <span class="m-btn__txt m-btn__txt--main">一覧にもどる</span>
            </NuxtLink>
          </div>
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
import ticket from '~/components/ticket.vue'

export default Vue.extend({
  components: {
    ticket,
  },
  transition: {
    name: 'detail',
    mode: 'out-in',
    afterEnter(el) {
      console.log('🏂 チケット詳細 afterEnter')
    },
    beforeLeave(el) {
      console.log('🏂 チケット詳細 beforeLeave')
    },
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
      errorFlag: false,
    }
  },
  created() {
    this.getClickedTicket()
  },
  beforeMounted() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('🏂 チケット詳細')
      this.scrollEl = document.querySelectorAll('.js-scroll')
      window.scrollTo(0, 0)
      this.loadingAni()
    },
    loadingAni() {
      const originPos = this.$refs.ticket.$el.offsetTop - window.scrollY
      const originW = this.$refs.ticket.$el.offsetWidth
      const prevPos =
        this.$store.state.global.scrollY === 0 ? originPos * 2 : this.$store.state.global.scrollY
      const _this = this
      const tl = gsap.timeline({
        defaults: { ease: 'Expo.easeInOut' },
        onComplete() {
          _this.obserber()
        },
      })
      tl.set('.m-ticket', { position: 'fixed', top: prevPos, width: originW })
        .to('.m-ticket', {
          top: originPos - 1,
          duration: 1,
        })
        .to('.m-ticket', {
          position: '',
          width: '',
          top: '',
          duration: 0.1,
        })
        .to('.m-ttl', {
          opacity: 1,
          duration: 0.5,
          delay: -0.2,
        })
    },
    /**
     * スクロール検知（IntersectionObserver）
     */
    obserber() {
      console.log('🏂 スクロール検知')
      gsap.registerPlugin(ScrollTrigger)
      this.scrollEl.forEach((el, index) => {
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
        this.errorFlag = false
        axios.post('/', this.encode(formData), axiosConfig).then(() => {
          this.isSubmit = true
          window.scrollTo(0, 0)
          this.updateTicketsInfo()
          this.doneAnimation()
        })
      } else {
        this.errorFlag = true
      }
    },
    /**
     * WebStrorageの更新
     */
    updateTicketsInfo() {
      const today = new Date()
      const curenntMonth = today.getMonth() + 1
      const curenntDay = today.getDate()
      const arrNum = Number(this.$route.params.id) - 1
      this.$store.commit('global/updateTicketsInfo', {
        index: arrNum,
        month: curenntMonth,
        date: curenntDay,
        flag: true,
      })
    },
    /**
     * 完了ページアニメーション
     */
    doneAnimation() {
      const _this = this
      window.setTimeout(animation, 500)
      function animation() {
        const timeLine = gsap.timeline({ onComplete: addClass })
        timeLine.to('.p-sec--done', {
          duration: 0.8,
          opacity: 1,
          ease: 'Circ.easeOut',
        })
      }

      function addClass() {
        _this.$refs.sendIcon.classList.add('is-animate')
      }
    },
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'ja',
      },
    }
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
  opacity: 0;
  @include mq() {
    margin-bottom: 40px;
  }
}
.m-btn {
  margin-bottom: spvw(20px);
  @include mq() {
    margin-bottom: 0;
  }
}
.m-link {
  margin: spvw(30px) 0 spvw(40px);
  @include mq() {
    margin: 30px 0 50px;
  }
}
.m-ticket {
  @include mq() {
    max-width: 600px;
  }
}
.p {
  &-ticket {
    transition-delay: 1s;
  }
  &-detail--txt {
    text-align: center;
    font-size: spfz(14px);
    @include mq() {
      font-size: 14px;
    }
  }
  &-sec {
    @include mq(lg) {
      width: 45%;
    }
    &__wrap {
      @include mq(lg) {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 120px 0;
      }
    }
    &--skew {
      position: relative;
      margin: spvw(70px) 0 spvw(70px);
      @include mq(lg) {
        margin: 0;
        width: 45%;
      }
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
        @include mq(lg) {
          display: none;
        }
      }
    }
    &--inr {
      position: relative;
      z-index: 100;
      padding: spvw(50px) 0 spvw(70px);
      font-size: spfz(14px);
      @include mq() {
        font-size: 14px;
      }
      @include mq(lg) {
        padding: 0;
      }
    }
    &--done {
      opacity: 0;
      margin-top: spvw(30px);
      p {
        font-size: spfz(14px);
        text-align: center;

        & + p {
          margin-top: 1em;
        }
      }
      .m-btn {
        margin-top: spvw(50px);
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
    &--error {
      padding-top: 0.5em;
      color: #ce4040;
      text-align: center;
    }
  }
  &-hope--txt {
    text-align: center;
    font-size: spfz(14px);
    margin-bottom: 1em;
    @include mq() {
      font-size: 14px;
    }
  }
  &-hope--txtarea {
    font-size: 16px;
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
    transform: scale(0.88);
    box-shadow: 0px 0px 3px #bbb2a8;
  }
  &-send {
    display: block;
    width: 100%;
    text-align: center;
    margin: spvw(30px) auto;
    &__icon {
      transform: translateX(8%);
      &__letter {
        transform: translateY(-100%);
        transition: transform 0.5s;
      }
      &__dec {
        opacity: 0;
        transition: opacity 0.3s;
        transition-delay: 0.5s;
      }
      &.is-animate {
        .p-send__icon__letter {
          transform: translateY(0%);
        }
        .p-send__icon__dec {
          opacity: 1;
        }
      }
    }
  }
}
</style>
