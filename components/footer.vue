<template>
  <footer class="l-footer">
    <ul class="m-footer__link">
      <li class="m-footer__linkItem">
        <NuxtLink to="/" class="m-footer__linkInr"> HOME </NuxtLink>
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
  }
  &__link {
    padding: spvw(12px) spvw(12px);
  }
  &__linkItem {
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      display: inline-block;
      width: 40px;
      height: 40px;
      background: $brown_pale1;
      border-radius: 50%;
      border: 1px solid $brown_dark2;
      background-image: url('~@/assets/img/common/icon_home.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &__linkInr {
    @include josefin-b();
    text-decoration: none;
    color: $brown_dark2;
    display: inline-block;
    padding-left: 0.5em;
  }
}
</style>
