"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type PomodoroTask = {
  name: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
};

type TaskWithId = PomodoroTask & { id: string };
enum Mode {
  POMODORO = "pomodoro",
  SHORT_BREAK = "shortBreak",
  LONG_BREAK = "longBreak",
}

const notify = (message: string) => {
  if (Notification.permission === "granted") {
    new Audio("/notification.mp3")
      .play()
      .catch((err) => console.error("Playback failed:", err));
    new Notification(message);
  } else {
    console.warn("Notification permission not granted");
  }
};

const NotificationPermissionBar = () => {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );

  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  }, []);

  return permission === null || permission === "granted" ? null : (
    <button
      onClick={() => Notification.requestPermission().then(setPermission)}
    >
      Notify me when timer ends
    </button>
  );
};

type PomodoroState = {
  isRunning: boolean;
  mode: Mode;
  timeLeft: number;
  tasks: TaskWithId[];
  completedTasks: number;
  lastUpdated: number;
  currentTaskId: string | null;
};

export default function Pomodoro() {
  const POMODORO_DURATION = 25;
  const POMODOROS_BEFORE_LONG_BREAK = 4;
  const SHORT_BREAK_DURATION = 5;
  const LONG_BREAK_DURATION = 15;

  const defaultState: PomodoroState = useMemo(() => {
    return {
      timeLeft: POMODORO_DURATION,
      isRunning: false,
      mode: Mode.POMODORO,
      tasks: [],
      completedTasks: 0,
      lastUpdated: Date.now(),
      currentTaskId: null,
    };
  }, [POMODORO_DURATION]);

  const [pomodoroState, setPomodoroState] =
    useState<PomodoroState>(defaultState);
  const updateState = (partial: Partial<PomodoroState>) =>
    setPomodoroState((prev) => ({
      ...prev,
      ...partial,
      lastUpdated: Date.now(),
    }));

  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-state");
    if (saved) {
      try {
        const parsed: PomodoroState = JSON.parse(saved);
        const now = Date.now();
        const delta = Math.floor((now - parsed.lastUpdated) / 1000);
        let updatedTimeLeft = parsed.timeLeft;

        if (parsed.isRunning) {
          updatedTimeLeft -= delta;
          if (updatedTimeLeft <= 0) {
            updatedTimeLeft = 0;
            parsed.isRunning = false;
          }
        }

        setPomodoroState({
          ...parsed,
          timeLeft: Math.max(0, updatedTimeLeft),
          lastUpdated: now,
        });
      } catch (e) {
        setPomodoroState(defaultState);
        console.error("Failed to parse pomodoro state", e);
      }
    }
  }, [defaultState]);

  useEffect(() => {
    localStorage.setItem("pomodoro-state", JSON.stringify(pomodoroState));
  }, [pomodoroState]);

  const getDuration = useCallback(
    (m: Mode) => {
      if (m === "pomodoro") return POMODORO_DURATION;
      if (m === "shortBreak") return SHORT_BREAK_DURATION;
      return LONG_BREAK_DURATION;
    },
    [POMODORO_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION],
  );

  useEffect(() => {
    document.title = `${formatTime(pomodoroState.timeLeft)} | Pomodoro`;
  }, [pomodoroState.timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const reset = () => {
    updateState({
      timeLeft: getDuration(pomodoroState.mode),
      isRunning: false,
    });
  };

  const changeMode = (newMode: Mode) => {
    updateState({
      mode: newMode,
      timeLeft: getDuration(newMode),
      isRunning: false,
    });
  };

  const addTask = (newTask: PomodoroTask) => {
    const id = crypto.randomUUID();
    updateState({
      tasks: [...pomodoroState.tasks, { ...newTask, id }],
    });
  };

  const removeTask = (taskId: string) => {
    updateState({
      tasks: pomodoroState.tasks.filter((task) => task.id !== taskId),
      currentTaskId:
        pomodoroState.currentTaskId === taskId
          ? null
          : pomodoroState.currentTaskId,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pomodoroState.isRunning && pomodoroState.timeLeft > 0) {
        updateState({
          timeLeft: pomodoroState.timeLeft - 1,
        });
      } else if (pomodoroState.isRunning && pomodoroState.timeLeft === 0) {
        switch (pomodoroState.mode) {
          case Mode.POMODORO:
            const newCompletedTasks = pomodoroState.completedTasks + 1;
            const newMode =
              newCompletedTasks % POMODOROS_BEFORE_LONG_BREAK === 0
                ? Mode.LONG_BREAK
                : Mode.SHORT_BREAK;
            const updatedTasks = [...pomodoroState.tasks];
            if (updatedTasks.length > 0) {
              updatedTasks[0].completedPomodoros += 1;
            }
            updateState({
              mode: newMode,
              isRunning: false,
              timeLeft: getDuration(newMode),
              completedTasks: newCompletedTasks,
              tasks: updatedTasks,
            });
            notify(
              `Enjoy a ${newMode === Mode.SHORT_BREAK ? "short" : "long"} break!`,
            );
            break;
          case Mode.SHORT_BREAK:
          case Mode.LONG_BREAK:
            updateState({
              mode: Mode.POMODORO,
              isRunning: false,
              timeLeft: getDuration(Mode.POMODORO),
            });
            notify("Back to work!");
            break;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    pomodoroState.isRunning,
    pomodoroState.timeLeft,
    pomodoroState.mode,
    pomodoroState.completedTasks,
    pomodoroState.tasks,
    getDuration,
  ]);

  function computeCompletionTime(tasks: TaskWithId[]) {
    const totalPomodoros = tasks.reduce(
      (sum, task) => sum + (task.estimatedPomodoros || 0),
      0,
    );

    let totalSeconds = 0;
    let pomodorosLeft = totalPomodoros;

    while (pomodorosLeft > 0) {
      totalSeconds += POMODORO_DURATION;
      pomodorosLeft--;

      if (pomodorosLeft > 0) {
        if (
          (totalPomodoros - pomodorosLeft) % POMODOROS_BEFORE_LONG_BREAK ===
          0
        ) {
          totalSeconds += LONG_BREAK_DURATION;
        } else {
          totalSeconds += SHORT_BREAK_DURATION;
        }
      }
    }

    const now = new Date();
    const completion = new Date(now.getTime() + totalSeconds * 1000);

    return completion.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />
      <main className="flex flex-1 bg-secondary text-secondary-foreground items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <div className="w-full space-y-2">
            <h2>Pomodoro Timer</h2>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-center">
                <div className="w-full bg-background text-background-foreground p-2 border">
                  <div className="flex justify-between items-center">
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          updateState({ isRunning: !pomodoroState.isRunning })
                        }
                      >
                        {pomodoroState.isRunning ? "Pause" : "Start"}
                      </button>
                      <button onClick={reset}>Reset</button>
                    </div>
                    <div className="relative w-max">
                      <select
                        className="appearance-none px-3 py-2 pr-8 bg-transparent text-sm cursor-pointer border"
                        value={pomodoroState.mode}
                        onChange={(e) => changeMode(e.target.value as Mode)}
                      >
                        <option value="pomodoro">Work</option>
                        <option value="shortBreak">Short Break</option>
                        <option value="longBreak">Long Break</option>
                      </select>
                      <div className="pointer-events-none absolute right-2 top-4 -translate-y-1/2 text-3xl">
                        ▾
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-6xl py-8 text-center">
                {formatTime(pomodoroState.timeLeft)}
              </div>
              <NotificationPermissionBar />
            </div>
          </div>

          <div className="w-full space-y-2">
            <h2>Tasks</h2>
            {pomodoroState.currentTaskId ? (
              <div className="text-sm">
                Working on:{" "}
                <span className="font-semibold">
                  {pomodoroState.tasks.find(
                    (task) => task.id === pomodoroState.currentTaskId,
                  )?.name || pomodoroState.currentTaskId}
                </span>
              </div>
            ) : pomodoroState.tasks.length !== 0 ? (
              <div className="text-sm">Click on a task to select it</div>
            ) : (
              <p>Slay. You&apos;re done for the day!</p>
            )}
            <ul className="space-y-2">
              {pomodoroState.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center p-2 border bg-background text-background-foreground cursor-pointer"
                  onClick={() => updateState({ currentTaskId: task.id })}
                >
                  <div className="flex flex-1 items-center gap-4 overflow-hidden">
                    <span className="text-muted-foreground shrink-0">
                      {task.completedPomodoros} / {task.estimatedPomodoros}
                    </span>
                    <span>{task.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTask(task.id);
                    }}
                  >
                    Done
                  </button>
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (
                  form.elements.namedItem("taskName") as HTMLInputElement
                ).value;
                const estimatedPomodoros = parseInt(
                  (
                    form.elements.namedItem(
                      "estimatedPomodoros",
                    ) as HTMLInputElement
                  ).value,
                  10,
                );
                if (name && !isNaN(estimatedPomodoros)) {
                  addTask({ name, estimatedPomodoros, completedPomodoros: 0 });
                  form.reset();
                }
              }}
              className="flex gap-2 pt-4"
            >
              <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                required
                className="flex-1 px-2 py-1 border"
              />
              <input
                type="number"
                name="estimatedPomodoros"
                placeholder="Pomodoros"
                min="1"
                defaultValue={1}
                required
                className="w-20 px-2 py-1 border text-center"
              />
              <button type="submit" className="border">
                Add Task
              </button>
            </form>
            {pomodoroState.tasks.length !== 0 && (
              <div className="text-sm">
                Estimated Completion time{" "}
                {computeCompletionTime(pomodoroState.tasks)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
