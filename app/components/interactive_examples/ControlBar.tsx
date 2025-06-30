import { useEffect, useRef, useState } from "react";
import { AlgorithmStep, AlgorithmVisualizer } from "./AlgorithmVisualizer";

interface Props<T> {
  executorFactory: () => AlgorithmVisualizer<T>;
  onStep: (data: AlgorithmStep<T>) => void;
}

export const ControlBar = <T,>(props: Props<T>) => {
  const generatorRef = useRef(props.executorFactory().run());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const handleStep = () => {
    const step = generatorRef.current.next();
    if (!step.done) {
      props.onStep(step.value);
    } else {
      setIsRunning(false);
      setHasFinished(true); // Mark algorithm as finished
    }
  };

  const handleReset = () => {
    generatorRef.current = props.executorFactory().run();
    setIsRunning(false);
    setHasFinished(false);
    handleStep();
  };

  const handlePlayPause = () => {
    if (!hasFinished) {
      setIsRunning((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        handleStep();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    handleReset(); // Initial reset
  }, []);

  return (
    <div className="h-16 p-4 flex flex-row justify-between items-center bg-background text-background-foreground">
      <div className="space-x-4">
        {!hasFinished ? (
          <>
            <button onClick={handlePlayPause} disabled={hasFinished}>
              {isRunning ? "Pause" : "Play"}
            </button>
            <button onClick={handleStep} disabled={hasFinished}>
              Step
            </button>
          </>
        ) : (
          <p>Reset to run again.</p>
        )}
      </div>
      <div className="flex flex-row items-center space-x-4">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
