<script lang="ts" setup>
import {defineComponent} from "vue";
import PicChart from "@/components/pie-chart/index.vue";
import {useStore} from "@/store";

defineComponent({
  name: "TopRightView"
})
const store = useStore();


</script>

<template>
  <div class="card">
    <a-card :bordered="false">
      <a-row>

        <a-col :span="10">
          <PicChart></PicChart>
        </a-col>
        <a-col :span="7">
          <a-statistic :precision="2" :start="store.onRefreshDigitAnimation" :value="51.82" :value-from="0" animation
                       title="不及格人数占比">
            <template #prefix>
              <icon-arrow-rise/>
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </a-col>
        <a-col :span="7">
          <a-statistic :precision="2" :start="store.onRefreshDigitAnimation" :value="4.55" :value-from="0" animation
                       title="满分人数占比">
            <template #prefix>
              <icon-arrow-rise/>
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </a-col>
      </a-row>


    </a-card>
  </div>

</template>

<style scoped>
.card {
  width: 25vw;
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
