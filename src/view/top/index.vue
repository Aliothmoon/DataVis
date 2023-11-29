<script>
import PicChart from "@/components/pie-chart/index.vue";
import WordCloud from "@/components/word-cloud/index.vue";
import {ref} from "vue";
import Radar from "@/components/radar/index.vue";
import BarProChart from "@/components/bar-pro-chart/index.vue";
import BarPro from "@/components/bar-pro-chart/index.vue";
import DTable from "@/components/table/index.vue";
import BarChart from "@/components/bar-chart/index.vue";
import Overview from "@/components/overview/index.vue";
import CurveChart from "@/components/curve-chart/index.vue";

export default {
  name: "Top",
  components: {
    CurveChart,
    Overview,
    PicChart,
    BarChart, DTable,
    BarPro,
    Radar,
    WordCloud,
    // PicChart,
  },
  setup: () => {
    // const size = ref(0.67);
    const size = ref(0.8);
    return {
      size
    }
  },
  mounted: () => {
  }
}
</script>

<template>
  <div style="height: 1px;background-color: rgba(147,184,227,0.5);">Head</div>
  <Overview></Overview>
  <div style="margin-left: 60px;">
    <a-row :align="'center'">
      <a-col :span="6" >
        <a-card class="all-box-shadow" hoverable>
          <Radar></Radar>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card class="all-box-shadow" hoverable style="margin:0 10px 0 10px;justify-content: center;display: flex">
          <BarPro></BarPro>
        </a-card>
      </a-col>
      <a-col :span="6" offset="">
        <a-card style="width: 20vw" class="all-box-shadow" hoverable>
          <WordCloud></WordCloud>
        </a-card>
      </a-col>
    </a-row>
  </div>


</template>

<style scoped>

</style>
