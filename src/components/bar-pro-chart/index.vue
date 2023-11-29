<template>
  <div style="width: 60%;">
    <svg id="barPro"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import {useTooltip, ListView} from "@/utils/tooltip.js";
import {debounce} from 'lodash'
import {PaperProblem} from '@/data/source.js'
import {useStore} from "@/store/index.js";

export default {
  name: "BarPro",
  mounted() {
    const problemScores = {};
    const problemCounts = {};
    PaperProblem.forEach(d => {
      if (!problemScores[d.problem_id]) {
        problemScores[d.problem_id] = 0;
        problemCounts[d.problem_id] = 0;
      }

      problemScores[d.problem_id] += parseFloat(d.score);
      problemCounts[d.problem_id]++;
    });
    const avgScores = Object.keys(problemScores).map(id => ({
      problemId: id,
      avgScore: problemScores[id] / problemCounts[id]
    }));

    const store = useStore();
    const svg = d3.select('#barPro')
    const width = 600;
    const height = 290;
    const marginTop = 10;
    const marginRight = 0;
    const marginBottom = 20;
    const marginLeft = 40;

    const [show, hidden] = useTooltip()
    const colors = d3.scaleOrdinal(d3.schemeCategory10)

    const x = d3.scaleBand()
        .domain(avgScores.map(d => d.problemId))
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(avgScores, d => d.avgScore)])
        .range([height - marginBottom, marginTop]);

    svg.attr("width", width * .9)
        .attr("viewBox", [0, 0, width, height])

    // 柱
    const g = svg.append("g")
        .selectAll()
        .data(avgScores)
        .join("rect")
        .attr("fill", () => colors(Math.random()))
        .on('mousemove', (e, d) => {
          const {avgScore, problemId} = d;
          show(e).html(ListView([`题号: ${problemId}`, `平均分: ${avgScore.toFixed(3)}分`,]))
        })
        .on('mouseout', () => {
          hidden()
        })


    const trigger = () => {
      avgScores.sort((a, b) => {
        return Math.random() - 0.5
      })
      x.domain(avgScores.map(d => d.problemId))
      svg.select('#x-axis')
          .transition(d3.transition(d3.easeCircleIn).duration(200))
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0))
          .call(g => g.selectAll(".tick text")
              .attr("display", (_, i) => i % 1 === 0 ? null : "none"));
      const rect = svg.select('g')
          .selectAll('rect')
      rect.data(avgScores)
          .transition(d3.transition(d3.easeCircleIn).duration(200))
          .attr("x", d => x(d.problemId))
          .attr("height", d => y(0) - y(d.avgScore))
          .attr("y", d => y(d.avgScore))
          // .transition(d3.transition(d3.easeCircle).duration(1001))
          .attr("width", x.bandwidth())
          .attr("fill", (d) => colors(d.avgScore))
    }

    svg.on('click', trigger)

    store.$subscribe((mutation, state) => {
      if (state[mutation.events.key]) {
        trigger()
      }
    })
    // console.log(document.querySelector('#barPro').click());
    g.attr("x", d => x(d.problemId))
        .attr("height", d => y(0) - y(d.avgScore))
        .attr("y", d => y(d.avgScore))
        .transition(d3.transition(d3.easeCircle).duration(1001))
        .attr("width", x.bandwidth())

    // X
    svg.append("g")
        .attr('id', 'x-axis')
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.selectAll(".tick text")
            .attr("display", (_, i) => i % 1 === 0 ? null : "none"));  // Only display every 10th label

    // Y
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat(y => y.toFixed(1)))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            // .attr('font-size',)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Average Score"));
  }
}
</script>

<style scoped>

</style>
