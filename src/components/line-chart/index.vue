<script>
// @departed
import * as d3 from 'd3';
import {ListView, useTooltip} from "@/utils/tooltip.js";
import {LineChart, Radar} from "@/data/source.js";

export default {
  name: "LineChart",
  mounted: () => {
    const [show, hide] = useTooltip();
    const data =LineChart;

    //const allMinutes = d3.range(Math.floor(d3.min(data, d => +d.submitTime) / 60), Math.ceil(d3.max(data, d => +d.submitTime) / 60));
    const preprocess = () => {
      return data.map(d => ({
        submitTime:new Date(Math.floor(d.submitTime/ 60)*60) ,
        count:d.count,
        score: d.score ,
      }));
    }
    let a=preprocess()
    console.log(a)
    // 将数据按照提交时间进行分组，并计算每个时间点的提交次数
   // const groupedData = d3.rollups(a, v => v.length, d => Math.floor(+d.submitTime / 60));
   //
   //  // console.log(groupedData)
   //  a = groupedData.map(([minute,count]) => ({date: new Date(minute * 60 ),count}));
   //  console.log(a)
    // submitData=d3.map(d=>d.score)
    // 扩展submitData，将没有提交的时间点的计数设置为0
    // allMinutes.forEach(minute => {
    //   if (!submitData.some(d => +d.date === minute * 60 * 1000)) {
    //     submitData.push({date: new Date(minute * 60 * 1000), count: 0});
    //   }
    // });

    // 按日期排序submitData
  //   submitData.sort((a, b) => d3.ascending(a.date, b.date));
  //   // 将数据按照提交时间进行分组，并计算每个时间点的提交次数
  //   console.log(submitData)
  //   const svg = d3.select('#line-chart')
  //   const width = 900;
  //   const height = 300;
  //   const marginTop = 30;
  //   const marginRight = 20;
  //   const marginBottom = 20;
  //   const marginLeft = 30;
  //   //
  //   const formatTime = d3.timeFormat("%H:%M");
  //
  //   const startDate = new Date("Wed Jan 05 2022 09:45:00");
  //   const endDate = new Date("Wed Jan 05 2022 12:15:00");
  //
  //   console.log(startDate)
  //   //const x = d3.scaleUtc(d3.extent(submitData, d => d.date), [marginLeft, width - marginRight]);
  //   const x = d3.scaleTime()
  //       .domain([startDate, endDate])
  //       .range([marginLeft, width - marginRight]);
  //   const y = d3.scaleLinear([0, d3.max(submitData, d => d.count)], [height - marginBottom, marginTop]);
  //
  //   const line = d3.line()
  //       .x(d => x(d.date))
  //       .y(d => y(d.count));
  //
  //   svg.attr("width", width)
  //       .attr("viewBox", [0, 0, width, height])
  //
  //   svg.append("g")
  //       .attr("transform", `translate(0, ${height - marginBottom})`)
  //       .call(d3.axisBottom(x).tickFormat(formatTime).tickSizeOuter(0));
  //
  //   svg.append("g")
  //       .attr("transform", `translate(${marginLeft},0)`)
  //       .call(d3.axisLeft(y).ticks(height / 40))
  //       .call(g => g.select(".domain").remove())
  //       .call(g => g.selectAll(".tick line").clone()
  //           .attr("x2", width - marginLeft - marginRight)
  //           .attr("stroke-opacity", 0.1))
  //       .call(g => g.append("text")
  //           .attr("x", -marginLeft)
  //           .attr("y", 10)
  //           .attr("fill", "#bcbd22")
  //           .attr("text-anchor", "start")
  //           .text("↑ 提交次数"));
  //
  //   // Append a path for the line.
  //   svg.append("path")
  //       .transition(d3.transition(d3.easeCircle).duration(1001))
  //
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", 1.5)
  //       .attr("d", line(submitData))
  // //  console.log(submitData)
  //
  //   // Add a horizontal line at y=0
  //   svg.append("line")
  //       .attr("x1", marginLeft)
  //       .attr("y1", y(0))
  //       .attr("x2", width - marginRight)
  //       .attr("y2", y(0))
  //       .attr("stroke-width", 1)
  //       .attr("stroke", "black");
  //   svg.on('mousemove', (e) => {
  //     show(e).html(ListView(['提交时间分布']))
  //   }).on('mouseout', () => {
  //     hide()
  //   })

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
