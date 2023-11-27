<template>
  <svg id="radar"></svg>
</template>

<script>
import * as d3 from 'd3';
import * as d3ip from 'd3-interpolate-path'
export default {
  name: "Radar",
  mounted() {
    let exam_paper_id = 22541
    let svg = null;

    function drawRadarChart() {
      d3.csv('../src/assets/radar.csv')
          .then(data => {
            let i;
            let x;
            let y;
            let angle;
            const filteredData = data.filter(d => d.exam_paper_id == exam_paper_id.toString());
            console.log(filteredData)
            const dataset = filteredData.map(d => {
              return {
                name: d.problem_id + ":" + d.know_name,
                value: d.score / 6 * 100
              };
            });
            const padding = 50;
            const svgWidth =520;
            const svgHeight = 400;
            const centerX = svgWidth / 2;
            const centerY = svgHeight / 2;
            const radius = Math.min(centerX, centerY) - padding;
            const numTicks = dataset.length;
            const angleScale = d3.scaleLinear()
                .domain([0, numTicks])
                .range([0, Math.PI * 2]);
            const valueScale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, radius]);
            if (svg == null) {
              svg = d3.select("#radar")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight)
                  // .style('border', '1px solid #999999');
            } else {
              svg.selectAll("*").remove();
            }
            const gradient = svg.append("defs")
                .append("radialGradient")
                .attr("id", "gradient")
                .attr("cx", "50%")
                .attr("cy", "50%")
                .attr("r", "50%")
                .attr("fx", "50%")
                .attr("fy", "50%");
            gradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "#f6efa6")
                .attr("stop-opacity", 1);
            gradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "#69b3a2")
                .attr("stop-opacity", 1);
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
                  .attr("stroke", "#cccccc")
                  .attr("stroke-width", 1);
            }
            const line = d3.line()
                .x(function (d, i) {
                  return centerX + valueScale(d.value) * Math.sin(angleScale(i));
                })
                .y(function (d, i) {
                  return centerY - valueScale(d.value) * Math.cos(angleScale(i));
                });
            svg.append("path")
                .datum(dataset)
                .attr("fill", "url(#gradient)")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 2)
                .attr("d", line)
                .transition() // 添加过渡
                .duration(1000) // 过渡持续时间，单位为毫秒
                .attrTween("d", function (d) {
                  var previous = d3.select(this).attr("d");
                  var current = line(d);

                  return d3ip.interpolatePath(previous, current);
                });
            const labels = svg.append("g")
                .attr("class", "labels");
            for (i = 0; i < numTicks; i++) {
              angle = angleScale(i);
              const r = radius + padding * 0.5;
              x = centerX + r * Math.sin(angle);
              y = centerY - r * Math.cos(angle);
              labels.append("text")
                  .attr("x", x)
                  .attr("y", y)
                  .attr("text-anchor", "middle")
                  .text(dataset[i].name);
            }
            exam_paper_id = exam_paper_id >= 22760 ? 22541 : exam_paper_id + 1;
          })
    }
    drawRadarChart();
    setInterval(drawRadarChart, 1500);
  }
}
</script>

<style scoped>

</style>