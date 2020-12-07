<template>
  <div class="m-frame">
    <svg :viewBox="viewBox" class="m-frame__svg">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      <g class="m-frame__outer">
        <mask id="mask1">
          <!-- Everything under a white pixel will be visible -->
          <rect x="0" y="0" :width="width" :height="height" fill="white" />
          <g class="m-frame__tl">
            <circle cx="0" cy="0" r="20" fill="black" />
          </g>
          <g class="m-frame__tr">
            <circle cx="0" cy="0" r="20" fill="black" />
          </g>
          <g class="m-frame__bl">
            <circle cx="0" cy="0" r="20" fill="black" />
          </g>
          <g class="m-frame__br">
            <circle cx="0" cy="0" r="20" fill="black" />
          </g>
        </mask>
        <rect x="0" y="0" class="m-frame__bd" />
      </g>
      <g class="m-frame__inr">
        <mask id="mask2">
          <!-- Everything under a white pixel will be visible -->
          <rect x="0" y="0" :width="width - 8" :height="height - 8" fill="white" />
          <g class="m-frame__tl">
            <circle cx="0" cy="0" r="24" fill="black" />
          </g>
          <g class="m-frame__tr">
            <circle cx="0" cy="0" r="24" fill="black" />
          </g>
          <g class="m-frame__bl">
            <circle cx="0" cy="0" r="24" fill="black" />
          </g>
          <g class="m-frame__br">
            <circle cx="0" cy="0" r="24" fill="black" />
          </g>
        </mask>
        <!-- with this mask applied, we "punch" a heart shape hole into the circle -->
        <rect x="0" y="0" class="m-frame__bg" />
        <image
          v-if="this.$store.state.global.pageName === 'index'"
          xlink:href="@/assets/img/bg.png"
          class="m-frame__img"
        />
      </g>
    </svg>
  </div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  props: {},
  data() {
    return {
      viewBox: '0 0 0 0',
      viewBoxAry: [0, 0, 0, 0],
      width: 375,
      height: 8,
    }
  },
  created() {},
  mounted() {
    console.log('frame')
    this.setViewBox()
    this.setEventLister()
  },
  methods: {
    setViewBox() {
      this.width = document.querySelector('.l-cont').offsetWidth
      this.height = document.querySelector('.l-cont').offsetHeight

      this.viewBoxAry[2] = this.width
      this.viewBoxAry[3] = this.height
      this.viewBox = this.viewBoxAry.join(',')
    },
    setEventLister() {
      window.addEventListener('resize', () => {
        this.setViewBox()
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.m-frame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 1;
  &__svg {
    position: relative;
    mask {
      position: absolute;
      g {
        fill: none;
      }
    }
  }
  &__bd {
    width: 100%;
    height: 100%;
    fill: $brown_dark1;
    mask: url(#mask1);
  }
  &__bg {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    fill: $brown_pale2;
    mask: url(#mask2);
    transform: translate(4px, 4px);
    rect {
      width: 100%;
      height: 100%;
    }
  }
  &__test {
    @extend .m-frame__bg;
    fill: none;
    background: url('~@/assets/img/bg.png');
  }
  &__img {
    display: block;
    mask: url(#mask2);
    opacity: 0.7;
    transform: translate(4px, 4px);
    filter: 'url(#blur)';
  }

  #mask1 {
    .m-frame {
      &__tl {
        transform: translate(10px, 10px);
      }
      &__tr {
        transform: translate(100%, 10px);
        circle {
          transform: translateX(-10px);
        }
      }
      &__bl {
        transform: translate(10px, 100%);
        circle {
          transform: translateY(-10px);
        }
      }
      &__br {
        transform: translate(100%, 100%);
        circle {
          transform: translate(-10px, -10px);
        }
      }
    }
  }
  #mask2 {
    .m-frame {
      &__tl {
        transform: translate(7px, 7px);
      }
      &__tr {
        transform: translate(100%, 7px);
        circle {
          transform: translateX(-14px);
        }
      }
      &__bl {
        transform: translate(7px, 100%);
        circle {
          transform: translateY(-14px);
        }
      }
      &__br {
        transform: translate(100%, 100%);
        circle {
          transform: translate(-14px, -14px);
        }
      }
    }
  }
}
</style>
