import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Onboarding } from './components/onboarding/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Categories } from './components/Categories';
import { TaskDetails } from './components/TaskDetails';
import { HabitTracker } from './components/HabitTracker';
import { Analytics } from './components/Analytics';
import { Community } from './components/Community';
import { Settings } from './components/Settings';
import { Challenges } from './components/Challenges';
import { Games } from './components/Games';
import { MemoryMatch } from './components/games/MemoryMatch';
import { Sudoku } from './components/games/Sudoku';
import { WordChain } from './components/games/WordChain';
import { useTaskManager } from './hooks/useTaskManager';
import { useUserProgress } from './hooks/useUserProgress';
import { useNotifications } from './hooks/useNotifications';
import { useGameStats } from './hooks/useGameStats';
import type { Task, UserStats, Category, UserPreferences } from './types';

export type View = 
  | 'onboarding' 
  | 'dashboard' 
  | 'categories' 
  | 'task-details' 
  | 'habits' 
  | 'analytics' 
  | 'community' 
  | 'challenges' 
  | 'settings'
  | 'games'
  | 'memory-match'
  | 'sudoku'
  | 'word-chain';

function App() {
  const [currentView, setCurrentView] = useState<View>('onboarding');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { tasks, handleTaskComplete, handleTaskUpdate } = useTaskManager();
  const { userStats, updateUserStats } = useUserProgress();
  const { initializeNotifications } = useNotifications();
  const { stats: gameStats, updateStats: updateGameStats } = useGameStats();

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    categories: ['Mental', 'Physical', 'Social', 'Emotional'],
    preferredDifficulty: 'Medium',
    reminderTimes: {
      morning: '08:00',
      evening: '18:00'
    },
    focusAreas: [],
    notificationsEnabled: true
  });

  useEffect(() => {
    if (!isFirstVisit) {
      initializeNotifications(userPreferences);
    }
  }, [isFirstVisit, userPreferences]);

  const handleStartApp = (preferences: UserPreferences) => {
    setIsFirstVisit(false);
    setUserPreferences(preferences);
    setCurrentView('dashboard');
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setCurrentView('task-details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Layout currentView={currentView} setCurrentView={setCurrentView}>
        {isFirstVisit ? (
          <Onboarding onComplete={handleStartApp} />
        ) : (
          <>
            {currentView === 'dashboard' && (
              <Dashboard 
                tasks={tasks}
                setCurrentView={setCurrentView}
                onTaskClick={handleTaskClick}
                onTaskComplete={handleTaskComplete}
              />
            )}
            {currentView === 'categories' && (
              <Categories 
                setCurrentView={setCurrentView}
              />
            )}
            {currentView === 'task-details' && selectedTask && (
              <TaskDetails 
                task={selectedTask}
                setCurrentView={setCurrentView}
                onComplete={() => handleTaskComplete(selectedTask.id)}
              />
            )}
            {currentView === 'habits' && (
              <HabitTracker />
            )}
            {currentView === 'analytics' && (
              <Analytics stats={userStats} />
            )}
            {currentView === 'community' && (
              <Community userStats={userStats} />
            )}
            {currentView === 'challenges' && (
              <Challenges 
                userStats={userStats}
                onTaskComplete={handleTaskComplete}
              />
            )}
            {currentView === 'settings' && (
              <Settings 
                preferences={userPreferences}
                onUpdate={setUserPreferences}
              />
            )}
            {currentView === 'games' && (
              <Games setCurrentView={setCurrentView} />
            )}
            {currentView === 'memory-match' && (
              <MemoryMatch
                stats={gameStats.memoryMatch}
                onUpdateStats={(newStats) => updateGameStats('memoryMatch', newStats)}
                setCurrentView={setCurrentView}
              />
            )}
            {currentView === 'sudoku' && (
              <Sudoku
                stats={gameStats.sudoku}
                onUpdateStats={(newStats) => updateGameStats('sudoku', newStats)}
                setCurrentView={setCurrentView}
              />
            )}
            {currentView === 'word-chain' && (
              <WordChain
                stats={gameStats.wordChain}
                onUpdateStats={(newStats) => updateGameStats('wordChain', newStats)}
                setCurrentView={setCurrentView}
              />
            )}
          </>
        )}
      </Layout>
    </div>
  );
}

export default App;