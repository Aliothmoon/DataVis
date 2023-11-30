<script>
import * as d3 from 'd3';
import {ListView, useTooltip} from "@/utils/tooltip.js";
import {LineChart, Radar} from "@/data/source.js";
// 总得分表
export default {
  name: "LineChart",
  mounted: () => {
    const [show, hide] = useTooltip();
    const preprocess = () => {
      return LineChart.map(d => ({
        submitTime: new Date(Math.floor(d.submitTime / 60) * 60),
        count: +d.count,
        score: +d.score,
      }));
    }
    const data = preprocess()


    // 按日期排序submitData
    data.sort((a, b) => d3.ascending(a.submitTime, b.submitTime));
    // 将数据按照提交时间进行分组，并计算每个时间点的提交次数
    const svg = d3.select('#line-chart')
    const width = 800;
    const height = 220;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 50;
    const formatTime = d3.timeFormat("%H:%M");

    const startDate = new Date("Wed Jan 05 2022 09:45:00");
    const endDate = new Date("Wed Jan 05 2022 12:15:00");
    const x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([marginLeft, width - marginRight]);
    const y = d3.scaleLinear([0, d3.max(data, d => d.score)], [height - marginBottom, marginTop]);

    const line = d3.line()
        .x(d => x(d.submitTime))
        .y(d => y(d.score));

    svg
        .attr('height', 290)
        .attr("width", width)
        .attr("viewBox", [0, 0, width, height])

    svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x).tickFormat(formatTime).tickSizeOuter(0));

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "#388d43")
            .attr("text-anchor", "start")
            .attr('font-size', 12)
            .text("↑ 分数"));

    svg.append("path")
        .transition(d3.transition(d3.easeCircle).duration(1001))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(data))

    svg.append("line")
        .attr("x1", marginLeft)
        .attr("y1", y(0))
        .attr("x2", width - marginRight)
        .attr("y2", y(0))
        .attr("stroke-width", 1)
        .attr("stroke", "black");
    svg.on('mousemove', (e) => {
      show(e).html(ListView(['提交速率曲线']))
    }).on('mouseout', () => {
      hide()
    })

  }
}
</script>

<template>
  <div>
    <svg id="line-chart"></svg>
  </div>
</template>

<style scoped>

</style>
