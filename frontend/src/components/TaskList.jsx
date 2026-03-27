import React from 'react';
import { Plus, CheckCircle, Trash2 } from 'lucide-react';

export default function TaskList({
  tasks, newTaskTitle, setNewTaskTitle, newTaskPriority, setNewTaskPriority, 
  handleCreateTask, toggleTaskStatus, deleteTask, taskInputRef
}) {
  return (
    <div className="bg-card p-4 md:p-8 rounded-2xl border border-gray-800 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 md:mb-6">Today's Tasks</h3>

      <form onSubmit={handleCreateTask} className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          ref={taskInputRef}
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What do you need to focus on?"
          className="flex-1 bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-focus transition-colors shadow-inner"
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="bg-darker border border-gray-700 rounded-lg px-3 py-3 text-sm text-gray-300 focus:outline-none focus:border-focus cursor-pointer"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Med</option>
          <option value="HIGH">High</option>
        </select>
        <button type="submit" className="bg-focus hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-md active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Add
        </button>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-10 bg-darker rounded-xl border border-dashed border-gray-700 text-gray-500">
            No tasks yet. Enter a task above and press Add!
          </div>
        ) : tasks.map((task) => (
          <div key={task._id} className="flex items-center justify-between p-4 bg-darker rounded-xl border border-gray-800/50 hover:border-focus/50 transition-colors group">
            <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleTaskStatus(task)}>
              <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${task.status === 'DONE' ? 'bg-focus border-focus' : 'border-gray-500 hover:border-gray-400'}`}>
                {task.status === 'DONE' && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <div className="flex flex-col">
                <span className={`font-medium truncate ${task.status === 'DONE' ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                  {task.title}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 w-max px-2 py-0.5 rounded-full ${task.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : task.priority === 'LOW' ? 'bg-gray-500/20 text-gray-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                  {task.priority || 'MEDIUM'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 pl-4 border-l border-gray-800 ml-4">
              <button onClick={() => deleteTask(task._id)} className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
