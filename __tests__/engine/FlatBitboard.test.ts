import FlatBitboard from '~/engine/FlatBitboard';
import { File, Rank, FlatSquare } from '~/engine/Square';

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

	it('can be initialized from squares', () => {
		const bb = FlatBitboard.fromSquares([
			{ file: 'z', rank: 0 },
			{ file: 'a', rank: 0 },
		]);
		expect(bb.low).toBe(0b0100_0000_0001);
		expect(bb.high).toBe(0);
	});

	it('can be initialized by rank', () => {
		const r0 = FlatBitboard.fromRank(0).toSquares();
		expect(r0).toHaveLength(6);
		expect(r0).toEqual(expect.arrayContaining([
			{ file: 'z', rank: 0 },
			{ file: 'a', rank: 0 },
			{ file: 'b', rank: 0 },
			{ file: 'c', rank: 0 },
			{ file: 'd', rank: 0 },
			{ file: 'e', rank: 0 },
		]));

		const r5 = FlatBitboard.fromRank(5).toSquares();
		expect(r5).toHaveLength(6);
		expect(r5).toEqual(expect.arrayContaining([
			{ file: 'z', rank: 5 },
			{ file: 'a', rank: 5 },
			{ file: 'b', rank: 5 },
			{ file: 'c', rank: 5 },
			{ file: 'd', rank: 5 },
			{ file: 'e', rank: 5 },
		]));
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

	it('can convert to string', () => {
		const bb = new FlatBitboard(1, 1);
		const str = bb.toString();
		expect(str).toBe(
			'0000000000000000000000000000000100000000000000000000000000000001'
		);
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
		expect((new FlatBitboard(1, 0)).isBitSet(0)).toBe(true);
		expect((new FlatBitboard(2, 0)).isBitSet(0)).toBe(false);
		expect((new FlatBitboard(3, 0)).isBitSet(1)).toBe(true);
		expect((new FlatBitboard(3, 0)).isBitSet(2)).toBe(false);
		expect((new FlatBitboard(0, 3)).isBitSet(1)).toBe(false);
		expect((new FlatBitboard(0, 1)).isBitSet(32)).toBe(true);
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
		const files: File[] = [ 'z', 'a', 'b', 'c', 'd', 'e' ];

		for (let rank = 0; rank < 10; rank++) {
			for (const file of files) {
				const index = FlatBitboard.squareToIndex(file, rank);
				expect(index >= 0 && index < 64).toBe(true);
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

	it('can set squares', () => {
		const bb = new FlatBitboard();
		bb.setSquare('z', 0);
		expect(bb.low).toBe(1);
		expect(bb.high).toBe(0);
		bb.setSquare('z', 1);
		expect(bb.low).toBe(3);
		expect(bb.high).toBe(0);
	});

	it('can check if a square is set', () => {
		const bb = new FlatBitboard(1, 0);
		expect(bb.isSquareSet('z', 0)).toBe(true);
		expect(bb.isSquareSet('z', 1)).toBe(false);
	});

	it('can convert to squares', () => {
		const bb = new FlatBitboard(5);
		const squares = bb.toSquares();
		expect(squares[0]).toStrictEqual({ file: 'z', rank: 0 });
		expect(squares[1]).toStrictEqual({ file: 'z', rank: 2 });
	});

	it('can convert to pieces', () => {
		const bb = new FlatBitboard(5);
		const pieces = bb.toPieces('n', 'w', 'W');
		expect(pieces[0]).toStrictEqual({
			piece: 'n',
			color: 'w',
			file: 'z',
			rank: 0,
			level: 'W',
		});
		expect(pieces[1]).toStrictEqual({
			piece: 'n',
			color: 'w',
			file: 'z',
			rank: 2,
			level: 'W',
		});
	});

	type MovesTestCase = {
		name: string,
		file: File,
		rank: Rank,
		squares: FlatSquare[],
	};

	const movesTestCase = (
		{ name, file, rank, squares }: MovesTestCase,
		toSquares: (bb: FlatBitboard) => FlatSquare[],
	) => {
		it(`can calculate legal moves - ${name}`, () => {
			const bb = FlatBitboard.fromSquares([ { file, rank } ]);
			const result = toSquares(bb);
			expect(result).toHaveLength(squares.length);
			expect(result).toEqual(expect.arrayContaining(squares));
		});
	};

	const whitePawnTestCases: MovesTestCase[] = [
		{
			name: 'white pawn on second rank',
			file: 'a',
			rank: 2,
			squares: [
				{ file: 'a', rank: 3 },
				{ file: 'a', rank: 4 },
			],
		},
		{
			name: 'white pawn on third rank',
			file: 'a',
			rank: 3,
			squares: [
				{ file: 'a', rank: 4 },
			],
		},
	];

	whitePawnTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.pawnMoves('W', 'w').toSquares(),
	));

	const blackPawnTestCases: MovesTestCase[] = [
		{
			name: 'black pawn on seventh rank',
			file: 'a',
			rank: 7,
			squares: [
				{ file: 'a', rank: 5 },
				{ file: 'a', rank: 6 },
			],
		},
		{
			name: 'black pawn on sixth rank',
			file: 'a',
			rank: 6,
			squares: [
				{ file: 'a', rank: 5 },
			],
		},
	];

	blackPawnTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.pawnMoves('B', 'b').toSquares(),
	));

	const knightTestCases: MovesTestCase[] = [
		{
			name: 'knight in center of board',
			file: 'b',
			rank: 5,
			squares: [
				{ file: 'z', rank: 6 },
				{ file: 'z', rank: 4 },
				{ file: 'a', rank: 7 },
				{ file: 'a', rank: 3 },
				{ file: 'c', rank: 7 },
				{ file: 'c', rank: 3 },
				{ file: 'd', rank: 6 },
				{ file: 'd', rank: 4 },
			],
		},
		{
			name: 'knight in bottom-left corner',
			file: 'a',
			rank: 1,
			squares: [
				{ file: 'z', rank: 3 },
				{ file: 'b', rank: 3 },
				{ file: 'c', rank: 0 },
				{ file: 'c', rank: 2 },
			],
		},
		{
			name: 'knight in bottom-right corner',
			file: 'd',
			rank: 1,
			squares: [
				{ file: 'b', rank: 2 },
				{ file: 'b', rank: 0 },
				{ file: 'c', rank: 3 },
				{ file: 'e', rank: 3 },
			],
		},
		{
			name: 'knight in top-left corner',
			file: 'a',
			rank: 8,
			squares: [
				{ file: 'z', rank: 6 },
				{ file: 'b', rank: 6 },
				{ file: 'c', rank: 7 },
				{ file: 'c', rank: 9 },
			],
		},
		{
			name: 'knight in top-right corner',
			file: 'd',
			rank: 8,
			squares: [
				{ file: 'b', rank: 9 },
				{ file: 'b', rank: 7 },
				{ file: 'c', rank: 6 },
				{ file: 'e', rank: 6 },
			],
		},
	];

	knightTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.knightMoves().toSquares(),
	));

	const bishopTestCases: MovesTestCase[] = [
		{
			name: 'bishop in center of board',
			file: 'b',
			rank: 5,
			squares: [
				{ file: 'z', rank: 3 },
				{ file: 'z', rank: 7 },
				{ file: 'a', rank: 4 },
				{ file: 'a', rank: 6 },
				{ file: 'c', rank: 4 },
				{ file: 'c', rank: 6 },
				{ file: 'd', rank: 3 },
				{ file: 'd', rank: 7 },
				{ file: 'e', rank: 2 },
				{ file: 'e', rank: 8 },
			],
		},
		{
			name: 'bishop in bottom-left corner',
			file: 'a',
			rank: 2,
			squares: [
				{ file: 'z', rank: 1 },
				{ file: 'z', rank: 3 },
				{ file: 'b', rank: 1 },
				{ file: 'b', rank: 3 },
				{ file: 'c', rank: 0 },
				{ file: 'c', rank: 4 },
				{ file: 'd', rank: 5 },
				{ file: 'e', rank: 6 },
			],
		},
	];

	bishopTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.bishopMoves().toSquares(),
	));

	const rookTestCases: MovesTestCase[] = [
		{
			name: 'rook in center of board',
			file: 'b',
			rank: 5,
			squares: [
				{ file: 'z', rank: 5 },
				{ file: 'a', rank: 5 },
				{ file: 'c', rank: 5 },
				{ file: 'd', rank: 5 },
				{ file: 'e', rank: 5 },
				{ file: 'b', rank: 0 },
				{ file: 'b', rank: 1 },
				{ file: 'b', rank: 2 },
				{ file: 'b', rank: 3 },
				{ file: 'b', rank: 4 },
				{ file: 'b', rank: 6 },
				{ file: 'b', rank: 7 },
				{ file: 'b', rank: 8 },
				{ file: 'b', rank: 9 },
			],
		},
	];

	rookTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.rookMoves().toSquares(),
	));

	const queenTestCases: MovesTestCase[] = [
		{
			name: 'queen in center of board',
			file: 'b',
			rank: 5,
			squares: [
				{ file: 'z', rank: 5 },
				{ file: 'a', rank: 5 },
				{ file: 'c', rank: 5 },
				{ file: 'd', rank: 5 },
				{ file: 'e', rank: 5 },
				{ file: 'b', rank: 0 },
				{ file: 'b', rank: 1 },
				{ file: 'b', rank: 2 },
				{ file: 'b', rank: 3 },
				{ file: 'b', rank: 4 },
				{ file: 'b', rank: 6 },
				{ file: 'b', rank: 7 },
				{ file: 'b', rank: 8 },
				{ file: 'b', rank: 9 },
				{ file: 'z', rank: 3 },
				{ file: 'z', rank: 7 },
				{ file: 'a', rank: 4 },
				{ file: 'a', rank: 6 },
				{ file: 'c', rank: 4 },
				{ file: 'c', rank: 6 },
				{ file: 'd', rank: 3 },
				{ file: 'd', rank: 7 },
				{ file: 'e', rank: 2 },
				{ file: 'e', rank: 8 },
			],
		},
	];

	queenTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.queenMoves().toSquares(),
	));

	const kingTestCases: MovesTestCase[] = [
		{
			name: 'king in center of board',
			file: 'c',
			rank: 4,
			squares: [
				{ file: 'b', rank: 3 },
				{ file: 'b', rank: 4 },
				{ file: 'b', rank: 5 },
				{ file: 'c', rank: 3 },
				{ file: 'c', rank: 5 },
				{ file: 'd', rank: 3 },
				{ file: 'd', rank: 4 },
				{ file: 'd', rank: 5 },
			],
		},
		{
			name: 'king on left edge of board',
			file: 'z',
			rank: 4,
			squares: [
				{ file: 'z', rank: 3 },
				{ file: 'z', rank: 5 },
				{ file: 'a', rank: 3 },
				{ file: 'a', rank: 4 },
				{ file: 'a', rank: 5 },
			],
		},
		{
			name: 'king on right edge of board',
			file: 'e',
			rank: 4,
			squares: [
				{ file: 'd', rank: 3 },
				{ file: 'd', rank: 4 },
				{ file: 'd', rank: 5 },
				{ file: 'e', rank: 3 },
				{ file: 'e', rank: 5 },
			],
		},
		{
			name: 'king at bottom of board',
			file: 'a',
			rank: 0,
			squares: [
				{ file: 'z', rank: 0 },
				{ file: 'z', rank: 1 },
				{ file: 'a', rank: 1 },
				{ file: 'b', rank: 0 },
				{ file: 'b', rank: 1 },
			],
		},
		{
			name: 'king at top of board',
			file: 'a',
			rank: 9,
			squares: [
				{ file: 'z', rank: 8 },
				{ file: 'z', rank: 9 },
				{ file: 'a', rank: 8 },
				{ file: 'b', rank: 8 },
				{ file: 'b', rank: 9 },
			],
		},
	];

	kingTestCases.forEach(testCase => movesTestCase(
		testCase,
		bb => bb.kingMoves().toSquares(),
	));
});
