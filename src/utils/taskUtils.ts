import { Task, UserStats } from '../App';
import { ScheduledTask, TaskSchedule } from '../types';

// Calculate completion rate for a set of tasks
export function calculateCompletionRate(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(task => task.isCompleted).length;
  return Math.round((completed / tasks.length) * 100);
}

// Get tasks for a specific date
export function getTasksForDate(schedule: TaskSchedule[], date: Date): ScheduledTask[] {
  const dateString = date.toISOString().split('T')[0];
  return schedule
    .find(day => day.date.split('T')[0] === dateString)
    ?.tasks || [];
}

// Calculate streak for consecutive completed tasks
export function calculateStreak(schedule: TaskSchedule[]): number {
  let streak = 0;
  const today = new Date();
  const sortedDays = [...schedule].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const day of sortedDays) {
    const dayDate = new Date(day.date);
    if (dayDate > today) continue;

    const allCompleted = day.tasks.every(task => task.status === 'completed');
    if (allCompleted) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Format duration for display
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`;
}

// Calculate user statistics
export function calculateUserStats(tasks: Task[]): UserStats {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const successRate = Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    completedTasks,
    currentStreak: 12, // This would be calculated based on historical data
    successRate
  };
}

// Group tasks by category
export function groupTasksByCategory(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce((groups, task) => {
    const category = task.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {} as Record<string, Task[]>);
}

// Sort tasks by priority and time
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // Convert time strings to comparable values
    const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
    const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
    return timeA - timeB;
  });
}

// Generate time slots for task scheduling
export function generateTimeSlots(startHour = 6, endHour = 22): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    slots.push(`${hourStr}:00`);
    slots.push(`${hourStr}:30`);
  }
  return slots;
}