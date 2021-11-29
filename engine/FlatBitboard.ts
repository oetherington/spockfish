import Square, { Rank, File, Level, FlatSquare } from './Square';
import Piece, { PieceType } from './Piece';
import Color from './Color';
import Move from './Move';

const rankCount = 10;
const fileCount = 6;

const fileIndices: Record<File, number> = {
	'z': 0,
	'a': 1,
	'b': 2,
	'c': 3,
	'd': 4,
	'e': 5,
};

const files: File[] = [ 'z', 'a', 'b', 'c', 'd', 'e' ];

const DiagIter = function*(
	startFile: File,
	startRank: Rank,
	fileInc: number = 1,
	rankInc: number = 1,
) : Generator<FlatSquare, void, void> {
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

class FlatBitboard {
	private static readonly RANKS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(
		(r) => FlatBitboard.fromRank(r));

	low: number;
	high: number;

	constructor(low: number = 0, high: number = 0) {
		this.low = low >>> 0;
		this.high = high >>> 0;
	}

	public static fromSquares(squares: FlatSquare[]) : FlatBitboard {
		const result = new FlatBitboard();
		for (const square of squares)
			result.setSquare(square.file, square.rank);
		return result;
	}

	public static fromRank(rank: Rank = 0) : FlatBitboard {
		const zerothRank = new FlatBitboard(1074791425, 262400);
		zerothRank.shiftLeft(rank);
		return zerothRank;
	}

	public static fromFile(file: File = 'z') : FlatBitboard {
		const zFile = new FlatBitboard(1023, 0);
		zFile.shiftLeft(fileIndices[file] * rankCount);
		return zFile;
	}

	public clone() : FlatBitboard {
		return new FlatBitboard(this.low, this.high);
	}

	public equals(that: FlatBitboard) : boolean {
		return this.low === that.low && this.high === that.high;
	}

	public isEmpty() : boolean {
		return this.low === 0 && this.high === 0;
	}

	public toString(radix: number = 2) : string {
		const fmt = (n: number) => n.toString(radix).padStart(32, '0');
		return fmt(this.high) + fmt(this.low);
	}

	private static popcount32(v: number) : number {
		v >>>= 0;
		v -= (v >>> 1) & 0x55555555;
		v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
		return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
	}

	public popcount() : number {
		return FlatBitboard.popcount32(this.low) +
			FlatBitboard.popcount32(this.high);
	}

	private static lowestBit32(v: number) : number {
		v >>>= 0;
		return FlatBitboard.popcount32((v & -v) - 1);
	}

	public lowestBit() : number {
		return this.low
			? FlatBitboard.lowestBit32(this.low)
			: 32 + FlatBitboard.lowestBit32(this.high);
	}

	public popLowestBit() : number {
		const lowest = this.lowestBit();
		this.unsetBit(lowest);
		return lowest;
	}

	public setAll() : void {
		this.low = 0xffffffff;
		this.high = 0xffffffff;
	}

	public isBitSet(index: number) : boolean {
		index >>>= 0;

		return !!(index < 32
			? this.low & (1 << index)
			: this.high & (1 << (index - 32)));
	}

	public setBit(index: number) : void {
		index >>>= 0;

		if (index >= 0 && index < 32)
			this.low = (this.low | (1 << index)) >>> 0;
		else if (index < 64)
			this.high = (this.high | (1 << (index - 32))) >>> 0;
	}

	public unsetBit(index: number) : void {
		index >>>= 0;

		if (index < 32)
			this.low = (this.low & ~(1 << index)) >>> 0;
		else
			this.high = (this.high & ~(1 << (index - 32))) >>> 0;
	}

	public combine(
		that: FlatBitboard,
		combiner: (a: number, b: number) => number,
	) : FlatBitboard {
		return new FlatBitboard(
			combiner(this.low, that.low) >>> 0,
			combiner(this.high, that.high) >>> 0,
		);
	}

	public both(that: FlatBitboard) : FlatBitboard {
		return this.combine(that, (a: number, b: number) => a & b);
	}

	public onlyLeft(that: FlatBitboard) : FlatBitboard {
		return this.combine(that, (a: number, b: number) => a & ~b);
	}

	public onlyRight(that: FlatBitboard) : FlatBitboard {
		return this.combine(that, (a: number, b: number) => ~a & b);
	}

	public either(that: FlatBitboard) : FlatBitboard {
		return this.combine(that, (a: number, b: number) => a | b);
	}

	public exclusiveEither(that: FlatBitboard) : FlatBitboard {
		return this.combine(that, (a: number, b: number) => a ^ b);
	}

	public neither(that: FlatBitboard) : FlatBitboard {
		return this.combine(that, (a: number, b: number) => ~a & ~b);
	}

	private shl(v: number) : void {
		v >>>= 0;

		if (v > 31) {
			this.high = (this.low << (v - 32)) >>> 0;
			this.low = 0 >>> 0;
		} else if (v > 0) {
			this.high = ((this.high << v) | (this.low >>> (32 - v))) >>> 0;
			this.low = (this.low << v) >>> 0;
		}
	}

	private shr(v: number) : void {
		v >>>= 0;

		if (v > 31) {
			this.low = this.high >>> (v - 32);
			this.high = 0 >>> 0;
		} else if (v > 0) {
			this.low = ((this.low >>> v) | (this.high << (32 - v))) >>> 0;
			this.high >>>= v;
		}
	}

	public shiftLeft(v: number) : void {
		if (v > 63 || v < -63)
			this.low = this.high = 0 >>> 0;
		else if (v > 0)
			this.shl(v);
		else if (v < 0)
			this.shr(-v);
	}

	public shiftRight(v: number) : void {
		if (v > 63 || v < -63)
			this.low = this.high = 0 >>> 0;
		else if (v > 0)
			this.shr(v);
		else if (v < 0)
			this.shl(-v);
	}

	static squareToIndex(file: File, rank: Rank) : number {
		return fileIndices[file] * rankCount + rank;
	}

	static indexToSquare(index: number) : FlatSquare {
		return {
			file: files[Math.floor(index / rankCount)],
			rank: (index % rankCount),
		};
	}

	public setSquare(file: File, rank: Rank) : void {
		this.setBit(FlatBitboard.squareToIndex(file, rank));
	}

	public isSquareSet(file: File, rank: Rank) : boolean {
		return this.isBitSet(FlatBitboard.squareToIndex(file, rank));
	}

	public toSquares() : FlatSquare[] {
		const squares = this.clone();

		const result: FlatSquare[] = [];

		while (!squares.isEmpty()) {
			const index = squares.popLowestBit();
			result.push(FlatBitboard.indexToSquare(index));
		}

		return result;
	}

	public toPieces(piece: PieceType, color: Color, level: Level) : Piece[] {
		return this.toSquares().map(({ file, rank }) => ({
			piece,
			file,
			rank,
			color,
			level,
		}));
	}

	public toMoves(
		piece: PieceType,
		color: Color,
		from: Square,
		targetLevel: Level,
		capture: boolean = false,
	) : Move[] {
		return this.toSquares().map(({ file, rank }) => ({
			piece,
			color,
			from,
			to: {
				file,
				rank,
				level: targetLevel,
			},
			capture,
		}));
	}

	public normalize() : void {
		this.low = this.low & 0b1111_1111_1111_1111_1111_1111_1111_1111;
		this.high = this.high & 0b0000_1111_1111_1111_1111_1111_1111_1111;
	}

	public pawnMoves(level: Level, color: Color) : FlatBitboard {
		const pawns = this.clone();
		let result = new FlatBitboard();

		while (!pawns.isEmpty()) {
			const index = pawns.popLowestBit();
			const { file, rank } = FlatBitboard.indexToSquare(index);

			if (color === 'w') {
				result.setSquare(file, rank + 1);
				if (
					(rank === 2 && level === 'W') ||
					(rank === 1 && (level === 'QL1' || level === 'KL1'))
				) {
					result.setSquare(file, rank + 2);
				}
			} else {
				result.setSquare(file, rank - 1);
				if (
					(rank === 7 && level === 'B') ||
					(rank === 8 && (level === 'QL6' || level === 'KL6'))
				) {
					result.setSquare(file, rank - 2);
				}
			}
		}

		// TODO: Handle promotions

		return result;
	}

	public knightMoves() : FlatBitboard {
		const base = FlatBitboard.squareToIndex('b', 5);
		const baseFile = 2;
		const squaresFromBase = new FlatBitboard(139344, 20514);
		const mask = new FlatBitboard(3222274047, 262143);

		const knights = this.clone();
		let result = new FlatBitboard();

		while (!knights.isEmpty()) {
			const index = knights.popLowestBit();
			const shift = index - base;

			const squares = squaresFromBase.clone();
			squares.shiftLeft(index - base);

			let filter = mask.clone();
			const fs = rankCount * (Math.floor(index / rankCount) - baseFile);
			filter.shiftLeft(fs);

			const rank  = index % rankCount;
			if (rank < 3)
				filter = filter.onlyLeft(FlatBitboard.RANKS[9]);
			else if (rank > 7)
				filter = filter.onlyLeft(FlatBitboard.RANKS[0]);

			const filtered = squares.both(filter);
			result = result.either(filtered);
		}

		result.normalize();
		return result;
	}

	public bishopMoves() : FlatBitboard {
		const bishops = this.clone();
		let result = new FlatBitboard();

		while (!bishops.isEmpty()) {
			const index = bishops.popLowestBit();
			const { file, rank } = FlatBitboard.indexToSquare(index);

			const iters = [
				DiagIter(file, rank, 1, 1),
				DiagIter(file, rank, 1, -1),
				DiagIter(file, rank, -1, 1),
				DiagIter(file, rank, -1, -1),
			];

			for (const iter of iters) {
				let cur = iter.next();
				while (!cur.done) {
					result.setSquare(cur.value.file, cur.value.rank);
					cur = iter.next();
				}
			}
		}

		result.normalize();
		return result;
	}

	public rookMoves() : FlatBitboard {
		const rooks = this.clone();
		let result = new FlatBitboard();

		while (!rooks.isEmpty()) {
			const index = rooks.popLowestBit();
			const { file, rank } = FlatBitboard.indexToSquare(index);
			const column = FlatBitboard.fromFile(file);
			const row = FlatBitboard.RANKS[rank];
			result = result.either(column).either(row);
			result.unsetBit(index);
		}

		return result;
	}

	public queenMoves() : FlatBitboard {
		return this.bishopMoves().either(this.rookMoves());
	}

	public kingMoves() : FlatBitboard {
		const base = FlatBitboard.squareToIndex('b', 5);
		const squaresFromBase = new FlatBitboard(84000768, 28);

		const kings = this.clone();
		let result = new FlatBitboard();

		while (!kings.isEmpty()) {
			const index = kings.popLowestBit();
			const { file, rank } = FlatBitboard.indexToSquare(index);

			let squares = squaresFromBase.clone();
			squares.shiftLeft(index - base);

			if (rank < 1)
				squares = squares.onlyLeft(FlatBitboard.RANKS[9]);
			else if (rank > 8)
				squares = squares.onlyLeft(FlatBitboard.RANKS[0]);

			result = result.either(squares);
		}

		result.normalize();
		return result;
	}
}

export default FlatBitboard;
