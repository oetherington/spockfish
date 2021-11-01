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
		obj = useLoader(OBJLoader, fileNames[piece]);
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
			(material as unknown as ColoredMaterial).color.setHex(colorToInt(pieceColors[color]));
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
