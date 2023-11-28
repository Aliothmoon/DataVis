<script setup lang="ts">
import {defineComponent} from "vue";
import PicChart from "@/components/pie-chart/index.vue";

defineComponent({
  name: "TopRightView"
})
</script>

<template>
  <div class="card">
    <a-card :bordered="false">
      <a-row>

        <a-col :span="10">
          <PicChart></PicChart>
        </a-col>
        <a-col :span="7">
          <a-statistic title="不及格人数占比" :value="51.82" :precision="2" :value-from="0" :start="start" animation>
            <template #prefix>
              <icon-arrow-rise/>
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </a-col>
        <a-col :span="7">
          <a-statistic title="满分人数占比" :value="4.55" :precision="2" :value-from="0" :start="start" animation>
            <template #prefix>
              <icon-arrow-rise/>
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </a-col>
      </a-row>


    </a-card>
  </div>

<!--  <div class="card">-->
<!--    <PicChart></PicChart>-->
<!--  </div>-->
</template>

<style scoped>
.card {
  width: 25vw;
  height: 13vh;
  background: rgb(255, 255, 255);
  border-radius: 0.4em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
}

.card:hover {
  border: #006fff 0.2em solid;
}
</style>
