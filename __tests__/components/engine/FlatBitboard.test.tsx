import FlatBitboard from '~/components/spockfish-board/engine/FlatBitboard';

describe('FlatBitboard', () => {
	it('can be initialized', () => {
		const bb = new FlatBitboard();
		expect(bb.low).toBe(0);
		expect(bb.high).toBe(0);
	});
});
