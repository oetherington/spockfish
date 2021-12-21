import { PieceType } from './Piece';
import Color from './Color';
import Square, { AttackLevel } from './Square';

export interface PieceMove {
	piece: PieceType,
	color: Color,
	from: Square,
	to: Square,
	capture?: boolean,
	castle?: boolean,
	promotion?: PieceType,
}

export interface AttackBoardMove {
	color: Color,
	from: AttackLevel,
	to: AttackLevel,
}

type Move = PieceMove | AttackBoardMove;

export const isPieceMove = (m: Move) => !!(m as PieceMove).piece;
export const isAttackBoardMove = (m: Move) => !(m as PieceMove).piece;

export const isCastleMove = (m: Move) =>
	isPieceMove(m) && !!(m as PieceMove).castle;

export default Move;
