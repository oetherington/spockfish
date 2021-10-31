import React from 'react';
import {
	lightSquareColor,
	darkSquareColor,
	rankOffsets,
	getBoardPosition,
} from './geometry';
import Square from './Square';

const fileOffset = 'a'.charCodeAt(0);

const files = [ 'a', 'b', 'c', 'd', ];

const MainBoard = ({ level }) => {
	const ranks = [ 1, 2, 3, 4 ].map(i => i + rankOffsets[level]);
	const position = getBoardPosition(level);

	return ranks.map(rank => files.map(file => {
		const fileIndex = file.charCodeAt(0) - fileOffset;
		return <Square
			key={file + rank}
			position={[
				position[0] + fileIndex,
				position[1],
				position[2] - rank,
			]}
			color={(fileIndex + rank) & 1 ? darkSquareColor : lightSquareColor}
			{...{ file, rank, level }}
		/>;
	}));
};

export default MainBoard;
