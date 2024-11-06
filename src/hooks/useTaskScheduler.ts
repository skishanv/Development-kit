import { useState, useEffect } from 'react';
import { activities } from '../data/activities';
import { ScheduledTask, TaskSchedule } from '../types';

export function useTaskScheduler() {
  const [schedule, setSchedule] = useState<TaskSchedule[]>([]);

  // Generate a month's schedule
  const generateMonthSchedule = (startDate: Date) => {
    const monthSchedule: TaskSchedule[] = [];
    const currentDate = new Date(startDate);
    
    // Generate 30 days of tasks
    for (let i = 0; i < 30; i++) {
      const dailyTasks: ScheduledTask[] = [];
      
      // Select one activity from each category randomly
      ['Mental', 'Physical', 'Social', 'Emotional'].forEach(category => {
        const categoryActivities = activities.filter(a => a.category === category);
        const randomActivity = categoryActivities[Math.floor(Math.random() * categoryActivities.length)];
        
        dailyTasks.push({
          id: `task-${currentDate.toISOString()}-${randomActivity.id}`,
          activityId: randomActivity.id,
          originalDate: currentDate.toISOString(),
          scheduledDate: currentDate.toISOString(),
          status: 'pending',
          duration: randomActivity.defaultDuration
        });
      });

      monthSchedule.push({
        date: currentDate.toISOString(),
        tasks: dailyTasks
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return monthSchedule;
  };

  // Reschedule a task
  const rescheduleTask = (taskId: string, newDate: string) => {
    setSchedule(currentSchedule => {
      return currentSchedule.map(day => {
        // Find the task in the original day
        const taskToMove = day.tasks.find(t => t.id === taskId);
        if (!taskToMove) return day;

        // Remove task from original day
        if (day.date === taskToMove.scheduledDate) {
          return {
            ...day,
            tasks: day.tasks.filter(t => t.id !== taskId)
          };
        }

        // Add task to new day
        if (day.date === newDate) {
          return {
            ...day,
            tasks: [...day.tasks, {
              ...taskToMove,
              scheduledDate: newDate,
              status: 'rescheduled'
            }]
          };
        }

        return day;
      });
    });
  };

  // Mark task as completed
  const completeTask = (taskId: string) => {
    setSchedule(currentSchedule => {
      return currentSchedule.map(day => ({
        ...day,
        tasks: day.tasks.map(task => 
          task.id === taskId
            ? { ...task, status: 'completed', completedDate: new Date().toISOString() }
            : task
        )
      }));
    });
  };

  // Initialize schedule
  useEffect(() => {
    const initialSchedule = generateMonthSchedule(new Date());
    setSchedule(initialSchedule);
  }, []);

  return {
    schedule,
    rescheduleTask,
    completeTask,
    generateMonthSchedule
  };
}