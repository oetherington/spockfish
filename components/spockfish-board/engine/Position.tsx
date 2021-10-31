type Color = 'w' | 'b';

type File = 'z' | 'a' | 'b' | 'c'  | 'd' | 'e';

type Level = 'W' | 'N' | 'B' | 'QL1' | 'QL2' | 'QL3' | 'QL4' | 'QL5' | 'QL6' |
	'KL1' | 'KL2' | 'KL3' | 'KL4' | 'KL5' | 'KL6';

type Piece = {
	piece: Piece,
	color: Color,
	file: File,
	rank: number,
	leve: Level,
}

class AttackBoards {
	// To make sure positions are serializable, make sure the arrays are
	// always sorted
	white: Level[] = [ 'KL1', 'QL1' ];
	black: Level[] = [ 'KL6', 'QL6' ];
}

class CastlingRights {
	wq: boolean = true;
	wk: boolean = true;
	bq: boolean = true;
	bk: boolean = true;
}

class Move {

}

class Position {
	turn: Color;
	ply: number;
	pieces: Piece[];
	attackBoards: AttackBoards;
	fiftyMoveCount: number;
	castlingRights: CastlingRights;

	constructor() {
		this.turn = 'w';
		this.ply = 0;
		this.pieces = [
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
		];
		this.attackBoards = new AttackBoards();
		this.fiftyMoveCount = 0;
		this.castlingRights = new CastlingRights();
	}

	getWhiteAttackBoards() : Level[] {
		return this.attackBoards.white;
	}

	getBlackAttackBoards() : Level[] {
		return this.attackBoards.black;
	}

	getPieces() : Piece[] {
		return this.pieces;
	}

	getLegalMovesForPiece(piece) : Move[] {
		return [];
	}

	getLegalMoves(piece) : Move[] {
		return piece
			? this.getLegalMovesForPiece(piece)
			: this.pieces.map(p => this.getLegalMovesForPiece(p)).flat();
	}
}

export default Position;
