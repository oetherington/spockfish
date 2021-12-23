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
