<template>
  <div>
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from "../components/public/tab/tab.vue"

  export default {
    components: {
      Tab,
    }
  }
</script>

<style lang="css">

</style>
