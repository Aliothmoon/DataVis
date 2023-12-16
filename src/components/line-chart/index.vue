<script>
import * as d3 from 'd3';
import {ListView, useTooltip} from "@/utils/tooltip.js";
import {LineChart, Radar} from "@/data/source.js";

export default {
  name: "LineChart",
  mounted(){
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
    // d3.ascending对一个数组进行升序排序
    data.sort((a, b) => d3.ascending(a.submitTime, b.submitTime));
    // 将数据按照提交时间进行分组，并计算每个时间点的提交次数
    const svg = d3.select('#line-chart')
    const width = 800;
    const height = 220;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 50;
    //用于格式化时间的函数,将日期对象格式化为小时和分钟的字符串表示
    const formatTime = d3.timeFormat("%H:%M");

    const startDate = new Date("Wed Jan 05 2022 09:45:00");
    const endDate = new Date("Wed Jan 05 2022 12:15:00");
    //创建时间scale
    const x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([marginLeft, width - marginRight]);
    //创建线性scale
    //d3.max表示在 data 数组中找到 score 属性的最大值
    const y = d3.scaleLinear([0, d3.max(data, d => d.score)], [height - marginBottom, marginTop]);

    // 创建一个line generator
    const line = d3.line()
        // 设置x轴的坐标，使用x轴的比例尺将数据中的submitTime转换为坐标
        .x(d => x(d.submitTime))
        // 设置y轴的坐标，使用y轴的比例尺将数据中的score转换为坐标
        .y(d => y(d.score));

    //定义了一个从(0,0)开始，宽度为width，高度为height的矩形区域。
    svg.attr('height',290)
        .attr("width", width)
        .attr("viewBox", [0, 0, width, height])
    /*
       将坐标轴向下移动到图形区域的底部。
       call()在选择集上调用指定的函数
       d3.axisBottom创建一个底部坐标轴
       tickFormat设置坐标轴的刻度格式和tickSizeOuter外部刻度线的大小
     */
    svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x).tickFormat(formatTime).tickSizeOuter(0));

    /*
      .call(g=>g.select(".domain").remove()) 去除坐标轴上的轴线，只保留刻度线
      选择所有的刻度线元素，并进行克隆操作
      设置刻度线的 stroke-opacity 属性，即刻度线的透明度
      .attr("x2",width-marginRight-marginLeft)刻度线的终点位置
     */
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        //去除y坐标轴轴线
        .call(g => g.select(".domain").remove())
        //绘制水平线
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        //绘制y坐标轴上的文本
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "#388d43")
            //文本对齐方式为开始
            .attr("text-anchor", "start")
            .attr('font-size', 12)
            .text("↑ 分数"));

    //绘制坐标轴
    svg.append("path")
        //使用D3的transition方法创建一个平滑的过渡效果，这里使用圆形缓动（easeCircle）和1001毫秒的持续时间
        .transition(d3.transition(d3.easeCircle).duration(1001))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        //// 设置描边的宽度为1.5像素
        .attr("stroke-width", 1.5)
        .attr("d", line(data))

    svg.append("line")
        // 设置线的起始位置，x1和y1表示线的起始点的坐标
        .attr("x1", marginLeft)
        .attr("y1", y(0))
        // 设置线的结束位置，x2和y2表示线的结束点的坐标
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
