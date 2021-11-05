import Position from '~/engine/Position';
import Piece from  '~/engine/Piece';
import Move from '~/engine/Move';

describe('Position', () => {
	it('can be initialized to the initial position', () => {
		const pos = Position.makeInitial();
		expect(pos.pieces.length).toBe(32);
	});

	type LegalMovesTestCase = {
		name: string,
		piece: Piece,
		expectedMoves: Move[],
	}

	const legalMovesTestCases: LegalMovesTestCase[] = [
		{
			name: 'knights',
			piece: {
				piece: 'n',
				file: 'a',
				rank: 1,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [
				{
					piece: 'n',
					color: 'w',
					from: { file: 'a', rank: 1, level: 'W' },
					to: { file: 'b', rank: 3, level: 'W' }
				},
				{
					piece: 'n',
					color: 'w',
					from: { file: 'a', rank: 1, level: 'W' },
					to: { file: 'c', rank: 2, level: 'W' },
				},
				{
					piece: 'n',
					color: 'w',
					from: { file: 'a', rank: 1, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
				}
			],
		},
		{
			name: 'pawns',
			piece: {
				piece: 'p',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'W' }
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 4, level: 'W' }
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'N' }
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 4, level: 'N' }
				},
			],
		},
	];

	legalMovesTestCases.forEach(({ name, piece, expectedMoves }) => {
		it(`can generate legal piece moves - ${name}`, () => {
			const pos = Position.makeInitial();
			const moves = pos.getLegalMovesForPiece(piece);
			expect(expectedMoves).toHaveLength(moves.length);
			expect(moves).toEqual(expect.arrayContaining(expectedMoves));
		});
	});
});
