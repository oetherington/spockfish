import Position from '~/engine/Position';
import Piece from  '~/engine/Piece';
import Move from '~/engine/Move';

describe('Position', () => {
	it('can be initialized to the initial position', () => {
		const pos = Position.makeInitial();
		expect(pos.pieces.length).toBe(32);
	});

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
			position: new Position([
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
			]),
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
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 1,
					color: 'w',
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
			position: new Position([
				{
					piece: 'b',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
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
			position: new Position([
				{
					piece: 'r',
					file: 'c',
					rank: 4,
					color: 'w',
					level: 'N',
				},
			]),
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
			position: new Position([
				{
					piece: 'q',
					file: 'c',
					rank: 4,
					color: 'w',
					level: 'N',
				},
			]),
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
			position: new Position([
				{
					piece: 'k',
					file: 'a',
					rank: 2,
					color: 'w',
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
		{
			name: 'white pawn collisions - friendly piece one square ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
			]),
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
					to: { file: 'a', rank: 3, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'white pawn collisions - enemy piece one square ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 3,
					color: 'b',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
			]),
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
					capture: true,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 3, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'white pawn collisions - friendly piece two squares ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 4,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
			]),
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
			name: 'white pawn collisions - enemy piece two squares ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 4,
					color: 'b',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
			]),
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
					to: { file: 'a', rank: 3, level: 'N' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'a', rank: 2, level: 'W' },
					to: { file: 'a', rank: 4, level: 'W' },
					capture: true,
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
			name: 'black pawn collisions - friendly piece one square ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 6,
					color: 'b',
					level: 'B',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			], 'b'),
			piece: {
				piece: 'p',
				file: 'a',
				rank: 7,
				color: 'b',
				level: 'B',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'black pawn collisions - enemy piece one square ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 6,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			], 'b'),
			piece: {
				piece: 'p',
				file: 'a',
				rank: 7,
				color: 'b',
				level: 'B',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'B' },
					capture: true,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'black pawn collisions - friendly piece two squares ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 5,
					color: 'b',
					level: 'B',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			], 'b'),
			piece: {
				piece: 'p',
				file: 'a',
				rank: 7,
				color: 'b',
				level: 'B',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'B' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'N' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 5, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'black pawn collisions - enemy piece two squares ahead',
			position: new Position([
				{
					piece: 'n',
					file: 'a',
					rank: 5,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			], 'b'),
			piece: {
				piece: 'p',
				file: 'a',
				rank: 7,
				color: 'b',
				level: 'B',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'B' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 6, level: 'N' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 5, level: 'B' },
					capture: true,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'a', rank: 7, level: 'B' },
					to: { file: 'a', rank: 5, level: 'N' },
					capture: false,
				},
			],
		},
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
				{
					piece: 'n',
					file: 'a',
					rank: 1,
					color: 'w',
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
				{
					piece: 'b',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
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
			name: 'rook move collisions',
			position: new Position([
				{
					piece: 'n',
					file: 'c',
					rank: 6,
					color: 'w',
					level: 'N',
				},
				{
					piece: 'n',
					file: 'b',
					rank: 4,
					color: 'b',
					level: 'N',
				},
				{
					piece: 'r',
					file: 'c',
					rank: 4,
					color: 'w',
					level: 'N',
				},
			]),
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
					to: { file: 'b', rank: 4, level: 'N' },
					capture: true,
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
			name: 'queen move collisions',
			position: new Position([
				{
					piece: 'n',
					file: 'b',
					rank: 4,
					color: 'w',
					level: 'N',
				},
				{
					piece: 'n',
					file: 'c',
					rank: 6,
					color: 'b',
					level: 'N',
				},
				{
					piece: 'q',
					file: 'c',
					rank: 4,
					color: 'w',
					level: 'N',
				},
			]),
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
					capture: true,
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
				{
					piece: 'k',
					file: 'a',
					rank: 2,
					color: 'w',
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

describe('Position - Checks', () => {
	it('can detect when a position is not check', () => {
		const pos = Position.makeInitial();
		expect(pos.isCheck()).toBe(false);
	});

	it('can detect when a position is check', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
			{
				piece: 'r',
				file: 'a',
				rank: 4,
				color: 'b',
				level: 'W',
			},
		]);
		expect(pos.isCheck()).toBe(true);
	});
});
