import React from 'react';
import { CheckCircle, LayoutDashboard, UserCircle } from 'lucide-react';

export default function Sidebar({ user }) {
  return (
    <aside className="w-64 bg-card border-r border-gray-800 p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <h1 className="text-2xl font-bold tracking-wider mb-8 text-focus flex items-center gap-2">
          <CheckCircle className="w-8 h-8" /> FocusFlow
        </h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors bg-gray-800">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
        </nav>
      </div>
      <div className="flex flex-col gap-4 mt-auto mb-4 border-t border-gray-800 pt-6">
        <div className="flex items-center gap-3 text-gray-400">
          <UserCircle className="w-8 h-8 flex-shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">{user.name}</span>
            <span className="text-xs text-gray-500 truncate">{user.email}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
