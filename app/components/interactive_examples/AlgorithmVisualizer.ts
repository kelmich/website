export type AlgorithmStep<TState> = {
  message: string;
  state: TState;
};

export abstract class AlgorithmVisualizer<TState> {
  protected abstract state: TState;

  *run(): Generator<AlgorithmStep<TState>, void, unknown> {
    // This method should be implemented by subclasses to define the algorithm's steps.
    throw new Error("Method 'run' must be implemented by subclass.");
  }

  protected *breakpoint(
    message: string
  ): Generator<AlgorithmStep<TState>, void, unknown> {
    yield { message, state: structuredClone(this.state) };
  }
}
