import { useEffect } from 'react';
import { UserPreferences } from '../types';

export function useNotifications() {
  const initializeNotifications = (preferences: UserPreferences) => {
    if (!preferences.notificationsEnabled) return;

    // Request notification permissions
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Schedule reminders based on user preferences
    scheduleReminders(preferences.reminderTimes);
  };

  const scheduleReminders = (reminderTimes: UserPreferences['reminderTimes']) => {
    Object.entries(reminderTimes).forEach(([period, time]) => {
      if (!time) return;

      const [hours, minutes] = time.split(':').map(Number);
      scheduleNotification(hours, minutes, `Time to check your daily ${period} tasks!`);
    });
  };

  const scheduleNotification = (hours: number, minutes: number, message: string) => {
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (scheduledTime < now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeout = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Life Performance Enhancer', {
          body: message,
          icon: '/icon.png'
        });
      }
    }, timeout);
  };

  return {
    initializeNotifications
  };
}