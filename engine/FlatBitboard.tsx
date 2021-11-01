class FlatBitboard {
	low: number;
	high: number;

	constructor(low: number = 0, high: number = 0) {
		this.low = low >>> 0;
		this.high = high >>> 0;
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
}

export default FlatBitboard;
