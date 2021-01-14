<template>
  <div class="m-ticket">
    <NuxtLink v-if="linkFrag == true" :to="`/ticket/${index}/`" class="m-ticket__inr">
      <img :src="renderImg(`bg_ticket_${id}.svg`)" class="m-ticket__bg" />
      <dl class="m-ticket__box">
        <dt class="m-ticket__num">
          <span class="m-ticket__numTxt">TICKET {{ num }}</span>
        </dt>
        <dd class="m-ticket__dtl">
          <p class="m-ticket__ttl">{{ ttl }}</p>
          <p class="m-ticket__date">DeadLine : 2020/12/31</p>
        </dd>
      </dl>
      <div class="m-ticket__limit">
        <span class="m-ticket__limitTxt">ONLY ONCE</span>
      </div>
    </NuxtLink>

    <div v-else class="m-ticket__inr">
      <img :src="renderImg(`bg_ticket_${id}.svg`)" class="m-ticket__bg" />
      <dl class="m-ticket__box">
        <dt class="m-ticket__num">
          <span class="m-ticket__numTxt">TICKET {{ num }}</span>
        </dt>
        <dd class="m-ticket__dtl">
          <p class="m-ticket__ttl">{{ ttl }}</p>
          <p class="m-ticket__date">DeadLine : 2021/12/31</p>
        </dd>
      </dl>
      <div class="m-ticket__limit">
        <span class="m-ticket__limitTxt">ONLY ONCE</span>
      </div>
    </div>

    <div class="m-ticket--used">
      <p class="m-ticket--usedTxt">USED</p>
      <p class="m-ticket--usedDate">2021/{{ month }}/{{ date }}</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: String, // String型に限定
      required: true, // 必須項目
    },
    index: {
      type: Number,
      required: true,
    },
    linkFrag: {
      type: Boolean,
      required: true,
    },
    ttl: {
      type: String,
      required: true,
    },
    num: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDmy: false,
      month: '',
      date: '',
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('🐣 ticket')
      this.getUsedDate()
    },
    /**
     * 使用済みの場合に日付を取得
     */
    getUsedDate() {
      this.$store.state.global.ticketsInfo.find((el) => {
        if (el.use === true) {
          this.month = el.month
          this.date = el.date
        }
      })
    },
    renderImg(file) {
      return require('@/assets/img/ticket/' + file)
    },
  },
})
</script>
<style lang="scss" scoped>
.m {
  &-ticket {
    position: relative;
    background: #e4e2d9;
    background-image: url('~@/assets/img/paper_ticket_outer.png');
    border: 1px solid $brown_dark2;
    border-right: none;
    width: calc(100% - 7px);
    height: spvw(96px);
    min-height: 96px;
    display: flex;
    box-shadow: 1px 2px 3px #6c655d6e;
    z-index: 50;
    @include mq() {
      height: pcvw(96px);
      min-width: pcvw(280px);
    }

    &:after {
      display: block;
      content: '';
      width: 17px;
      height: calc(100% + 2px);
      background-image: url('~@/assets/img/bg_ticket_edge.svg');
      background-repeat: repeat-y;
      background-size: 15px 19px;
      background-position: top right;
      position: absolute;
      top: -1px;
      right: -14px;
    }

    &--used {
      display: none;
    }

    &__bg {
      position: absolute;
      bottom: 0;
      right: 0%;
      z-index: 51;
      opacity: 0.7;
      height: 100%;
      width: auto;
    }

    &__inr {
      display: flex;
      justify-content: space-between;
      background: #fdfcf8;
      background-image: url('~@/assets/img/paper_ticket_inr.png');
      border: 1px solid $brown_dark2;
      width: calc(100% - 16px);
      margin: spvw(8px) auto;
      color: $brown_dark2;
      text-decoration: none;
      position: relative;
      z-index: 52;
      @include mq() {
        margin: pcvw(8px) auto;
      }
      &:before {
        display: block;
        content: '';
        width: 14px;
        height: 11px;
        background-image: url('~@/assets/img/bg_frame_corner_tl.svg');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: -4px;
        left: -7px;
      }
      &:after {
        display: block;
        content: '';
        width: 14px;
        height: 11px;
        background-image: url('~@/assets/img/bg_frame_corner_tr.svg');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: -4px;
        right: -6px;
      }
    }
    &__box {
      padding: spvw(5px) spvw(8px) spvw(5px) spvw(12px);
      width: 88%;
      position: relative;
      z-index: 52;
      @include mq() {
        padding: pcvw(5px) pcvw(8px) pcvw(5px) pcvw(12px);
        width: 92%;
      }

      &:before {
        display: block;
        content: '';
        width: 14px;
        height: 11px;
        background-image: url('~@/assets/img/bg_frame_corner_bl.svg');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        bottom: -3px;
        left: -7px;
      }
      &:after {
        display: block;
        content: '';
        width: 14px;
        height: 11px;
        background-image: url('~@/assets/img/bg_frame_corner_br.svg');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        bottom: -3px;
        right: -6px;
        @include mq() {
          right: calc(-12% - 11px);
        }
      }
    }
    &__num {
      position: relative;
      font-size: spfz(10px);
      @include josefin-m();
      display: flex;
      align-items: center;
      @include mq() {
        font-size: pcfz(10px);
      }
      &:before,
      &:after {
        content: '';
        display: inline-block;
        height: 1px;
        width: spvw(20px);
        background: $brown_dark2;
        @include mq() {
          width: pcvw(20px);
        }
      }
      &:before {
        left: 0;
        flex-shrink: 0;
      }
      &:after {
        width: spvw(50px);
        @include mq() {
          width: pcvw(50px);
        }
      }
    }
    &__numTxt {
      padding: 0 1em;
      flex-shrink: 0;
    }
    &__ttl {
      padding: 0.3em 0 1em;
      @include notosans-b();
      font-size: spfz(14px);
      @include mq() {
        font-size: pcfz(12px);
        // white-space: nowrap;
      }
    }
    &__date {
      @include josefin-r();
      font-size: spfz(12px);
      position: absolute;
      bottom: 0.5em;
      left: 1em;
      @include mq() {
        font-size: pcfz(10px);
      }
    }
    &__limit {
      width: 12%;
      position: relative;
      padding: spvw(5px) spvw(12px);
      background-image: url('~@/assets/img/line_dot.svg');
      background-repeat: no-repeat;
      background-size: contain;
      @include mq() {
        padding: pcvw(5px) pcvw(12px);
      }
    }
    &__limitTxt {
      display: block;
      @include josefin-b-i();
      font-size: spfz(10px);
      transform: rotate(-90deg);
      position: absolute;
      top: 40%;
      left: -38%;
      white-space: nowrap;
      @include mq() {
        font-size: pcfz(10px);
        top: 42%;
        left: -50%;
      }
    }
  }
}

.is-used .m-ticket {
  &--used {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #6c655db0;
    border: 1px solid $brown_dark2;
    border-right: none;
    position: absolute;
    top: 0;
    z-index: 53;
    @include josefin-b();
    color: #e4e2d9;
    line-height: 1;

    &:after {
      display: block;
      content: '';
      width: 17px;
      height: calc(100% + 2px);
      background-image: url('~@/assets/img/bg_ticket_used_edge.svg');
      background-repeat: repeat-y;
      background-size: 15px 19px;
      background-position: top right;
      position: absolute;
      top: -1px;
      right: -15px;
    }
  }
  &--usedTxt {
    font-size: spfz(30px);
  }
  &--usedDate {
    font-size: spfz(12px);
    padding-top: 0.3em;
  }
}
</style>
