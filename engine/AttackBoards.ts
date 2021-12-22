import { AttackLevel } from './Square';
import Color, { otherColor } from './Color';

class AttackBoards {
	private data: Record<Color, AttackLevel[]>;

	constructor(
		white: AttackLevel[] = [ 'KL1', 'QL1' ],
		black: AttackLevel[] = [ 'KL6', 'QL6' ],
	) {
		this.data = {
			'w': white.sort(),
			'b': black.sort(),
		};
	}

	private static fromData(data: Record<Color, AttackLevel[]>) : AttackBoards {
		return new AttackBoards(data['w'], data['b']);
	}

	public getWhite() : AttackLevel[] {
		return this.data['w'];
	}

	public getBlack() : AttackLevel[] {
		return this.data['b'];
	}

	public move(
		color: Color,
		from: AttackLevel,
		to: AttackLevel,
	) : AttackBoards {
		const other = otherColor(color);
		const data: Record<Color, AttackLevel[]> = { ...this.data };
		data[color] = this.data[color].filter(level => level !== from);
		data[color].push(to);
		return AttackBoards.fromData(data);
	}
}

export default AttackBoards;
