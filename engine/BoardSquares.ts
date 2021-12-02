import { Level } from './Square';
import FlatBitboard from './FlatBitboard';

export const boardSquares: Record<Level, FlatBitboard> = {
	W: FlatBitboard.fromSquares([
		{ file: 'a', rank: 1 }, { file: 'a', rank: 2 },
		{ file: 'a', rank: 3 }, { file: 'a', rank: 4 },
		{ file: 'b', rank: 1 }, { file: 'b', rank: 2 },
		{ file: 'b', rank: 3 }, { file: 'b', rank: 4 },
		{ file: 'c', rank: 1 }, { file: 'c', rank: 2 },
		{ file: 'c', rank: 3 }, { file: 'c', rank: 4 },
		{ file: 'd', rank: 1 }, { file: 'd', rank: 2 },
		{ file: 'd', rank: 3 }, { file: 'd', rank: 4 },
	]),
	N: FlatBitboard.fromSquares([
		{ file: 'a', rank: 3 }, { file: 'a', rank: 4 },
		{ file: 'a', rank: 5 }, { file: 'a', rank: 6 },
		{ file: 'b', rank: 3 }, { file: 'b', rank: 4 },
		{ file: 'b', rank: 5 }, { file: 'b', rank: 6 },
		{ file: 'c', rank: 3 }, { file: 'c', rank: 4 },
		{ file: 'c', rank: 5 }, { file: 'c', rank: 6 },
		{ file: 'd', rank: 3 }, { file: 'd', rank: 4 },
		{ file: 'd', rank: 5 }, { file: 'd', rank: 6 },
	]),
	B: FlatBitboard.fromSquares([
		{ file: 'a', rank: 5 }, { file: 'a', rank: 6 },
		{ file: 'a', rank: 7 }, { file: 'a', rank: 8 },
		{ file: 'b', rank: 5 }, { file: 'b', rank: 6 },
		{ file: 'b', rank: 7 }, { file: 'b', rank: 8 },
		{ file: 'c', rank: 5 }, { file: 'c', rank: 6 },
		{ file: 'c', rank: 7 }, { file: 'c', rank: 8 },
		{ file: 'd', rank: 5 }, { file: 'd', rank: 6 },
		{ file: 'd', rank: 7 }, { file: 'd', rank: 8 },
	]),
	QL1: FlatBitboard.fromSquares([
		{ file: 'z', rank: 0 }, { file: 'z', rank: 1 },
		{ file: 'a', rank: 0 }, { file: 'a', rank: 1 },
	]),
	QL2: FlatBitboard.fromSquares([
		{ file: 'z', rank: 4 }, { file: 'z', rank: 5 },
		{ file: 'a', rank: 4 }, { file: 'a', rank: 5 },
	]),
	QL3: FlatBitboard.fromSquares([
		{ file: 'z', rank: 2 }, { file: 'z', rank: 3 },
		{ file: 'a', rank: 2 }, { file: 'a', rank: 3 },
	]),
	QL4: FlatBitboard.fromSquares([
		{ file: 'z', rank: 6 }, { file: 'z', rank: 7 },
		{ file: 'a', rank: 6 }, { file: 'a', rank: 7 },
	]),
	QL5: FlatBitboard.fromSquares([
		{ file: 'z', rank: 4 }, { file: 'z', rank: 5 },
		{ file: 'a', rank: 4 }, { file: 'a', rank: 5 },
	]),
	QL6: FlatBitboard.fromSquares([
		{ file: 'z', rank: 8 }, { file: 'z', rank: 9 },
		{ file: 'a', rank: 8 }, { file: 'a', rank: 9 },
	]),
	KL1: FlatBitboard.fromSquares([
		{ file: 'd', rank: 0 }, { file: 'd', rank: 1 },
		{ file: 'e', rank: 0 }, { file: 'e', rank: 1 },
	]),
	KL2: FlatBitboard.fromSquares([
		{ file: 'd', rank: 4 }, { file: 'd', rank: 5 },
		{ file: 'e', rank: 4 }, { file: 'e', rank: 5 },
	]),
	KL3: FlatBitboard.fromSquares([
		{ file: 'd', rank: 2 }, { file: 'd', rank: 3 },
		{ file: 'e', rank: 2 }, { file: 'e', rank: 3 },
	]),
	KL4: FlatBitboard.fromSquares([
		{ file: 'd', rank: 6 }, { file: 'd', rank: 7 },
		{ file: 'e', rank: 6 }, { file: 'e', rank: 7 },
	]),
	KL5: FlatBitboard.fromSquares([
		{ file: 'd', rank: 4 }, { file: 'd', rank: 5 },
		{ file: 'e', rank: 4 }, { file: 'e', rank: 5 },
	]),
	KL6: FlatBitboard.fromSquares([
		{ file: 'd', rank: 8 }, { file: 'd', rank: 9 },
		{ file: 'e', rank: 8 }, { file: 'e', rank: 9 },
	]),
};
