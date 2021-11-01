import Color from './Color';
import { File, Rank, Level } from './Square';

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

type Piece = {
	piece: PieceType,
	color: Color,
	file: File,
	rank: Rank,
	level: Level,
}

export default Piece;
