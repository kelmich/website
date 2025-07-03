"use client";
import { useEffect, useState } from 'react';

export default function Pomodoro() {
    const POMODORO_DURATION = 25 * 60; // 25 minutes
    const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [tasks, setTasks] = useState<string[]>(() => {
        const saved = localStorage.getItem('pomodoro-tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    notify();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        document.title = `${formatTime(timeLeft)} | Pomodoro`;
    }, [timeLeft]);

    useEffect(() => {
        localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const reset = () => {
        setTimeLeft(POMODORO_DURATION);
        setIsRunning(false);
    };

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, newTask.trim()]);
            setNewTask('');
        }
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const notify = () => {
        if (Notification.permission === 'granted') {
            new Notification('Pomodoro complete! Take a break.');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Pomodoro complete! Take a break.');
                }
            });
        }
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '100vh', backgroundColor: '#0A1733', color: '#cbd5e1', fontFamily: 'monospace', padding: '2rem'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Pomodoro Timer</h1>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{formatTime(timeLeft)}</div>
            <div>
                <button
                    onClick={() => setIsRunning(r => !r)}
                    style={{
                        background: 'none', border: '1px solid #cbd5e1', color: '#cbd5e1',
                        padding: '0.5rem 1rem', marginRight: '1rem', cursor: 'pointer'
                    }}
                >
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={reset}
                    style={{
                        background: 'none', border: '1px solid #cbd5e1', color: '#cbd5e1',
                        padding: '0.5rem 1rem', cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
            </div>

            <div style={{ marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Tasks</h2>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span>{task}</span>
                            <button
                                onClick={() => removeTask(index)}
                                style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '0.5rem' }}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                        placeholder="New task"
                        style={{
                            background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155',
                            padding: '0.25rem', width: '70%', marginRight: '0.5rem'
                        }}
                    />
                    <button
                        onClick={addTask}
                        style={{
                            background: 'none', border: '1px solid #cbd5e1', color: '#cbd5e1',
                            padding: '0.25rem 0.5rem', cursor: 'pointer'
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}