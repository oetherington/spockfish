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
