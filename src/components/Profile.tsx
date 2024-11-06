import React from 'react';
import { Settings, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import type { UserStats } from '../App';

interface ProfileProps {
  stats: UserStats;
}

export function Profile({ stats }: ProfileProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        <p className="text-gray-600">Manage your account settings</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <ProfileLink icon={<Settings className="w-5 h-5" />} label="Settings" />
        <ProfileLink icon={<Bell className="w-5 h-5" />} label="Notifications" />
        <ProfileLink icon={<Shield className="w-5 h-5" />} label="Privacy" />
        <ProfileLink icon={<HelpCircle className="w-5 h-5" />} label="Help & Support" />
        <ProfileLink
          icon={<LogOut className="w-5 h-5" />}
          label="Log Out"
          className="text-red-600 hover:bg-red-50"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Tasks" value={stats.totalTasks.toString()} />
          <StatCard label="Completed" value={stats.completedTasks.toString()} />
          <StatCard label="Current Streak" value={`${stats.currentStreak} days`} />
          <StatCard label="Success Rate" value={`${stats.successRate}%`} />
        </div>
      </div>
    </div>
  );
}

interface ProfileLinkProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function ProfileLink({ icon, label, className = '' }: ProfileLinkProps) {
  return (
    <button
      className={`w-full flex items-center space-x-3 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <span className="text-gray-600">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}