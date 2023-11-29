<script>
import {reactive, ref} from "vue";
import * as d3 from 'd3';
import {ClassOutput} from "@/data/source.js";

export default {
  name: "DTable",
  setup: () => {
    const columns = [
      {
        title: 'Class',
        dataIndex: 'className',
        ellipsis: true,
        tooltip: true,


        sortable: {
          sortDirections: ['ascend', 'descend']
        }
      },
      {
        title: 'Average',
        dataIndex: 'score',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
      },
      {
        title: 'Max Score',
        dataIndex: 'maxScore',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
      },
      {
        title: 'Min Score',
        dataIndex: 'minScore',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
      },
    ];

    const data = ref([]);
    data.value = ClassOutput.map((row, index) => ({
      key: index,
      className: row.className,
      score: row.score,
      maxScore: row.maxScore,
      minScore: row.minScore,
    }));


    return {
      data, columns
    }
  }
}
</script>

<template>
  <div>
    <a-table :columns="columns"
             :data="data"
             :pagination="false"
             :virtual-list-props="{height:'26vh'}"
             hoverable
    />
  </div>
</template>

<style scoped>

</style>
