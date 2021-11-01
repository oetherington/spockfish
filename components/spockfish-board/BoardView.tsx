import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import Position from '~/engine/Position';
import useKeyBind from '~/hooks/useKeyBind';

const getPixelRatio = () => typeof window === 'undefined'
	? undefined
	: window.devicePixelRatio;

const BoardView = props => {
	const [position, setPosition] = useState(new Position());

	useKeyBind('KeyR', () => {
		setPosition(new Position());
		console.log('Refreshed!');
	});

	return (
		<Canvas
			pixelRatio={getPixelRatio()}
			perspective // TODO: Add option for orthographic camera
			camera={{ zoom: 1, position: [ -6, 5.5, 5.5, ] }}
		>
			<ambientLight intensity={0.2} />
			<pointLight position={[10, 10, 10]} />
			<Board position={position} {...props} />
		</Canvas>
	);
};

export default BoardView;
