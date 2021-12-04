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
import CastlingRights from './CastlingRights';
import AttackBoards from './AttackBoards';
import { boardSquares } from './BoardSquares';

class Position {
	private static readonly DEFAULT_CHECK_DEPTH: number = 1;

	private turn: Color;
	private ply: number;
	private pieces: Piece[];
	private attackBoards: AttackBoards;
	private fiftyMoveCount: number;
	private castlingRights: CastlingRights;
	private unmovedPawns: FlatBitboard;
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
		castlingRights: CastlingRights = new CastlingRights(),
		unmovedPawns: FlatBitboard = FlatBitboard.getAllStartingPawns(),
		checkDepth: number = Position.DEFAULT_CHECK_DEPTH,
	) {
		this.turn = turn;
		this.ply = ply;
		this.pieces = pieces;
		this.attackBoards = attackBoards;
		this.fiftyMoveCount = fiftyMoveCount;
		this.castlingRights = castlingRights;
		this.unmovedPawns = unmovedPawns;

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
		{ piece, color, from, to }: Move,
		checkDepth: number = Position.DEFAULT_CHECK_DEPTH,
	) : Position {
		const pieces: Piece[] = [];

		for (const p of this.pieces)
			pieces.push(squaresEqual(p, from) ? { piece, color, ...to } : p);

		return new Position(
			pieces,
			otherColor(this.turn),
			this.ply + 1,
			this.attackBoards, // TODO Update this
			piece === 'p' ? 0 : this.fiftyMoveCount + 1,
			this.castlingRights, // TODO Update this
			this.unmovedPawns, // TODO Update this
			checkDepth,
		);
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
					this.unmovedPawns,
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
			const captures = allMoves
				.both(this.occupied[otherColor(color)][targetLevel]);
			const quietMoves = allMoves.onlyLeft(captures);

			result = result
				.concat(captures.toMoves(piece, color, from, targetLevel, true))
				.concat(quietMoves.toMoves(piece, color, from, targetLevel));
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
