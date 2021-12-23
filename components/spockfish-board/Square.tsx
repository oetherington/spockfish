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
import { boardDepth } from './geometry';
import { File, Rank, Level } from '~/engine/Square';

type SquareProps = {
	position: Vector3,
	color: string,
	file: File,
	rank: Rank,
	level: Level,
}

const Square = ({ position, color, file, rank, level }: SquareProps) => {
	const name = file + rank + level;

	return (
		<mesh
			position={position}
			scale={1}
			userData={{
				square: name,
				file,
				rank,
				level,
				clickable: true,
			}}
		>
			<boxGeometry args={[1, boardDepth, 1]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
};

export default Square;
