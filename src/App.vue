<script>
import Home from "@/view/home/index.vue";
import Radar from "@/components/radar/index.vue";
import LineChart from "@/components/line-chart/index.vue";
import ViewCarousel from "@/components/view-carousel/index.vue";


export default {
  components: {
    ViewCarousel,
    LineChart,
    Radar,
    Home
  }
}
</script>

<template>
    <Home></Home>
  <!--  <div style="height: 100vh;width: 500px;display:flex;justify-content:center;align-items:center">-->
  <!--      <Radar></Radar>-->
<!--  <LineChart></LineChart>-->
  <!--  </div>-->
<!--  <More></More>-->
<!--  <ViewCarousel></ViewCarousel>-->

</template>

<style scoped>
</style>
