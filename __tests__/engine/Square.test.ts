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

import {
	oppositeLevel,
	squaresEqual,
	nextFile,
	prevFile,
} from '~/engine/Square';

describe('AttackLevel', () => {
	it('can get opposite attack level', () => {
		expect(oppositeLevel('QL1')).toBe('KL1');
		expect(oppositeLevel('QL2')).toBe('KL2');
		expect(oppositeLevel('QL3')).toBe('KL3');
		expect(oppositeLevel('QL4')).toBe('KL4');
		expect(oppositeLevel('QL5')).toBe('KL5');
		expect(oppositeLevel('QL6')).toBe('KL6');
		expect(oppositeLevel('KL1')).toBe('QL1');
		expect(oppositeLevel('KL2')).toBe('QL2');
		expect(oppositeLevel('KL3')).toBe('QL3');
		expect(oppositeLevel('KL4')).toBe('QL4');
		expect(oppositeLevel('KL5')).toBe('QL5');
		expect(oppositeLevel('KL6')).toBe('QL6');
	});
});

describe('Squares', () => {
	it('can compare square equality', () => {
		expect(squaresEqual(
			{ file: 'a', rank: 4, level: 'N' },
			{ file: 'a', rank: 4, level: 'N' },
		)).toBe(true);

		expect(squaresEqual(
			{ file: 'a', rank: 4, level: 'N' },
			{ file: 'b', rank: 4, level: 'N' },
		)).toBe(false);

		expect(squaresEqual(
			{ file: 'a', rank: 4, level: 'N' },
			{ file: 'a', rank: 3, level: 'N' },
		)).toBe(false);

		expect(squaresEqual(
			{ file: 'a', rank: 4, level: 'N' },
			{ file: 'a', rank: 4, level: 'W' },
		)).toBe(false);
	});

	it('can get next file', () => {
		expect(nextFile('z')).toBe('a');
		expect(nextFile('a')).toBe('b');
		expect(nextFile('b')).toBe('c');
		expect(nextFile('c')).toBe('d');
		expect(nextFile('d')).toBe('e');
		expect(nextFile('e')).toBe(undefined);
	});

	it('can get previous file', () => {
		expect(prevFile('z')).toBe(undefined);
		expect(prevFile('a')).toBe('z');
		expect(prevFile('b')).toBe('a');
		expect(prevFile('c')).toBe('b');
		expect(prevFile('d')).toBe('c');
		expect(prevFile('e')).toBe('d');
	});
});
