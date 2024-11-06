// Collection of pre-generated Sudoku puzzles with solutions
export const sudokuPuzzles = [
  {
    id: 1,
    difficulty: 'easy',
    puzzle: [
      [5,3,null,null,7,null,null,null,null],
      [6,null,null,1,9,5,null,null,null],
      [null,9,8,null,null,null,null,6,null],
      [8,null,null,null,6,null,null,null,3],
      [4,null,null,8,null,3,null,null,1],
      [7,null,null,null,2,null,null,null,6],
      [null,6,null,null,null,null,2,8,null],
      [null,null,null,4,1,9,null,null,5],
      [null,null,null,null,8,null,null,7,9]
    ],
    solution: [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9]
    ]
  },
  {
    id: 2,
    difficulty: 'easy',
    puzzle: [
      [null,null,4,null,5,null,null,null,null],
      [9,null,null,7,3,4,6,null,null],
      [null,null,3,null,2,1,null,4,9],
      [null,3,5,null,9,null,4,8,null],
      [null,9,null,null,null,null,null,3,null],
      [null,7,6,null,1,null,9,2,null],
      [3,1,null,9,7,null,2,null,null],
      [null,null,9,1,8,2,null,null,3],
      [null,null,null,null,6,null,1,null,null]
    ],
    solution: [
      [7,2,4,8,5,9,3,1,6],
      [9,5,1,7,3,4,6,8,2],
      [6,8,3,5,2,1,7,4,9],
      [2,3,5,6,9,7,4,8,1],
      [1,9,8,2,4,5,7,3,6],
      [4,7,6,3,1,8,9,2,5],
      [3,1,5,9,7,6,2,4,8],
      [5,4,9,1,8,2,6,7,3],
      [8,2,7,4,6,3,1,5,9]
    ]
  },
  {
    id: 3,
    difficulty: 'medium',
    puzzle: [
      [null,null,null,2,6,null,7,null,1],
      [6,8,null,null,7,null,null,9,null],
      [1,9,null,null,null,4,5,null,null],
      [8,2,null,1,null,null,null,4,null],
      [null,null,4,6,null,2,9,null,null],
      [null,5,null,null,null,3,null,2,8],
      [null,null,9,3,null,null,null,7,4],
      [null,4,null,null,5,null,null,3,6],
      [7,null,3,null,1,8,null,null,null]
    ],
    solution: [
      [4,3,5,2,6,9,7,8,1],
      [6,8,2,5,7,1,4,9,3],
      [1,9,7,8,3,4,5,6,2],
      [8,2,6,1,9,5,3,4,7],
      [3,7,4,6,8,2,9,1,5],
      [9,5,1,7,4,3,6,2,8],
      [5,1,9,3,2,6,8,7,4],
      [2,4,8,9,5,7,1,3,6],
      [7,6,3,4,1,8,2,5,9]
    ]
  },
  {
    id: 4,
    difficulty: 'medium',
    puzzle: [
      [null,2,null,6,null,8,null,null,null],
      [5,8,null,null,null,9,7,null,null],
      [null,null,null,null,4,null,null,null,null],
      [3,7,null,null,null,null,5,null,null],
      [6,null,null,null,null,null,null,null,4],
      [null,null,8,null,null,null,null,1,3],
      [null,null,null,null,2,null,null,null,null],
      [null,null,9,8,null,null,null,3,6],
      [null,null,null,3,null,6,null,9,null]
    ],
    solution: [
      [1,2,3,6,7,8,4,5,9],
      [5,8,4,2,3,9,7,6,1],
      [9,6,7,1,4,5,3,2,8],
      [3,7,2,4,6,1,5,8,9],
      [6,9,1,5,8,3,2,7,4],
      [4,5,8,7,9,2,6,1,3],
      [8,3,6,9,2,4,1,7,5],
      [2,1,9,8,5,7,4,3,6],
      [7,4,5,3,1,6,8,9,2]
    ]
  },
  {
    id: 5,
    difficulty: 'hard',
    puzzle: [
      [null,null,null,null,null,null,null,1,null],
      [4,null,null,null,null,null,null,null,null],
      [null,2,7,null,null,null,5,null,null],
      [null,null,5,null,null,null,null,null,null],
      [null,null,null,null,8,null,4,null,null],
      [null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null]
    ],
    solution: [
      [5,8,3,4,2,7,6,1,9],
      [4,1,6,8,9,5,2,3,7],
      [9,2,7,1,3,6,5,4,8],
      [8,3,5,6,7,2,1,9,4],
      [1,6,9,3,8,4,7,5,2],
      [7,4,2,5,1,9,8,6,3],
      [2,5,8,9,4,3,1,7,6],
      [3,7,1,2,6,8,4,9,5],
      [6,9,4,7,5,1,3,8,2]
    ]
  }
];