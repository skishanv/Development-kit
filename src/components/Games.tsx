import React from 'react';
import { Brain, Puzzle, Text, Grid2X2, ArrowRight } from 'lucide-react';
import { useGameStats } from '../hooks/useGameStats';
import type { View } from '../App';

interface GamesProps {
  setCurrentView: (view: View) => void;
}

export function Games({ setCurrentView }: GamesProps) {
  const { stats } = useGameStats();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Mental Games</h2>
        <p className="text-gray-600">Train your brain with fun challenges</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <GameCard
          icon={<Grid2X2 className="w-6 h-6" />}
          title="Sudoku"
          description="Challenge your logical thinking with number puzzles"
          color="bg-blue-100"
          textColor="text-blue-600"
          onClick={() => setCurrentView('sudoku')}
          stats={{
            'Best Time': stats.sudoku.bestScore,
            'Games Played': stats.sudoku.gamesPlayed.toString(),
            'Win Rate': stats.sudoku.winRate,
            'Level': stats.sudoku.level.toString()
          }}
        />
        
        <GameCard
          icon={<Puzzle className="w-6 h-6" />}
          title="Memory Match"
          description="Test and improve your memory with card matching"
          color="bg-green-100"
          textColor="text-green-600"
          onClick={() => setCurrentView('memory-match')}
          stats={{
            'Best Score': stats.memoryMatch.bestScore,
            'Games Played': stats.memoryMatch.gamesPlayed.toString(),
            'Win Rate': stats.memoryMatch.winRate,
            'Level': stats.memoryMatch.level.toString()
          }}
        />
        
        <GameCard
          icon={<Text className="w-6 h-6" />}
          title="Word Chain"
          description="Build vocabulary with word associations"
          color="bg-yellow-100"
          textColor="text-yellow-600"
          onClick={() => setCurrentView('word-chain')}
          stats={{
            'Best Score': stats.wordChain.bestScore,
            'Games Played': stats.wordChain.gamesPlayed.toString(),
            'Win Rate': stats.wordChain.winRate,
            'Level': stats.wordChain.level.toString()
          }}
        />
      </div>
    </div>
  );
}

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  textColor: string;
  onClick: () => void;
  stats: {
    [key: string]: string;
  };
}

function GameCard({ icon, title, description, color, textColor, onClick, stats }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="flex items-start space-x-4">
        <div className={`${color} ${textColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-3">{description}</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">{key}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}