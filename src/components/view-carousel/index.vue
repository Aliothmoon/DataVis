<script setup>
import {Carousel, CarouselItem} from '@arco-design/web-vue'
import MoreView from "@/components/more-view/index.vue";


</script>

<template>
  <div style="width: 100%;display:flex;align-items: center;justify-content:center">
    <carousel :auto-play="true"
              :indicator-type="'line'"
              :trigger="'hover'"
              animation-name="card"
              indicator-position="outer"
              style="width: 100%;height: 600px;background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);"
    >
      <carousel-item>
        <MoreView></MoreView>
      </carousel-item>
      <carousel-item>
        <MoreView></MoreView>
      </carousel-item>
      <carousel-item>
        <MoreView></MoreView>
      </carousel-item>
    </carousel>
  </div>
</template>

<style scoped>

</style>
