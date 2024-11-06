import React from 'react';
import { Brain, Heart, Users, Dumbbell, ArrowRight } from 'lucide-react';
import type { View } from '../App';

interface CategoriesProps {
  setCurrentView: (view: View) => void;
}

export function Categories({ setCurrentView }: CategoriesProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <p className="text-gray-600">Explore tasks by life area</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategoryCard
          icon={<Brain className="w-6 h-6" />}
          title="Mental Growth"
          tasksCount={8}
          color="bg-blue-100"
          textColor="text-blue-600"
          onClick={() => setCurrentView('task-details')}
        />
        <CategoryCard
          icon={<Heart className="w-6 h-6" />}
          title="Emotional Balance"
          tasksCount={6}
          color="bg-red-100"
          textColor="text-red-600"
          onClick={() => setCurrentView('task-details')}
        />
        <CategoryCard
          icon={<Users className="w-6 h-6" />}
          title="Social Connection"
          tasksCount={5}
          color="bg-green-100"
          textColor="text-green-600"
          onClick={() => setCurrentView('task-details')}
        />
        <CategoryCard
          icon={<Dumbbell className="w-6 h-6" />}
          title="Physical Health"
          tasksCount={7}
          color="bg-yellow-100"
          textColor="text-yellow-600"
          onClick={() => setCurrentView('task-details')}
        />
      </div>
    </div>
  );
}

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  tasksCount: number;
  color: string;
  textColor: string;
  onClick: () => void;
}

function CategoryCard({ icon, title, tasksCount, color, textColor, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`${color} ${textColor} w-12 h-12 rounded-full flex items-center justify-center`}>
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{tasksCount} tasks</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );
}