import React from 'react';
import { LayoutGrid, BarChart2, User2, Menu, GamepadIcon } from 'lucide-react';
import type { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setCurrentView: (view: View) => void;
}

export function Layout({ children, currentView, setCurrentView }: LayoutProps) {
  const isOnboarding = currentView === 'onboarding';

  if (isOnboarding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            LifeBalance
          </h1>
          <button className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-4 max-w-lg">
        {children}
      </main>

      <nav className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-sm border-t border-gray-200 safe-area-bottom">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="flex justify-around py-2">
            <NavButton
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Dashboard"
              isActive={currentView === 'dashboard'}
              onClick={() => setCurrentView('dashboard')}
            />
            <NavButton
              icon={<GamepadIcon className="w-5 h-5" />}
              label="Games"
              isActive={currentView === 'games'}
              onClick={() => setCurrentView('games')}
            />
            <NavButton
              icon={<BarChart2 className="w-5 h-5" />}
              label="Habits"
              isActive={currentView === 'habits'}
              onClick={() => setCurrentView('habits')}
            />
            <NavButton
              icon={<User2 className="w-5 h-5" />}
              label="Profile"
              isActive={currentView === 'profile'}
              onClick={() => setCurrentView('profile')}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-14 space-y-1 rounded-lg active:bg-gray-100 transition-colors ${
        isActive ? 'text-purple-600' : 'text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}