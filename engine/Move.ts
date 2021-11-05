import { PieceType } from './Piece';
import Color from './Color';
import Square from './Square';

type Move = {
	piece: PieceType,
	color: Color,
	from: Square,
	to: Square,
}

export default Move;
