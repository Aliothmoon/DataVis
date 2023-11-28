<script>
import * as d3 from 'd3';

export default {
  name: "Radar",
  mounted() {
    let exam_paper_id = 22541

    function drawRadarChart() {
      d3.select("#radar").remove();
      d3.csv('src/assets/radar.csv')
          .then(data => {
            // Filter the data for the current exam_id and take the first five records
            const filteredData = data.filter(d => d.exam_paper_id == exam_paper_id.toString())
            console.log(filteredData)
            // Map the data to the required format
            const dataset = filteredData.map(d => {
              return {
                name: d.problem_id + ":" + d.know_name,
                value: d.score / 6 * 100  // Scale the score to a percentage
              };
            });
            const padding = 50; // 内边距
            const svgWidth = 600; // SVG元素宽度
            const svgHeight = 400; // SVG元素高度
            const centerX = svgWidth / 2; // 中心点x坐标
            const centerY = svgHeight / 2; // 中心点y坐标
            const radius = Math.min(centerX, centerY) - padding; // 半径
            const numTicks = dataset.length; // 刻度数量，即多边形共有几个角
            const angleScale = d3.scaleLinear()
                .domain([0, numTicks])
                .range([0, Math.PI * 2]);

            const valueScale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, radius]);
            const svg = d3.select("#radar")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .style('border', '1px solid #999999');

// 定义渐变 中心向外渐变
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
            for (let i = 0; i < numTicks; i++) {
              const angle = angleScale(i);
              const x = centerX + valueScale(100) * Math.sin(angle);
              const y = centerY - valueScale(100) * Math.cos(angle);
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
                .attr("d", line);
            const labels = svg.append("g")
                .attr("class", "labels");
            for (let i = 0; i < numTicks; i++) {
              const angle = angleScale(i);
              const r = radius + padding * 0.5;
              const x = centerX + r * Math.sin(angle);
              const y = centerY - r * Math.cos(angle);
              labels.append("text")
                  .attr("x", x)
                  .attr("y", y)
                  .attr("text-anchor", "middle")
                  .attr("fill", "#000000")
                  .text(dataset[i].name);
            }


            // Increment exam_id or reset it to 22541 if it reaches 22760
            exam_paper_id = exam_paper_id >= 22760 ? 22541 : exam_paper_id + 1;
          });
    }

    drawRadarChart();
    // setInterval(drawRadarChart, 1500);
  }
}
</script>

<template>
  <svg id="radar"></svg>
</template>

<style scoped>

</style>
