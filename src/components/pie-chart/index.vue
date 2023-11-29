<script setup>
import * as d3 from 'd3';
import {defineComponent, onMounted} from "vue";
import {ExamPaper} from '@/data/source.js'
import {useTooltip, ListView} from "@/utils/tooltip.js";

defineComponent({
  name: "PicChart"
})
onMounted(() => {
  const [show, hide] = useTooltip();
  const svg = d3.select('.pic-chart')
  const width = 180;
  const height = Math.min(width, 400);
  // const data = PopulationAge;
  // Create the color scale.
  const paper = ExamPaper;

  let data = [
    {name: "0-5", value: 0},
    {name: "5-10", value: 0},
    {name: "10-15", value: 0},
    {name: "15-20", value: 0},
    {name: "20-25", value: 0},
    {name: "25-30", value: 0}
  ];
  paper.forEach(d => {
    let score = +d.score;
    if (score <= 5) data[0].value++;
    else if (score <= 10) data[1].value++;
    else if (score <= 15) data[2].value++;
    else if (score <= 20) data[3].value++;
    else if (score <= 25) data[4].value++;
    else if (score <= 30) data[5].value++;
  });

  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
  //
  // // Create the pie layout and arc generator.
  const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

  const arc = d3.arc()
      .innerRadius(25)
      .outerRadius(80);

  const better = d3.arc()
      .innerRadius(25)
      .outerRadius(90);

  const labelRadius = arc.outerRadius()() * 0.8;



  const arcs = pie(data);
  //
  svg.attr("viewBox", [-width / 2, -height / 2, width, height])
  //
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
      .on('mousemove', (e, d) => {
        const data = d.data;
        show(e).html(ListView([`分数段: ${data.name}`, `总体占比 ${(data.value / 2.2).toFixed(1)}%`]))
      })
      .on('mouseout', function (e) {
        d3.select(this)
            .transition(d3.transition(d3.easeBackInOut).duration(300))
            .attr("d", arc)
        hide()
      })
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`)


})
</script>


<template>
  <div style="width: 6vw; height: 11vh;">
    <svg class="pic-chart"></svg>
  </div>
</template>

<style scoped>

</style>
