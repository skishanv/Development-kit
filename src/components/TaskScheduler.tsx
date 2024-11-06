import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTaskScheduler } from '../hooks/useTaskScheduler';
import { activities } from '../data/activities';
import { ScheduledTask } from '../types';

export function TaskScheduler() {
  const { schedule, rescheduleTask, completeTask } = useTaskScheduler();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString());

  const todaySchedule = schedule.find(day => day.date.split('T')[0] === selectedDate.split('T')[0]);

  const handleReschedule = (task: ScheduledTask, newDate: string) => {
    rescheduleTask(task.id, newDate);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Task Schedule</h2>
        <p className="text-gray-600">Manage and reschedule your daily tasks</p>
      </header>

      <div className="flex space-x-4">
        <input
          type="date"
          value={selectedDate.split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value).toISOString())}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-4">
        {todaySchedule?.tasks.map(task => {
          const activity = activities.find(a => a.activityId === task.activityId);
          if (!activity) return null;

          return (
            <div key={task.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.category}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{task.duration}min</span>
                  </div>
                  <button
                    onClick={() => completeTask(task.id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                    disabled={task.status === 'completed'}
                  >
                    {task.status === 'completed' ? 'Completed' : 'Complete'}
                  </button>
                </div>
              </div>

              {task.status !== 'completed' && (
                <div className="mt-4 flex items-center space-x-4">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleReschedule(task, new Date(e.target.value).toISOString())}
                    className="px-3 py-1 border rounded-md text-sm"
                  />
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Reschedule</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}