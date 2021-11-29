type Color = 'w' | 'b';

export default Color;

export const otherColor = (color: Color) => color === 'w' ? 'b' : 'w';
