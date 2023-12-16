<template>
    <div style="width: 60%;">
        <svg id="barPro"></svg>
    </div>
</template>

<script>
// 导入需要的库和模块
import * as d3 from 'd3';
import {useTooltip, ListView} from "@/utils/tooltip.js";
import {PaperProblem} from '@/data/source.js';
import {useStore} from "@/store/index.js";

// 定义一个名为"BarPro"的Vue组件
export default {
    name: "BarPro",

    // 在组件挂载时运行以下代码
    mounted() {
        // 初始化问题分数和计数
        const problemScores = {};
        const problemCounts = {};
        // 遍历PaperProblem数组
        PaperProblem.forEach(d => {
            // 如果problemScores对象中不存在d.problemId对应的属性
            if (!problemScores[d.problemId]) {
                // 在problemScores对象中初始化d.problemId对应的值为0
                problemScores[d.problemId] = 0;
                // 在problemCounts对象中初始化d.problemId对应的值为0
                problemCounts[d.problemId] = 0;
            }
            // 将d.score转为浮点数后加到problemScores对象中d.problemId对应的值上
            problemScores[d.problemId] += parseFloat(d.score);
            // problemCounts对象中d.problemId对应的值加1
            problemCounts[d.problemId]++;
        });


        // 计算每个问题的平均分数
        const avgScores = Object.keys(problemScores).map(id => ({
            problemId: id,
            avgScore: problemScores[id] / problemCounts[id]
        }));

        // 使用useStore钩子获取store实例
        const store = useStore();
        const [show, hidden] = useTooltip();

        // 创建一个SVG元素，并设置其宽度、高度、边距等属性
        const svg = d3.select('#barPro');
        const width = 600;
        const height = 290;
        const marginTop = 10;
        const marginRight = 0;
        const marginBottom = 20;
        const marginLeft = 40;

        // 使用预定义的色彩方案创建一个比例尺
        const colors = d3.scaleOrdinal(d3.schemeCategory10);

        // 创建一个比例尺，用于确定x轴上的问题ID的显示位置
        const x = d3.scaleBand()
            .domain(avgScores.map(d => d.problemId))
            .range([marginLeft, width - marginRight])
            .padding(0.1);

        // 创建一个比例尺，用于确定y轴上的分数显示位置
        const y = d3.scaleLinear()
            .domain([0, d3.max(avgScores, d => d.avgScore)])
            .range([height - marginBottom, marginTop]);

        // 设置SVG的宽度、视图边界等属性
        svg.attr("width", width * .9)
            .attr("viewBox", [0, 0, width, height]);

        // 创建一个g元素，并添加到SVG中，用于后续的图形绘制操作
        const g = svg.append("g")
            .selectAll()
            .data(avgScores)
            .join("rect");

        // 为每个矩形添加鼠标悬停事件，显示问题信息和平均分数信息
        g.attr("fill", () => colors(Math.random()))
            .on('mousemove', (e, d) => {
                const {avgScore, problemId} = d;
                show(e).html(ListView([`题号: ${problemId}`, `平均分: ${avgScore.toFixed(3)}分`,]));
            })
            .on('mouseout', () => {
                hidden();
            });

        // 定义一个函数，用于触发柱状图的重新绘制，包括X轴、Y轴、矩形的高度和宽度等属性的调整
        const trigger = () => {
            // 根据平均分数的顺序重新排列问题ID，随机打乱顺序的算法实现方式可能不是最佳选择.
            avgScores.sort((a, b) => {
                return Math.random() - 0.5;
            });

            // 根据新的顺序设置X轴的范围和问题ID的对应关系。
            x.domain(avgScores.map(d => d.problemId));

            // 选择X轴元素。这里假设之前已经创建了id为'x-axis'的g元素。
            svg.select('#x-axis')
                // 添加过渡效果
                .transition(d3.transition(d3.easeCircleIn).duration(800))
                // 设置X轴的位置
                .attr("transform", `translate(0,${height - marginBottom})`)
                // 创建X轴的刻度线
                .call(d3.axisBottom(x).tickSizeOuter(0))
                // 隐藏一些刻度线上的文本，以防止文本过于拥挤
                .call(g => g.selectAll(".tick text")
                    .attr("display", (_, i) => i % 1 === 0 ? null : "none"));

            // 选择所有的矩形元素
            const rect = svg.select('g')
                .selectAll('rect')

            // 将数据绑定到矩形元素
            rect.data(avgScores)
                // 添加过渡效果
                .transition(d3.transition(d3.easeCircleIn).duration(800))
                // 设置矩形的x位置
                .attr("x", d => x(d.problemId))
                // 设置矩形的高度
                .attr("height", d => y(0) - y(d.avgScore))
                // 设置矩形的y位置
                .attr("y", d => y(d.avgScore))
                // 设置矩形的宽度
                .attr("width", x.bandwidth())
                // 设置矩形的填充颜色
                .attr("fill", (d) => colors(d.avgScore))
        }


        svg.on('click', trigger)

        store.$subscribe((mutation, state) => {
            // 判断当前状态是否为 'trigger'，并且 'trigger' 是否存在
            if (state.current === 'trigger' && state.trigger) {
                // 如果条件满足，则调用 trigger 函数
                trigger()
            }
        })

        g.attr("x", d => x(d.problemId))
            .attr("height", d => y(0) - y(d.avgScore))
            .attr("y", d => y(d.avgScore))
            .transition(d3.transition(d3.easeCircle).duration(1001))
            .attr("width", x.bandwidth())

        // X 轴
        svg.append("g")
            .attr('id', 'x-axis')
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .call(g => g.selectAll(".tick text")
                .attr("display", (_, i) => i % 1 === 0 ? null : "none"));

        // Y 轴
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickFormat(y => y.toFixed(1)))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Average Score"));
    }
}
</script>

<style scoped>

</style>
