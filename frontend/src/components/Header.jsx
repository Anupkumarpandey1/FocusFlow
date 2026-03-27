import React from 'react';
import { Plus, LogOut } from 'lucide-react';

export default function Header({ user, logout, taskInputRef }) {
  return (
    <header className="h-20 border-b border-gray-800 bg-card flex items-center justify-between px-4 md:px-8 flex-shrink-0 gap-4">
      <h2 className="text-lg md:text-xl font-semibold truncate">Good Morning, {user?.name?.split(' ')[0] || 'User'}</h2>
      <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
        <button
          onClick={() => taskInputRef.current?.focus()}
          className="bg-focus hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hidden sm:flex"
        >
          <Plus className="w-4 h-4" /> New Task
        </button>
        <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 font-medium text-sm border border-gray-700 hover:border-red-500 px-3 md:px-4 py-2 rounded-lg bg-darker">
          <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
