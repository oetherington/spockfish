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

import React from 'react';
import { Vector3 } from 'three';
import {
	lightSquareColor,
	darkSquareColor,
	pieceColors,
	getBoardPosition,
	getStalkPosition,
	getAttackLevelFiles,
	getAttackLevelRanks,
	stalkSize,
} from './geometry';
import Color from '~/engine/Color';
import { File, AttackLevel } from '~/engine/Square';
import Square from './Square';

const fileIndices: Record<File, number> = {
	z: 0,
	a: 1,
	b: Infinity,
	c: Infinity,
	d: 0,
	e: 1,
};

type AttackBoardProps = {
	level: AttackLevel,
	color: Color,
}

const AttackBoard = ({ level, color }: AttackBoardProps) => {
	const files = getAttackLevelFiles(level);
	const ranks = getAttackLevelRanks(level);

	const position = getBoardPosition(level);

	const { radius, height, segments } = stalkSize;

	return (
		<>
			<mesh
				position={getStalkPosition(level)}
				scale={1}
				userData={{
					abLevel: level,
					clickable: true,
				}}
			>
				<cylinderGeometry args={[radius, radius, height, segments]} />
				<meshStandardMaterial color={pieceColors[color]} />
			</mesh>
			{
				ranks.map(rank => files.map(file => {
					const fileIndex = fileIndices[file];
					return <Square
						key={file + rank}
						position={new Vector3(
							position.x + fileIndex,
							position.y,
							position.z - rank,
						)}
						color={(fileIndex + rank) & 1
							? lightSquareColor
							: darkSquareColor}
						{...{ file, rank, level }}
					/>
				}))
			}
		</>
	);
};

export default AttackBoard;
