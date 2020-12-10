<template class="m-ticket">
  <nuxt-link to="" class="m-ticket__inr">
    <dl class="m-ticket__box">
      <dt class="m-ticket__num">
        <span class="m-ticket__numTxt">TICKET 01</span>
      </dt>
      <dd class="m-ticket__dtl">
        <p class="m-ticket__ttl">XXXXXXXXXXXX</p>
        <p class="m-ticket__date">DeadLine : 2020/12/31</p>
      </dd>
    </dl>
    <div class="m-ticket__limit">
      <span class="m-ticket__limitTxt">ONLY ONCE</span>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.m {
  &-ticket {
    position: relative;
    background: #e4e2d9;
    border: 1px solid $brown_dark2;
    border-right: none;
    width: calc(100% - 15px);
    height: 95px;
    display: flex;
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

    &__inr {
      display: flex;
      justify-content: space-between;
      background: $brown_pale2;
      border: 1px solid $brown_dark2;
      width: calc(100% - 16px);
      margin: 8px auto;
      padding: 5px 12px;
      color: $brown_dark2;
      text-decoration: none;

      &:before {
        display: block;
        content: '';
        width: 14px;
        height: 11px;
        background-image: url('~@/assets/img/bg_frame_corner_tl.svg');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 5px;
        left: 2px;
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
        top: 5px;
        right: 3px;
      }
    }
    &__box {
      &:before {
        display: block;
        content: '';
        width: 14px;
        height: 11px;
        background-image: url('~@/assets/img/bg_frame_corner_bl.svg');
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        bottom: 6px;
        left: 3px;
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
        bottom: 6px;
        right: 3px;
      }
    }
    &__num {
      position: relative;
      font-size: spfz(10px);
      @include josefin-m();
      display: flex;
      align-items: center;
      &:before,
      &:after {
        content: '';
        display: inline-block;
        height: 1px;
        width: spvw(20px);
        background: $brown_dark2;
      }
      &:before {
        left: 0;
        flex-shrink: 0;
      }
      &:after {
        width: spvw(50px);
      }
    }
    &__numTxt {
      padding: 0 1em;
      flex-shrink: 0;
    }
    &__ttl {
      padding: 0.3em 0;
      @include notosans-m();
      font-size: spfz(15px);
    }
    &__date {
      @include josefin-b();
      font-size: spfz(12px);
    }
    &__limit {
      width: 16%;
      position: relative;
    }
    &__limitTxt {
      display: block;
      @include josefin-b-i();
      font-size: spfz(10px);
      transform: rotate(-90deg);
      position: absolute;
      top: 38%;
      left: 0%;
      white-space: nowrap;
    }
  }
}
</style>
