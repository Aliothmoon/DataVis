<script>
import CurveChart from "@/components/curve-chart/index.vue";

export default {
  name: "TopLeftView",
  components: {CurveChart}
}
</script>

<template>
  <div class="card">
    <a-card :bordered="false">
      <a-row>
        <a-col :span="6">
          <a-statistic title="总体学生平均分" :value="14.99" :precision="2" :value-from="0" :start="start" animation>
            <template #prefix>
              <icon-arrow-rise/>
            </template>
            <template #suffix>/30分</template>
          </a-statistic>
        </a-col>
        <a-col :span="18">
          <CurveChart></CurveChart>
        </a-col>
      </a-row>


    </a-card>
  </div>
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
