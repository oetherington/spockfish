import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import ClockDisplay from './ClockDisplay';
import useEngine from '~/hooks/useEngine';
import PlayerController from '~/controllers/players/PlayerController';
import Clock from '~/utils/Clock';

type BoardViewProps = {
	width: number,
	height: number,
	controllers: PlayerController[],
	clock: Clock,
}

const BoardView = (props: BoardViewProps) => {
	const { engine, position, setPosition } = useEngine();

	const isLoaded = !!(engine && position);

	// TODO: Add option for perspective/orthographic cameras
	return (
		<>
			<Canvas camera={{ zoom: 1, position: [ -6, 5.5, 5.5, ] }}>
				<ambientLight intensity={0.2} />
				<pointLight position={[10, 10, 10]} />
				{isLoaded &&
					<Board {...{ engine, position, setPosition }} {...props} />}
			</Canvas>
			{isLoaded &&
				<ClockDisplay clock={props.clock} turn={position.turn} />}
		</>
	);
};

export default BoardView;
