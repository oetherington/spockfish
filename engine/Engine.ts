import { Remote } from 'comlink';
import Position from './Position';
import Color from './Color';
import Piece from './Piece';
import Move from './Move';
import { AttackLevel } from './Square';

export type SerializedPosition = {
	turn: Color,
	ply: number,
	pieces: Piece[],
	attackBoards: Record<Color, AttackLevel[]>,
};

class Engine {
	private position: Position;

	constructor() {
		this.position = Position.makeInitial();
	}

	public getSerializedPosition() : SerializedPosition {
		return {
			turn: this.position.getTurn(),
			ply: this.position.getPly(),
			pieces: this.position.getPieces(),
			attackBoards: {
				w: this.position.getWhiteAttackBoards(),
				b: this.position.getBlackAttackBoards(),
			},
		};
	}

	public getLegalMovesForPiece(p: Piece) : Move[] {
		return this.position.getLegalMovesForPiece(p);
	}
}

export default Engine;

export type RemoteEngine = Remote<Engine>;
