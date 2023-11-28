<script setup>
import * as d3 from 'd3';
import {defineComponent, onMounted} from "vue";
import {PopulationAge} from '@/data/source.js'

defineComponent({
  name: "PicChart"
})
onMounted(() => {

  const svg = d3.select('.pic-chart')
  const width = 180;
  const height = Math.min(width, 400);
  const data = PopulationAge;
  // Create the color scale.
  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

  // Create the pie layout and arc generator.
  const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

  const arc = d3.arc()
      .innerRadius(30)
      .outerRadius(70);


  const better = d3.arc()
      .innerRadius(30)
      .outerRadius(90);

  const labelRadius = arc.outerRadius()() * 0.8;

  // A separate arc generator for labels.
  const arcLabel = d3.arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

  const arcs = pie(data);

  svg.attr("viewBox", [-width / 2, -height / 2, width, height])

  svg.append("g")
      .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", d => color(d.data.name))

      .attr("d", arc)
      .on('mouseenter', function (e) {
        d3.select(this)
            .transition(d3.transition(d3.easeBackInOut).duration(120))
            .attr("d", better)
      })
      .on('mouseout', function (e) {
        d3.select(this)
            .transition(d3.transition(d3.easeBackInOut).duration(300))
            .attr("d", arc)
      })
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`)

  // Create a new arc generator to place a label close to the edge.
  // The label shows the value if there is enough room.
  // svg.append("g")
  //     .attr("text-anchor", "middle")
  //     .selectAll()
  //     .data(arcs)
  //     .join("text")
  //     .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
  //     .call(text => text.append("tspan")
  //         .attr("y", "-0.4em")
  //         .attr("font-weight", "bold")
  //         .text(d => d.data.name))
  //     .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
  //         .attr("x", 0)
  //         .attr("y", "0.7em")
  //         .attr("fill-opacity", 0.7)
  //         .text(d => d.data.value.toLocaleString("en-US")));

})
</script>


<template>
  <div style="width: 6vw; height: 11vh;">
    <svg class="pic-chart"></svg>
  </div>
</template>

<style scoped>

</style>
