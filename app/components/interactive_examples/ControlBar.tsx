interface Props {
  className?: string;
  reset: () => void;
  run: () => void;
  step: () => void;
}

export const ControlBar = (props: Props) => {
  return (
    <div
      className={`h-16 p-4 flex flex-row space-x-4 justify-between items-center border bg-background text-background-foreground ${props.className}`}
    >
      <div className="space-x-4">
        <button onClick={props.run}>Run</button>
        <button onClick={props.step}>Step</button>
      </div>
      <div className="space-x-4">
        <button onClick={props.reset}>Reset</button>
      </div>
    </div>
  );
};
