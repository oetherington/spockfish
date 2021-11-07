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
			name: 'bishops',
			piece: {
				piece: 'b',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'z', rank: 1, level: 'QL1' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 1, level: 'W' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'W' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'c', rank: 4, level: 'W' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'c', rank: 4, level: 'N' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'd', rank: 5, level: 'N' }
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'd', rank: 5, level: 'B' }
				},
			],
		},
		{
			name: 'rooks',
			piece: {
				piece: 'r',
				file: 'c',
				rank: 4,
				color: 'w',
				level: 'N',
			},
			expectedMoves: [
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 1, level: 'W' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 2, level: 'W' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 3, level: 'W' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 3, level: 'N' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 5, level: 'N' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 6, level: 'N' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 5, level: 'B' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 6, level: 'B' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 7, level: 'B' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 8, level: 'B' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 4, level: 'W' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 4, level: 'W' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 4, level: 'W' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 4, level: 'N' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 4, level: 'N' }
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 4, level: 'N' }
				},
			],
		},
	];

	legalMovesTestCases.forEach(({ name, piece, expectedMoves }) => {
		it(`can generate legal piece moves - ${name}`, () => {
			const pos = Position.makeInitial();
			const moves = pos.getLegalMovesForPiece(piece);
			expect(moves).toHaveLength(expectedMoves.length);
			expect(moves).toEqual(expect.arrayContaining(expectedMoves));
		});
	});
});
