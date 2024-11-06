import React, { useState, useEffect } from 'react';
import { Clock, Brain, RotateCcw, Check } from 'lucide-react';

// Common word categories with starter words
const categories = [
  {
    name: 'Animals',
    words: ['elephant', 'tiger', 'rabbit', 'dolphin', 'zebra', 'giraffe', 'kangaroo', 'penguin']
  },
  {
    name: 'Countries',
    words: ['spain', 'norway', 'yemen', 'netherlands', 'switzerland', 'denmark', 'russia', 'australia']
  },
  {
    name: 'Foods',
    words: ['apple', 'egg', 'grape', 'enchilada', 'avocado', 'orange', 'eggplant', 'taco']
  }
];

export function WordChain() {
  const [category, setCategory] = useState(categories[0]);
  const [currentWord, setCurrentWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [chain, setChain] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startGame = () => {
    const randomWord = category.words[Math.floor(Math.random() * category.words.length)];
    setCurrentWord(randomWord);
    setChain([randomWord]);
    setScore(0);
    setTimer(60);
    setIsRunning(true);
    setMessage('');
    setInputWord('');
  };

  const endGame = () => {
    setIsRunning(false);
    if (score > highScore) {
      setHighScore(score);
    }
    setMessage(`Game Over! You made a chain of ${chain.length} words!`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const word = inputWord.toLowerCase().trim();
    
    // Validation checks
    if (word.length < 2) {
      setMessage('Word must be at least 2 letters long');
      return;
    }
    
    if (chain.includes(word)) {
      setMessage('Word already used!');
      return;
    }
    
    if (word[0] !== currentWord[currentWord.length - 1]) {
      setMessage(`Word must start with '${currentWord[currentWord.length - 1]}'`);
      return;
    }

    // Valid word - update game state
    setChain(prev => [...prev, word]);
    setCurrentWord(word);
    setScore(prev => prev + word.length);
    setInputWord('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Word Chain</h3>
          <p className="text-sm text-gray-600">Category: {category.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Brain className="w-5 h-5" />
            <span>{score} points</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{timer}s</span>
          </div>
          <button
            onClick={startGame}
            className="p-2 hover:bg-gray-100 rounded-full"
            disabled={isRunning}
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {highScore > 0 && (
        <div className="text-sm text-gray-600">
          High Score: {highScore} points
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Current Word</h4>
          <p className="text-2xl font-bold text-purple-600">{currentWord}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              disabled={!isRunning}
              placeholder="Enter a word..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={!isRunning || !inputWord}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </form>

        {message && (
          <p className="text-sm text-center mt-2 text-red-500">{message}</p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Word Chain:</h4>
        <div className="flex flex-wrap gap-2">
          {chain.map((word, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-800 shadow-sm"
            >
              {word}
              {index < chain.length - 1 && (
                <span className="mx-2 text-gray-400">→</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        {!isRunning && (
          <button
            onClick={startGame}
            className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            {chain.length > 0 ? 'Play Again' : 'Start Game'}
          </button>
        )}
        <button
          onClick={() => setCategory(categories[(categories.indexOf(category) + 1) % categories.length])}
          className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200"
        >
          Next Category
        </button>
      </div>
    </div>
  );
}