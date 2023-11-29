<script>
import * as d3 from 'd3';

export default {
  name: "CurveChart",
  mounted() {
    const bumps = () => {
      function bump(a, n) {
        const x = 1 / (0.1 + Math.random());
        const y = 2 * Math.random() - 0.5;
        const z = 10 / (0.1 + Math.random());
        for (let i = 0; i < n; ++i) {
          const w = (i / n - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      return (n, m) => {
        const a = [];
        for (let i = 0; i < n; ++i) a[i] = 0;
        for (let i = 0; i < m; ++i) bump(a, n);
        return a;
      };
    }
    const f = () => {
      const n = 30;
      const m = 200;
      const k = 10;
      const width = 300;
      const height = 100;

      const x = d3.scaleLinear([0, m - 1], [0, width]);
      const y = d3.scaleLinear([0, 1], [height, 0]);
      const z = d3.interpolateBlues;
      const area = d3.area()
          .x((d, i) => x(i))
          .y0(d => y(d[0]))
          .y1(d => y(d[1]));

      const stack = d3.stack()
          .keys(d3.range(n))
          // .offset(offset)
          .order(d3.stackOrderNone);

      function randomize() {
        const layers = stack(d3.transpose(Array.from({length: n}, () => bumps()(m, k))));
        y.domain([
          d3.min(layers, l => d3.min(l, d => d[0])),
          d3.max(layers, l => d3.max(l, d => d[1]))
        ]);
        return layers;
      }

      const svg = d3.select("#curve-chart")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width*0.9)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto;");

      const path = svg.selectAll("#curve-chart path")
          .data(randomize)
          .join("path")
          .transition(d3.transition(d3.curveLinear).duration(1001))
          .attr("d", area)
          .attr("fill", () => z(Math.random()));

      d3.select("#curve-chart").on('click', () => {
        svg.selectAll("#curve-chart path")
            .data(randomize)
            .join("path")
            .transition(d3.transition(d3.curveLinear).duration(1001))
            .attr("d", area)
            .attr("fill", () => z(Math.random()));
      })
    }
    f();
  }
}

</script>

<template>
  <div>
    <svg id="curve-chart"></svg>
  </div>
</template>

<style scoped>

</style>
