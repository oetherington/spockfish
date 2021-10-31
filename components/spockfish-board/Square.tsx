import React from 'react';
import { boardDepth } from './geometry';

const Square = ({ position, color, file, rank, level }) => {
	const name = file + rank + level;

	return (
		<mesh
			position={position}
			scale={1}
			metadata={{
				square: name,
				file,
				rank,
				level,
			}}
		>
			<boxGeometry args={[1, boardDepth, 1]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
};

export default Square;
