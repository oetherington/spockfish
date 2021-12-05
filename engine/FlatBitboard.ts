import Square, {
	Rank,
	File,
	Level,
	FlatSquare,
	rankCount,
	fileIndices,
	files,
	nextFile,
	prevFile,
} from './Square';
import Piece, { PieceType } from './Piece';
import Color from './Color';
import Move from './Move';
import FullBitboard from './FullBitboard';
import { SquareIter, DiagIter, RankIter, FileIter } from './Iterators';

class FlatBitboard {
	private static readonly RANKS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(
		(r) => FlatBitboard.fromRank(r));

	private static readonly PAWN_TAKES = [
		{ limitFile: 'z', incrementer: nextFile },
		{ limitFile: 'e', incrementer: prevFile },
	];

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

	public static fromFullBitboard(fb: FullBitboard) : FlatBitboard {
		let bb = new FlatBitboard();
		for (const level of Object.keys(fb))
			bb = bb.either(fb[level as Level]);
		return bb;
	}

	public static getAllStartingPieces() : FlatBitboard {
		return new FlatBitboard(2557353731, 202344289);
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

	private static highestBit32(v: number) : number {
		v >>>= 0;
		let r = 0;
		while (v >>>= 1)
			++r;
		return r;
	}

	public highestBit() : number {
		return this.high
			? 32 + FlatBitboard.highestBit32(this.high)
			: FlatBitboard.highestBit32(this.low);
	}

	public popHighestBit() : number {
		const highest = this.highestBit();
		this.unsetBit(highest);
		return highest;
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

	public unsetSquare(file: File, rank: Rank) : void {
		this.unsetBit(FlatBitboard.squareToIndex(file, rank));
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

	public pawnMoves(
		level: Level,
		color: Color,
		unmovedPieces: FlatBitboard,
		occupied: FlatBitboard,
	) : FlatBitboard {
		const pawns = this.clone();
		let result = new FlatBitboard();

		while (!pawns.isEmpty()) {
			const index = pawns.popLowestBit();
			const { file, rank } = FlatBitboard.indexToSquare(index);

			const offs = color === 'w' ? 1 : -1;
			const target = FlatBitboard.squareToIndex(file, rank + offs);

			result.setBit(target);
			if (unmovedPieces.isBitSet(index) && !occupied.isBitSet(target))
				result.setSquare(file, rank + offs * 2);

			for (const { limitFile, incrementer } of FlatBitboard.PAWN_TAKES) {
				if (file !== limitFile) {
					const takeIndex = FlatBitboard.squareToIndex(
						incrementer(file), rank + offs);

					if (occupied.isBitSet(takeIndex))
						result.setBit(takeIndex);
				}
			}
		}

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

	private movesFromIters(
		occupied: FlatBitboard,
		iters: ((file: File, rank: Rank) => SquareIter)[],
	) : FlatBitboard {
		const pieces = this.clone();
		let result = new FlatBitboard();

		while (!pieces.isEmpty()) {
			const index = pieces.popLowestBit();
			const { file, rank } = FlatBitboard.indexToSquare(index);

			for (const iterGen of iters) {
				const iter = iterGen(file, rank);
				let cur = iter.next();
				while (!cur.done) {
					const { file, rank } = cur.value;
					result.setSquare(file, rank);
					if (occupied.isSquareSet(file, rank))
						break;
					cur = iter.next();
				}
			}
		}

		result.normalize();
		return result;
	}

	public bishopMoves(occupied: FlatBitboard) : FlatBitboard {
		return this.movesFromIters(occupied, [
			(file, rank) => DiagIter(file, rank, 1, 1),
			(file, rank) => DiagIter(file, rank, 1, -1),
			(file, rank) => DiagIter(file, rank, -1, 1),
			(file, rank) => DiagIter(file, rank, -1, -1),
		]);
	}

	public rookMoves(occupied: FlatBitboard) : FlatBitboard {
		return this.movesFromIters(occupied, [
			(file, rank) => FileIter(file, rank, 1),
			(file, rank) => FileIter(file, rank, -1),
			(file, rank) => RankIter(rank, file, 1),
			(file, rank) => RankIter(rank, file, -1),
		]);
	}

	public queenMoves(occupied: FlatBitboard) : FlatBitboard {
		return this.bishopMoves(occupied).either(this.rookMoves(occupied));
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
