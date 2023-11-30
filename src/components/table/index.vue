<script>
import {h, reactive, ref} from "vue";
import * as d3 from 'd3';
import {ClassOutput} from "@/data/source.js";
import {Button, Modal} from "@arco-design/web-vue";
import MoreView from "@/components/more-view/index.vue";
import ViewCarousel from "@/components/view-carousel/index.vue";
import {useStore} from "@/store/index.js";

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
      {
        title: 'Chart',
        render: ({record}) => {
          return h(
              Button,
              {
                type: 'primary',
                size: 'small',
                onClick: () => {
                  Modal.open({
                    title: record.className,
                    width: '700px',
                    content: () => {
                      return h(ViewCarousel)
                    }
                  });
                }
              }, () => {
                return "更多"
              }
          );
        }
      },
    ];

    const data = ref(ClassOutput.map((row, index) => ({
      key: index,
      className: row.className,
      score: row.score,
      maxScore: row.maxScore,
      minScore: row.minScore,
    })));
    const store = useStore();
    const handleChange = (e) => {
      store.trigger = true
      store.current = 'trigger'
      setTimeout(() => {
        store.trigger = false;
        store.current = 'trigger'
      }, 100)
    }
    return {
      data, columns, handleChange
    }

  },
}
</script>

<template>
  <div>
    <a-table :columns="columns"
             :data="data"
             :pagination="false"
             :virtual-list-props="{height:'30vh'}"
             hoverable
             @change="handleChange"
    />
  </div>
</template>

<style scoped>

</style>
