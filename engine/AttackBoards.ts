import { AttackLevel } from './Square';

class AttackBoards {
	// To make sure positions are serializable, make sure the arrays are
	// always sorted
	white: AttackLevel[] = [ 'KL1', 'QL1' ];
	black: AttackLevel[] = [ 'KL6', 'QL6' ];
}

export default AttackBoards;
