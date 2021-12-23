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
