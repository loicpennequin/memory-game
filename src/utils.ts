import { COLORS, SHAPES } from './constants';

export const makeCard = (index: number): Card => {
  const shapeIndex = index % SHAPES.length;
  const colorIndex =
    (Math.floor(index / SHAPES.length) + shapeIndex) % COLORS.length;

  return {
    shape: SHAPES[shapeIndex],
    color: COLORS[colorIndex],
    filled: !!Math.round(Math.random())
  };
};

export const shuffle = <T>(array: T[]) => {
  const result = array.slice();

  for (let i = result.length; i > 1; i--) {
    const pick = Math.floor(Math.random() * i);
    const tmp = result[i - 1];
    result[i - 1] = result[pick];
    result[pick] = tmp;
  }
  return result;
};
