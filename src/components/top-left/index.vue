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
          <a-statistic :precision="2" :value="14.99" :value-from="0" animation title="总体学生平均分">
            <template #suffix>/30分</template>
          </a-statistic>
        </a-col>
        <a-col :offset="3" :span="15">
          <CurveChart></CurveChart>
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
