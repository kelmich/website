"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type PomodoroTask = {
    name: string;
    estimatedPomodoros: number;
    completedPomodoros: number;
}

type Mode = "pomodoro" | "shortBreak" | "longBreak";


export default function Pomodoro() {
    const POMODORO_DURATION = 25 * 60;
    const POMODOROS_BEFORE_LONG_BREAK = 4;
    const SHORT_BREAK_DURATION = 5 * 60;
    const LONG_BREAK_DURATION = 15 * 60;


    const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<Mode>("pomodoro");
    const [tasks, setTasks] = useState<Record<string, PomodoroTask>>({});
    const [completedPomodoros, setCompletedPomodoros] = useState(0);

    const [currentTask, setCurrentTask] = useState<number | undefined>(undefined);

    const getDuration = (m: Mode) => {
        if (m === "pomodoro") return POMODORO_DURATION;
        if (m === "shortBreak") return SHORT_BREAK_DURATION;
        return LONG_BREAK_DURATION;
    };

    const switchMode = () => {
        if (mode === "pomodoro") {
            const newCompleted = completedPomodoros + 1;
            setCompletedPomodoros(newCompleted);
            if (newCompleted % POMODOROS_BEFORE_LONG_BREAK === 0) {
                setMode("longBreak");
                setTimeLeft(LONG_BREAK_DURATION);
            } else {
                setMode("shortBreak");
                setTimeLeft(SHORT_BREAK_DURATION);
            }
        } else {
            setMode("pomodoro");
            setTimeLeft(POMODORO_DURATION);
        }
    };

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    notify();
                    switchMode();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, mode]);

    // load tasks from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("pomodoro-tasks");
            try {
                const parsedTasks = JSON.parse(saved ?? "{}");
                setTasks(parsedTasks);
            } catch (error) {
                console.error("Failed to parse tasks from localStorage", error);
            }
        }
    }, []);

    useEffect(() => {
        document.title = `${formatTime(timeLeft)} | ${currentTask || "Pomodoro"}`;
    }, [timeLeft, currentTask]);

    useEffect(() => {
        localStorage.setItem("pomodoro-tasks", JSON.stringify(tasks));
    }, [tasks]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const reset = () => {
        setTimeLeft(getDuration(mode));
        setIsRunning(false);
    };;

    const notify = () => {
        if (Notification.permission === "granted") {
            let message = "";
            if (mode === "pomodoro") {
                message = "Pomodoro complete! Take a break.";
            } else {
                message = "Break over! Time to work.";
            }
            new Notification(message);
        }
    };

    const handleStartPause = () => {
        if (!isRunning) {
            if (
                Notification.permission !== "granted" &&
                Notification.permission !== "denied"
            ) {
                Notification.requestPermission();
            }
        }
        setIsRunning((r) => !r);
    };

    const changeMode = (newMode: Mode) => {
        setMode(newMode);
        setTimeLeft(getDuration(newMode));
        setIsRunning(false);
    };

    const addTask = (newTask: PomodoroTask) => {
        setTasks((prev) => ({
            ...prev,
            [newTask.name]: newTask,
        }));
    };

    const removeTask = (taskId: string) => {
        setTasks((prev) => {
            const newTasks = { ...prev };
            delete newTasks[taskId];
            return newTasks;
        });
    };

    function computeCompletionTime(tasks: Record<string, PomodoroTask>): import("react").ReactNode {

        const totalPomodoros = Object.values(tasks).reduce(
            (sum, task) => sum + (task.estimatedPomodoros || 0),
            0
        );

        // Calculate total time including breaks
        let totalMinutes = 0;
        let pomodorosLeft = totalPomodoros;

        while (pomodorosLeft > 0) {
            // Do a pomodoro
            totalMinutes += POMODORO_DURATION;
            pomodorosLeft--;

            // Add break if not last pomodoro
            if (pomodorosLeft > 0) {
                // Every 4th pomodoro, long break, else short break
                if ((totalPomodoros - pomodorosLeft) % POMODOROS_BEFORE_LONG_BREAK === 0) {
                    totalMinutes += LONG_BREAK_DURATION;
                } else {
                    totalMinutes += SHORT_BREAK_DURATION;
                }
            }
        }

        // Add totalMinutes to current time
        const now = new Date();
        const completion = new Date(now.getTime() + totalMinutes * 60 * 1000);

        // Format as "HH:mm" (24h) or "h:mm AM/PM"
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };
        return completion.toLocaleTimeString([], options);
    }
    return (
        <div className="flex flex-col w-screen min-h-screen bg-white text-gray-900">
            <Header />

            {/* main content */}
            <main className="flex flex-1 flex-col bg-secondary text-secondary-foreground p-4 items-center justify-center">

                <div className="w-full flex flex-col max-w-md items-center space-y-4">

                    {/* Timer */}
                    <div className="w-full">
                        <h2>Pomodoro Timer</h2>
                        <div className="w-full bg-background text-background-foreground p-2 border">

                            <div className="flex justify-between items-center mb-4">

                                <div className="space-x-4">
                                    <button
                                        onClick={handleStartPause}
                                    >
                                        {isRunning ? "Pause" : "Start"}
                                    </button>
                                    <button
                                        onClick={reset}
                                    >
                                        Reset
                                    </button>
                                </div>

                                <select
                                    value={mode}
                                    onChange={e => changeMode(e.target.value as Mode)}
                                    className="p-2 border"
                                >
                                    <option value="pomodoro">Work</option>
                                    <option value="shortBreak">Short Break</option>
                                    <option value="longBreak">Long Break</option>
                                </select>
                            </div>


                            <div className="flex flex-col items-center">
                                <div className="text-6xl mb-4">{formatTime(timeLeft)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Tasks list */}
                    <div className="w-full space-y-2">
                        <h2>Tasks</h2>

                        <ul className="space-y-2">
                            {Object.entries(tasks).map(([key, task]) => (
                                <li
                                    key={key}
                                    className="flex justify-between items-center p-2 border bg-background text-background-foreground"
                                >
                                    <span className="text-secondary">{task.completedPomodoros} / {task.estimatedPomodoros}</span>
                                    <span className="text-background-foreground">{task.name}</span>
                                    <button
                                        onClick={() => removeTask(key)}
                                    >
                                        Done
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {Object.keys(tasks).length === 0 ? (
                            <p>Slay. You're done for the day.</p>
                        ) : <p>Estimated Completion time {computeCompletionTime(tasks)}</p>}

                    </div>

                    {/* Add Task Form */}
                    <div className="w-full">
                        <h2 className="mb-2">Add Task</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const name = (form.elements.namedItem("taskName") as HTMLInputElement).value;
                                const estimatedPomodoros = parseInt((form.elements.namedItem("estimatedPomodoros") as HTMLInputElement).value, 10);
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
                            <button
                                type="submit"
                            >
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
