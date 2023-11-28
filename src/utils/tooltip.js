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
 * @returns {[(function(*): Selection<ElementTagNameMap[string], unknown, HTMLElement, any>),hidden]}
 */
const useTooltip = function () {
    return [show, hidden]
}
export {
    useTooltip
}

