<template>
  <main class="l-main">
    <p>list</p>
    <NuxtLink to="/">top</NuxtLink>
  </main>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('init')
    },
  },
})
</script>

<style lnag="scss" scoped>
.l-main {
  width: 100%;
}
</style>
