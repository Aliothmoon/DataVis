import * as d3 from 'd3';

const tooltip = d3.select('body')
    .append('div')
    .classed('tooltip', true);

/**
 *
 * @param e
 * @returns {Selection<ElementTagNameMap[string], unknown, HTMLElement, any>}
 */
const show = function (e) {
    tooltip.style('transform', `translate(${e.x}px, ${e.y}px)`)
        .style('visibility', 'visible')
    return tooltip;

}

/**
 *
 */
const hidden = function () {
    tooltip.style('visibility', 'hidden')
}
/**
 *
 * @returns {[(function(): Selection<ElementTagNameMap[string], unknown, HTMLElement, any>),hidden]}
 */
const useTooltip = function () {
    return [show, hidden]
}
const colors = d3.scaleOrdinal(d3.schemeCategory10)
/**
 *
 * @param str {Array<string>}
 * @constructor
 */
const ListView = (str) => {

    return str.map((s) => {
        return `
<div class="content-panel">
<span>
        <span style="background-color: ${colors(s)};" class="tooltip-item-icon"></span>
        <span class="tooltip-value">${s}</span>
</span>
</div>`
    }).reduce((previousValue, currentValue, currentIndex, array) => {
        return previousValue + currentValue;
    })
}


export {
    useTooltip, ListView
}

