import Position from '~/engine/Position';
import Piece from  '~/engine/Piece';
import Move, { isCastleMove } from '~/engine/Move';
import AttackBoards from '~/engine/AttackBoards';
import { FlatSquare } from '~/engine/Square';
import FlatBitboard from '~/engine/FlatBitboard';

describe('Position', () => {
	it('can be initialized to the initial position', () => {
		const pos = Position.makeInitial();
		expect(pos.getPieces().length).toBe(32);
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
					to: { file: 'a', rank: 4, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'white pawn collisions - taking diagonally',
			position: new Position([
				{
					piece: 'p',
					file: 'b',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 4,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'c',
					rank: 4,
					color: 'b',
					level: 'W',
				},
			]),
			piece: {
				piece: 'p',
				file: 'b',
				rank: 3,
				color: 'w',
				level: 'W',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'w',
					from: { file: 'b', rank: 3, level: 'W' },
					to: { file: 'b', rank: 4, level: 'W' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'b', rank: 3, level: 'W' },
					to: { file: 'b', rank: 4, level: 'N' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'w',
					from: { file: 'b', rank: 3, level: 'W' },
					to: { file: 'c', rank: 4, level: 'W' },
					capture: true,
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
					to: { file: 'a', rank: 5, level: 'N' },
					capture: false,
				},
			],
		},
		{
			name: 'black pawn collisions - taking diagonally',
			position: new Position([
				{
					piece: 'p',
					file: 'b',
					rank: 6,
					color: 'b',
					level: 'B',
				},
				{
					piece: 'p',
					file: 'a',
					rank: 5,
					color: 'b',
					level: 'B',
				},
				{
					piece: 'p',
					file: 'c',
					rank: 5,
					color: 'w',
					level: 'B',
				},
			], 'b'),
			piece: {
				piece: 'p',
				file: 'b',
				rank: 6,
				color: 'b',
				level: 'B',
			},
			expectedMoves: [
				{
					piece: 'p',
					color: 'b',
					from: { file: 'b', rank: 6, level: 'B' },
					to: { file: 'b', rank: 5, level: 'B' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'b', rank: 6, level: 'B' },
					to: { file: 'b', rank: 5, level: 'N' },
					capture: false,
				},
				{
					piece: 'p',
					color: 'b',
					from: { file: 'b', rank: 6, level: 'B' },
					to: { file: 'c', rank: 5, level: 'B' },
					capture: true,
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
					to: { file: 'a', rank: 1, level: 'QL1' },
					capture: false,
				},
			],
		},
	];

	runLegalMovesTestCases('can detect piece collisions', legalMovesTestCases);
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

	it('a king in check must resolve the check', () => {
		const position = new Position([
			{
				piece: 'k',
				file: 'c',
				rank: 3,
				color: 'w',
				level: 'W',
			},
			{
				piece: 'r',
				file: 'c',
				rank: 1,
				color: 'b',
				level: 'W',
			},
			{
				piece: 'r',
				file: 'a',
				rank: 2,
				color: 'w',
				level: 'W',
			},
		]);

		const piece: Piece = {
			piece: 'k',
			file: 'c',
			rank: 3,
			color: 'w',
			level: 'W',
		};

		const expectedMoves: Move[] = [
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'b', rank: 2, level: 'W' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'b', rank: 3, level: 'W' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'b', rank: 4, level: 'W' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'd', rank: 2, level: 'W' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'd', rank: 3, level: 'W' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'd', rank: 4, level: 'W' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'b', rank: 3, level: 'N' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'b', rank: 4, level: 'N' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'd', rank: 3, level: 'N' },
				capture: false,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'c', rank: 3, level: 'W' },
				to: { file: 'd', rank: 4, level: 'N' },
				capture: false,
			},
			{
				piece: 'r',
				color: 'w',
				from: { file: 'a', rank: 2, level: 'W' },
				to: { file: 'c', rank: 2, level: 'W' },
				capture: false,
			},
		];

		const moves = position.getLegalMoves();
		expect(moves).toHaveLength(expectedMoves.length);
		expect(moves).toEqual(expect.arrayContaining(expectedMoves));
	});
});

type MakeMoveTestCase = {
	name: string,
	position: Position,
	move: Move,
	expectedPieces: Piece[],
	expectedAttackBoards?: AttackBoards,
}

const runMakeMoveTestCases = (
	description: string,
	makeMoveTestCases: MakeMoveTestCase[],
) : void => {
	makeMoveTestCases.forEach(({
		name,
		position,
		move,
		expectedPieces,
		expectedAttackBoards,
	}) => {
		it(`${description} - ${name}`, () => {
			const res = position.makeMove(move);

			const pieces = res.getPieces();
			expect(pieces).toHaveLength(expectedPieces.length);
			expect(pieces).toEqual(expect.arrayContaining(expectedPieces));

			if (expectedAttackBoards) {
				const ab = res.getAttackBoards();

				expect(ab.getWhite()).toHaveLength(
					expectedAttackBoards.getWhite().length);
				expect(ab.getWhite()).toEqual(
					expect.arrayContaining(expectedAttackBoards.getWhite()));

				expect(ab.getBlack()).toHaveLength(
					expectedAttackBoards.getBlack().length);
				expect(ab.getBlack()).toEqual(
					expect.arrayContaining(expectedAttackBoards.getBlack()));
			}
		});
	});
}

describe('Position - Castling', () => {
	it('Castling is illegal on move 1', () => {
		const pos = Position.makeInitial();

		const moves1 = pos.getLegalMoves().filter(isCastleMove);
		expect(moves1).toHaveLength(0);

		const res = pos.makeRandomMove();

		const moves2 = res.getLegalMoves().filter(isCastleMove);
		expect(moves2).toHaveLength(0);
	});

	it('Castling is illegal if the king has moved', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'e',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
		], 'w', 2, new AttackBoards(), 0, FlatBitboard.fromSquares([
			{ file: 'e', rank: 0 },
		]));

		const moves = pos.getLegalMoves().filter(isCastleMove);
		expect(moves).toHaveLength(0);
	});

	it('Castling is illegal if the rook has moved', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'e',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
		], 'w', 2, new AttackBoards(), 0, FlatBitboard.fromSquares([
			{ file: 'd', rank: 0 },
		]));

		const moves = pos.getLegalMoves().filter(isCastleMove);
		expect(moves).toHaveLength(0);
	});

	it('Castling is illegal if the king is in check', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'e',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'n',
				file: 'c',
				rank: 2,
				color: 'b',
				level: 'W',
			},
		], 'w', 2, new AttackBoards(), 0, FlatBitboard.fromSquares([
			{ file: 'd', rank: 0 },
			{ file: 'e', rank: 0 },
		]));

		const moves = pos.getLegalMoves().filter(isCastleMove);
		expect(moves).toHaveLength(0);
	});

	it('Castling is illegal if the target square is attacked', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'z',
				rank: 0,
				color: 'w',
				level: 'QL1',
			},
			{
				piece: 'r',
				file: 'e',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'n',
				file: 'd',
				rank: 2,
				color: 'b',
				level: 'W',
			},
			{
				piece: 'n',
				file: 'b',
				rank: 2,
				color: 'b',
				level: 'W',
			},
		], 'w', 2, new AttackBoards(), 0, FlatBitboard.fromSquares([
			{ file: 'z', rank: 0 },
			{ file: 'd', rank: 0 },
			{ file: 'e', rank: 0 },
		]));

		const moves = pos.getLegalMoves().filter(isCastleMove);
		expect(moves).toHaveLength(0);
	});

	it('Castling is illegal if there is a piece between king and rook', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'z',
				rank: 0,
				color: 'w',
				level: 'QL1',
			},
			{
				piece: 'n',
				file: 'a',
				rank: 0,
				color: 'w',
				level: 'QL1',
			},
		], 'w', 2, new AttackBoards(), 0, FlatBitboard.fromSquares([
			{ file: 'd', rank: 0 },
			{ file: 'z', rank: 0 },
		]));

		const moves = pos.getLegalMoves().filter(isCastleMove);
		expect(moves).toHaveLength(0);
	});

	it('Kings can castle when legal', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'e',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'r',
				file: 'z',
				rank: 0,
				color: 'w',
				level: 'QL1',
			},
		], 'w', 2, new AttackBoards(), 0, FlatBitboard.fromSquares([
			{ file: 'z', rank: 0 },
			{ file: 'd', rank: 0 },
			{ file: 'e', rank: 0 },
		]));

		const moves = pos.getLegalMoves().filter(isCastleMove);
		expect(moves).toHaveLength(2);
		expect(moves).toEqual(expect.arrayContaining([
			{
				piece: 'k',
				color: 'w',
				from: { file: 'd', rank: 0, level: 'KL1' },
				to: { file: 'a', rank: 0, level: 'QL1' },
				capture: false,
				castle: true,
			},
			{
				piece: 'k',
				color: 'w',
				from: { file: 'd', rank: 0, level: 'KL1' },
				to: { file: 'e', rank: 0, level: 'KL1' },
				capture: false,
				castle: true,
			},
		]));
	});
});

describe('Position - Pawn promotions', () => {
	it('can generate pawn promotion moves', () => {
		const pos = new Position([
			{
				piece: 'p',
				file: 'c',
				rank: 7,
				color: 'w',
				level: 'B',
			},
		], 'w');

		const moves = pos.getLegalMoves();
		expect(moves).toHaveLength(4);
		expect(moves).toEqual(expect.arrayContaining([
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'q',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'r',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'b',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'n',
			},
		]));
	});

	it('can generate pawn promotion moves with a capture', () => {
		const pos = new Position([
			{
				piece: 'p',
				file: 'c',
				rank: 7,
				color: 'w',
				level: 'B',
			},
			{
				piece: 'n',
				file: 'b',
				rank: 8,
				color: 'b',
				level: 'B',
			},
		], 'w');

		const moves = pos.getLegalMoves();
		expect(moves).toHaveLength(8);
		expect(moves).toEqual(expect.arrayContaining([
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'q',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'r',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'b',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: false,
				promotion: 'n',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'b', rank: 8, level: 'B' },
				capture: true,
				promotion: 'q',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'b', rank: 8, level: 'B' },
				capture: true,
				promotion: 'r',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'b', rank: 8, level: 'B' },
				capture: true,
				promotion: 'b',
			},
			{
				piece: 'p',
				color: 'w',
				from: { file: 'c', rank: 7, level: 'B' },
				to: { file: 'b', rank: 8, level: 'B' },
				capture: true,
				promotion: 'n',
			},
		]));
	});
});

describe('Position - Making moves', () => {
	const makeMoveTestCases: MakeMoveTestCase[] = [
		{
			name: 'can make quiet moves',
			position: new Position([
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'b',
					rank: 2,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'c',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			]),
			move: {
				piece: 'p',
				color: 'w',
				from: { file: 'b', rank: 2, level: 'W' },
				to: { file: 'b', rank: 3, level: 'W' },
				capture: false,
			},
			expectedPieces: [
				{
					piece: 'p',
					file: 'a',
					rank: 2,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'b',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'c',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			],
		},
		{
			name: 'can make capture moves',
			position: new Position([
				{
					piece: 'p',
					file: 'a',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'b',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'n',
					file: 'c',
					rank: 4,
					color: 'b',
					level: 'W',
				},
			]),
			move: {
				piece: 'p',
				color: 'w',
				from: { file: 'b', rank: 3, level: 'W' },
				to: { file: 'c', rank: 4, level: 'W' },
				capture: true,
			},
			expectedPieces: [
				{
					piece: 'p',
					file: 'a',
					rank: 3,
					color: 'w',
					level: 'W',
				},
				{
					piece: 'p',
					file: 'c',
					rank: 4,
					color: 'w',
					level: 'W',
				},
			],
		},
		{
			name: 'can castle kingside',
			position: new Position([
				{
					piece: 'k',
					file: 'd',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
				{
					piece: 'r',
					file: 'e',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
			]),
			move: {
				piece: 'k',
				color: 'w',
				from: { file: 'd', rank: 0, level: 'KL1' },
				to: { file: 'e', rank: 0, level: 'KL1' },
				capture: false,
				castle: true,
			},
			expectedPieces: [
				{
					piece: 'k',
					file: 'e',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
				{
					piece: 'r',
					file: 'd',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
			],
		},
		{
			name: 'can castle queenside',
			position: new Position([
				{
					piece: 'k',
					file: 'd',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
				{
					piece: 'r',
					file: 'z',
					rank: 0,
					color: 'w',
					level: 'QL1',
				},
			]),
			move: {
				piece: 'k',
				color: 'w',
				from: { file: 'd', rank: 0, level: 'KL1' },
				to: { file: 'a', rank: 0, level: 'QL1' },
				capture: false,
				castle: true,
			},
			expectedPieces: [
				{
					piece: 'k',
					file: 'a',
					rank: 0,
					color: 'w',
					level: 'QL1',
				},
				{
					piece: 'r',
					file: 'd',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
			],
		},
		{
			name: 'can make promotion moves',
			position: new Position([
				{
					piece: 'p',
					file: 'd',
					rank: 7,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'd',
					rank: 2,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			]),
			move: {
				piece: 'p',
				color: 'w',
				from: { file: 'd', rank: 7, level: 'B' },
				to: { file: 'd', rank: 8, level: 'B' },
				capture: false,
				promotion: 'q',
			},
			expectedPieces: [
				{
					piece: 'q',
					file: 'd',
					rank: 8,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'd',
					rank: 2,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			],
		},
		{
			name: 'can make promotion moves wiith a capture',
			position: new Position([
				{
					piece: 'p',
					file: 'd',
					rank: 7,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'n',
					file: 'c',
					rank: 8,
					color: 'b',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'd',
					rank: 2,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			]),
			move: {
				piece: 'p',
				color: 'w',
				from: { file: 'd', rank: 7, level: 'B' },
				to: { file: 'c', rank: 8, level: 'B' },
				capture: true,
				promotion: 'n',
			},
			expectedPieces: [
				{
					piece: 'n',
					file: 'c',
					rank: 8,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'd',
					rank: 2,
					color: 'w',
					level: 'B',
				},
				{
					piece: 'k',
					file: 'a',
					rank: 7,
					color: 'b',
					level: 'B',
				},
			],
		},
		{
			name: 'can make attack board moves',
			position: new Position([
				{
					piece: 'k',
					file: 'd',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
				{
					piece: 'k',
					file: 'd',
					rank: 9,
					color: 'b',
					level: 'KL6',
				},
				{
					piece: 'p',
					file: 'z',
					rank: 1,
					color: 'w',
					level: 'QL1',
				},
			]),
			move: {
				color: 'w',
				from: 'QL1',
				to: 'QL2',
			},
			expectedPieces: [
				{
					piece: 'k',
					file: 'd',
					rank: 0,
					color: 'w',
					level: 'KL1',
				},
				{
					piece: 'k',
					file: 'd',
					rank: 9,
					color: 'b',
					level: 'KL6',
				},
				{
					piece: 'p',
					file: 'z',
					rank: 5,
					color: 'w',
					level: 'QL2',
				},
			],
			expectedAttackBoards: new AttackBoards(
				[ 'KL1', 'QL2' ],
				[ 'KL6', 'QL6' ],
			),
		},
	];

	runMakeMoveTestCases('can make moves', makeMoveTestCases);

	it('pieces are marked as moved after their first move', () => {
		const pos = Position.makeInitial();

		const expectedUnmoved1: FlatSquare[] = [
			{ file: 'z', rank: 1 },
			{ file: 'a', rank: 1 },
			{ file: 'a', rank: 2 },
			{ file: 'b', rank: 2 },
			{ file: 'c', rank: 2 },
			{ file: 'd', rank: 2 },
			{ file: 'd', rank: 1 },
			{ file: 'e', rank: 1 },
			{ file: 'b', rank: 1 },
			{ file: 'c', rank: 1 },
			{ file: 'z', rank: 0 },
			{ file: 'e', rank: 0 },
			{ file: 'a', rank: 0 },
			{ file: 'd', rank: 0 },
			{ file: 'z', rank: 8 },
			{ file: 'a', rank: 7 },
			{ file: 'b', rank: 7 },
			{ file: 'c', rank: 7 },
			{ file: 'd', rank: 7 },
			{ file: 'e', rank: 8 },
			{ file: 'a', rank: 8 },
			{ file: 'd', rank: 8 },
			{ file: 'b', rank: 8 },
			{ file: 'c', rank: 8 },
			{ file: 'z', rank: 9 },
			{ file: 'e', rank: 9 },
			{ file: 'a', rank: 9 },
			{ file: 'd', rank: 9 },
		];

		const unmoved1 = pos.getUnmovedPieces().toSquares();
		expect(unmoved1).toHaveLength(expectedUnmoved1.length);
		expect(unmoved1).toEqual(expect.arrayContaining(expectedUnmoved1));

		const res = pos.makeMove({
			piece: 'p',
			color: 'w',
			from: { file: 'b', rank: 2, level: 'W' },
			to: { file: 'b', rank: 3, level: 'W' },
			capture: false,
		});

		const expectedUnmoved2 = expectedUnmoved1.filter(({ file, rank }) =>
			file !== 'b' || rank !== 2);

		expect(expectedUnmoved2).toHaveLength(expectedUnmoved1.length - 1);

		const unmoved2 = res.getUnmovedPieces().toSquares();
		expect(unmoved2).toHaveLength(expectedUnmoved2.length);
		expect(unmoved2).toEqual(expect.arrayContaining(expectedUnmoved2));
	});
});

describe('Position - Game over conditions', () => {
	it('can detect checkmate', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'd',
				rank: 7,
				color: 'w',
				level: 'B',
			},
			{
				piece: 'q',
				file: 'd',
				rank: 8,
				color: 'w',
				level: 'KL6',
			},
			{
				piece: 'k',
				file: 'e',
				rank: 9,
				color: 'b',
				level: 'KL6',
			},
		], 'b');

		expect(pos.isCheckmate()).toBe(true);
	});

	it('can detect stalemate', () => {
		const pos = new Position([
			{
				piece: 'q',
				file: 'd',
				rank: 6,
				color: 'w',
				level: 'B',
			},
			{
				piece: 'n',
				file: 'c',
				rank: 7,
				color: 'w',
				level: 'B',
			},
			{
				piece: 'k',
				file: 'e',
				rank: 9,
				color: 'b',
				level: 'KL6',
			},
		], 'b');

		expect(pos.isStalemate()).toBe(true);
	});

	it('can detect 50-move rule', () => {
		const pos = new Position([
			{
				piece: 'k',
				file: 'e',
				rank: 0,
				color: 'w',
				level: 'KL1',
			},
			{
				piece: 'k',
				file: 'e',
				rank: 9,
				color: 'b',
				level: 'KL6',
			},
		], 'w', 100, new AttackBoards(), 100);

		expect(pos.hitFiftyMoveLimit()).toBe(true);
	});
});
