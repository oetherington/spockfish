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

import React, { useState, useMemo } from 'react';
import { Group, Mesh, Material, Color as ThreeColor } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import {
	pieceScale,
	pieceColors,
	colorToInt,
	pieceRotations,
	getSquarePosition,
} from './geometry';
import { PieceType } from '~/engine/Piece';
import { File, Rank, Level } from '~/engine/Square';
import Color from '~/engine/Color';

const makeFileName = (name: string) => `/mdl/${name}.obj`;

const fileNames = {
	p: makeFileName('pawn'),
	n: makeFileName('knight'),
	b: makeFileName('bishop'),
	r: makeFileName('rook'),
	q: makeFileName('queen'),
	k: makeFileName('king'),
};

type ColoredMaterial = {
	color: ThreeColor;
};

type PieceProps = {
	piece: PieceType,
	color: Color,
	file: File,
	rank: Rank,
	level: Level,
}

const Piece = ({ piece, color, file, rank, level }: PieceProps) => {
	const [loaded, setLoaded] = useState<boolean>(false);

	let obj: Group | undefined;

	try {
		/* eslint-disable react-hooks/rules-of-hooks */
		obj = useLoader(OBJLoader, fileNames[piece]);
		/* eslint-enable react-hooks/rules-of-hooks */
	} catch (promise) {
		const p = promise as Promise<void>;
		p.then(() => setLoaded(true));
	}

	const geometry = useMemo(() => {
		if (obj) {
			const geometry = obj.clone();
			const mesh = geometry.children[0] as Mesh;
			const material = (mesh.material as Material).clone();
			(geometry.children[0] as Mesh).material = material;
			(material as unknown as ColoredMaterial)
				.color.setHex(colorToInt(pieceColors[color]));
			geometry.rotation.y = pieceRotations[color][piece];
			return geometry;
		} else {
			return null;
		}
	}, [obj, color, piece]);

	if (!geometry)
		return null;

	const position = getSquarePosition(file, rank, level);

	return (
		<group
			userData={{
				piece,
				color,
				file,
				rank,
				level,
				clickable: true,
			}}
		>
			<primitive
				object={geometry}
				scale={pieceScale}
				position={position}
			/>
		</group>
	);
};

export default Piece;
