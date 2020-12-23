<template>
  <div class="m-decoration">
    <ul class="m-starList">
      <li v-for="n in 8" :key="n" class="m-star__item">
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
    <ul class="m-snowList">
      <li v-for="n in 8" :key="n" class="m-snow__item">
        <div class="m-snow__inr">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14.982"
            height="14.982"
            viewBox="0 0 14.982 14.982"
          >
            <path
              d="M10.691,7.1,7.612,5.436l3.079-1.666a.328.328,0,0,0,.133-.464L10.1,2.13a.376.376,0,0,0-.5-.124L6.524,3.671V.34A.352.352,0,0,0,6.162,0H4.711a.352.352,0,0,0-.363.34V3.671L1.27,2.005a.376.376,0,0,0-.5.124L.049,3.307a.328.328,0,0,0,.133.464L3.261,5.436.182,7.1a.328.328,0,0,0-.133.464L.774,8.743a.376.376,0,0,0,.5.124L4.349,7.2v3.331a.352.352,0,0,0,.363.34H6.162a.352.352,0,0,0,.363-.34V7.2L9.6,8.867a.376.376,0,0,0,.5-.124l.725-1.177A.328.328,0,0,0,10.691,7.1Z"
              transform="matrix(-0.53, -0.848, 0.848, -0.53, 5.762, 14.982)"
            />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@mixin animation() {
  svg {
    animation-name: star;
    animation-delay: minMaxRandom(0, 2, 1s);
    animation-duration: minMaxRandom(10, 20, 1s);
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-timing-function: linear;
  }
}
@keyframes star {
  0% {
    opacity: 0;
    top: 0;
    transform: rotate(0);
  }
  5% {
    opacity: 0.8;
  }
  // 50% {
  //   top: 100%;
  // }
  95% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    top: 100%;
    transform: rotate(180deg);
  }
}

.m-decoration {
  position: relative;
  z-index: 5;
}
.m-starList,
.m-snowList {
  position: fixed;
  width: 100%;
  height: 100%;
  mix-blend-mode: color-burn;
  top: 0;
  left: 0;

  svg {
    position: absolute;
    mix-blend-mode: lighten;
  }
  path {
    fill: $brown_dark2;
    opacity: 0.8;
  }
}

.m-star,
.m-snow {
  &__item {
    position: absolute;
    height: minMaxRandom(10, 50, 1%);
  }
  &__inr {
    width: 20px;
    height: 100%;
    position: relative;
  }
}

.m-starList li {
  transform: scale(1.25);
  &:nth-child(1) {
    top: 5%;
    left: 7%;
    @include animation();
  }
  &:nth-child(2) {
    top: 57%;
    left: 20%;
    @include animation();
  }
  &:nth-child(3) {
    top: 15%;
    left: 33%;
    @include animation();
  }
  &:nth-child(4) {
    top: 33%;
    left: 16%;
    @include animation();
  }
  &:nth-child(5) {
    top: 78%;
    left: 43%;
    @include animation();
  }
  &:nth-child(6) {
    top: 2%;
    left: 66%;
    @include animation();
  }
  &:nth-child(7) {
    top: 68%;
    left: 86%;
    @include animation();
  }
  &:nth-child(8) {
    top: 24%;
    left: 78%;
    @include animation();
  }
}
.m-snowList {
  path {
    fill: $brown_dark1;
  }
  li.m-snow__item {
    &:nth-child(1) {
      top: 8%;
      left: 10%;
      @include animation();
    }
    &:nth-child(2) {
      top: 3%;
      left: 85%;
      @include animation();
    }
    &:nth-child(3) {
      top: 19%;
      left: 45%;
      @include animation();
    }
    &:nth-child(4) {
      top: 75%;
      left: 6%;
      @include animation();
    }
    &:nth-child(5) {
      top: 58%;
      left: 37%;
      @include animation();
    }
    &:nth-child(6) {
      top: 82%;
      left: 78%;
      @include animation();
    }
    &:nth-child(7) {
      top: 75%;
      left: 56%;
      @include animation();
    }
    &:nth-child(8) {
      top: 84%;
      left: 27%;
      @include animation();
    }
  }
}
</style>
