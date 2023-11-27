<script>
import PicChart from "@/components/pie-chart/index.vue";
import WordCloud from "@/components/word-cloud/index.vue";
import {ref} from "vue";
import Radar from "@/components/radar/index.vue";
import BarProChart from "@/components/bar-pro-chart/index.vue";
import BarPro from "@/components/bar-pro-chart/index.vue";
export default {
  name: "Top",
  components: {
    BarPro,
    Radar,
    WordCloud,
    // PicChart,
  },
  setup: () => {
    const size = ref(0.67);
    return {
      size
    }
  },
  mounted: () => {
  }
}
</script>

<template>
  <a-split v-model:size="size">
    <template #first>
<!--      <PicChart></PicChart>-->
      <Radar></Radar>
      <BarPro></BarPro>
    </template>
    <template #second>
      <WordCloud></WordCloud>
    </template>
  </a-split>
</template>

<style scoped>

</style>
