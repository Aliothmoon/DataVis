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
</template>

<style scoped>
</style>
