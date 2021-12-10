import Color, { otherColor } from './Color';
import Square, {
	File,
	Rank,
	AttackLevel,
	Level,
	FlatSquare,
	squaresEqual,
} from './Square';
import Piece from './Piece';
import Move from './Move';
import FlatBitboard from './FlatBitboard';
import FullBitboard, { createFullBitboard } from './FullBitboard';
import AttackBoards from './AttackBoards';
import { boardSquares } from './BoardSquares';

type Castle = {
	rook: Square,
	target: Square,
}

class Position {
	private static readonly DEFAULT_CHECK_DEPTH: number = 1;

	private static readonly CASTLING_TARGETS: Castle[] = [
		{
			rook: { file: 'z', rank: 0, level: 'QL1' },
			target: { file: 'a', rank: 0, level: 'QL1' },
		},
		{
			rook: { file: 'e', rank: 0, level: 'KL1' },
			target: { file: 'e', rank: 0, level: 'KL1' },
		},
		{
			rook: { file: 'z', rank: 9, level: 'QL6' },
			target: { file: 'a', rank: 9, level: 'QL6' },
		},
		{
			rook: { file: 'e', rank: 9, level: 'KL6' },
			target: { file: 'e', rank: 9, level: 'KL6' },
		},
	];

	private turn: Color;
	private ply: number;
	private pieces: Piece[];
	private attackBoards: AttackBoards;
	private fiftyMoveCount: number;
	private unmovedPieces: FlatBitboard;
	private levels: Level[];
	private occupied: Record<Color, FullBitboard>;
	private allOccupied: FlatBitboard;
	private legalMoves: Move[];
	private check: boolean;

	constructor(
		pieces: Piece[] = [],
		turn: Color = 'w',
		ply: number = 0,
		attackBoards: AttackBoards = new AttackBoards(),
		fiftyMoveCount: number = 0,
		unmovedPieces: FlatBitboard = FlatBitboard.getAllStartingPieces(),
		checkDepth: number = Position.DEFAULT_CHECK_DEPTH,
	) {
		this.turn = turn;
		this.ply = ply;
		this.pieces = pieces;
		this.attackBoards = attackBoards;
		this.fiftyMoveCount = fiftyMoveCount;
		this.unmovedPieces = unmovedPieces;

		this.levels = this.generateLevels();

		this.occupied = {
			'w': this.generateOccupied('w'),
			'b': this.generateOccupied('b'),
		};
		this.allOccupied =
			FlatBitboard.fromFullBitboard(this.occupied['w'])
				.either(FlatBitboard.fromFullBitboard(this.occupied['b']));

		this.legalMoves = [];
		this.check = false;
		this.generateLegalMoves(checkDepth);
	}

	public makeMove(
		{ piece, color, from, to, castle }: Move,
		checkDepth: number = Position.DEFAULT_CHECK_DEPTH,
	) : Position {
		let pieces: Piece[] = [];

		for (const p of this.pieces)
			if (!squaresEqual(p, to))
				pieces.push(squaresEqual(p, from)
					? { piece, color, ...to }
					: p);

		const unmovedPieces = this.unmovedPieces.clone();
		unmovedPieces.unsetSquare(from.file, from.rank);

		if (castle) {
			let rookFrom: Square = to;

			if (to.file === 'a') {
				rookFrom = { ...rookFrom, file: 'z' };
			} else if (to.file !== 'e') {
				const target = JSON.stringify(to);
				throw new Error('Invalid castling target: ' + target);
			}

			unmovedPieces.unsetSquare(rookFrom.file, rookFrom.rank);
			pieces = pieces.filter((piece) =>
				piece.piece !== 'r' || !squaresEqual(rookFrom, piece));
			pieces.push({
				piece: 'r',
				color: this.turn,
				file: from.file,
				rank: from.rank,
				level: from.level,
			});
		}

		return new Position(
			pieces,
			otherColor(this.turn),
			this.ply + 1,
			this.attackBoards, // TODO Update this
			piece === 'p' ? 0 : this.fiftyMoveCount + 1,
			unmovedPieces,
			checkDepth,
		);
	}

	public makeRandomMove() : Position {
		const index = Math.floor(Math.random() * this.legalMoves.length);
		return this.makeMove(this.legalMoves[index]);
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

	public getTurn() : Color {
		return this.turn;
	}

	public getPly() : number {
		return this.ply;
	}

	public getWhiteAttackBoards() : AttackLevel[] {
		return this.attackBoards.white;
	}

	public getBlackAttackBoards() : AttackLevel[] {
		return this.attackBoards.black;
	}

	private generateOccupied(color: Color) : FullBitboard {
		const bb = createFullBitboard();
		for (const piece of this.pieces)
			if (color === piece.color)
				bb[piece.level].setSquare(piece.file, piece.rank);
		return bb;
	}

	public getOccupied(color: Color) : FullBitboard {
		return this.occupied[color];
	}

	public getPieces() : Piece[] {
		return this.pieces;
	}

	public generateLevels() : Level[] {
		const levels: Level[] = [ 'W', 'N', 'B' ];
		return levels
			.concat(this.getWhiteAttackBoards())
			.concat(this.getBlackAttackBoards());
	}

	public getLevels() : Level[] {
		return this.levels;
	}

	public getUnmovedPieces() : FlatBitboard {
		return this.unmovedPieces;
	}

	private getLegalSquaresForPiece(
		{ piece, color, file, rank, level }: Piece,
	) : FlatBitboard {
		const bb = new FlatBitboard();
		bb.setSquare(file, rank);

		switch (piece) {
			case 'p':
				// TODO: Handle promotions
				return bb.pawnMoves(
					level,
					color,
					this.unmovedPieces,
					this.allOccupied,
				);
			case 'n':
				return bb.knightMoves();
			case 'b':
				return bb.bishopMoves(this.allOccupied);
			case 'r':
				return bb.rookMoves(this.allOccupied);
			case 'q':
				return bb.queenMoves(this.allOccupied);
			case 'k':
				return bb.kingMoves();
			default:
				throw new Error('Invalid piece in getLegalSquaresForPiece');
		}
	}

	private generateLegalMovesForPiece(p: Piece) : Move[] {
		const targets = this.getLegalSquaresForPiece(p);

		const { piece, color, file, rank, level } = p;
		const from: Square = { file, rank, level };

		let result: Move[] = [];

		for (const targetLevel of this.levels) {
			const allMoves = targets
				.both(boardSquares[targetLevel])
				.onlyLeft(this.occupied[color][targetLevel]);
			let captures = allMoves
				.both(this.occupied[otherColor(color)][targetLevel]);
			let quietMoves = allMoves.onlyLeft(captures);

			if (p.piece === 'p') {
				const file = FlatBitboard.fromFile(p.file);
				captures = captures.onlyLeft(file);
				quietMoves = quietMoves.both(file);
			}

			result = result
				.concat(captures.toMoves(piece, color, from, targetLevel, true))
				.concat(quietMoves.toMoves(piece, color, from, targetLevel));
		}

		return result;
	}

	private static getCastle(square: any) : Castle | null {
		for (const target of Position.CASTLING_TARGETS)
			if (squaresEqual(square, target.rook))
				return target;
		return null;
	}

	private static isAttacked(attacked: Move[], square: any) : boolean {
		return !!attacked.find(({ to }) => squaresEqual(square, to));
	}

	private generateLegalCastlingMoves(king: Piece, attacked: Move[]) : Move[] {
		if (this.ply < 2 ||
				!this.unmovedPieces.isSquareSet(king.file, king.rank) ||
				Position.isAttacked(attacked, king))
			return [];

		const rooks = this.pieces.filter(({ piece, color, file, rank, level })=>
			piece === 'r' &&
			color === this.turn &&
			!Position.isAttacked(attacked, { file, rank, level })
		);

		const result: Move[] = [];

		for (const rook of rooks) {
			const target = Position.getCastle(rook);

			if (!target ||
					!this.unmovedPieces.isSquareSet(rook.file, rook.rank) ||
					Position.isAttacked(attacked, target.target) ||
					(!squaresEqual(target.rook, target.target) &&
						this.allOccupied.isSquareSet(
							target.target.file, target.target.rank)))
				continue;

			result.push({
				piece: 'k',
				color: this.turn,
				from: { file: king.file, rank: king.rank, level: king.level },
				to: target.target,
				capture: false,
				castle: true,
			});
		}

		return result;
	}

	private generateLegalMoves(checkDepth: number) : void {
		// TODO: Generate legal moves for attack boards

		const king = this.pieces.find(({ piece, color }) =>
			piece === 'k' && color === this.turn);

		const searchDeeper = king && checkDepth > 0;

		let attacked: Move[] = [];

		for (const piece of this.pieces) {
			if (piece.color === this.turn) {
				const moves = this.generateLegalMovesForPiece(piece)
				this.legalMoves = this.legalMoves.concat(moves);
			} else if (searchDeeper) {
				const moves = this.generateLegalMovesForPiece(piece)
				attacked = attacked.concat(moves);
			}
		}

		if (king)
			this.legalMoves = this.legalMoves.concat(
				this.generateLegalCastlingMoves(king, attacked));

		if (!searchDeeper)
			return;

		this.check = !!attacked.find(({ capture, to }) =>
			capture && squaresEqual(to, king));

		this.legalMoves = this.legalMoves.filter((move) => {
			const pos = this.makeMove(move, checkDepth - 1);
			const moves = pos.getLegalMoves();
			for (const { capture, to } of moves) {
				const kingPos = move.piece === 'k' ? move.to : king;
				if (capture && squaresEqual(to, kingPos))
					return false;
			}
			return true;
		});
	}

	public getLegalMovesForPiece(p: Piece) : Move[] {
		return this.legalMoves.filter(({ piece, color, from }: Move) =>
			p.piece === piece && p.color === color && squaresEqual(p, from));
	}

	public getLegalMoves() : Move[] {
		return this.legalMoves;
	}

	public isCheck() : boolean {
		return this.check;
	}
}

export default Position;
