import Position from '~/engine/Position';
import Piece from  '~/engine/Piece';
import Move from '~/engine/Move';

describe('Position', () => {
	it('can be initialized to the initial position', () => {
		const pos = Position.makeInitial();
		expect(pos.pieces.length).toBe(32);
	});
});

describe('Position', () => {
	it('can get occupied squares', () => {
		const pos = Position.makeInitial();
		const occupied = pos.getOccupied('w');

		expect(occupied['W'].toSquares()).toHaveLength(8);
		expect(occupied['W'].toSquares()).toEqual(expect.arrayContaining([
			{ file: 'a', rank: 1 },
			{ file: 'b', rank: 1 },
			{ file: 'c', rank: 1 },
			{ file: 'd', rank: 1 },
			{ file: 'a', rank: 2 },
			{ file: 'b', rank: 2 },
			{ file: 'c', rank: 2 },
			{ file: 'd', rank: 2 },
		]));

		expect(occupied['QL1'].toSquares()).toHaveLength(4);
		expect(occupied['QL1'].toSquares()).toEqual(expect.arrayContaining([
			{ file: 'z', rank: 0 },
			{ file: 'a', rank: 0 },
			{ file: 'z', rank: 1 },
			{ file: 'a', rank: 1 },
		]));

		expect(occupied['KL1'].toSquares()).toHaveLength(4);
		expect(occupied['KL1'].toSquares()).toEqual(expect.arrayContaining([
			{ file: 'd', rank: 0 },
			{ file: 'e', rank: 0 },
			{ file: 'd', rank: 1 },
			{ file: 'e', rank: 1 },
		]));

		expect(occupied['N'].toSquares()).toHaveLength(0);
		expect(occupied['B'].toSquares()).toHaveLength(0);
		expect(occupied['QL2'].toSquares()).toHaveLength(0);
		expect(occupied['QL3'].toSquares()).toHaveLength(0);
		expect(occupied['QL4'].toSquares()).toHaveLength(0);
		expect(occupied['QL5'].toSquares()).toHaveLength(0);
		expect(occupied['QL6'].toSquares()).toHaveLength(0);
		expect(occupied['KL2'].toSquares()).toHaveLength(0);
		expect(occupied['KL3'].toSquares()).toHaveLength(0);
		expect(occupied['KL4'].toSquares()).toHaveLength(0);
		expect(occupied['KL5'].toSquares()).toHaveLength(0);
		expect(occupied['KL6'].toSquares()).toHaveLength(0);
	});
});

type LegalMovesTestCase = {
	name: string,
	position: Position,
	piece: Piece,
	expectedMoves: Move[],
}

const runLegalMovesTestCases = (
	description: string,
	legalMovesTestCases: LegalMovesTestCase[],
) : void => {
	legalMovesTestCases.forEach(({ name, position, piece, expectedMoves }) => {
		it(`${description} - ${name}`, () => {
			const moves = position.getLegalMovesForPiece(piece);
			expect(moves).toHaveLength(expectedMoves.length);
			expect(moves).toEqual(expect.arrayContaining(expectedMoves));
		});
	});
}

describe('Position - Empty board moves', () => {
	const legalMovesTestCases: LegalMovesTestCase[] = [
		{
			name: 'pawns',
			position: new Position(),
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
					to: { file: 'a', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 4, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'knights',
			position: new Position(),
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
					to: { file: 'b', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'n',
					color: 'w',
					from: { file: 'a', rank: 1, level: 'W' },
					to: { file: 'c', rank: 2, level: 'W' },
					capture: false,
				},
				{
					piece: 'n',
					color: 'w',
					from: { file: 'a', rank: 1, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				}
			],
		},
		{
			name: 'bishops',
			position: new Position(),
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
					to: { file: 'z', rank: 1, level: 'QL1' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'c', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'c', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'd', rank: 5, level: 'N' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'd', rank: 5, level: 'B' },
					capture: false,
				},
			],
		},
		{
			name: 'rooks',
			position: new Position(),
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
					to: { file: 'c', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 2, level: 'W' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 5, level: 'N' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 6, level: 'N' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 5, level: 'B' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 6, level: 'B' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 7, level: 'B' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 8, level: 'B' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'r',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 4, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'queens',
			position: new Position(),
			piece: {
				piece: 'q',
				file: 'c',
				rank: 4,
				color: 'w',
				level: 'N',
			},
			expectedMoves: [
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 2, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 5, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 6, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 5, level: 'B' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 6, level: 'B' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 7, level: 'B' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'c', rank: 8, level: 'B' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'z', rank: 1, level: 'QL1' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 2, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 5, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 6, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 5, level: 'N' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'b', rank: 5, level: 'B' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'a', rank: 6, level: 'B' },
					capture: false,
				},
				{
					piece: 'q',
					color: 'w',
					from: { file: 'c', rank: 4, level: 'N' },
					to: { file: 'd', rank: 5, level: 'B' },
					capture: false,
				},
			],
		},
		{
			name: 'kings',
			position: new Position(),
			piece: {
				piece: 'k',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 2, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'z', rank: 1, level: 'QL1' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 1, level: 'QL1' },
					capture: false,
				},
			],
		},
	];

	runLegalMovesTestCases(
		'can generate legal piece moves',
		legalMovesTestCases,
	);
});

describe('Position - Piece collisions', () => {
	const legalMovesTestCases: LegalMovesTestCase[] = [
		/*
		{
			name: 'pawns - friendly piece one square ahead',
			piece: {
				piece: 'p',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [],
		},
		{
			name: 'pawns - friendly piece two squares ahead',
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
					to: { file: 'a', rank: 1, level: 'QL1' }
				},
			],
		},
		*/
		{
			name: 'knight move collisions',
			position: new Position([
				{
					piece: 'n',
					file: 'b',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'n',
					file: 'c',
					rank: 2,
					color: 'b',
					level: 'W',
				},
			]),
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
					to: { file: 'c', rank: 2, level: 'W' },
					capture: true,
				},
				{
					piece: 'n',
					color: 'w',
					from: { file: 'a', rank: 1, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				}
			],
		},
		{
			name: 'bishop move collisions',
			position: new Position([
				{
					piece: 'n',
					file: 'c',
					rank: 4,
					color: 'b',
					level: 'W',
				},
				{
					piece: 'n',
					file: 'c',
					rank: 4,
					color: 'w',
					level: 'N',
				},
			]),
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
					to: { file: 'z', rank: 1, level: 'QL1' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'c', rank: 4, level: 'W' },
					capture: true,
				},
				{
					piece: 'b',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'king move collisions',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 1,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'n',
					file: 'a',
					rank: 3,
					color: 'b',
					level: 'W',
				},
			]),
			piece: {
				piece: 'k',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'W' },
					capture: true,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 1, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 2, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'W' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'b', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'z', rank: 1, level: 'QL1' },
					capture: false,
				},
				{
					piece: 'k',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 1, level: 'QL1' },
					capture: false,
				},
			],
		},
	];

	runLegalMovesTestCases(
		'can detect piece collisions',
		legalMovesTestCases,
	);
});
