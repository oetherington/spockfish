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

	public getColor(color: Color) : AttackLevel[] {
		return this.data[color];
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
