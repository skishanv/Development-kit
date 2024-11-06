import React, { useState } from 'react';
import { Brain, Heart, Users, Dumbbell, ChevronRight, ChevronLeft } from 'lucide-react';
import { Welcome } from './Welcome';
import { CategorySelection } from './CategorySelection';
import { Preferences } from './Preferences';
import { Final } from './Final';
import type { UserPreferences } from '../../types';

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    categories: ['Mental', 'Physical', 'Social', 'Emotional'],
    preferredDifficulty: 'Medium',
    reminderTimes: {
      morning: '08:00',
      evening: '18:00'
    },
    focusAreas: [],
    notificationsEnabled: true
  });

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step === 3) {
      onComplete(preferences);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6">
        {step === 0 && <Welcome onNext={handleNext} />}
        {step === 1 && (
          <CategorySelection
            selectedCategories={preferences.categories}
            onUpdate={(categories) => updatePreferences({ categories })}
          />
        )}
        {step === 2 && (
          <Preferences
            preferences={preferences}
            onUpdate={updatePreferences}
          />
        )}
        {step === 3 && (
          <Final
            preferences={preferences}
          />
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          ) : (
            <div /> 
          )}
          
          <div>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === step ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <span>{step === 3 ? 'Start' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}