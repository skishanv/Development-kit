import React from 'react';
import { Check } from 'lucide-react';
import type { UserPreferences } from '../../types';

interface FinalProps {
  preferences: UserPreferences;
}

export function Final({ preferences }: FinalProps) {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          You're All Set!
        </h2>
        <p className="text-gray-600">
          Here's what we've customized for you
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Selected Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {preferences.categories.map(category => (
              <div
                key={category}
                className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Your Preferences</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Difficulty Level</span>
              <span className="font-medium text-gray-800">{preferences.preferredDifficulty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Morning Reminder</span>
              <span className="font-medium text-gray-800">{preferences.reminderTimes.morning}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Evening Reminder</span>
              <span className="font-medium text-gray-800">{preferences.reminderTimes.evening}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Notifications</span>
              <span className="font-medium text-gray-800">
                {preferences.notificationsEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600">
        <p>Click Start to begin your journey to a more balanced life</p>
      </div>
    </div>
  );
}