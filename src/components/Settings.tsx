import React from 'react';
import { Bell, Clock, Shield } from 'lucide-react';
import type { UserPreferences } from '../types';

interface SettingsProps {
  preferences: UserPreferences;
  onUpdate: (preferences: UserPreferences) => void;
}

export function Settings({ preferences, onUpdate }: SettingsProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Customize your experience</p>
      </header>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Enable Notifications</span>
              </div>
              <button
                onClick={() => onUpdate({
                  ...preferences,
                  notificationsEnabled: !preferences.notificationsEnabled
                })}
                className={`w-11 h-6 rounded-full transition-colors ${
                  preferences.notificationsEnabled ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  preferences.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {preferences.notificationsEnabled && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Morning Reminder</span>
                  <input
                    type="time"
                    value={preferences.reminderTimes.morning}
                    onChange={(e) => onUpdate({
                      ...preferences,
                      reminderTimes: {
                        ...preferences.reminderTimes,
                        morning: e.target.value
                      }
                    })}
                    className="px-3 py-1 border rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Evening Reminder</span>
                  <input
                    type="time"
                    value={preferences.reminderTimes.evening}
                    onChange={(e) => onUpdate({
                      ...preferences,
                      reminderTimes: {
                        ...preferences.reminderTimes,
                        evening: e.target.value
                      }
                    })}
                    className="px-3 py-1 border rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-2">Difficulty Level</label>
              <select
                value={preferences.preferredDifficulty}
                onChange={(e) => onUpdate({
                  ...preferences,
                  preferredDifficulty: e.target.value as UserPreferences['preferredDifficulty']
                })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Mental', 'Physical', 'Social', 'Emotional'].map(category => (
              <button
                key={category}
                onClick={() => {
                  const newCategories = preferences.categories.includes(category)
                    ? preferences.categories.filter(c => c !== category)
                    : [...preferences.categories, category];
                  onUpdate({
                    ...preferences,
                    categories: newCategories
                  });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  preferences.categories.includes(category)
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}