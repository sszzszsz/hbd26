<template>
  <div class="m-frame">
    <svg :viewBox="viewBox" class="m-frame__svg">
      <mask id="myMask">
        <!-- Everything under a white pixel will be visible -->
        <rect x="0" y="0" :width="width" :height="height" fill="white" />
        <g class="m-frame__tl">
          <circle cx="20" cy="20" r="20" fill="black" />
        </g>
        <g class="m-frame__tr">
          <circle cx="20" cy="20" r="20" fill="black" />
        </g>
        <g transform="translate(-10 780)" class="m-frame__bl">
          <circle cx="20" cy="20" r="20" fill="black" />
        </g>
        <g transform="translate(350 780)" class="m-frame__br">
          <circle cx="20" cy="20" r="20" fill="black" />
        </g>
      </mask>
      <!-- with this mask applied, we "punch" a heart shape hole into the circle -->
      <rect x="0" y="0" class="m-frame__bg" />
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
      width: 0,
      height: 0,
    }
  },
  created() {},
  mounted() {
    console.log('frame')
    this.setViewBox()
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
    rect {
      width: 100%;
      height: 100%;
    }
    mask {
      position: absolute;
      g {
        fill: none;
      }
    }
  }
  &__tl {
    transform: translate(-10px, -10px);
  }
  &__tr {
    transform: translate(100%, -10px);
    circle {
      transform: translateX(-30px);
    }
  }
  &__bl {
    transform: translate(-10px, 100%);
    circle {
      transform: translateY(-30px);
    }
  }
  &__br {
    transform: translate(100%, 100%);
    circle {
      transform: translate(-30px, -30px);
    }
  }
  &__bg {
    width: 100%;
    height: 100%;
    fill: $brown_pale2;
    mask: url(#myMask);
  }
}
</style>
