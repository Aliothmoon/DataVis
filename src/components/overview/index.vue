<script>
import TopLeftView from "@/components/top-left/index.vue";
import TopMiddleView from "@/components/top-middle/index.vue";
import TopRightView from "@/components/top-right/indedx.vue";

export default {
  name: "Overview",
  components: {
    TopRightView, TopMiddleView, TopLeftView
  },
}
</script>

<template>
  <div style="display: flex;justify-content: space-around;align-items: center;margin-bottom: 10px;margin-top: 5px">
    <TopLeftView></TopLeftView>
    <TopMiddleView></TopMiddleView>
    <TopRightView></TopRightView>
  </div>

</template>

<style scoped>

</style>
