<script lang="ts">
import {reactive} from "vue";
import * as d3 from 'd3';
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

        let data = reactive([]);

        d3.csv('src/assets/output.csv').then(function(parsedData) {
            parsedData.forEach((row, index) => {
                data.push({
                    key: index.toString(),
                    className: row.className,
                    score: row.score,
                    maxScore: row.maxScore,
                    minScore: row.minScore,
                });
            });
        });

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
