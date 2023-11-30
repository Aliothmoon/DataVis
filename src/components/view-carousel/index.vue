<script setup>
import {Carousel, CarouselItem} from '@arco-design/web-vue'
import MoreView from "@/components/more-view/index.vue";


</script>

<template>
  <div style="width: 100%;display:flex;align-items: center;justify-content:center">
    <carousel style="width: 100%;height: 600px;background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);"
              :auto-play="true"
              animation-name="card"
              indicator-position="outer"
              :trigger="'hover'"
              :indicator-type="'line'"
    >
      <carousel-item v-for="i in 3">
        <MoreView></MoreView>
      </carousel-item>
    </carousel>
  </div>
</template>

<style scoped>

</style>
