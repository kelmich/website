export type AlgorithmStep<TState> = {
  message: string | string[];
  state: TState;
  completed: boolean;
};

export abstract class AlgorithmVisualizer<TState> {
  public abstract getState(): TState;

  *run(): Generator<AlgorithmStep<TState>, void, unknown> {
    // This method should be implemented by subclasses to define the algorithm's steps.
    throw new Error("Method 'run' must be implemented by subclass.");
  }

  protected *breakpoint(
    message: string,
    completed: boolean = false,
  ): Generator<AlgorithmStep<TState>, void, unknown> {
    yield { message, state: this.getState(), completed };
  }
}

export class ConcurrentVisualizer<T1, T2> extends AlgorithmVisualizer<
  [T1, T2]
> {
  private visA: AlgorithmVisualizer<T1>;
  private visB: AlgorithmVisualizer<T2>;

  constructor(
    visualizerA: AlgorithmVisualizer<T1>,
    visualizerB: AlgorithmVisualizer<T2>,
  ) {
    super();
    this.visA = visualizerA;
    this.visB = visualizerB;
  }

  public getState(): [T1, T2] {
    return [this.visA.getState(), this.visB.getState()];
  }

  *run(): Generator<AlgorithmStep<[T1, T2]>, void, unknown> {
    const genA = this.visA.run();
    const genB = this.visB.run();

    let doneA = false;
    let doneB = false;

    let prevA: IteratorResult<AlgorithmStep<T1>, void> | null = null;
    let prevB: IteratorResult<AlgorithmStep<T2>, void> | null = null;

    while (!doneA || !doneB) {
      const nextA: IteratorResult<AlgorithmStep<T1>, void> | null = doneA
        ? prevA
        : genA.next();
      const nextB: IteratorResult<AlgorithmStep<T2>, void> | null = doneB
        ? prevB
        : genB.next();

      prevA = nextA;
      prevB = nextB;

      if (nextA && (nextA.done || nextA.value.completed)) doneA = true;
      if (nextB && (nextB.done || nextB.value.completed)) doneB = true;

      const stepA = nextA?.value;
      const stepB = nextB?.value;

      yield {
        message: [
          ...(stepA
            ? Array.isArray(stepA.message)
              ? stepA.message
              : [stepA.message]
            : ["Algorithm A completed"]),
          ...(stepB
            ? Array.isArray(stepB.message)
              ? stepB.message
              : [stepB.message]
            : ["Algorithm B completed"]),
        ],
        state: this.getState(),
        completed: doneA && doneB,
      };
    }
  }
}
