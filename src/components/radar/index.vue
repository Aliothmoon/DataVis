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
    name: "Radar", // 组件的名称
    mounted() { // Vue生命周期钩子，当组件被挂载到DOM后执行
        const store = useStore() // 使用Vuex的store
        let examPaperId = 22541 // 定义试卷ID
        let dataset = []; // 初始化数据集

        const [show, hidden] = useTooltip(); // 使用自定义的Tooltip
        const preprocess = () => { // 预处理函数
            const filteredData = Radar.filter(d => d.examPaperId === examPaperId.toString()); // 过滤数据
            return filteredData.map(d => ({ // 映射数据
                name: `${d.problemId} : ${d.knowName}`, // 定义名称
                origin: d.knowName, // 定义原始名称
                value: d.score / 6 * 100 // 计算值
            }));
        }

        const svgWidth = 340; // 定义SVG的宽度
        const svgHeight = 290; // 定义SVG的高度
        const padding = 20; // 定义内边距
        const centerX = svgWidth / 2; // 计算中心X坐标
        const centerY = svgHeight / 2; // 计算中心Y坐标
        let i, x, y, angle; // 定义变量
        const svg = d3.select("#radar") // 选择SVG元素
            .attr('width', svgWidth * 0.9) // 设置SVG的宽度
            .attr("viewBox", [0, 0, svgWidth, svgHeight]) // 设置视图框
        const radius = Math.min(centerX, centerY) - padding; // 计算半径

        const valueScale = d3.scaleLinear() // 定义线性比例尺
            .domain([0, 100]) // 定义域
            .range([0, radius]); // 定义值域

        function drawRadarChart() { // 定义绘制雷达图的函数
            dataset = preprocess(); // 预处理数据
            const numTicks = dataset.length; // 计算刻度数量
            const angleScale = d3.scaleLinear() // 定义角度比例尺
                .domain([0, numTicks]) // 定义域
                .range([0, Math.PI * 2]); // 定义值域
            const line = d3.line() // 定义线生成器
                .x(function (d, i) { // 定义x坐标
                    return centerX + valueScale(d.value) * Math.sin(angleScale(i));
                })
                .y(function (d, i) { // 定义y坐标
                    return centerY - valueScale(d.value) * Math.cos(angleScale(i));
                });
            const gradient = svg // 定义渐变
                .append("defs") // 添加defs元素
                .append("radialGradient") // 添加径向渐变

            const transition = d3.transition(d3.easePolyInOut).duration(100) // 定义过渡
            const colors = d3.scaleOrdinal(d3.schemeCategory10) // 定义颜色比例尺
            gradient.attr("id", "gradient") // 设置渐变的ID
                .attr("cx", "50%") // 设置渐变的中心x坐标
                .attr("cy", "50%") // 设置渐变的中心y坐标
                .attr("fx", "50%") // 设置渐变的焦点x坐标
                .attr("fy", "50%") // 设置渐变的焦点y坐标
                .transition(transition) // 添加过渡
                .attr("r", "50%") // 设置渐变的半径

            gradient.append("stop") // 添加渐变的停止点
                .transition(transition) // 添加过渡
                .attr("offset", "0%") // 设置偏移量
                .attr("stop-color", "#7dceff") // 设置停止颜色
                .attr("stop-opacity", 0.3); // 设置停止透明度
            gradient.append("stop") // 添加渐变的停止点
                // .transition(transition) // 添加过渡
                .attr("offset", "100%") // 设置偏移量
                .attr("stop-color", "#7dceff") // 设置停止颜色
                .attr("stop-opacity", 0.7); // 设置停止透明度

            const polygon = svg.append("g") // 添加g元素
                .attr("class", "polygon"); // 设置类名
            for (i = 0; i < numTicks; i++) { // 遍历刻度
                angle = angleScale(i); // 计算角度
                x = centerX + valueScale(100) * Math.sin(angle); // 计算x坐标
                y = centerY - valueScale(100) * Math.cos(angle); // 计算y坐标
                polygon.append("line") // 添加线元素
                    .attr("x1", centerX) // 设置x1坐标
                    .attr("y1", centerY) // 设置y1坐标
                    .attr("x2", x) // 设置x2坐标
                    .attr("y2", y) // 设置y2坐标
                    .attr("stroke", "#132a9f") // 设置描边颜色
                    .attr("stroke-width", 1); // 设置描边宽度
            }
            svg.append("path") // 添加路径元素
                .datum(dataset) // 绑定数据
                .attr("fill", "url(#gradient)") // 设置填充颜色
                .attr("stroke", "rgba(247,114,52,0.39)") // 设置描边颜色
                .attr("stroke-width", 3) // 设置描边宽度
                .attr("d", line) // 设置路径数据
                .transition(d3.easeCircle) // 添加过渡
                .duration(1000) // 设置过渡持续时间
                .attrTween("d", function (d) { // 设置过渡插值器
                    let previous = d3.select(this).attr("d"); // 获取之前的路径数据
                    let current = line(d); // 获取当前的路径数据
                    return d3ip.interpolatePath(previous, current,true); // 返回路径插值器
                });
            const labels = svg // 添加标签
                .append("g") // 添加g元素
                .attr("class", "labels"); // 设置类名

            for (i = 0; i < numTicks; i++) { // 遍历刻度
                angle = angleScale(i); // 计算角度
                const r = radius + padding * 0.5; // 计算半径
                x = centerX + r * Math.sin(angle); // 计算x坐标
                y = centerY - r * Math.cos(angle); // 计算y坐标
                labels.append("text") // 添加文本元素
                    .attr("x", x) // 设置x坐标
                    .attr("y", y) // 设置y坐标
                    .attr('font-size', 12) // 设置字体大小
                    .style("font-family", "Impact") // 设置字体
                    .attr('fill', `${colors(dataset[i].name)}`) // 设置填充颜色
                    .attr("text-anchor", "middle") // 设置文本锚点
                    .text(dataset[i].name); // 设置文本内容
            }
            examPaperId = examPaperId >= 22760 ? 22541 : examPaperId + 1; // 更新试卷ID
        }

        // 防抖
        const f = debounce(() => {
            store.problemCategory = dataset; // 更新store的问题类别
            store.current = 'problemCategory' // 更新store的当前状态
        }, 30)
        store.$subscribe((mutation, state) => {// 订阅store的变化
            if (state.current === 'trigger' && state.trigger) { // 如果store的当前状态是'trigger'且trigger为真
                setTimeout(f, 0) // 立即执行函数f
            }
        })
        svg.on('mousemove', (e) => { // 当鼠标在SVG元素上移动时
            f() // 执行函数f
            show(e).html(ListView(dataset.filter(d => d.name).map(d => d.name))) // 显示Tooltip并设置其内容
        }).on('mouseout', (e) => { // 当鼠标离开SVG元素时
            hidden() // 隐藏Tooltip
        })
        drawRadarChart(); // 绘制雷达图
        drawRadarChart(); // 再次绘制雷达图
        setInterval(() => { // 设置定时器
            svg.selectAll('*') // 选择SVG元素中的所有元素
                .transition(d3.transition(d3.easePolyOut).duration(30)) // 添加过渡
                .remove(); // 移除所有元素
            drawRadarChart() // 绘制雷达图
        }, 2100); // 每隔2100毫秒执行一次
    }
}
</script>

<style scoped>

</style>
