<template>
  <div id="layout">
    <!-- layout index.vue -->
    <layout-header></layout-header>
    <layout-nav></layout-nav>
    <layout-main></layout-main>
  </div>
</template>

<script>
import LayoutHeader from "../Layout/Components/Header";
import LayoutNav from "../Layout/Components/Nav";
import LayoutMain from "../Layout/Components/Main";
export default {
  name: "layout",
  components: {
    LayoutHeader,
    LayoutNav,
    LayoutMain
  },
  setup(){

  }
}
</script>

<style lang="scss" scoped>

</style>