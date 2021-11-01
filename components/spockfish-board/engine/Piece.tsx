import Color from './Color';
import { File, Rank, Level } from './Square';

export default type Piece = {
	piece: Piece,
	color: Color,
	file: File,
	rank: Rank,
	leve: Level,
}
