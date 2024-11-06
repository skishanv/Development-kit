import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export function HabitTracker() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Habit Tracker</h2>
        <p className="text-gray-600">Track your daily habits and build consistency</p>
      </header>

      <div className="space-y-4">
        <HabitCard
          title="Morning Meditation"
          category="Mental"
          streak={5}
          weekProgress={[true, true, true, true, true, false, false]}
        />
        <HabitCard
          title="Exercise"
          category="Physical"
          streak={3}
          weekProgress={[true, true, true, false, false, false, false]}
        />
        <HabitCard
          title="Social Call"
          category="Social"
          streak={2}
          weekProgress={[true, true, false, false, false, false, false]}
        />
        <HabitCard
          title="Gratitude Journal"
          category="Emotional"
          streak={7}
          weekProgress={[true, true, true, true, true, true, true]}
        />
      </div>

      <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Add New Habit
      </button>
    </div>
  );
}

interface HabitCardProps {
  title: string;
  category: string;
  streak: number;
  weekProgress: boolean[];
}

function HabitCard({ title, category, streak, weekProgress }: HabitCardProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Streak</p>
          <p className="font-semibold text-purple-600">{streak} days</p>
        </div>
      </div>

      <div className="flex justify-between">
        {weekProgress.map((completed, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-2">{days[index]}</span>
            {completed ? (
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}