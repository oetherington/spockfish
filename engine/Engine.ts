/*
 * This file is part of Spockfish
 * Copyright (C) 2021-2022 Ollie Etherington <www.etherington.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import { Remote } from 'comlink';
import Position from './Position';
import Color, { otherColor } from './Color';
import Piece from './Piece';
import Move from './Move';
import { AttackLevel } from './Square';

export type GameResult = Color | 'draw';

export type GameOverReason
	= 'timeout'
	| 'checkmate'
	| 'resignation'
	| 'disconnection'
	| 'stalemate'
	| 'insufficient-material'
	| '50-move-rule'
	| 'repetition'
	| 'agreement';

export type GameStatus = 'playing' | GameOverReason;

export type SerializedPosition = {
	turn: Color,
	ply: number,
	pieces: Piece[],
	attackBoards: Record<Color, AttackLevel[]>,
	status: GameStatus,
	result: GameResult | null,
};

class Engine {
	private position: Position;
	private status: GameStatus = 'playing';
	private result: GameResult | null = null;

	constructor() {
		this.position = Position.makeInitial();
	}

	public setStatus(
		status: GameStatus,
		result: GameResult | null,
	) : SerializedPosition {
		this.status = status;
		this.result = result;
		return this.getSerializedPosition();
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
			status: this.status,
			result: this.result,
		};
	}

	public getLegalMovesForPiece(p: Piece) : Move[] {
		return this.position.getLegalMovesForPiece(p);
	}

	public getLegalMovesForAttackBoard(level: AttackLevel) : Move[] {
		return this.position.getLegalMovesForAttackBoard(level);
	}

	public getLegalMoves() : Move[] {
		return this.position.getLegalMoves();
	}

	public makeMove(move: Move) : SerializedPosition {
		if (this.status === 'playing') {
			this.position = this.position.makeMove(move);

			if (this.position.isCheckmate()) {
				this.status = 'checkmate';
				this.result = otherColor(this.position.getTurn());
			} else if (this.position.isStalemate()) {
				this.status = 'stalemate';
				this.result = 'draw';
			} else if (this.position.hitFiftyMoveLimit()) {
				this.status = '50-move-rule';
				this.result = 'draw';
			}
		}

		return this.getSerializedPosition();
	}
}

export default Engine;

export type RemoteEngine = Remote<Engine>;
