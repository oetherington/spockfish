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

export type File = 'z' | 'a' | 'b' | 'c'  | 'd' | 'e';

export type Rank = number;

export type MainLevel = 'W' | 'N' | 'B';

export type AttackLevel =
	'QL1' | 'QL2' | 'QL3' | 'QL4' | 'QL5' | 'QL6' |
	'KL1' | 'KL2' | 'KL3' | 'KL4' | 'KL5' | 'KL6';

export const oppositeLevel = (l: AttackLevel) =>
	((l[0] === 'Q' ? 'K' : 'Q') + l.slice(1)) as AttackLevel;

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
export const fileCount = 6;

export const fileIndices: Record<File, number> = {
	'z': 0,
	'a': 1,
	'b': 2,
	'c': 3,
	'd': 4,
	'e': 5,
};

export const files: File[] = [ 'z', 'a', 'b', 'c', 'd', 'e' ];

export const nextFile = (f: File) => files[fileIndices[f] + 1];
export const prevFile = (f: File) => files[fileIndices[f] - 1];

export const fileDiff = (a: File, b: File) =>
	Math.abs(fileIndices[a] - fileIndices[b]);
