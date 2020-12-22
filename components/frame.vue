<template>
  <div class="m-frame">
    <div class="m-frame--mid" />
  </div>
</template>

<style lang="scss" scoped>
.m-frame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:before,
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: spvw(29px);
    background: url('~@/assets/img/common/bg_frame_top.svg') no-repeat;
    background-size: cover;
  }

  &:after {
    transform: translateY(-1px) rotate(180deg);
  }
  &--mid {
    background: $brown_pale2;
    background-image: url('~@/assets/img/paper_main.png');
    height: 100%;
    border-left: spvw(2.4px) solid $brown_dark2;
    border-right: spvw(2.4px) solid $brown_dark2;
  }
}
</style>
