export const BOARD_SIZES: { label: string; value: BoardSize }[] = [
  {
    label: '3 x 2',
    value: {
      w: 3,
      h: 2
    }
  },
  {
    label: '4 x 3',
    value: {
      w: 4,
      h: 3
    }
  },
  {
    label: '5 x 4',
    value: {
      w: 5,
      h: 4
    }
  },
  {
    label: '6 x 5',
    value: {
      w: 6,
      h: 5
    }
  }
];

export const GAME_STATES: Readonly<Record<GameState, GameState>> = {
  CHOOSING_SIZE: 'CHOOSING_SIZE',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER'
} as const;

export const SHAPES: Shape[] = ['CIRCLE', 'SQUARE', 'TRIANGLE'];
export const COLORS: Color[] = ['green', 'blue', 'red', 'yellow'];
