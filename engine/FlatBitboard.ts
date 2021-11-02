import { Rank, File, FlatSquare } from './Square';

const fileCount = 9;

const fileOffsets: Record<File, number> = {
	'z': fileCount * 0,
	'a': fileCount * 1,
	'b': fileCount * 2,
	'c': fileCount * 3,
	'd': fileCount * 4,
	'e': fileCount * 5,
};

const files = [ 'z', 'a', 'b', 'c', 'd', 'e' ];

class FlatBitboard {
	low: number;
	high: number;

	constructor(low: number = 0, high: number = 0) {
		this.low = low >>> 0;
		this.high = high >>> 0;
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

	public setAll() : FlatBitboard {
		this.low = 0xffffffff;
		this.high = 0xffffffff;
	}

	public isSet(index: number) : boolean {
		index >>>= 0;

		return !!(index < 32
			? this.low & (1 << index)
			: this.high & (1 << (index - 32)));
	}

	public setBit(index: number) : void {
		index >>>= 0;

		if (index < 32)
			this.low = (this.low | (1 << index)) >>> 0;
		else
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
		return fileOffsets[file] + rank - 1;
	}

	static indexToSquare(index: number) : FlatSquare {
		return {
			file: files[Math.floor(index / fileCount)],
			rank: (index % fileCount) + 1,
		};
	}
}

export default FlatBitboard;
