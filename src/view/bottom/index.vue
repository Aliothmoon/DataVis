<script>
import BrushLineChart from "@/components/brush-line-chart/index.vue";
import DTable from "@/components/table/index.vue";
import LineChart from "@/components/line-chart/index.vue";

export default {
  name: "Bottom",
  components: {
    LineChart, BrushLineChart, DTable
  },
}
</script>

<template>
  <a-row :align="'center'">
    <a-col :span="11" style="height: 100%;margin-left: 60px">
      <a-card class="all-box-shadow" hoverable style="height: 100%;margin-right: 5px;">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" :title="'提交次数表'">
            <BrushLineChart></BrushLineChart>
          </a-tab-pane>
          <a-tab-pane key="2" :title="'总得分表'">
            <LineChart></LineChart>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="11" style="margin-left: 16px">
      <a-card class="all-box-shadow" hoverable style="height: 100%">
        <DTable></DTable>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
</style>
