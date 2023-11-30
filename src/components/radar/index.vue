<template>
  <!--  <div style="height: 40vh;width: 20vw">-->
  <svg id="radar" preserveAspectRatio="xMaxYMax"></svg>
  <!--  </div>-->
</template>

<script>
import * as d3 from 'd3';
import * as d3ip from 'd3-interpolate-path'
import {Radar} from "@/data/source.js";
import {useTooltip, ListView} from "@/utils/tooltip.js";
import {useStore} from "@/store/index.js";
import {debounce} from "lodash";

export default {
  name: "Radar",
  mounted() {
    const store = useStore()
    let examPaperId = 22541
    let dataset = [];

    const [show, hidden] = useTooltip();
    const preprocess = () => {
      const filteredData = Radar.filter(d => d.examPaperId === examPaperId.toString());
      return filteredData.map(d => ({
        name: `${d.problemId} : ${d.knowName}`,
        origin: d.knowName,
        value: d.score / 6 * 100
      }));
    }

    const svgWidth = 340;
    const svgHeight = 290;
    const padding = 20;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    let i, x, y, angle;
    const svg = d3.select("#radar")
        .attr('width', svgWidth * 0.9)
        .attr("viewBox", [0, 0, svgWidth, svgHeight])
    const radius = Math.min(centerX, centerY) - padding;

    const valueScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, radius]);


    function drawRadarChart() {
      dataset = preprocess();
      const numTicks = dataset.length;
      const angleScale = d3.scaleLinear()
          .domain([0, numTicks])
          .range([0, Math.PI * 2]);
      const line = d3.line()
          .x(function (d, i) {
            return centerX + valueScale(d.value) * Math.sin(angleScale(i));
          })
          .y(function (d, i) {
            return centerY - valueScale(d.value) * Math.cos(angleScale(i));
          });
      const gradient = svg
          .append("defs")
          .append("radialGradient")

      const transition = d3.transition(d3.easePolyInOut).duration(100)
      const colors = d3.scaleOrdinal(d3.schemeCategory10)
      gradient.attr("id", "gradient")

          .attr("cx", "50%")
          .attr("cy", "50%")
          .attr("fx", "50%")
          .attr("fy", "50%")
          .transition(transition)
          .attr("r", "50%")

      gradient.append("stop")
          .transition(transition)
          .attr("offset", "0%")
          .attr("stop-color", "#7dceff")
          .attr("stop-opacity", 0.3);
      gradient.append("stop")
          // .transition(transition)
          .attr("offset", "100%")
          .attr("stop-color", "#7dceff")
          .attr("stop-opacity", 0.7);

      const polygon = svg.append("g")
          .attr("class", "polygon");
      for (i = 0; i < numTicks; i++) {
        angle = angleScale(i);
        x = centerX + valueScale(100) * Math.sin(angle);
        y = centerY - valueScale(100) * Math.cos(angle);
        polygon.append("line")
            .attr("x1", centerX)
            .attr("y1", centerY)
            .attr("x2", x)
            .attr("y2", y)
            .attr("stroke", "#132a9f")
            .attr("stroke-width", 1);
      }

      svg.append("path")
          .datum(dataset)
          .attr("fill", "url(#gradient)")
          .attr("stroke", "rgba(247,114,52,0.39)")
          .attr("stroke-width", 3)
          .attr("d", line)
          .transition(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function (d) {
            let previous = d3.select(this).attr("d");
            let current = line(d);
            return d3ip.interpolatePath(previous, current);
          });
      const labels = svg
          .append("g")
          .attr("class", "labels");

      for (i = 0; i < numTicks; i++) {
        angle = angleScale(i);
        const r = radius + padding * 0.5;
        x = centerX + r * Math.sin(angle);
        y = centerY - r * Math.cos(angle);
        labels.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr('font-size', 12)
            .style("font-family", "Impact")
            .attr('fill', `${colors(dataset[i].name)}`)
            .attr("text-anchor", "middle")
            .text(dataset[i].name);
      }
      examPaperId = examPaperId >= 22760 ? 22541 : examPaperId + 1;
    }

    const f = debounce(() => {
      store.problemCategory = dataset;
      store.current = 'problemCategory'
    }, 30)
    store.$subscribe((mutation, state) => {
      if (state.current === 'trigger' && state.trigger) {
        setTimeout(f, 0)
      }
    })
    svg.on('mousemove', (e) => {
      f()
      show(e).html(ListView(dataset.filter(d => d.name).map(d => d.name)))
    }).on('mouseout', (e) => {
      hidden()
    })
    drawRadarChart();
    drawRadarChart();
    setInterval(() => {
      svg.selectAll('*')
          .transition(d3.transition(d3.easePolyOut).duration(30))
          .remove();
      drawRadarChart()
    }, 2100);
  }
}
</script>

<style scoped>

</style>
