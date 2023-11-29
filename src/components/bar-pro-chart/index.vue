<template>
  <div style="width: 70%;">
    <svg id="barPro"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import {useTooltip, ListView} from "@/utils/tooltip.js";
import {debounce} from 'lodash'
import {PaperProblem} from '@/data/source.js'

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

    const svg = d3.select('#barPro')
    const width = 600;
    const height = 310;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    const [show, hidden] = useTooltip()


    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(avgScores.map(d => d.problemId))
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(avgScores, d => d.avgScore)])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    svg
        .attr("width", width)
        .attr("viewBox", [0, 0, width, height])
    // .attr("style", "max-width: 90%; height: auto;");

    // Add a rect for each bar.
    const g = svg.append("g")
        .attr("fill", "steelblue")
        .selectAll()
        .data(avgScores)
        .join("rect")
        .on('mousemove', (e, d) => {
          const {avgScore, problemId} = d;
          show(e).html(ListView([`题号: ${problemId}`, `平均分: ${avgScore.toFixed(3)}分`,]))
        })
        .on('mouseout', () => {
          hidden()
        })
    g.attr("x", d => x(d.problemId))
        .attr("height", d => y(0) - y(d.avgScore))
        .attr("y", d => y(d.avgScore))
        .transition(d3.transition(d3.easeCircle).duration(1001))
        .attr("width", x.bandwidth())


    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.selectAll(".tick text")
            .attr("display", (_, i) => i % 1 === 0 ? null : "none"));  // Only display every 10th label

    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat(y => y.toFixed(2)))
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
