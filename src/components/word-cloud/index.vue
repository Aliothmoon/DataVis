<script>
import * as d3 from 'd3';
import cloud from './cloud.js'
import ci from '@/assets/cis.json'
import words from '@/assets/words.json'

export default {
  name: "WordCloud",
  mounted() {
    const data = [...words].map((d) => {
      return {
        text: d,
        value: Math.random() * 400
      }
    });
    const type = ['archimedean', 'rectangular'];

    const transition = d3.transition().duration(700).ease(d3.easeCubic);
    // 布局

    // console.log(data)
    // console.log(d3.schemeCategory10);

    let dataset = [];

    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const layout = new cloud()
        .size([400, 400])
        .words(data)
        .font('Impact')
        .spiral('archimedean')
        .on('end', (d) => {
          dataset = d;
        });

    // 执行layout算法
    layout.start();

    // 执行完layout算法后，会返回一个新数据。

    d3.select("#cloud-svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
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
      const layout = cloud()
          .size([400, 400])
          .words(data)
          .font('Impact')
          .spiral('archimedean')
          .on('end', (d) => {
            draw(d)
          });

      // 执行layout算法
      layout.start();
    })
    // setInterval(() => {
    //   const layout = cloud()
    //       .size([400, 400])
    //       .words(data)
    //       .font('Impact')
    //       .spiral('archimedean')
    //       .on('end', (d) => {
    //         draw(d)
    //       });
    //
    //   // 执行layout算法
    //   layout.start();
    // }, 5000)
    cloud()
        .size([400, 400])
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
   <svg  height="400" id="cloud-svg"></svg>
</template>

<style scoped>

</style>
