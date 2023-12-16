<script>
import WordCloud from "@/components/word-cloud/index.vue";
import Radar from "@/components/radar/index.vue";
import BarPro from "@/components/bar-pro-chart/index.vue";
import Overview from "@/components/overview/index.vue";

export default {
  name: "Top",
  components: {
    Overview,
    BarPro,
    Radar,
    WordCloud,
  },
}
</script>

<template>
  <div style="height: 1px;background-color: rgba(147,184,227,0.5);">
  </div>
  <Overview></Overview>
  <div style="margin-left: 60px;">
    <a-row :align="'center'">
      <a-col :span="6">
        <a-card class="all-box-shadow" hoverable>
          <Radar></Radar>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card class="all-box-shadow" hoverable style="margin:0 10px 0 10px;justify-content: center;display: flex">
          <BarPro></BarPro>
        </a-card>
      </a-col>
      <a-col :span="5" offset="">
        <a-card class="all-box-shadow" hoverable>
          <WordCloud></WordCloud>
        </a-card>
      </a-col>
    </a-row>
  </div>


</template>

<style scoped>

</style>
