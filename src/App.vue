<template>
  <m-header></m-header>
  <router-view></router-view>
</template>
<script>
import Header from '@/components/header'
export default {
  name: 'app',
  components:{
      MHeader: Header
  }
}
</script>
<style lang="scss">
</style>
