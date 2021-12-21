import React, { useState } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import {
	legalMoveColor,
	legalMoveScale,
	legalMoveBobHeight,
	legalMoveBobSpeed,
	getSquarePosition,
} from './geometry';
import Move, { isPieceMove } from '~/engine/Move';
import Square from '~/engine/Square';

const getPosition = ({ file, rank, level }: Square, bob: number) => {
	const position = getSquarePosition(file, rank, level)
	return new Vector3(position[0], position[1] + bob, position[2]);
};

type Bob = {
	absolute: number;
	display: number;
}

type LegalMovesProps = {
	moves: Move[];
}

const LegalMoves = ({ moves }: LegalMovesProps) => {
	const [bob, setBob] = useState<Bob>({ absolute: 0, display: 0 });

	const updateBob = (delta: number) => {
		const absolute = bob.absolute + delta * legalMoveBobSpeed;
		setBob({
			absolute,
			display: Math.sin(absolute) * legalMoveBobHeight,
		});
	};

	useFrame((state, delta) => updateBob(delta));

	return (
		<>
			{
				moves.map((move, index) =>
					isPieceMove(move)
						? <mesh
							key={index}
							position={getPosition(move.to as Square,
								bob.display)}
							scale={legalMoveScale}
						>
							<sphereGeometry args={[1, 16]} />
							<meshStandardMaterial color={legalMoveColor} />
						</mesh>
						: null
				)
			}
		</>
	);
};

export default LegalMoves;
