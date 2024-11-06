import React from 'react';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';
import type { Category } from '../../types';

interface CategorySelectionProps {
  selectedCategories: Category[];
  onUpdate: (categories: Category[]) => void;
}

export function CategorySelection({ selectedCategories, onUpdate }: CategorySelectionProps) {
  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      onUpdate(selectedCategories.filter(c => c !== category));
    } else {
      onUpdate([...selectedCategories, category]);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Choose Your Focus Areas
        </h2>
        <p className="text-gray-600">
          Select the areas you want to improve. You can always change these later.
        </p>
      </div>

      <div className="space-y-4">
        <CategoryCard
          icon={<Brain className="w-6 h-6" />}
          category="Mental"
          description="Brain training, learning, and cognitive development"
          isSelected={selectedCategories.includes('Mental')}
          onClick={() => toggleCategory('Mental')}
        />
        <CategoryCard
          icon={<Dumbbell className="w-6 h-6" />}
          category="Physical"
          description="Exercise, nutrition, and healthy habits"
          isSelected={selectedCategories.includes('Physical')}
          onClick={() => toggleCategory('Physical')}
        />
        <CategoryCard
          icon={<Users className="w-6 h-6" />}
          category="Social"
          description="Relationships, communication, and social skills"
          isSelected={selectedCategories.includes('Social')}
          onClick={() => toggleCategory('Social')}
        />
        <CategoryCard
          icon={<Heart className="w-6 h-6" />}
          category="Emotional"
          description="Emotional intelligence, mindfulness, and well-being"
          isSelected={selectedCategories.includes('Emotional')}
          onClick={() => toggleCategory('Emotional')}
        />
      </div>
    </div>
  );
}

interface CategoryCardProps {
  icon: React.ReactNode;
  category: Category;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryCard({ icon, category, description, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl transition-all ${
        isSelected
          ? 'bg-purple-50 border-2 border-purple-600'
          : 'bg-white border-2 border-gray-200 hover:border-purple-300'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg ${
          isSelected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {icon}
        </div>
        <div className="flex-1 text-left">
          <h3 className={`font-semibold ${
            isSelected ? 'text-purple-600' : 'text-gray-800'
          }`}>
            {category}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
}