import React from 'react';
import { Play, CheckCircle, BarChart3, Volume2 } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-darker text-white font-sans overflow-x-hidden flex flex-col relative selection:bg-focus selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-focus rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse delay-75"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-focus" />
          <span className="text-2xl font-bold tracking-wider">FocusFlow</span>
        </div>
        <button 
          onClick={onStart}
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-5 py-2 rounded-full"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-12 mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-focus/30 bg-focus/10 text-focus text-xs font-semibold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-focus opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-focus"></span>
          </span>
          The Ultimate Productivity SaaS
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Master your time.<br /> Find your <span className="text-focus">Flow.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          A seamless Notion-inspired workspace paired with a powerful Pomodoro timer, ambient sound engine, and striking analytics. Totally free.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <button 
            onClick={onStart}
            className="group bg-focus hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] flex items-center justify-center gap-3"
          >
            Start Focusing Now
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor"/>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto w-full text-left">
          <div className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Task Sync</h3>
            <p className="text-gray-400 text-sm">Organize priorities naturally with a gorgeous, keyboard-friendly interface.</p>
          </div>
          
          <div className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Deep Analytics</h3>
            <p className="text-gray-400 text-sm">Visualize your 7-day focus trends natively with beautiful charts and streaks.</p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-green-500/20">
              <Volume2 className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ambient Audio</h3>
            <p className="text-gray-400 text-sm">Block out noise and drop into the zone instantly with baked-in lofi sounds.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
