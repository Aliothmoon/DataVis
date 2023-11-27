<script>
import BarChart from "@/components/bar-chart/index.vue";
import DTable from "@/components/table/index.vue";
import {ref} from "vue";

export default {
  name: "Bottom",
  components: {BarChart, DTable},
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
  <div>
    <a-split min="80px" class="split" v-model:size="size" disabled>
      <template #first>
        <BarChart></BarChart>
      </template>
      <template #second>
        <a-card title="数据表格">
          <template #extra>
            <a-link>More</a-link>
          </template>
          <DTable></DTable>
        </a-card>
      </template>
    </a-split>
  </div>
</template>

<style scoped>
.split {
  height: 500px;
}
</style>
