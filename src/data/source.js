import paper from '../assets/paper_problem.csv?raw'
import population from '../assets/population-by-age.csv?raw'
import radar from '../assets/radar.csv?raw'
import CloudWords from '@/assets/words.json'
import * as d3 from 'd3';

const PaperProblem = d3.csvParse(paper);
const PopulationAge = d3.csvParse(population);
const Radar = d3.csvParse(radar);
export {
    PaperProblem,
    PopulationAge, Radar,
    CloudWords
}
