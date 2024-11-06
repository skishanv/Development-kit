import { useState, useEffect } from 'react';
import { UserStats, Category, Task } from '../types';

export function useUserProgress() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalTasks: 0,
    completedTasks: 0,
    currentStreak: 0,
    successRate: 0,
    performanceScore: 0,
    sectorProgress: {
      Mental: { completed: 0, total: 0, streak: 0, level: 1 },
      Physical: { completed: 0, total: 0, streak: 0, level: 1 },
      Social: { completed: 0, total: 0, streak: 0, level: 1 },
      Emotional: { completed: 0, total: 0, streak: 0, level: 1 }
    }
  });

  const calculatePerformanceScore = (stats: UserStats) => {
    const weights = {
      completionRate: 0.4,
      streak: 0.3,
      balance: 0.3
    };

    const completionScore = (stats.completedTasks / stats.totalTasks) * 100;
    const streakScore = Math.min(stats.currentStreak * 10, 100);
    
    // Calculate balance across sectors
    const sectorScores = Object.values(stats.sectorProgress).map(
      sector => sector.completed / sector.total * 100
    );
    const avgSectorScore = sectorScores.reduce((a, b) => a + b, 0) / 4;
    
    return Math.round(
      completionScore * weights.completionRate +
      streakScore * weights.streak +
      avgSectorScore * weights.balance
    );
  };

  const updateUserStats = (tasks: Task[]) => {
    const newStats = {
      ...userStats,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.isCompleted).length,
      sectorProgress: {
        Mental: calculateSectorProgress(tasks, 'Mental'),
        Physical: calculateSectorProgress(tasks, 'Physical'),
        Social: calculateSectorProgress(tasks, 'Social'),
        Emotional: calculateSectorProgress(tasks, 'Emotional')
      }
    };

    newStats.successRate = (newStats.completedTasks / newStats.totalTasks) * 100;
    newStats.performanceScore = calculatePerformanceScore(newStats);

    setUserStats(newStats);
  };

  const calculateSectorProgress = (tasks: Task[], category: Category) => {
    const sectorTasks = tasks.filter(t => t.category === category);
    return {
      completed: sectorTasks.filter(t => t.isCompleted).length,
      total: sectorTasks.length,
      streak: Math.max(...sectorTasks.map(t => t.streak)),
      level: calculateSectorLevel(sectorTasks)
    };
  };

  const calculateSectorLevel = (tasks: Task[]) => {
    const completionRate = tasks.filter(t => t.isCompleted).length / tasks.length;
    return Math.floor(completionRate * 10) + 1;
  };

  return {
    userStats,
    updateUserStats
  };
}