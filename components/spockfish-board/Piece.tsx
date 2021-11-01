import React, { useState, useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import {
	pieceScale,
	pieceColors,
	colorToInt,
	pieceRotations,
	getSquarePosition,
} from './geometry';

const makeFileName = name => `/mdl/${name}.obj`;

const fileNames = {
	p: makeFileName('pawn'),
	n: makeFileName('knight'),
	b: makeFileName('bishop'),
	r: makeFileName('rook'),
	q: makeFileName('queen'),
	k: makeFileName('king'),
};

const Piece = ({ piece, color, file, rank, level }) => {
	const [loaded, setLoaded] = useState(false);

	try {
		const obj = useLoader(OBJLoader, fileNames[piece]);
	} catch (promise) {
		promise.then(() => setLoaded(true));
	}

	const geometry = useMemo(() => obj ? obj.clone() : null, [obj]);

	const material = useMemo(() =>
		geometry ? geometry.children[0].material.clone() : null
	,[geometry]);

	if (!geometry)
		return null;

	geometry.children[0].material = material;
	material.color.setHex(colorToInt(pieceColors[color]));

	geometry.rotation.y = pieceRotations[color][piece];

	const position = getSquarePosition(file, rank, level);

	return (
		<group
			metadata={{
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
