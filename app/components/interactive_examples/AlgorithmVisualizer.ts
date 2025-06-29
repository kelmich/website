export type AlgorithmStep<TState> = {
  message: string;
  state: TState;
};

export abstract class AlgorithmVisualizer<TState> {
  protected abstract getState(): TState;

  protected *breakpoint(
    message: string
  ): Generator<AlgorithmStep<TState>, void, unknown> {
    yield { message, state: this.getState() };
  }
}
