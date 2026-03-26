import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';

// Cleanly extracted UI components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PomodoroTimer from './components/PomodoroTimer';
import TaskList from './components/TaskList';
import StatsPanel from './components/StatsPanel';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}/tasks`;
const STATS_URL = `${API_BASE}/sessions/stats`;
const SESSION_URL = `${API_BASE}/sessions`;

function App() {
  const { user, logout, loading } = useContext(AuthContext);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // App State layer
  const [workDuration, setWorkDuration] = useState(() => Number(localStorage.getItem('focusWorkDuration')) || 25);
  const [timer, setTimer] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none');
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');
  const [stats, setStats] = useState({ tasksDoneCount: 0, totalFocusMinutes: 0, currentStreak: 0, weeklyData: [] });
  const [apiError, setApiError] = useState('');

  const audioRef = useRef(null);
  const taskInputRef = useRef(null);

  // On Mount Load Data
  useEffect(() => {
    if (user) {
      if ('Notification' in window) Notification.requestPermission();
      fetchTasks();
      fetchStats();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);
      setApiError('');
    } catch (err) {
      setApiError('Failed to load tasks. Make sure backend is running.');
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(STATS_URL);
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats', err);
    }
  };

  // Pomodoro Execution logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      if (audioRef.current && ambientSound !== 'none') {
        audioRef.current.play().catch(e => console.log('Audio play error:', e));
      }
    } else {
      if (audioRef.current) audioRef.current.pause();
    }

    if (isActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (isActive && timer === 0) {
      clearInterval(interval);
      setIsActive(false);
      logSession(workDuration);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification("Focus Session Complete!", { body: `Great job! You focused sequence for ${workDuration} minutes.` });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timer, ambientSound, workDuration]);

  const logSession = async (durationMinutes) => {
    try {
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - durationMinutes * 60000);
      await axios.post(SESSION_URL, { duration: durationMinutes, startTime, endTime, status: 'COMPLETED' });
      fetchStats();
      setTimer(workDuration * 60); // Reset timer
    } catch (err) {
      console.error('Failed to log session', err);
    }
  };

  const handleDurationChange = (e) => {
    const mins = Number(e.target.value);
    setWorkDuration(mins);
    localStorage.setItem('focusWorkDuration', String(mins));
    if (!isActive) setTimer(mins * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Task API Handlers
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const { data } = await axios.post(API_URL, { title: newTaskTitle, priority: newTaskPriority });
      setTasks([data, ...tasks]);
      setNewTaskTitle('');
      setApiError('');
    } catch (err) {
      setApiError('Failed to create task.');
    }
  };

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
    try {
      const { data } = await axios.put(`${API_URL}/${task._id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === data._id ? data : t));
      fetchStats();
    } catch (err) {
      setApiError('Failed to update task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      fetchStats();
    } catch (err) {
      setApiError('Failed to delete task.');
    }
  };

  // Loading & Auth Gateways
  if (loading) return <div className="h-screen w-full bg-darker flex items-center justify-center text-white font-sans text-xl">Loading...</div>;
  if (!user) return <Login isRegister={isRegisterMode} toggleMode={() => setIsRegisterMode(!isRegisterMode)} />;

  // Display Render (Cleaned up!)
  return (
    <div className="flex h-screen w-full bg-darker text-white font-sans">
      <Sidebar user={user} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header user={user} logout={logout} taskInputRef={taskInputRef} />

        <div className="p-8 flex-1 overflow-y-auto w-full pb-20">
          {apiError && (
            <div className="max-w-7xl mx-auto mb-6 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
              <span>{apiError}</span>
              <button onClick={() => setApiError('')} className="text-xl leading-none">&times;</button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
            {/* Left Column: Tasks & Timer */}
            <div className="lg:col-span-2 space-y-8">
              <PomodoroTimer 
                timer={timer}
                formatTime={formatTime}
                isActive={isActive}
                setIsActive={setIsActive}
                logSession={logSession}
                workDuration={workDuration}
                handleDurationChange={handleDurationChange}
                ambientSound={ambientSound}
                setAmbientSound={setAmbientSound}
                audioRef={audioRef}
              />

              <TaskList 
                tasks={tasks}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskPriority={newTaskPriority}
                setNewTaskPriority={setNewTaskPriority}
                handleCreateTask={handleCreateTask}
                toggleTaskStatus={toggleTaskStatus}
                deleteTask={deleteTask}
                taskInputRef={taskInputRef}
              />
            </div>

            {/* Right Column: Stats */}
            <StatsPanel stats={stats} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
