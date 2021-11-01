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
