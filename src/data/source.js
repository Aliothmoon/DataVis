import paper from '../assets/paper_problem.csv?raw'
// import population from '../assets/population-by-age.csv?raw'
import radar from '../assets/radar.csv?raw'
import CloudWords from '@/assets/words.json'
import exam_paper_1 from '../assets/exam_paper_1.csv?raw'
import * as d3 from 'd3';

const PaperProblem = d3.csvParse(paper);
// const PopulationAge = d3.csvParse(population);
const Radar = d3.csvParse(radar);
const Exam_paper_1 =d3.csvParse(exam_paper_1);
export {
    PaperProblem,
    Radar,
    CloudWords,
    Exam_paper_1
}
