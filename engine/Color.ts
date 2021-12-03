type Color = 'w' | 'b';

export default Color;

export const otherColor = (color: Color) => color === 'w' ? 'b' : 'w';

export const colors: Color[] = [ 'w', 'b' ];
