<script setup>
import {Carousel, CarouselItem} from '@arco-design/web-vue'
import MoreView from "@/components/more-view/index.vue";


</script>

<template>
  <div style="width: 100%;display:flex;align-items: center;justify-content:center">
    <carousel style="width: 100%;height: 600px;"
              :auto-play="true"
              animation-name="card"
              indicator-position="outer"
    >
      <carousel-item v-for="i in 3">
        <MoreView></MoreView>
      </carousel-item>
    </carousel>
  </div>
</template>

<style scoped>

</style>
