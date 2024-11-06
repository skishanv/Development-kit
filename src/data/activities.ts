import { Activity, Category } from '../types';

export const activities: Activity[] = [
  // Mental Activities
  {
    id: 'mental-1',
    title: 'Sudoku Challenge',
    category: 'Mental',
    defaultDuration: 15,
    description: 'Exercise your logical thinking with Sudoku puzzles',
    benefits: ['Improves logical reasoning', 'Enhances pattern recognition', 'Boosts concentration'],
    steps: [
      'Choose difficulty level',
      'Study the initial numbers',
      'Use logical deduction',
      'Fill in possible numbers',
      'Complete the puzzle'
    ]
  },
  {
    id: 'mental-2',
    title: 'Memory Match',
    category: 'Mental',
    defaultDuration: 10,
    description: 'Test and improve your memory with card matching',
    benefits: ['Enhances short-term memory', 'Improves concentration', 'Develops visual recognition'],
    steps: [
      'Start with face-down cards',
      'Flip two cards at a time',
      'Remember card positions',
      'Match identical pairs',
      'Complete within time limit'
    ]
  },
  {
    id: 'mental-3',
    title: 'Word Chain',
    category: 'Mental',
    defaultDuration: 15,
    description: 'Build vocabulary and quick thinking with word associations',
    benefits: ['Expands vocabulary', 'Improves word recall', 'Develops quick thinking'],
    steps: [
      'Start with a given word',
      'Find word starting with last letter',
      'Continue chain within time',
      'Avoid word repetition',
      'Reach target word count'
    ]
  },
  // Keep existing activities below
  {
    id: 'mental-4',
    title: 'Pattern Sequence',
    category: 'Mental',
    defaultDuration: 10,
    description: 'Remember and reproduce growing sequences of patterns',
    benefits: ['Strengthens working memory', 'Improves pattern recognition', 'Enhances focus'],
    steps: [
      'Observe pattern sequence',
      'Memorize order',
      'Reproduce sequence',
      'Progress to longer patterns',
      'Beat personal records'
    ]
  },
  // Physical Activities
  {
    id: 'physical-1',
    title: 'Progressive Muscle Relaxation',
    category: 'Physical',
    defaultDuration: 20,
    description: 'Systematically tense and relax muscle groups',
    benefits: ['Reduces physical tension', 'Improves body awareness', 'Promotes relaxation'],
    steps: [
      'Find comfortable position',
      'Start with feet/toes',
      'Tense muscles for 5 seconds',
      'Release and notice sensation',
      'Move up through body'
    ]
  },
  // Keep other existing activities...
];