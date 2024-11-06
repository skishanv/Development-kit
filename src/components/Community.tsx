import React from 'react';
import { Users, Trophy, MessageCircle } from 'lucide-react';
import type { UserStats } from '../App';

interface CommunityProps {
  userStats: UserStats;
}

export function Community({ userStats }: CommunityProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Community</h2>
        <p className="text-gray-600">Connect and share with others</p>
      </header>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Leaderboard</h3>
        <div className="space-y-4">
          <LeaderboardEntry
            rank={1}
            name="Sarah M."
            score={98}
            isUser={false}
          />
          <LeaderboardEntry
            rank={2}
            name="You"
            score={userStats.performanceScore}
            isUser={true}
          />
          <LeaderboardEntry
            rank={3}
            name="John D."
            score={85}
            isUser={false}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <ActivityEntry
            name="Sarah M."
            action="completed a challenge"
            time="2h ago"
          />
          <ActivityEntry
            name="John D."
            action="achieved a new streak"
            time="4h ago"
          />
          <ActivityEntry
            name="Emma R."
            action="shared a milestone"
            time="6h ago"
          />
        </div>
      </div>
    </div>
  );
}

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  score: number;
  isUser: boolean;
}

function LeaderboardEntry({ rank, name, score, isUser }: LeaderboardEntryProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${
      isUser ? 'bg-purple-50' : 'hover:bg-gray-50'
    }`}>
      <div className="flex items-center space-x-3">
        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium">
          {rank}
        </span>
        <span className={`font-medium ${isUser ? 'text-purple-600' : 'text-gray-800'}`}>
          {name}
        </span>
      </div>
      <span className="text-gray-600">{score} pts</span>
    </div>
  );
}

interface ActivityEntryProps {
  name: string;
  action: string;
  time: string;
}

function ActivityEntry({ name, action, time }: ActivityEntryProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
        <Users className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium text-gray-800">{name}</span>
          {' '}
          <span className="text-gray-600">{action}</span>
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}