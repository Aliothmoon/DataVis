<script>
import BarChart from "@/components/bar-chart/index.vue";
import DTable from "@/components/table/index.vue";
import {ref} from "vue";
import LineChart from "@/components/line-chart/index.vue";
import BarPro from "@/components/bar-pro-chart/index.vue";

export default {
  name: "Bottom",
  components: {BarPro, LineChart, BarChart, DTable},
  setup: () => {
    const size = ref(0.58);
    return {
      size
    }
  },
  mounted: () => {

  },
  watch: {
    size: (n, o) => {

    }
  }
}
</script>

<template>
  <a-row :align="'center'">
    <a-col :span="11" style="height: 100%;margin-left: 60px">
      <a-card style="height: 100%;margin-right: 5px;" class="all-box-shadow" hoverable>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" :title="'提交次数表'">
            <BarChart></BarChart>
          </a-tab-pane>
          <a-tab-pane key="2" :title="'总得分表'">
            <LineChart></LineChart>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="11" style="margin-left: 16px">
      <a-card style="height: 100%" class="all-box-shadow" hoverable>
        <DTable></DTable>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.split {
  height: 440px;
}
</style>
