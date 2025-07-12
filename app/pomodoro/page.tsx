"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

const SortableTask = ({
  task,
  onRemove,
}: {
  task: TaskWithId;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex justify-between items-center p-2 border bg-background text-background-foreground"
    >
      <div
        className="flex flex-1 items-center gap-4 overflow-hidden cursor-grab"
        {...listeners}
      >
        <span className="text-secondary shrink-0">
          {task.completedPomodoros} / {task.estimatedPomodoros}
        </span>
        <span>{task.name}</span>
      </div>
      <button onClick={onRemove}>Done</button>
    </li>
  );
};

const notify = (message: string) => {
  if (Notification.permission === "granted") {
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
};

export default function Pomodoro() {
  const POMODORO_DURATION = 3; // 25 * 60;
  const POMODOROS_BEFORE_LONG_BREAK = 4;
  const SHORT_BREAK_DURATION = 5; // 5 * 60;
  const LONG_BREAK_DURATION = 7; // 15 * 60;

  const defaultState: PomodoroState = useMemo(() => {
    return {
      timeLeft: POMODORO_DURATION,
      isRunning: false,
      mode: Mode.POMODORO,
      tasks: [],
      completedTasks: 0,
      lastUpdated: Date.now(),
    };
  }, []);

  const [pomodoroState, setPomodoroState] =
    useState<PomodoroState>(defaultState);
  const updateState = (partial: Partial<PomodoroState>) =>
    setPomodoroState((prev) => ({
      ...prev,
      ...partial,
      lastUpdated: Date.now(),
    }));

  // load last state from local storage
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

  const sensors = useSensors(useSensor(PointerSensor));

  const getDuration = (m: Mode) => {
    if (m === "pomodoro") return POMODORO_DURATION;
    if (m === "shortBreak") return SHORT_BREAK_DURATION;
    return LONG_BREAK_DURATION;
  };

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
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pomodoroState.isRunning && pomodoroState.timeLeft > 0) {
        updateState({
          timeLeft: pomodoroState.isRunning
            ? pomodoroState.timeLeft - 1
            : pomodoroState.timeLeft,
        });
      } else if (pomodoroState.isRunning && pomodoroState.timeLeft === 0) {
        switch (pomodoroState.mode) {
          case Mode.POMODORO:
            const newMode =
              pomodoroState.completedTasks % POMODOROS_BEFORE_LONG_BREAK === 0
                ? Mode.LONG_BREAK
                : Mode.SHORT_BREAK;
            const updatedTasks = [...pomodoroState.tasks];
            if (
              pomodoroState.mode === Mode.POMODORO &&
              updatedTasks.length > 0
            ) {
              updatedTasks[0].completedPomodoros += 1;
            }
            updateState({
              mode: newMode,
              isRunning: false,
              timeLeft: getDuration(newMode),
              completedTasks: pomodoroState.completedTasks + 1,
              tasks: updatedTasks,
            });
            notify(
              `Enjoy a ${newMode === Mode.SHORT_BREAK ? "short" : "long"} break!`,
            );
            break;
          case Mode.SHORT_BREAK:
            updateState({
              mode: Mode.POMODORO,
              isRunning: false,
              timeLeft: getDuration(Mode.POMODORO),
            });
            notify("Back to work!");
            break;
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

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [
    pomodoroState.isRunning,
    pomodoroState.timeLeft,
    pomodoroState.mode,
    pomodoroState.completedTasks,
    pomodoroState.tasks,
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
            <div className="w-full bg-background text-background-foreground p-2 border">
              <div className="flex justify-between items-center">
                <div className="space-x-4">
                  <button
                    onClick={() =>
                      updateState({ isRunning: !pomodoroState.isRunning })
                    }
                  >
                    {pomodoroState.isRunning ? "Pause" : "Start"}
                  </button>
                  <button onClick={reset}>Reset</button>
                </div>
                <select
                  value={pomodoroState.mode}
                  onChange={(e) => changeMode(e.target.value as Mode)}
                >
                  <option value="pomodoro">Work</option>
                  <option value="shortBreak">Short Break</option>
                  <option value="longBreak">Long Break</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-6xl py-8 text-center">
                {formatTime(pomodoroState.timeLeft)}
              </div>
              <div className="flex justify-center">
                <NotificationPermissionBar />
              </div>
            </div>
          </div>

          <div className="w-full space-y-2">
            <h2>Tasks</h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={({ active, over }) => {
                if (active.id !== over?.id) {
                  const oldIndex = pomodoroState.tasks.findIndex(
                    (t) => t.id === active.id,
                  );
                  const newIndex = pomodoroState.tasks.findIndex(
                    (t) => t.id === over?.id,
                  );
                  updateState({
                    tasks: arrayMove(pomodoroState.tasks, oldIndex, newIndex),
                  });
                }
              }}
            >
              <SortableContext
                items={pomodoroState.tasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-2">
                  {pomodoroState.tasks.map((task) => (
                    <SortableTask
                      key={task.id}
                      task={task}
                      onRemove={() => removeTask(task.id)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
            {pomodoroState.tasks.length === 0 ? (
              <p>Slay. You&apos;re done for the day.</p>
            ) : (
              <p>
                Estimated Completion time{" "}
                {computeCompletionTime(pomodoroState.tasks)}
              </p>
            )}
          </div>

          <div className="w-full">
            <h2 className="mb-2">Add Task</h2>
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
              className="flex flex-col space-y-2"
            >
              <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                required
              />
              <input
                type="number"
                name="estimatedPomodoros"
                placeholder="Estimated Pomodoros"
                min="1"
                defaultValue={1}
                required
              />
              <button type="submit">Add Task</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
