export type File = 'z' | 'a' | 'b' | 'c'  | 'd' | 'e';

export type Rank = number;

export type MainLevel = 'W' | 'N' | 'B';

export type AttackLevel =
	'QL1' | 'QL2' | 'QL3' | 'QL4' | 'QL5' | 'QL6' |
	'KL1' | 'KL2' | 'KL3' | 'KL4' | 'KL5' | 'KL6';

export type Level = MainLevel | AttackLevel;

type Square = {
	file: File,
	rank: Rank,
	level: Level,
}

export default Square;
