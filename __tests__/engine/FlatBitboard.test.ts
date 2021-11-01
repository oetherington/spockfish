import FlatBitboard from '~/engine/FlatBitboard';

describe('FlatBitboard', () => {
	it('can be default initialized', () => {
		const bb = new FlatBitboard();
		expect(bb.low).toBe(0);
		expect(bb.high).toBe(0);
	});

	it('can be custom initialized', () => {
		const low = 3;
		const high = 4;
		const bb = new FlatBitboard(low, high);
		expect(bb.low).toBe(low);
		expect(bb.high).toBe(high);
	});

	it('can calculate popcount', () => {
		const low = 3;
		const high = 4;
		const bb = new FlatBitboard(low, high);
		expect(bb.popcount()).toBe(3);
	});
});
