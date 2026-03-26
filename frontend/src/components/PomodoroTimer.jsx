import React from 'react';
import { Play, Pause, FastForward } from 'lucide-react';

export default function PomodoroTimer({
  timer, formatTime, isActive, setIsActive, logSession, 
  workDuration, handleDurationChange, ambientSound, setAmbientSound, audioRef
}) {
  return (
    <div className="bg-card p-10 rounded-2xl border border-gray-800 flex flex-col items-center justify-center shadow-lg relative overflow-hidden text-center group">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-focus to-purple-500"></div>

      <button
        onClick={() => { 
          setIsActive(false); 
          logSession(workDuration); 
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification("Session Skipped", { body: "Dev fast-forward used." }); 
          }
        }}
        className="absolute right-4 top-4 text-gray-500 bg-darker px-3 py-1 rounded-full hover:text-focus opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-xs font-semibold shadow-md active:scale-95 z-20"
        title="Dev Tool: Fast forward session"
      >
        <FastForward className="w-3 h-3" /> Skip to End
      </button>

      <div className="absolute left-4 top-4 flex flex-col gap-2 z-20">
        <select
          value={workDuration}
          onChange={handleDurationChange}
          className="bg-darker text-gray-400 text-xs px-2 py-1 border border-gray-700 rounded-md focus:outline-none focus:border-focus cursor-pointer"
        >
          <option value="15">15 min</option>
          <option value="25">25 min</option>
          <option value="50">50 min</option>
        </select>
        <select
          value={ambientSound}
          onChange={(e) => { 
            setAmbientSound(e.target.value); 
            if (e.target.value === 'none' && audioRef.current) audioRef.current.pause(); 
          }}
          className="bg-darker text-gray-400 text-xs px-2 py-1 border border-gray-700 rounded-md focus:outline-none focus:border-focus cursor-pointer"
        >
          <option value="none">Silence 🤫</option>
          <option value="rain">Rain 🌧️</option>
          <option value="cafe">Cafe ☕</option>
        </select>
        <audio
          ref={audioRef}
          loop
          src={ambientSound === 'rain' ? 'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg' : 'https://actions.google.com/sounds/v1/crowds/cafe_restaurant.ogg'}
          style={{ display: 'none' }}
        />
      </div>

      <h3 className="text-gray-400 mb-6 mt-4 font-medium text-lg uppercase tracking-widest">Focus Session</h3>
      <div className="text-8xl md:text-9xl font-light text-white mb-10 tabular-nums">
        {formatTime(timer)}
      </div>
      <div className="flex justify-center gap-6">
        <button onClick={() => setIsActive(!isActive)} className="bg-focus hover:bg-blue-600 text-white rounded-full p-6 shadow-xl shadow-blue-900/20 transition-all hover:scale-105 active:scale-95">
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
        </button>
      </div>
    </div>
  );
}
