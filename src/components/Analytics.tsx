import React from 'react';
import { BarChart2, TrendingUp, Calendar } from 'lucide-react';
import type { UserStats } from '../types';

interface AnalyticsProps {
  stats: UserStats;
}

export function Analytics({ stats }: AnalyticsProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <p className="text-gray-600">Track your progress and performance</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Success Rate"
          value={`${stats.successRate}%`}
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Current Streak"
          value={`${stats.currentStreak} days`}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Progress</h3>
        {Object.entries(stats.sectorProgress).map(([category, progress]) => (
          <div key={category} className="mb-4 last:mb-0">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{category}</span>
              <span className="font-medium text-gray-800">
                {Math.round((progress.completed / progress.total) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{
                  width: `${(progress.completed / progress.total) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="text-purple-600 mb-2">{icon}</div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}