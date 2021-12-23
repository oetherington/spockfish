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
