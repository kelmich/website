// DijkstraSearcher/DijkstraSearcher/construction
//                         time:   [1.3643 ms 1.3754 ms 1.3865 ms]
//                         change: [+9.0933% +10.326% +11.481%] (p = 0.00 < 0.05)
//                         Performance has regressed.
// DijkstraSearcher/DijkstraSearcher/query
//                         time:   [30.981 ms 31.214 ms 31.446 ms]
//                         change: [+0.7876% +1.9815% +3.1900%] (p = 0.00 < 0.05)
//                         Change within noise threshold.

// Benchmarking DialSearcher/DialSearcher/construction: Warming up for 3.0000 s
// Warning: Unable to complete 100 samples in 5.0s. You may wish to increase target time to 6.4s, enable flat sampling, or reduce sample count to 60.
// DialSearcher/DialSearcher/construction
//                         time:   [1.2650 ms 1.2736 ms 1.2817 ms]
//                         change: [+0.9444% +2.1382% +3.2316%] (p = 0.00 < 0.05)
//                         Change within noise threshold.
// Found 2 outliers among 100 measurements (2.00%)
//   2 (2.00%) high mild
// DialSearcher/DialSearcher/query
//                         time:   [12.219 ms 12.328 ms 12.434 ms]
//                         change: [+6.1261% +7.6290% +9.0751%] (p = 0.00 < 0.05)
//                         Performance has regressed.

// Benchmarking ContractionHierarchiesSearcher/ContractionHierarchiesSearcher/construction: Warming up for 3.0000 s
// Warning: Unable to complete 100 samples in 5.0s. You may wish to increase target time to 482.9s, or reduce sample count to 10.
// ContractionHierarchiesSearcher/ContractionHierarchiesSearcher/construction
//                         time:   [4.6895 s 4.7024 s 4.7166 s]
// Found 7 outliers among 100 measurements (7.00%)
//   3 (3.00%) high mild
//   4 (4.00%) high severe
// Benchmarking ContractionHierarchiesSearcher/ContractionHierarchiesSearcher/query: Warming up for 3.0000 s
// Warning: Unable to complete 100 samples in 5.0s. You may wish to increase target time to 6.6s, enable flat sampling, or reduce sample count to 60.
// ContractionHierarchiesSearcher/ContractionHierarchiesSearcher/query
//                         time:   [1.2877 ms 1.3092 ms 1.3310 ms]
//                         change: [+53.213% +59.812% +66.532%] (p = 0.00 < 0.05)
//                         Performance has regressed.
// Found 3 outliers among 100 measurements (3.00%)
//   2 (2.00%) low mild
//   1 (1.00%) high severe

// Benchmarking ContractionHubLabelSearcher/ContractionHubLabelSearcher/construction: Warming up for 3.0000 sAverage source label size 159.95461629833628

// Warning: Unable to complete 100 samples in 5.0s. You may wish to increase target time to 877.3s, or reduce sample count to 10.
// Benchmarking ContractionHubLabelSearcher/ContractionHubLabelSearcher/construction: Collecting 100 samples in estimated 877.33 s (100 iterations)Average source label size 159.95461629833628
// ContractionHubLabelSearcher/ContractionHubLabelSearcher/construction
//                         time:   [7.9664 s 8.0040 s 8.0438 s]
// Found 3 outliers among 100 measurements (3.00%)
//   3 (3.00%) high mild
// Average source label size 159.95461629833628
// ContractionHubLabelSearcher/ContractionHubLabelSearcher/query
//                         time:   [378.35 µs 402.02 µs 425.52 µs]
//                         change: [-15.747% -10.032% -4.1803%] (p = 0.00 < 0.05)
//                         Performance has improved.

export const queryPerformance = {
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
  SmartStupid: {
    ciLow: 0,
    mean: 0,
    ciHigh: 0,
  },
  CH: {
    ciLow: 1.2877,
    mean: 1.3092,
    ciHigh: 1.331,
  },
  CHLabel: {
    ciLow: 0.37835,
    mean: 0.40202,
    ciHigh: 0.42552,
  },
};

export const setupPerformance = {
  Dijkstra: {
    // [1.3643 ms 1.3754 ms 1.3865 ms]
    mean: 1.3643,
    ciLow: 1.3754,
    ciHigh: 1.3865,
  },
  Dial: {
    // [1.2650 ms 1.2736 ms 1.2817 ms]
    mean: 1.265,
    ciLow: 1.2736,
    ciHigh: 1.2817,
  },
  SmartStupid: {
    mean: 0,
    ciLow: 0,
    ciHigh: 0,
  },
  CH: {
    // [4.6895 s 4.7024 s 4.7166 s]
    mean: 4689.5,
    ciLow: 4702.4,
    ciHigh: 4716.6,
  },
  CHLabel: {
    // [7.9664 s 8.0040 s 8.0438 s]
    mean: 7966.4,
    ciLow: 8004.0,
    ciHigh: 8043.8,
  },
};

export const TestingMethodologyNotes = () => (
  <>
    <p>
      The tests were run on a MacBook Pro with an M1 Pro Chip (6 performance and
      2 efficiency cores) and 32GB RAM.
    </p>
    <br />
    <p>
      The benchmark consists of querying random vertices in a graph of New York
      City provided by the{" "}
      <a
        href="http://www.dis.uniroma1.it/~challenge9"
        target="_blank"
        rel="noopener noreferrer"
      >
        9th DIMACS Implementation Challenge: Shortest Paths
        http://www.dis.uniroma1.it/~challenge9
      </a>{" "}
      (264346 vertices and 733846 edges) and asking the benchmarked algorithm to
      find all listings within 60min of the queried vertex. We pick 1% of the
      vertices in the graph to be listings (2643 for the NYC graph).
    </p>
    <br />
    <p>
      The three shown numbers per algorithm are the lower 95% confidence
      interval, mean execution time, and upper 95% confidence interval. These
      values were calculated using the{" "}
      <a
        href="https://docs.rs/criterion/latest/criterion/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Criterion.rs
      </a>{" "}
      benchmarking library.
    </p>
    <br />
    <p>
      The shown algorithms were implemented in Rust. The entire source code can
      be found on GitHub at{" "}
      <a
        href="https://github.com/kelmich/practical_work"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/kelmich/practical_work
      </a>
      .
    </p>
  </>
);
