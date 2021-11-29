import Color, { otherColor } from '~/engine/Color';

describe('Color', () => {
	it('can be switched', () => {
		const white: Color = 'w';
		const black: Color = 'b';

		expect(otherColor(white)).toBe(black);
		expect(otherColor(black)).toBe(white);
	});
});
