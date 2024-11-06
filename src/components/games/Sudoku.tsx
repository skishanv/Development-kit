import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, RotateCcw, Trophy, Star } from 'lucide-react';
import { sudokuPuzzles } from '../../data/sudokuPuzzles';
import type { View } from '../../App';

interface SudokuProps {
  stats: {
    bestTime: string;
    gamesPlayed: number;
    winRate: string;
    level: number;
  };
  onUpdateStats: (newStats: Partial<SudokuProps['stats']>) => void;
  setCurrentView: (view: View) => void;
}

type SudokuGrid = (number | null)[][];

export function Sudoku({ stats, onUpdateStats, setCurrentView }: SudokuProps) {
  const [grid, setGrid] = useState<SudokuGrid>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPuzzleId, setCurrentPuzzleId] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, [currentPuzzleId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const initializeGrid = () => {
    const puzzle = sudokuPuzzles.find(p => p.id === currentPuzzleId);
    if (puzzle) {
      setGrid(JSON.parse(JSON.stringify(puzzle.puzzle)));
      setIsRunning(true);
      setTimer(0);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (number: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    
    const newGrid = [...grid];
    newGrid[row][col] = number;
    setGrid(newGrid);

    const puzzle = sudokuPuzzles.find(p => p.id === currentPuzzleId);
    if (puzzle && isGridComplete(newGrid) && isGridCorrect(newGrid, puzzle.solution)) {
      handlePuzzleComplete();
    }
  };

  const handlePuzzleComplete = () => {
    setIsRunning(false);
    const timeStr = formatTime(timer);
    
    // Update stats
    const newStats = {
      gamesPlayed: stats.gamesPlayed + 1,
      bestTime: timer < parseTime(stats.bestTime) ? timeStr : stats.bestTime,
    };

    // Level up logic
    if (stats.gamesPlayed % 3 === 2) { // Level up every 3 completed games
      newStats.level = stats.level + 1;
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    onUpdateStats(newStats);
  };

  const isGridComplete = (grid: SudokuGrid): boolean => {
    return grid.every(row => row.every(cell => cell !== null));
  };

  const isGridCorrect = (grid: SudokuGrid, solution: number[][]): boolean => {
    return grid.every((row, i) => 
      row.every((cell, j) => cell === solution[i][j])
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeStr: string): number => {
    const [mins, secs] = timeStr.split(':').map(Number);
    return mins * 60 + secs;
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between -mx-4 px-4 py-2 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <button
          onClick={() => setCurrentView('games')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{formatTime(timer)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Trophy className="w-5 h-5" />
            <span>Level {stats.level}</span>
          </div>
          <button
            onClick={initializeGrid}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {showLevelUp && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
          <Star className="w-5 h-5" />
          <span>Level Up! Now Level {stats.level}</span>
        </div>
      )}

      <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 rounded-lg">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square flex items-center justify-center text-lg font-medium 
                ${selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex 
                  ? 'bg-purple-100' 
                  : 'bg-white'} 
                ${cell === null ? 'hover:bg-purple-50' : ''} 
                transition-colors`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={cell !== null}
            >
              {cell || ''}
            </button>
          ))
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {[1,2,3,4,5,6,7,8,9].map(number => (
          <button
            key={number}
            className="p-3 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            onClick={() => handleNumberInput(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto max-w-lg">
          <button
            onClick={() => {
              const nextId = currentPuzzleId % sudokuPuzzles.length + 1;
              setCurrentPuzzleId(nextId);
            }}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Next Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}