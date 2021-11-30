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
