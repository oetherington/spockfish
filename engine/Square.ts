export type File = 'z' | 'a' | 'b' | 'c'  | 'd' | 'e';

export type Rank = number;

export type MainLevel = 'W' | 'N' | 'B';

export type AttackLevel =
	'QL1' | 'QL2' | 'QL3' | 'QL4' | 'QL5' | 'QL6' |
	'KL1' | 'KL2' | 'KL3' | 'KL4' | 'KL5' | 'KL6';

export type Level = MainLevel | AttackLevel;

export type FlatSquare = {
	file: File,
	rank: Rank,
}

type Square = {
	file: File,
	rank: Rank,
	level: Level,
}

export default Square;

export const squaresEqual = (a: any, b: any) : boolean =>
	a.file === b.file && a.rank === b.rank && a.level === b.level;

export const rankCount = 10;
export  const fileCount = 6;

export const fileIndices: Record<File, number> = {
	'z': 0,
	'a': 1,
	'b': 2,
	'c': 3,
	'd': 4,
	'e': 5,
};

export const files: File[] = [ 'z', 'a', 'b', 'c', 'd', 'e' ];
