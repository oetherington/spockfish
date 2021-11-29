import Color from './Color';
import Square, { File, Rank, AttackLevel, Level, FlatSquare } from './Square';
import Piece from './Piece';
import Move from './Move';
import FlatBitboard from './FlatBitboard';
import FullBitboard, { createFullBitboard } from './FullBitboard';
import CastlingRights from './CastlingRights';
import AttackBoards from './AttackBoards';

const otherColor = (color: Color) => color === 'w' ? 'b' : 'w';

const boardSquares: Record<Level, FlatBitboard> = {
	W: FlatBitboard.fromSquares([
		{ file: 'a', rank: 1 }, { file: 'a', rank: 2 },
		{ file: 'a', rank: 3 }, { file: 'a', rank: 4 },
		{ file: 'b', rank: 1 }, { file: 'b', rank: 2 },
		{ file: 'b', rank: 3 }, { file: 'b', rank: 4 },
		{ file: 'c', rank: 1 }, { file: 'c', rank: 2 },
		{ file: 'c', rank: 3 }, { file: 'c', rank: 4 },
		{ file: 'd', rank: 1 }, { file: 'd', rank: 2 },
		{ file: 'd', rank: 3 }, { file: 'd', rank: 4 },
	]),
	N: FlatBitboard.fromSquares([
		{ file: 'a', rank: 3 }, { file: 'a', rank: 4 },
		{ file: 'a', rank: 5 }, { file: 'a', rank: 6 },
		{ file: 'b', rank: 3 }, { file: 'b', rank: 4 },
		{ file: 'b', rank: 5 }, { file: 'b', rank: 6 },
		{ file: 'c', rank: 3 }, { file: 'c', rank: 4 },
		{ file: 'c', rank: 5 }, { file: 'c', rank: 6 },
		{ file: 'd', rank: 3 }, { file: 'd', rank: 4 },
		{ file: 'd', rank: 5 }, { file: 'd', rank: 6 },
	]),
	B: FlatBitboard.fromSquares([
		{ file: 'a', rank: 5 }, { file: 'a', rank: 6 },
		{ file: 'a', rank: 7 }, { file: 'a', rank: 8 },
		{ file: 'b', rank: 5 }, { file: 'b', rank: 6 },
		{ file: 'b', rank: 7 }, { file: 'b', rank: 8 },
		{ file: 'c', rank: 5 }, { file: 'c', rank: 6 },
		{ file: 'c', rank: 7 }, { file: 'c', rank: 8 },
		{ file: 'd', rank: 5 }, { file: 'd', rank: 6 },
		{ file: 'd', rank: 7 }, { file: 'd', rank: 8 },
	]),
	QL1: FlatBitboard.fromSquares([
		{ file: 'z', rank: 0 }, { file: 'z', rank: 1 },
		{ file: 'a', rank: 0 }, { file: 'a', rank: 1 },
	]),
	QL2: FlatBitboard.fromSquares([
		{ file: 'z', rank: 4 }, { file: 'z', rank: 5 },
		{ file: 'a', rank: 4 }, { file: 'a', rank: 5 },
	]),
	QL3: FlatBitboard.fromSquares([
		{ file: 'z', rank: 2 }, { file: 'z', rank: 3 },
		{ file: 'a', rank: 2 }, { file: 'a', rank: 3 },
	]),
	QL4: FlatBitboard.fromSquares([
		{ file: 'z', rank: 6 }, { file: 'z', rank: 7 },
		{ file: 'a', rank: 6 }, { file: 'a', rank: 7 },
	]),
	QL5: FlatBitboard.fromSquares([
		{ file: 'z', rank: 4 }, { file: 'z', rank: 5 },
		{ file: 'a', rank: 4 }, { file: 'a', rank: 5 },
	]),
	QL6: FlatBitboard.fromSquares([
		{ file: 'z', rank: 8 }, { file: 'z', rank: 9 },
		{ file: 'a', rank: 8 }, { file: 'a', rank: 9 },
	]),
	KL1: FlatBitboard.fromSquares([
		{ file: 'd', rank: 0 }, { file: 'd', rank: 1 },
		{ file: 'e', rank: 0 }, { file: 'e', rank: 1 },
	]),
	KL2: FlatBitboard.fromSquares([
		{ file: 'd', rank: 4 }, { file: 'd', rank: 5 },
		{ file: 'e', rank: 4 }, { file: 'e', rank: 5 },
	]),
	KL3: FlatBitboard.fromSquares([
		{ file: 'd', rank: 2 }, { file: 'd', rank: 3 },
		{ file: 'e', rank: 2 }, { file: 'e', rank: 3 },
	]),
	KL4: FlatBitboard.fromSquares([
		{ file: 'd', rank: 6 }, { file: 'd', rank: 7 },
		{ file: 'e', rank: 6 }, { file: 'e', rank: 7 },
	]),
	KL5: FlatBitboard.fromSquares([
		{ file: 'd', rank: 4 }, { file: 'd', rank: 5 },
		{ file: 'e', rank: 4 }, { file: 'e', rank: 5 },
	]),
	KL6: FlatBitboard.fromSquares([
		{ file: 'd', rank: 8 }, { file: 'd', rank: 9 },
		{ file: 'e', rank: 8 }, { file: 'e', rank: 9 },
	]),
};

class Position {
	turn: Color;
	ply: number;
	pieces: Piece[];
	attackBoards: AttackBoards;
	fiftyMoveCount: number;
	castlingRights: CastlingRights;
	levels: Level[];
	occupied: Record<Color, FullBitboard>;

	constructor(pieces: Piece[] = []) {
		this.turn = 'w';
		this.ply = 0;
		this.pieces = pieces;
		this.attackBoards = new AttackBoards();
		this.fiftyMoveCount = 0;
		this.castlingRights = new CastlingRights();
		this.levels = this.generateLevels();
		this.occupied = {
			'w': this.generateOccupied('w'),
			'b': this.generateOccupied('b'),
		};
	}

	public static makeInitial() : Position {
		return new Position([
			{ piece: 'p', color: 'w', file: 'z', rank: 1, level: 'QL1', },
			{ piece: 'p', color: 'w', file: 'a', rank: 1, level: 'QL1', },
			{ piece: 'p', color: 'w', file: 'a', rank: 2, level: 'W', },
			{ piece: 'p', color: 'w', file: 'b', rank: 2, level: 'W', },
			{ piece: 'p', color: 'w', file: 'c', rank: 2, level: 'W', },
			{ piece: 'p', color: 'w', file: 'd', rank: 2, level: 'W', },
			{ piece: 'p', color: 'w', file: 'd', rank: 1, level: 'KL1', },
			{ piece: 'p', color: 'w', file: 'e', rank: 1, level: 'KL1', },
			{ piece: 'n', color: 'w', file: 'a', rank: 1, level: 'W', },
			{ piece: 'n', color: 'w', file: 'd', rank: 1, level: 'W', },
			{ piece: 'b', color: 'w', file: 'b', rank: 1, level: 'W', },
			{ piece: 'b', color: 'w', file: 'c', rank: 1, level: 'W', },
			{ piece: 'r', color: 'w', file: 'z', rank: 0, level: 'QL1', },
			{ piece: 'r', color: 'w', file: 'e', rank: 0, level: 'KL1', },
			{ piece: 'q', color: 'w', file: 'a', rank: 0, level: 'QL1', },
			{ piece: 'k', color: 'w', file: 'd', rank: 0, level: 'KL1', },
			{ piece: 'p', color: 'b', file: 'z', rank: 8, level: 'QL6', },
			{ piece: 'p', color: 'b', file: 'a', rank: 8, level: 'QL6', },
			{ piece: 'p', color: 'b', file: 'a', rank: 7, level: 'B', },
			{ piece: 'p', color: 'b', file: 'b', rank: 7, level: 'B', },
			{ piece: 'p', color: 'b', file: 'c', rank: 7, level: 'B', },
			{ piece: 'p', color: 'b', file: 'd', rank: 7, level: 'B', },
			{ piece: 'p', color: 'b', file: 'd', rank: 8, level: 'KL6', },
			{ piece: 'p', color: 'b', file: 'e', rank: 8, level: 'KL6', },
			{ piece: 'n', color: 'b', file: 'a', rank: 8, level: 'B', },
			{ piece: 'n', color: 'b', file: 'd', rank: 8, level: 'B', },
			{ piece: 'b', color: 'b', file: 'b', rank: 8, level: 'B', },
			{ piece: 'b', color: 'b', file: 'c', rank: 8, level: 'B', },
			{ piece: 'r', color: 'b', file: 'z', rank: 9, level: 'QL6', },
			{ piece: 'r', color: 'b', file: 'e', rank: 9, level: 'KL6', },
			{ piece: 'q', color: 'b', file: 'a', rank: 9, level: 'QL6', },
			{ piece: 'k', color: 'b', file: 'd', rank: 9, level: 'KL6', },
		]);
	}

	getWhiteAttackBoards() : AttackLevel[] {
		return this.attackBoards.white;
	}

	getBlackAttackBoards() : AttackLevel[] {
		return this.attackBoards.black;
	}

	private generateOccupied(color: Color) : FullBitboard {
		const bb = createFullBitboard();
		for (const piece of this.pieces)
			if (color === piece.color)
				bb[piece.level].setSquare(piece.file, piece.rank);
		return bb;
	}

	getOccupied(color: Color) : FullBitboard {
		return this.occupied[color];
	}

	getPieces() : Piece[] {
		return this.pieces;
	}

	generateLevels() : Level[] {
		const levels: Level[] = [ 'W', 'N', 'B' ];
		return levels
			.concat(this.getWhiteAttackBoards())
			.concat(this.getBlackAttackBoards());
	}

	getLevels() : Level[] {
		return this.levels;
	}

	private expandBitboardSimple(
		{ piece, file, rank, color, level }: Piece,
		targets: FlatBitboard,
	) : Move[] {
		const from: Square = { file, rank, level };

		let result: Move[] = [];

		for (const targetLevel of this.levels) {
			const allMoves = targets
				.both(boardSquares[targetLevel])
				.onlyLeft(this.occupied[color][targetLevel]);
			const captures = allMoves
				.both(this.occupied[otherColor(color)][targetLevel]);
			const quietMoves = allMoves.onlyLeft(captures);

			result = result
				.concat(captures.toMoves(piece, color, from, targetLevel, true))
				.concat(quietMoves.toMoves(piece, color, from, targetLevel));
		}

		return result;
	}

	private expandBitboardTemp(
		{ piece, file, rank, color, level }: Piece,
		targets: FlatBitboard
	) : Move[] {
		const from: Square = { file, rank, level };

		let result: Move[] = [];

		for (const targetLevel of this.levels) {
			const squares = targets.both(boardSquares[targetLevel]);
			const moves = squares.toMoves(piece, color, from, targetLevel);
			result = result.concat(moves);
		}

		return result;
	}

	getLegalMovesForPiece(piece: Piece) : Move[] {
		let result: Move[] = [];

		const bb = new FlatBitboard();
		bb.setSquare(piece.file, piece.rank);

		let targets = new FlatBitboard();

		switch (piece.piece) {
			case 'p':
				targets = bb.pawnMoves(piece.level, piece.color);
				break;

			case 'n':
				return this.expandBitboardSimple(piece, bb.knightMoves());

			case 'b':
				targets = bb.bishopMoves();
				break;

			case 'r':
				targets = bb.rookMoves();
				break;

			case 'q':
				targets = bb.queenMoves();
				break;

			case 'k':
				return this.expandBitboardSimple(piece, bb.kingMoves());

			default:
				throw new Error('Invalid piece type in getLegalMovesForPiece');
		}

		return this.expandBitboardTemp(piece, targets);
	}

	getLegalMoves(piece: Piece | null) : Move[] {
		return piece
			? this.getLegalMovesForPiece(piece)
			: this.pieces.map(p => this.getLegalMovesForPiece(p)).flat();
	}
}

export default Position;
