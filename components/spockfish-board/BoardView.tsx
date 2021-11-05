import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import Position from '~/engine/Position';
import useKeyBind from '~/hooks/useKeyBind';

type BoardViewProps = {
	width: number,
	height: number,
}

const BoardView = (props: BoardViewProps) => {
	const [position, setPosition] = useState<Position>(Position.makeInitial());

	useKeyBind('KeyR', () => {
		setPosition(Position.makeInitial());
		console.log('Refreshed!');
	});

	// TODO: Add option for perspective/orthographic cameras
	return (
		<Canvas camera={{ zoom: 1, position: [ -6, 5.5, 5.5, ] }}>
			<ambientLight intensity={0.2} />
			<pointLight position={[10, 10, 10]} />
			<Board position={position} {...props} />
		</Canvas>
	);
};

export default BoardView;
