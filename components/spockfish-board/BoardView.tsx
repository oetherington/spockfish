import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import Position from './engine/Position';

const getPixelRatio = () => typeof window === 'undefined'
	? undefined
	: window.devicePixelRatio;

const BoardView = props => {
	const [position, setPosition] = useState(new Position());


	return (
		<Canvas pixelRatio={getPixelRatio()}>
			<ambientLight intensity={0.2} />
			<pointLight position={[10, 10, 10]} />
			<Board position={position} {...props} />
		</Canvas>
	);
};

export default BoardView;
