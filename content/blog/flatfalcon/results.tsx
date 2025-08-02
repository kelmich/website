import BarChart from "@/app/components/BarChart";
import { InlineCitation } from "@/app/components/Citation";
import { Criterion, Dimacs9thChallenge, Keller2025 } from "./references";

type DataType = "Query" | "Setup";
type AlgorithmType =
  | "Dijkstra"
  | "Dial"
  | "FullPrecompute"
  | "ContractionHierarchy"
  | "HubLabel";
type PerformanceData = {
  ciLow: number;
  mean: number;
  ciHigh: number;
};

const queryPerformance: Record<AlgorithmType, PerformanceData> = {
  Dijkstra: {
    ciLow: 30.981,
    mean: 31.214,
    ciHigh: 31.446,
  },
  Dial: {
    ciLow: 12.219,
    mean: 12.328,
    ciHigh: 12.434,
  },
  FullPrecompute: {
    ciLow: 0.011593,
    mean: 0.0119318,
    ciHigh: 0.012322,
  },
  ContractionHierarchy: {
    ciLow: 1.2877,
    mean: 1.3092,
    ciHigh: 1.331,
  },
  HubLabel: {
    ciLow: 0.37835,
    mean: 0.40202,
    ciHigh: 0.42552,
  },
};

const setupPerformance: Record<AlgorithmType, PerformanceData> = {
  Dijkstra: {
    ciLow: 1.3643,
    mean: 1.3754,
    ciHigh: 1.3865,
  },
  Dial: {
    ciLow: 1.265,
    mean: 1.2736,
    ciHigh: 1.2817,
  },
  FullPrecompute: {
    ciLow: 887590,
    mean: 918770,
    ciHigh: 949230,
  },
  ContractionHierarchy: {
    ciLow: 4689.5,
    mean: 4702.4,
    ciHigh: 4716.6,
  },
  HubLabel: {
    ciLow: 7966.4,
    mean: 8004.0,
    ciHigh: 8043.8,
  },
};

const TestingMethodologyNotes = () => (
  <>
    <p>
      The tests were run on a MacBook Pro with an M1 Pro Chip (6 performance and
      2 efficiency cores) and 32GB RAM.
    </p>
    <br />
    <p>
      The benchmark consists of querying random vertices in a graph of New York
      City provided by the <InlineCitation citation={Dimacs9thChallenge} />
      (264346 vertices and 733846 edges) and asking the benchmarked algorithm to
      find all listings within 60min of the queried vertex. We pick 1% of the
      vertices in the graph to be listings (2643 for the NYC graph).
    </p>
    <br />
    <p>
      The three shown numbers per algorithm are the lower 95% confidence
      interval, mean execution time, and upper 95% confidence interval. These
      values were calculated using the <InlineCitation citation={Criterion} />
      benchmarking library.
    </p>
    <br />
    <p>
      The shown algorithms were implemented in Rust. The entire source code can
      be found on GitHub <InlineCitation citation={Keller2025} />.
    </p>
  </>
);

export const FlatfalconBarChart = ({
  dataType,
  algorithms,
}: {
  dataType: DataType;
  algorithms: AlgorithmType[];
}) => {
  const data = dataType === "Query" ? queryPerformance : setupPerformance;

  return (
    <BarChart
      unit="ms"
      title={`Average ${dataType} Time (NYC)`}
      bars={algorithms.map((algorithm) => ({
        name: algorithm,
        times: data[algorithm],
      }))}
      notes={<TestingMethodologyNotes />}
    />
  );
};
