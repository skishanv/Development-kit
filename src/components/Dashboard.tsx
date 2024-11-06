import React from 'react';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';
import type { Task } from '../App';

interface DashboardProps {
  tasks: Task[];
  setCurrentView: (view: string) => void;
  onTaskClick: (task: Task) => void;
  onTaskComplete: (taskId: string) => void;
}

export function Dashboard({ tasks, setCurrentView, onTaskClick, onTaskComplete }: DashboardProps) {
  const todayTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Today's Tasks</h2>
        <p className="text-gray-600">Focus on what matters most</p>
      </header>

      <div className="space-y-4">
        {todayTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onComplete={() => onTaskComplete(task.id)}
          />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
          {completedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onComplete={() => onTaskComplete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onComplete: () => void;
}

function TaskCard({ task, onClick, onComplete }: TaskCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mental':
        return <Brain className="w-5 h-5" />;
      case 'Physical':
        return <Dumbbell className="w-5 h-5" />;
      case 'Social':
        return <Users className="w-5 h-5" />;
      case 'Emotional':
        return <Heart className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mental':
        return 'bg-blue-100 text-blue-600';
      case 'Physical':
        return 'bg-yellow-100 text-yellow-600';
      case 'Social':
        return 'bg-green-100 text-green-600';
      case 'Emotional':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(task.category)}`}>
            {getCategoryIcon(task.category)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.time}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onComplete}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              task.isCompleted
                ? 'bg-gray-100 text-gray-600'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {task.isCompleted ? 'Completed' : 'Complete'}
          </button>
          <button
            onClick={onClick}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}