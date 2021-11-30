import { DiagIter, RankIter, FileIter } from '~/engine/Iterators';

describe('DiagIter', () => {
	it('can iterate along diagonals', () => {
		const iter = DiagIter('a', 2, 1, 1);
		expect(iter.next().value).toStrictEqual({ file: 'b', rank: 3 });
		expect(iter.next().value).toStrictEqual({ file: 'c', rank: 4 });
		expect(iter.next().value).toStrictEqual({ file: 'd', rank: 5 });
		expect(iter.next().value).toStrictEqual({ file: 'e', rank: 6 });
		expect(iter.next().value).toStrictEqual(undefined);
	});
});

describe('FileIter', () => {
	it('can iterate upwards along files', () => {
		const iter = FileIter('a', 6, 1);
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 7 });
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 8 });
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 9 });
		expect(iter.next().value).toStrictEqual(undefined);
	});

	it('can iterate downwards along files', () => {
		const iter = FileIter('a', 3, -1);
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 2 });
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 1 });
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 0 });
		expect(iter.next().value).toStrictEqual(undefined);
	});
});

describe('RankIter', () => {
	it('can iterate right along ranks', () => {
		const iter = RankIter(6, 'b', 1);
		expect(iter.next().value).toStrictEqual({ file: 'c', rank: 6 });
		expect(iter.next().value).toStrictEqual({ file: 'd', rank: 6 });
		expect(iter.next().value).toStrictEqual({ file: 'e', rank: 6 });
		expect(iter.next().value).toStrictEqual(undefined);
	});

	it('can iterate left along ranks', () => {
		const iter = RankIter(6, 'c', -1);
		expect(iter.next().value).toStrictEqual({ file: 'b', rank: 6 });
		expect(iter.next().value).toStrictEqual({ file: 'a', rank: 6 });
		expect(iter.next().value).toStrictEqual({ file: 'z', rank: 6 });
		expect(iter.next().value).toStrictEqual(undefined);
	});
});
