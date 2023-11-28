<script>
import PicChart from "@/components/pie-chart/index.vue";
import TopLeftView from "@/components/top-left/index.vue";
import TopMiddleView from "@/components/top-middle/index.vue";
import TopRightView from "@/components/top-right/indedx.vue";

export default {
  name: "Overview",
  components: {TopRightView, TopMiddleView, TopLeftView, PicChart},
}
</script>

<template>
  <div style="display: flex;justify-content: center;width: 100%;margin-top: 10px;margin-bottom: 10px">
    <a-row :justify="'space-around'" style="width: 90%;height: 13vh">
      <a-col :span="8">
        <TopLeftView></TopLeftView>
      </a-col>
      <a-col :span="8">
        <TopMiddleView></TopMiddleView>
      </a-col>
      <a-col :span="8">
        <TopRightView></TopRightView>
      </a-col>
    </a-row>

  </div>

</template>

<style scoped>

</style>
