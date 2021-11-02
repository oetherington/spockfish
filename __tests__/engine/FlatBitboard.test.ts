import FlatBitboard from '~/engine/FlatBitboard';
import { FlatSquare } from '~/engine/Square';

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

	it('can test equality', () => {
		const a = new FlatBitboard(323, 52);
		const b = new FlatBitboard(323, 52);
		const c = new FlatBitboard();
		expect(a.equals(b)).toBe(true);
		expect(b.equals(a)).toBe(true);
		expect(a.equals(c)).toBe(false);
		expect(b.equals(c)).toBe(false);
		expect(c.equals(a)).toBe(false);
		expect(c.equals(b)).toBe(false);
	});

	it('can be cloned', () => {
		const a = new FlatBitboard(323, 52);
		const b = a.clone();
		expect(b.low).toBe(a.low);
		expect(b.high).toBe(a.high);
	});

	it('can detect if empty', () => {
		expect((new FlatBitboard()).isEmpty()).toBe(true);
		expect((new FlatBitboard(1, 0)).isEmpty()).toBe(false);
		expect((new FlatBitboard(0, 1)).isEmpty()).toBe(false);
		expect((new FlatBitboard(1, 1)).isEmpty()).toBe(false);
	});

	it('can calculate popcount', () => {
		expect((new FlatBitboard()).popcount()).toBe(0);
		expect((new FlatBitboard(3, 0)).popcount()).toBe(2);
		expect((new FlatBitboard(3, 4)).popcount()).toBe(3);
	});

	it('can get the lowest set bit', () => {
		expect((new FlatBitboard(1, 0)).lowestBit()).toBe(0);
		expect((new FlatBitboard(4, 0)).lowestBit()).toBe(2);
		expect((new FlatBitboard(0, 1)).lowestBit()).toBe(32);
		expect((new FlatBitboard(0, 4)).lowestBit()).toBe(34);
		expect((new FlatBitboard(4, 4)).lowestBit()).toBe(2);
		expect((new FlatBitboard(5, 4)).lowestBit()).toBe(0);
	});

	it('can pop the lowest set bit', () => {
		const bb = new FlatBitboard(1, 1);
		const a = bb.popLowestBit();
		expect(a).toBe(0);
		expect(bb.low).toBe(0);
		expect(bb.high).toBe(1);
		const b = bb.popLowestBit();
		expect(b).toBe(32);
		expect(bb.low).toBe(0);
		expect(bb.high).toBe(0);
	});

	it('can set all bits', () => {
		const bb = new FlatBitboard();
		bb.setAll();
		expect(bb.low).toBe(0xffffffff);
		expect(bb.high).toBe(0xffffffff);
	});

	it('can test if a particular bit is set', () => {
		expect((new FlatBitboard(1, 0)).isSet(0)).toBe(true);
		expect((new FlatBitboard(2, 0)).isSet(0)).toBe(false);
		expect((new FlatBitboard(3, 0)).isSet(1)).toBe(true);
		expect((new FlatBitboard(3, 0)).isSet(2)).toBe(false);
		expect((new FlatBitboard(0, 3)).isSet(1)).toBe(false);
		expect((new FlatBitboard(0, 1)).isSet(32)).toBe(true);
	});

	it('can set a bit by index', () => {
		const bb = new FlatBitboard(1, 1);
		bb.setBit(2);
		expect(bb.low).toBe(5);
		expect(bb.high).toBe(1);
		bb.setBit(33);
		expect(bb.low).toBe(5);
		expect(bb.high).toBe(3);
	});

	it('can unset a bit by index', () => {
		const bb = new FlatBitboard(5, 3);
		bb.unsetBit(2);
		expect(bb.low).toBe(1);
		expect(bb.high).toBe(3);
		bb.unsetBit(33);
		expect(bb.low).toBe(1);
		expect(bb.high).toBe(1);
	});

	it('can select bits by "both"', () => {
		const a = new FlatBitboard(1, 1);
		const b = new FlatBitboard(5, 3);
		const c = a.both(b);
		expect(c.low).toBe(1);
		expect(c.high).toBe(1);
	});

	it('can select bits by "onlyLeft"', () => {
		const a = new FlatBitboard(1, 1);
		const b = new FlatBitboard(2, 4);
		const c = a.onlyLeft(b);
		expect(c.low).toBe(1);
		expect(c.high).toBe(1);
	});

	it('can select bits by "onlyRight"', () => {
		const a = new FlatBitboard(2, 4);
		const b = new FlatBitboard(1, 1);
		const c = a.onlyRight(b);
		expect(c.low).toBe(1);
		expect(c.high).toBe(1);
	});

	it('can select bits by "either"', () => {
		const a = new FlatBitboard(3, 4);
		const b = new FlatBitboard(1, 1);
		const c = a.either(b);
		expect(c.low).toBe(3);
		expect(c.high).toBe(5);
	});

	it('can select bits by "exclusiveEither"', () => {
		const a = new FlatBitboard(3, 1);
		const b = new FlatBitboard(1, 5);
		const c = a.exclusiveEither(b);
		expect(c.low).toBe(2);
		expect(c.high).toBe(4);
	});

	it('can select bits by "neither"', () => {
		const a = new FlatBitboard(3, 4);
		const b = new FlatBitboard(1, 1);
		const c = a.neither(b);
		expect(c.low).toBe(0xffffffff - 3);
		expect(c.high).toBe(0xffffffff - 5);
	});

	it('can shift bits left', () => {
		const a = new FlatBitboard(5, 3);
		a.shiftLeft(2);
		expect(a.low).toBe(20);
		expect(a.high).toBe(12);

		const b = new FlatBitboard(5, 3);
		b.shiftLeft(-2);
		expect(b.low).toBe(0b1100_0000_0000_0000_0000_0000_0000_0001);
		expect(b.high).toBe(0);

		const c = new FlatBitboard(5, 3);
		c.shiftLeft(64);
		expect(c.low).toBe(0);
		expect(c.high).toBe(0);
	});

	it('can shift bits right', () => {
		const a = new FlatBitboard(5, 3);
		a.shiftRight(2);
		expect(a.low).toBe(0b1100_0000_0000_0000_0000_0000_0000_0001);
		expect(a.high).toBe(0);

		const b = new FlatBitboard(5, 3);
		b.shiftRight(-2);
		expect(b.low).toBe(20);
		expect(b.high).toBe(12);

		const c = new FlatBitboard(5, 3);
		c.shiftRight(64);
		expect(c.low).toBe(0);
		expect(c.high).toBe(0);
	});

	it('can do index <-> square conversions', () => {
		const data: FlatSquare[] = [];

		for (let rank = 1; rank < 10; rank++) {
			for (const file of [ 'z', 'a', 'b', 'c', 'd', 'e' ]) {
				const index = FlatBitboard.squareToIndex(file, rank);
				expect(data[index]).toBe(undefined);
				data[index] = { file, rank };
			}
		}

		data.forEach(({ file, rank }, index) => {
			const res = FlatBitboard.indexToSquare(index);
			expect(res.file).toBe(file);
			expect(res.rank).toBe(rank);
		});
	});
});
