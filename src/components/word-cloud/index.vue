<script>
import * as d3 from 'd3';
import WordsCloud from './cloud.js'
import {CloudWords} from "@/data/source.js"


export default {
  name: "WordCloud",
  mounted() {
    const data = [...CloudWords].map((d) => {
      return {
        text: d,
        value: Math.random() * 400
      }
    });
    const type = ['archimedean', 'rectangular'];

    const transition = d3.transition().duration(700).ease(d3.easeCubic);
    // 布局

    const [width, height] = [300, 300];

    let dataset = [];

    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const layout = new WordsCloud()
        .size([width, height])
        .words(data)
        .font('Impact')
        .spiral('rectangular')
        .on('end', (d) => {
          dataset = d;
        });

    // 执行layout算法
    layout.start();


    d3.select("#cloud-svg")
        .attr('height', '60%')
        .attr("viewBox", [0, 0, layout.size()[0], layout.size()[1]])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    const animations = ['easeLinear', 'easePolyIn', 'easePolyOut', 'easePolyInOut', 'easeQuad', 'easeQuadIn', 'easeQuadOut',
      'easeQuadInOut', 'easeCubic', 'easeCubicIn', 'easeCubicOut', 'easeCubicInOut', 'easeSin', 'easeSinIn', 'easeSinOut', 'easeSinInOut',
      'easeExp', 'easeExpIn', 'easeExpOut', 'easeExpInOut', 'easeCircle', 'easeCircleIn', 'easeCircleOut', 'easeCircleInOut', 'easeElastic',
      'easeElasticIn', 'easeElasticOut', 'easeElasticInOut', 'easeBack', 'easeBackIn', 'easeBackOut', 'easeBackInOut',
      'easeBounce', 'easeBounceIn', 'easeBounceOut', 'easeBounceInOut']
    let i = 0;

    function draw(words) {

      d3.select('#cloud-svg > g').selectAll("text")
          .data(() => words)
          .join((elem) => {
                elem.append("text")
                    .style("font-size", function (d) {
                      return d.size + "px";
                    })
                    .style("font-family", "Impact")
                    .attr("text-anchor", "middle")
                    .transition(d3.transition().duration(700).ease(d3.easeCubic))
                    .attr('fill', ({text}) => colors(text))
                    .attr("transform", function (d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(d => d.text)
              },
              (elem) => {
                return elem.style("font-size", function (d) {
                  return d.size + "px";
                })
                    .style("font-family", "Impact")
                    .attr("text-anchor", "middle")
                    .transition(d3.transition().duration(500).ease(eval(`d3.${animations[i++ % animations.length]}`)))
                    .attr('fill', ({text}) => colors(text))
                    .attr("transform", function (d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(d => d.text)
              }, (elem) => {
                elem.remove()
              })
    }


    d3.select('#cloud-svg').on('click', () => {

      data.pop()
      const layout = WordsCloud()
          .size([width, height])
          .words(data)
          .font('Impact')
          .spiral('archimedean')
          .on('end', (d) => {
            draw(d)
          });

      // 执行layout算法
      layout.start();
    })
    WordsCloud()
        .size([width, height])
        .words(data)
        .font('Impact')
        .spiral('archimedean')
        .on('end', (d) => {
          draw(d)
        }).start()
  }
}
</script>

<template>
  <div style="height: 100%;width: 100%">
    <svg id="cloud-svg"></svg>
  </div>
</template>

<style scoped>

</style>
