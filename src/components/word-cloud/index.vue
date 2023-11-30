<script>
import * as d3 from 'd3';
import WordsCloud from './cloud.js'
import {CloudWords} from "@/data/source.js"
import {useTooltip, ListView} from "@/utils/tooltip.js";
import {useStore} from "@/store/index.js";
import {Animations} from "@/utils/d3-animation.js";

export default {
  name: "WordCloud",
  mounted() {
    const store = useStore()
    const [show, hidden] = useTooltip();
    const data = [...CloudWords].map((d) => {
      return {
        text: d,
        value: Math.random() * 400
      }
    });
    const type = ['archimedean', 'rectangular'];

    // 布局

    const [width, height] = [300, 300];

    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const layout = new WordsCloud()
        .size([width, height])
        .words(data)
        .font('Impact')
        .spiral('rectangular')


    // 执行layout算法
    layout.start();


    d3.select("#cloud-svg")
        .attr('width', 260)
        .attr("viewBox", [0, 0, layout.size()[0], layout.size()[1]])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    let i = 0;

    function draw(words) {

      d3.select('#cloud-svg > g').selectAll("text")
          .data(() => words)
          .join((elem) => {
                elem.append("text")
                    .style("font-size", function (d) {
                      return d.size + "px";
                    })
                    .on('mousemove', (e, {text}) => {
                      show(e).html(ListView([text]))
                    })
                    .on('mouseout', () => {
                      hidden()
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
                    .transition(d3.transition().duration(500).ease(Animations[i++ % Animations.length]))
                    .attr('fill', ({text}) => colors(text))
                    .attr("transform", function (d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(d => d.text)
              }, (elem) => {
                elem.remove()
              })
    }

    const render = () => {
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
    }

    d3.select('#cloud-svg').on('click', () => {
      render()
    })

    store.$subscribe((mutation, state) => {
      if (state.current !== 'problemCategory') {
        return;
      }
      data.forEach((e) => {
        if (Math.random() * 10 > 5) {
          e.value += 10;
        } else if (state.problemCategory.map(d => d.origin).includes(e.text)) {
          e.value += 200;
        }
      })
      render()
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
  <div style='display: flex;justify-content:center'>
    <svg id="cloud-svg"></svg>
  </div>
</template>

<style scoped>

</style>
