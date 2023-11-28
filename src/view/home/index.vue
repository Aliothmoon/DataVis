<template>
  <div>
<!--     <CurveChart></CurveChart>-->
    <div style="margin-bottom: 10px">
      <Top></Top>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue';
import {Message} from '@arco-design/web-vue';
import WordCloud from "@/components/word-cloud/index.vue";
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';

import BarChart from "@/components/bar-chart/index.vue";
import Bottom from "@/view/bottom/index.vue";
import Top from "@/view/top/index.vue";
import BarProChart from "@/components/bar-pro-chart/index.vue";
import CurveChart from "@/components/curve-chart/index.vue";

export default defineComponent({
  components: {
    CurveChart,
    Bottom,
    BarChart,
    Top,
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
    WordCloud,
    BarProChart
  },
  setup() {
    const collapsed = ref(true);
    const onCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      collapsed,
      onCollapse,
      onClickMenuItem(key) {
        Message.info({content: `You select ${key}`, showIcon: true});
      }
    };
  },
});
</script>
<style scoped>


</style>
