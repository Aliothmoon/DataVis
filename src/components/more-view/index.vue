<script>
import * as d3 from 'd3';
import {GeoInfo, GeoMapping} from "@/data/source.js";
import {ListView, useTooltip} from "@/utils/tooltip.js";
import {useStore} from "@/store/index.js";
import {Card, CardMeta} from '@arco-design/web-vue'
import {ref} from "vue";


export default {
  name: "MoreView",
  components: {
    Card, CardMeta
  },
  props: {
    url: String,
  },
  setup: () => {
    const store = useStore();
    store.index = (store.index + 1) % 33
    const id = ref(store.index);
    return {
      id
    }
  },
  mounted() {
    const id = this.id;
    const GS = GeoInfo[id];
    const [show, hide] = useTooltip()
    const width = 600, height = 600;
    const projection = d3.geoMercator()
        .center(GS.cp)
        .scale((+GS.size / width * height) * 2)
        .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection)

    const svg = d3.select(`#A${id}`)
        .attr('width', width)
        .attr('height', height)
    const colors = d3.scaleOrdinal(d3.schemePaired)
    svg.selectAll("g")
        .data(GS.features)
        .enter()
        .append("g")
        .append("path")
        .attr('d', path)
        .attr("stroke", d => colors(d))
        .attr("stroke-width", 1)
        .attr("fill", d => colors(d))
        .on("mouseover", function (e, d) {
          show(e).html(ListView([`${GeoMapping[`${GS.id}`]}`, `${d.properties.name}`,]))
          d3.select(this).attr("fill", '#ffff33');
        })
        .on("mouseout", function (e, d) {
          hide()
          d3.select(this).attr("fill", colors(d));
        });
    //添加坐标
    svg.selectAll("g")
        .append('text')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .attr('x', d => {
          const position = projection(d.properties.centroid || [0, 0]);
          return position[0];
        })
        .attr('y', d => {
          const position = projection(d.properties.centroid || [0, 0]);
          return position[1];
        })
        .text(d => d.properties.name);


  }
}
</script>

<template>
  <card style="" :bordered="false" class="back-color" hoverable>
    <svg :id="`A${id}`"></svg>
  </card>
</template>

<style scoped>
.back-color {
  background-color: rgba(255, 255, 255, 0);
}
</style>
