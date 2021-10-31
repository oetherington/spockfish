import React from 'react';
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
import Square from './Square';

const fileIndices = {
	z: 0,
	a: 1,
	d: 0,
	e: 1,
};

const AttackBoard = ({ level, color }) => {
	const files = getAttackLevelFiles(level);
	const ranks = getAttackLevelRanks(level);

	const position = getBoardPosition(level);

	const { radius, height, segments } = stalkSize;

	return (
		<>
			<mesh
				position={getStalkPosition(level)}
				scale={1}
				metadata={{ abLevel: level }}
			>
				<cylinderGeometry args={[radius, radius, height, segments]} />
				<meshStandardMaterial color={pieceColors[color]} />
			</mesh>
			{
				ranks.map(rank => files.map(file => {
					const fileIndex = fileIndices[file];
					return <Square
						key={file + rank}
						position={[
							position[0] + fileIndex,
							position[1],
							position[2] - rank,
						]}
						color={(fileIndex + rank) & 1
							? darkSquareColor
							: lightSquareColor}
						{...{ file, rank, level }}
					/>
				}))
			}
		</>
	);
};

export default AttackBoard;
