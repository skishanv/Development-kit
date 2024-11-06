import React from 'react';
import { Trophy, Star, Clock, Users } from 'lucide-react';
import type { UserStats } from '../types';

interface ChallengesProps {
  userStats: UserStats;
  onTaskComplete: (taskId: string) => void;
}

export function Challenges({ userStats, onTaskComplete }: ChallengesProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Challenges</h2>
        <p className="text-gray-600">Push yourself with daily challenges</p>
      </header>

      <div className="space-y-4">
        <ChallengeCard
          title="30-Day Mindfulness"
          description="Practice mindfulness meditation daily"
          category="Mental"
          reward={100}
          participants={245}
          timeLeft="23h 45m"
          completed={false}
          onComplete={() => onTaskComplete('challenge-1')}
        />
        <ChallengeCard
          title="Social Connections"
          description="Reach out to one friend daily"
          category="Social"
          reward={75}
          participants={189}
          timeLeft="2d 12h"
          completed={false}
          onComplete={() => onTaskComplete('challenge-2')}
        />
        <ChallengeCard
          title="Fitness Challenge"
          description="Complete 30 minutes of exercise"
          category="Physical"
          reward={50}
          participants={312}
          timeLeft="12h 30m"
          completed={true}
          onComplete={() => onTaskComplete('challenge-3')}
        />
      </div>
    </div>
  );
}

interface ChallengeCardProps {
  title: string;
  description: string;
  category: string;
  reward: number;
  participants: number;
  timeLeft: string;
  completed: boolean;
  onComplete: () => void;
}

function ChallengeCard({
  title,
  description,
  category,
  reward,
  participants,
  timeLeft,
  completed,
  onComplete
}: ChallengeCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
          {category}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center text-yellow-500 mb-1">
            <Star className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-gray-800">{reward} pts</p>
          <p className="text-xs text-gray-500">Reward</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-blue-500 mb-1">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-gray-800">{participants}</p>
          <p className="text-xs text-gray-500">Participants</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-green-500 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-gray-800">{timeLeft}</p>
          <p className="text-xs text-gray-500">Remaining</p>
        </div>
      </div>

      <button
        onClick={onComplete}
        disabled={completed}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          completed
            ? 'bg-green-100 text-green-600 cursor-default'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {completed ? 'Completed' : 'Join Challenge'}
      </button>
    </div>
  );
}