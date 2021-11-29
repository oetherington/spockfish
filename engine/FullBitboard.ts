import { Level } from './Square';
import FlatBitboard from './FlatBitboard';

type FullBitboard = Record<Level, FlatBitboard>;

export default FullBitboard;

export const createFullBitboard = () => {
	const bb: FullBitboard = {
		'W': new FlatBitboard(),
		'B': new FlatBitboard(),
		'N': new FlatBitboard(),
		'QL1': new FlatBitboard(),
		'QL2': new FlatBitboard(),
		'QL3': new FlatBitboard(),
		'QL4': new FlatBitboard(),
		'QL5': new FlatBitboard(),
		'QL6': new FlatBitboard(),
		'KL1': new FlatBitboard(),
		'KL2': new FlatBitboard(),
		'KL3': new FlatBitboard(),
		'KL4': new FlatBitboard(),
		'KL5': new FlatBitboard(),
		'KL6': new FlatBitboard(),
	};

	return bb;
};
