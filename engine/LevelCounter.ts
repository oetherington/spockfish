import { AttackLevel } from './Square';

type LevelCounter = Record<AttackLevel, number>;

export default LevelCounter;

export const makeLevelCounter = () => {
	return {
		'W': 0,
		'N': 0,
		'B': 0,
		'QL1': 0,
		'QL2': 0,
		'QL3': 0,
		'QL4': 0,
		'QL5': 0,
		'QL6': 0,
		'KL1': 0,
		'KL2': 0,
		'KL3': 0,
		'KL4': 0,
		'KL5': 0,
		'KL6': 0,
	};
};
