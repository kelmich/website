import { useEffect, useRef } from "react";
import { AlgorithmStep, AlgorithmVisualizer } from "./AlgorithmVisualizer";

interface Props<T> {
  executorFactory: () => AlgorithmVisualizer<T>;
  onStep: (data: AlgorithmStep<T>) => void;
}

export const ControlBar = <T,>(props: Props<T>) => {
  const generatorRef = useRef(props.executorFactory().run());

  const handleStep = () => {
    const step = generatorRef.current.next();
    if (!step.done) {
      props.onStep(step.value);
    }
  };

  const handleReset = () => {
    generatorRef.current = props.executorFactory().run();
    handleStep();
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="h-16 p-4 flex flex-row space-x-4 justify-between items-center bg-background text-background-foreground">
      <div className="space-x-4">
        <button onClick={handleStep}>Step</button>
      </div>
      <div className="space-x-4">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
