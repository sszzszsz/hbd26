<template>
  <footer class="l-footer">
    <ul class="m-footer__link">
      <li class="m-footer__linkItem">
        <NuxtLink to="/" class="m-footer__linkInr"><span>HOME</span></NuxtLink>
      </li>
    </ul>
    <small class="m-footer__copy">2021 Suzu Nagano</small>
  </footer>
</template>

<style lang="scss" scoped>
.l-footer {
  position: relative;
  z-index: 10;
}
.m-footer {
  &__copy {
    display: block;
    padding: spvw(10px);
    text-align: center;
    @include josefin-b();
    font-size: spfz(12px);
    @include mq() {
      font-size: pcfz(10px);
    }
    @include mq(lg) {
      font-size: 12px;
    }
  }
  &__link {
    padding: spvw(12px) spvw(12px);
  }
  &__linkItem {
    text-align: center;
  }
  &__linkInr {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    @include josefin-b();
    text-decoration: none;
    color: $brown_dark2;
    &::before {
      content: '';
      display: inline-block;
      width: 25px;
      height: 17px;
      background: $brown_pale1;
      background-image: url('~@/assets/img/common/icon_home.svg');
      background-repeat: no-repeat;
      background-position: top center;
    }
    span {
      display: inline-block;
    }
  }
}
</style>
