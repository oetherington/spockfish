import { PieceType } from './Piece';
import Color from './Color';
import Square from './Square';

interface Move {
	piece: PieceType,
	color: Color,
	from: Square,
	to: Square,
	capture: boolean,
	castle?: boolean,
}

export default Move;
