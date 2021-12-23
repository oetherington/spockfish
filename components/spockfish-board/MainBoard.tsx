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
	rankOffsets,
	getBoardPosition,
} from './geometry';
import Square from './Square';
import { File, MainLevel } from '~/engine/Square';

const fileOffset: number = 'a'.charCodeAt(0);

const files: File[] = [ 'a', 'b', 'c', 'd', ];

type MainBoardProps = {
	level: MainLevel,
}

const MainBoard = ({ level }: MainBoardProps) => {
	const ranks = [ 1, 2, 3, 4 ].map(i => i + rankOffsets[level]);
	const position = getBoardPosition(level);

	return (
		<>
			{
				ranks.map(rank => files.map(file => {
					const fileIndex = file.charCodeAt(0) - fileOffset;
					return <Square
						key={file + rank}
						position={new Vector3(
							position.x + fileIndex,
							position.y,
							position.z - rank,
						)}
						color={(fileIndex + rank) & 1
							? darkSquareColor
							: lightSquareColor}
						{...{ file, rank, level }}
					/>;
				}))
			}
		</>
	);
};

export default MainBoard;
