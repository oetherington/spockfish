import Position from '~/engine/Position';
import Piece from  '~/engine/Piece';
import Move from '~/engine/Move';

describe('Position', () => {
	it('can be initialized to the initial position', () => {
		const pos = Position.makeInitial();
		expect(pos.pieces.length).toBe(32);
	});

	it('can generate legal piece moves', () => {
		type TestCase = {
			piece: Piece,
			expectedMoves: Move[],
		}

		const testCases: TestCase[] = [
			{
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
						from: {
							file: 'a',
							rank: 1,
							level: 'W',
						},
						to: {
							file: 'b',
							rank: 3,
							level: 'W',
						}
					},
					{
						piece: 'n',
						color: 'w',
						from: {
							file: 'a',
							rank: 1,
							level: 'W',
						},
						to: {
							file: 'c',
							rank: 2,
							level: 'W',
						},
					},
					{
						piece: 'n',
						color: 'w',
						from: {
							file: 'a',
							rank: 1,
							level: 'W',
						},
						to: {
							file: 'b',
							rank: 3,
							level: 'N',
						},
					}
				],
			},
		];

		testCases.forEach(({ piece, expectedMoves }) => {
			const pos = Position.makeInitial();
			const moves = pos.getLegalMovesForPiece(piece);
			expect(expectedMoves).toHaveLength(moves.length);
			expect(moves).toEqual(expect.arrayContaining(expectedMoves));
		});
	});
});
