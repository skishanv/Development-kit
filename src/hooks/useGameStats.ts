import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storageUtils';

export interface GameStats {
  bestScore: string;
  gamesPlayed: number;
  winRate: string;
  level: number;
}

interface AllGameStats {
  memoryMatch: GameStats;
  sudoku: GameStats;
  wordChain: GameStats;
}

const defaultStats: AllGameStats = {
  memoryMatch: {
    bestScore: '0',
    gamesPlayed: 0,
    winRate: '0%',
    level: 1
  },
  sudoku: {
    bestScore: '0:00',
    gamesPlayed: 0,
    winRate: '0%',
    level: 1
  },
  wordChain: {
    bestScore: '0',
    gamesPlayed: 0,
    winRate: '0%',
    level: 1
  }
};

export function useGameStats() {
  const [stats, setStats] = useState<AllGameStats>(defaultStats);

  useEffect(() => {
    const savedStats = getFromStorage<AllGameStats>('gameStats');
    if (savedStats) {
      setStats(savedStats);
    }
  }, []);

  const updateStats = (game: keyof AllGameStats, newStats: Partial<GameStats>) => {
    setStats(prevStats => {
      const updatedStats = {
        ...prevStats,
        [game]: {
          ...prevStats[game],
          ...newStats
        }
      };
      saveToStorage('gameStats', updatedStats);
      return updatedStats;
    });
  };

  return {
    stats,
    updateStats
  };
}