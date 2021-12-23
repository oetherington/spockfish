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

import {
	Rank,
	File,
	FlatSquare,
	rankCount,
	fileCount,
	fileIndices,
	files,
} from './Square';

export type SquareIter = Generator<FlatSquare, void, void>;

export const DiagIter = function*(
	startFile: File,
	startRank: Rank,
	fileInc: number = 1,
	rankInc: number = 1,
) : SquareIter {
	const fCheck = fileInc > 0
		? (n: number) => n <= fileCount - 1
		: (n: number) => n >= 0;
	const rCheck = rankInc > 0
		? (n: number) => n <= rankCount - 1
		: (n: number) => n >= 0;

	let f = fileIndices[startFile] + fileInc;
	let r = startRank + rankInc;

	while (fCheck(f) && rCheck(r)) {
		const result = {
			file: files[f],
			rank: r,
		};

		f += fileInc;
		r += rankInc;

		yield result;
	}
};

export const RankIter = function*(
	rank: Rank,
	startFile: File,
	fileInc: number = 1,
) : SquareIter {
	const fCheck = fileInc > 0
		? (n: number) => n <= fileCount - 1
		: (n: number) => n >= 0;

	let file = fileIndices[startFile] + fileInc;

	while (fCheck(file)) {
		const result = {
			file: files[file],
			rank,
		};

		file += fileInc;

		yield result;
	}
};

export const FileIter = function*(
	file: File,
	startRank: Rank,
	rankInc: number = 1,
) : SquareIter {
	const rCheck = rankInc > 0
		? (n: number) => n <= rankCount - 1
		: (n: number) => n >= 0;

	let rank = startRank + rankInc;

	while (rCheck(rank)) {
		const result = {
			file,
			rank,
		};

		rank += rankInc;

		yield result;
	}
};
