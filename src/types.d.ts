type Values<T> = T[keyof T];

type BoardSize = {
  w: number;
  h: number;
};

type GameState = 'CHOOSING_SIZE' | 'PLAYING' | 'GAME_OVER';
type Shape = 'CIRCLE' | 'SQUARE' | 'TRIANGLE';
type Color = 'green' | 'blue' | 'yellow' | 'red';

type Card = {
  shape: Shape;
  color: Color;
  filled: boolean;
};
