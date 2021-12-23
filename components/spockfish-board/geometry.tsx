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

import { Vector3 } from 'three';
import { File, Rank, Level, MainLevel } from '~/engine/Square';

const trekColors = {
	red: '#cc0c00',
	blue: '#5c88da',
	green: '#84bd00',
	yellow: '#ffcd00',
	grey: '#7c878e',
	black: '#151515',
	aquaBlue: '#00b5e2',
	aquaGreen: '#00af66',
};

export const colorToInt = (c: string) => parseInt(c.substring(1), 16);

export const boardDepth = 0.1;

export const rankOffsets: Record<MainLevel, number> = {
	W: 0,
	N: 2,
	B: 4,
};

export const levelGap = 1.5;

export const heightOffsets = {
	W: -2 * levelGap,
	N: 0 * levelGap,
	B: 2 * levelGap,
	KL1: -1 * levelGap,
	KL2: -1 * levelGap,
	KL3: 1 * levelGap,
	KL4: 1 * levelGap,
	KL5: 3 * levelGap,
	KL6: 3 * levelGap,
	QL1: -1 * levelGap,
	QL2: -1 * levelGap,
	QL3: 1 * levelGap,
	QL4: 1 * levelGap,
	QL5: 3 * levelGap,
	QL6: 3 * levelGap,
};

const getAttackBoardFileOffset =
	(level: Level) => level[0] === 'Q' ? -2.5 : 1.5;

export const getBoardPosition = (level: Level) => new Vector3(
	level.length === 1 ? -1.5 : getAttackBoardFileOffset(level),
	heightOffsets[level] - boardDepth,
	4.5,
);

export const stalkSize = {
	radius: 0.05,
	height: levelGap,
	segments: 6,
};

export const getStalkPosition = (level: Level) => new Vector3(
	getAttackBoardFileOffset(level) + 0.5,
	heightOffsets[level] - (stalkSize.height / 2) - boardDepth,
	4 - getAttackLevelRanks(level)[0],
);

export const pieceScale = 0.14;

const pieceOffset = -0.1;

export const getAttackLevelFiles = (level: Level) => (level[0] === 'Q'
	? [ 'z', 'a' ]
	: [ 'd', 'e' ]) as File[];

export const getAttackLevelRanks = (level: Level) => {
	const ranks = [
		[ 0, 1 ],
		[ 4, 5 ],
		[ 2, 3 ],
		[ 6, 7 ],
		[ 4, 5 ],
		[ 8, 9 ],
	];

	return ranks[parseInt(level[2]) - 1] as Rank[];
};

const pieceFileOffsets = {
	z: -2.5,
	a: -1.5,
	b: -0.5,
	c: 0.5,
	d: 1.5,
	e: 2.5,
};

export const getSquarePosition = (file: File, rank: Rank, level: Level) => [
	pieceFileOffsets[file],
	heightOffsets[level] + pieceOffset,
	4.5 - rank,
];

export const lightSquareColor = trekColors.green;
export const darkSquareColor = trekColors.blue;

export const pieceColors = {
	w: trekColors.grey,
	b: trekColors.black,
};

export const pieceRotations = {
	w: {
		p: 0,
		n: Math.PI,
		b: 3 * Math.PI / 2,
		r: 0,
		q: 0,
		k: 0,
	},
	b: {
		p: 0,
		n: 0,
		b: Math.PI / 2,
		r: 0,
		q: 0,
		k: 0,
	},
};

export const outlineColor = trekColors.aquaBlue;
export const outlineStrength = 50;
export const outlineThickness = 0.3;

export const legalMoveColor = trekColors.red;
export const legalMoveScale = new Vector3(0.3, 0.1, 0.3);
export const legalMoveBobHeight = 0.04;
export const legalMoveBobSpeed = 3;
