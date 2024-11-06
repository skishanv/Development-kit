export type Category = 'Mental' | 'Physical' | 'Social' | 'Emotional';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Task {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  duration: number; // in minutes
  description: string;
  scientificBasis: string;
  benefits: string[];
  steps: string[];
  skills: string[];
  isCompleted: boolean;
  streak: number;
  completionRate: number;
  lastCompleted?: Date;
  reminderTime?: string;
  feedback: TaskFeedback[];
}

export interface TaskFeedback {
  id: string;
  userId: string;
  rating: number;
  difficulty: number;
  enjoyment: number;
  benefit: number;
  comment?: string;
  date: Date;
}

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  currentStreak: number;
  successRate: number;
  performanceScore: number;
  sectorProgress: {
    [key in Category]: {
      completed: number;
      total: number;
      streak: number;
      level: number;
    };
  };
}

export interface DailyChallenge {
  id: string;
  title: string;
  category: Category;
  description: string;
  reward: number;
  participants: number;
  endTime: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  total: number;
}

export interface UserPreferences {
  categories: Category[];
  preferredDifficulty: Difficulty;
  reminderTimes: {
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
  focusAreas: string[];
  notificationsEnabled: boolean;
}

export interface MotivationalTip {
  id: string;
  message: string;
  category: Category;
  source?: string;
}