<template>
  <div>
    <div style="margin-bottom: 10px;">
      <Top></Top>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
import Bottom from "@/view/bottom/index.vue";
import Top from "@/view/top/index.vue";


export default defineComponent({
  components: {
    Top,
    Bottom
  },
  setup() {
  },
});
</script>
<style scoped>


</style>
