import paper from '@/assets/paper_problem.csv?raw'
import submitTime from '@/assets/submitTime.csv?raw'
import radar from '@/assets/radar.csv?raw'
import CloudWords from '@/assets/words.json'
import examPaper from '@/assets/examPaper.csv?raw'
import classOutput from '@/assets/output.csv?raw'
import lineChart from "@/assets/result.csv?raw";
import SC from "@/assets/geo/china/geometryProvince/51.json";
import * as d3 from 'd3';

import GeoInfo from '@/assets/provinces.json'

const PaperProblem = d3.csvParse(paper);
// const PopulationAge = d3.csvParse(population);
const Radar = d3.csvParse(radar);
const ExamPaper = d3.csvParse(examPaper);
const SubmitTime = d3.csvParse(submitTime);
const ClassOutput = d3.csvParse(classOutput);
const LineChart = d3.csvParse(lineChart)

export {
    PaperProblem,
    Radar,
    CloudWords,
    ExamPaper,
    SubmitTime,
    ClassOutput,
    LineChart,
    SC, GeoInfo

}
