import React from 'react';
import { ArrowLeft, Clock, Calendar, BarChart, CheckCircle, XCircle } from 'lucide-react';
import { Sudoku } from './games/Sudoku';
import { MemoryMatch } from './games/MemoryMatch';
import { WordChain } from './games/WordChain';
import type { View, Task } from '../App';

interface TaskDetailsProps {
  task: Task;
  setCurrentView: (view: View) => void;
  onComplete: () => void;
}

export function TaskDetails({ task, setCurrentView, onComplete }: TaskDetailsProps) {
  const renderGame = () => {
    switch (task.title) {
      case 'Sudoku Challenge':
        return <Sudoku />;
      case 'Memory Match':
        return <MemoryMatch />;
      case 'Word Chain':
        return <WordChain />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center space-x-3 -mx-4 px-4 py-2 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="p-2 -ml-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.category}</p>
        </div>
      </header>

      {renderGame()}

      {!renderGame() && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <MetricCard
              icon={<Clock className="w-4 h-4" />}
              label="Duration"
              value={task.duration}
            />
            <MetricCard
              icon={<Calendar className="w-4 h-4" />}
              label="Streak"
              value={task.streak}
            />
            <MetricCard
              icon={<BarChart className="w-4 h-4" />}
              label="Rate"
              value={task.completionRate}
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Description</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-800">Steps:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {task.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto max-w-lg flex gap-2">
          <button 
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
              task.isCompleted 
                ? 'bg-red-600 text-white active:bg-red-700'
                : 'bg-purple-600 text-white active:bg-purple-700'
            }`}
            onClick={onComplete}
          >
            <span className="flex items-center justify-center space-x-2">
              {task.isCompleted ? (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Incomplete</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete</span>
                </>
              )}
            </span>
          </button>
          <button 
            className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium text-sm active:bg-gray-200 transition-colors"
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="text-purple-600 mb-1">{icon}</div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}