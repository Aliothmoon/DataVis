<template>
  <a-layout class="layout-demo">
    <a-layout-sider
        hide-trigger
        collapsible
        :collapsed="collapsed"
    >
      <div class="logo"/>
      <a-menu
          :defaultOpenKeys="['1']"
          :defaultSelectedKeys="['0_3']"
          :style="{ width: '100%' }"
          @menuItemClick="onClickMenuItem"
      >
        <a-menu-item key="0_1" disabled>
          <IconHome/>
          Menu 1
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar/>
          Menu 2
        </a-menu-item>
        <a-menu-item key="0_3">
          <IconCalendar/>
          Menu 3
        </a-menu-item>
        <a-sub-menu key="1">
          <template #title>
            <span><IconCalendar/>Navigation 1</span>
          </template>
          <a-menu-item key="1_1">Menu 1</a-menu-item>
          <a-menu-item key="1_2">Menu 2</a-menu-item>
          <a-sub-menu key="2" title="Navigation 2">
            <a-menu-item key="2_1">Menu 1</a-menu-item>
            <a-menu-item key="2_2">Menu 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3" title="Navigation 3">
            <a-menu-item key="3_1">Menu 1</a-menu-item>
            <a-menu-item key="3_2">Menu 2</a-menu-item>
            <a-menu-item key="3_3">Menu 3</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="4">
          <template #title>
            <span><IconCalendar/>Navigation 4</span>
          </template>
          <a-menu-item key="4_1">Menu 1</a-menu-item>
          <a-menu-item key="4_2">Menu 2</a-menu-item>
          <a-menu-item key="4_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px;">
        <a-button shape="round" @click="onCollapse">
          <IconCaretRight v-if="collapsed"/>
          <IconCaretLeft v-else/>
        </a-button>

      </a-layout-header>
      <a-layout style="padding: 0 2px;">
        <a-layout-content style="display: block">
          <Top></Top>

          <a-split direction="vertical">
            <template #first>
              <PicChart></PicChart>

              <!--              <BarChart></BarChart>-->
            </template>
            <template #second>
              <Bottom></Bottom>

            </template>
          </a-split>

        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
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
  IconIdcard,
} from '@arco-design/web-vue/es/icon';

import LineChart from "@/components/linc-chart/index.vue";
import BarChart from "@/components/bar-chart/index.vue";
import Bottom from "@/view/bottom/index.vue";
import Top from "@/view/top/index.vue";
import BarProChart from "@/components/bar-pro-chart/index.vue";
export default defineComponent({
  components: {
    Bottom,
    BarChart,
    LineChart,
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
