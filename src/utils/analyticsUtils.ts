import { Task } from '../App';
import { TaskSchedule } from '../types';

interface DailyStats {
  date: string;
  completed: number;
  total: number;
  completionRate: number;
}

interface CategoryStats {
  category: string;
  completed: number;
  total: number;
  completionRate: number;
}

// Calculate daily completion stats
export function getDailyStats(schedule: TaskSchedule[]): DailyStats[] {
  return schedule.map(day => {
    const total = day.tasks.length;
    const completed = day.tasks.filter(task => task.status === 'completed').length;
    return {
      date: day.date,
      completed,
      total,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  });
}

// Calculate category completion stats
export function getCategoryStats(tasks: Task[]): CategoryStats[] {
  const categories = new Map<string, { completed: number; total: number }>();

  tasks.forEach(task => {
    const stats = categories.get(task.category) || { completed: 0, total: 0 };
    stats.total++;
    if (task.isCompleted) stats.completed++;
    categories.set(task.category, stats);
  });

  return Array.from(categories.entries()).map(([category, stats]) => ({
    category,
    ...stats,
    completionRate: (stats.completed / stats.total) * 100
  }));
}

// Calculate average completion time
export function getAverageCompletionTime(schedule: TaskSchedule[]): number {
  const completedTasks = schedule
    .flatMap(day => day.tasks)
    .filter(task => task.status === 'completed' && task.completedDate);

  if (completedTasks.length === 0) return 0;

  const totalTime = completedTasks.reduce((sum, task) => {
    const scheduledDate = new Date(task.scheduledDate);
    const completedDate = new Date(task.completedDate!);
    return sum + (completedDate.getTime() - scheduledDate.getTime());
  }, 0);

  return Math.round(totalTime / completedTasks.length / (1000 * 60)); // Convert to minutes
}

// Calculate productivity score
export function calculateProductivityScore(stats: DailyStats[]): number {
  if (stats.length === 0) return 0;

  const weights = {
    completionRate: 0.6,
    consistency: 0.4
  };

  const avgCompletionRate = stats.reduce((sum, day) => sum + day.completionRate, 0) / stats.length;
  
  // Calculate consistency (standard deviation of completion rates)
  const variance = stats.reduce((sum, day) => {
    const diff = day.completionRate - avgCompletionRate;
    return sum + (diff * diff);
  }, 0) / stats.length;
  const standardDeviation = Math.sqrt(variance);
  const consistencyScore = Math.max(0, 100 - standardDeviation);

  return Math.round(
    (avgCompletionRate * weights.completionRate) +
    (consistencyScore * weights.consistency)
  );
}

// Generate progress report
export function generateProgressReport(
  dailyStats: DailyStats[],
  categoryStats: CategoryStats[]
): string {
  const productivityScore = calculateProductivityScore(dailyStats);
  const mostProductiveCategory = categoryStats.reduce((prev, curr) => 
    curr.completionRate > prev.completionRate ? curr : prev
  );

  return `
    Overall Productivity Score: ${productivityScore}/100
    Most Productive Category: ${mostProductiveCategory.category}
    Category Success Rate: ${Math.round(mostProductiveCategory.completionRate)}%
    Total Tasks Completed: ${dailyStats.reduce((sum, day) => sum + day.completed, 0)}
  `.trim();
}