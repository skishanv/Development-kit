import React from 'react';
import { Bell, Clock } from 'lucide-react';
import type { UserPreferences, Difficulty } from '../../types';

interface PreferencesProps {
  preferences: UserPreferences;
  onUpdate: (updates: Partial<UserPreferences>) => void;
}

export function Preferences({ preferences, onUpdate }: PreferencesProps) {
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Customize Your Experience
        </h2>
        <p className="text-gray-600">
          Set your preferences to make the most of your journey
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Difficulty Level</h3>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => onUpdate({ preferredDifficulty: difficulty })}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  preferences.preferredDifficulty === difficulty
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Daily Reminders</h3>
          <div className="space-y-3">
            {Object.entries(preferences.reminderTimes).map(([period, time]) => (
              <div key={period} className="flex items-center space-x-4">
                <label className="flex-1 text-gray-600 capitalize">{period}</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => onUpdate({
                    reminderTimes: {
                      ...preferences.reminderTimes,
                      [period]: e.target.value
                    }
                  })}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <button
            onClick={() => onUpdate({ notificationsEnabled: !preferences.notificationsEnabled })}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
              preferences.notificationsEnabled
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Bell className={preferences.notificationsEnabled ? 'text-purple-600' : 'text-gray-400'} />
              <span className={preferences.notificationsEnabled ? 'text-purple-600' : 'text-gray-600'}>
                Enable Notifications
              </span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${
              preferences.notificationsEnabled ? 'bg-purple-600' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                preferences.notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}