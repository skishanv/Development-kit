import { useState, useEffect } from 'react';
import { Task, Category, Difficulty } from '../types';
import { activities } from '../data/activities';

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Initialize with default tasks
    const initialTasks = activities.map(activity => ({
      ...activity,
      isCompleted: false,
      streak: 0,
      completionRate: 0,
      feedback: []
    }));
    setTasks(initialTasks);
  }, []);

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const now = new Date();
        const lastCompleted = task.lastCompleted ? new Date(task.lastCompleted) : null;
        const isStreak = lastCompleted && 
          now.getDate() - lastCompleted.getDate() === 1;

        return {
          ...task,
          isCompleted: true,
          streak: isStreak ? task.streak + 1 : 1,
          lastCompleted: now,
          completionRate: calculateCompletionRate(task)
        };
      }
      return task;
    }));
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const calculateCompletionRate = (task: Task) => {
    // Implementation of completion rate calculation
    return task.completionRate;
  };

  const suggestTasks = (category: Category, difficulty: Difficulty) => {
    return tasks.filter(task => 
      task.category === category && 
      task.difficulty === difficulty &&
      !task.isCompleted
    );
  };

  return {
    tasks,
    handleTaskComplete,
    handleTaskUpdate,
    suggestTasks
  };
}