export const queryPerformance = {
  Dijkstra: {
    mean: 29.238,
    ciLow: 29.479,
    ciHigh: 29.732,
  },
  Dial: {
    mean: 10.941,
    ciLow: 11.07,
    ciHigh: 11.239,
  },
  SmartStupid: {
    mean: 0.010922,
    ciLow: 0.011218,
    ciHigh: 0.011572,
  },
  CH: {
    mean: 0.59038,
    ciLow: 0,
    ciHigh: 0,
  },
  CHLabel: {
    mean: 0.34506,
    ciLow: 0,
    ciHigh: 0,
  },
};

export const setupPerformance = {
  Dijkstra: {
    mean: 1000,
    ciLow: 800,
    ciHigh: 1190,
  },
  Dial: {
    mean: 1000,
    ciLow: 800,
    ciHigh: 1190,
  },
  SmartStupid: {
    mean: 1000,
    ciLow: 800,
    ciHigh: 1190,
  },
  CH: {
    mean: 1000,
    ciLow: 800,
    ciHigh: 1190,
  },
  CHLabel: {
    mean: 1000,
    ciLow: 800,
    ciHigh: 1190,
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
