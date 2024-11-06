import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, RotateCcw, Trophy, Star } from 'lucide-react';
import { cardSets } from '../../data/memoryCards';
import type { View } from '../../App';

interface MemoryMatchProps {
  stats: {
    bestScore: string;
    gamesPlayed: number;
    winRate: string;
    level: number;
  };
  onUpdateStats: (newStats: Partial<MemoryMatchProps['stats']>) => void;
  setCurrentView: (view: View) => void;
}

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function MemoryMatch({ stats, onUpdateStats, setCurrentView }: MemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    initializeGame();
  }, [currentSetIndex, stats.level]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const initializeGame = () => {
    const currentSet = cardSets[currentSetIndex];
    // Add more pairs for higher levels
    const basePairs = currentSet.emojis.slice(0, 4 + stats.level);
    const shuffledCards = [...basePairs, ...basePairs]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setIsRunning(true);
    setMatchedPairs(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) return;
    
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    
    setFlippedCards(prev => [...prev, id]);
    
    if (flippedCards.length === 1) {
      setMoves(prev => prev + 1);
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      const secondCard = cards.find(card => card.id === id);
      
      if (firstCard?.emoji === secondCard?.emoji) {
        setCards(prev => prev.map(card => 
          card.id === flippedCards[0] || card.id === id
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
        setMatchedPairs(prev => prev + 1);

        // Check if game is complete
        if (matchedPairs + 1 === (4 + stats.level)) {
          handleGameComplete();
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === flippedCards[0] || card.id === id
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleGameComplete = () => {
    setIsRunning(false);
    const currentScore = `${moves} moves`;
    
    // Update stats
    const newStats = {
      gamesPlayed: stats.gamesPlayed + 1,
      bestScore: moves < parseInt(stats.bestScore) ? currentScore : stats.bestScore,
      winRate: Math.round(((stats.gamesPlayed * (parseInt(stats.winRate) / 100) + 1) / (stats.gamesPlayed + 1)) * 100) + '%'
    };

    // Level up logic
    if (stats.gamesPlayed % 3 === 2 && moves <= (10 + stats.level * 2)) {
      newStats.level = stats.level + 1;
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    onUpdateStats(newStats);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            onClick={initializeGame}
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

      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            className={`aspect-square text-3xl rounded-lg transition-all transform duration-300
              ${card.isFlipped || card.isMatched 
                ? 'bg-white rotate-0' 
                : 'bg-purple-600 rotate-y-180 hover:bg-purple-700'}`}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="animate-fade-in">{card.emoji}</span>
            )}
          </button>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">Moves: {moves}</p>
        <p className="text-sm text-gray-600">Pairs Found: {matchedPairs} / {4 + stats.level}</p>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto max-w-lg">
          <button
            onClick={() => {
              setCurrentSetIndex((prev) => (prev + 1) % cardSets.length);
            }}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Next Card Set
          </button>
        </div>
      </div>
    </div>
  );
}