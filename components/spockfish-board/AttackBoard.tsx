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
				userData={{ abLevel: level }}
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
