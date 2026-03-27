import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StatsPanel({ stats }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-card to-darker p-5 md:p-8 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-focus opacity-10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
        <h3 className="text-xl font-semibold mb-2">Productivity</h3>
        <p className="text-gray-400 text-sm mb-6">Your stats for this week</p>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-darker p-4 rounded-xl border border-gray-800 flex flex-col items-center justify-center text-center shadow-inner">
            <p className="text-4xl font-bold text-focus mb-2">{stats.tasksDoneCount}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tasks Done</p>
          </div>
          <div className="bg-darker p-4 rounded-xl border border-gray-800 flex flex-col items-center justify-center text-center shadow-inner">
            <p className="text-4xl font-bold text-green-500 mb-2">{((stats.totalFocusMinutes || 0) / 60).toFixed(1)}h</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Focus Est</p>
          </div>
          <div className="bg-darker p-5 rounded-xl border border-gray-800 col-span-2 flex items-center justify-between shadow-inner">
            <div>
              <p className="text-3xl font-bold text-purple-500 mb-1">{stats.currentStreak || 0} Days</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Streak</p>
            </div>
            <div className="text-5xl drop-shadow-lg">🔥</div>
          </div>
        </div>
      </div>

      {stats.weeklyData && stats.weeklyData.length > 0 && (
        <div className="bg-gradient-to-br from-card to-darker py-5 px-3 md:py-6 md:px-4 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
          <h3 className="text-lg font-semibold mb-6 px-2 text-white">7-Day Activity</h3>
          <div className="h-48 w-full -ml-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyData}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} width={40} />
                <Tooltip
                  cursor={{ fill: '#1f2937' }}
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem', color: '#fff' }}
                />
                <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
