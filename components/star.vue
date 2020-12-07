<template>
  <ul class="m-starList">
    <li v-for="n in 30" :key="n" :class="['m-star-' + n]" class="m-star__item">
      <div class="m-star__inr">
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7">
          <path
            d="M4.3.212,3.519,1.8l-1.749.255a.383.383,0,0,0-.212.654L2.823,3.939l-.3,1.742a.383.383,0,0,0,.556.4l1.565-.823,1.565.823a.383.383,0,0,0,.556-.4l-.3-1.742L7.731,2.706a.383.383,0,0,0-.212-.654L5.77,1.8,4.988.212a.383.383,0,0,0-.687,0Z"
            transform="translate(-1.441 0.001)"
          />
        </svg>
      </div>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.m-starList {
  position: fixed;
  width: 100%;
  height: 100%;
}
.m-star {
  &__item {
    position: absolute;
    height: 50%;
  }
  &__inr {
    width: 20px;
    height: 100%;
    position: relative;
    svg {
      position: absolute;
      mix-blend-mode: color-dodge;
    }
    path {
      fill: #fdfaf3;
      opacity: 0.8;
    }
  }
}
@for $i from 1 through 30 {
  .m-starList li:nth-child(#{$i}) {
    $rondomNum: minMaxRandom(20, 30, 1%);
    top: minMaxRandom(0, 80, 1%);
    right: minMaxRandom(10, 90, 1%);
    svg {
      animation-name: star;
      animation-delay: minMaxRandom(0, 3, 1s);
      animation-duration: minMaxRandom(10, 20, 1s);
      animation-iteration-count: infinite;
      animation-fill-mode: both;
      animation-timing-function: linear;
    }
  }
}

@keyframes star {
  0% {
    top: 0;
    transform: rotate(0);
  }
  100% {
    top: 100%;
    transform: rotate(180deg);
  }
}
</style>
