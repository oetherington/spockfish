import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import ClockDisplay from './ClockDisplay';
import GameOver from './GameOver';
import useEngine from '~/hooks/useEngine';
import PlayerController from '~/controllers/players/PlayerController';
import Clock from '~/utils/Clock';
import { RemoteEngine, GameResult, GameOverReason } from '~/engine/Engine';
import Color, { otherColor } from '~/engine/Color';

type BoardViewProps = {
	width: number,
	height: number,
	controllers: PlayerController[],
	clock: Clock,
}

const getLocalColor = (controllers: PlayerController[]) =>
	controllers.find((c) => c.isLocal())?.getColor() ?? 'w';

const BoardView = (props: BoardViewProps) => {
	const { engine, position, setPosition, setStatus } = useEngine();

	const isLoaded = !!(engine && position);

	props.clock.setTimeoutCallback((loserColor: Color) =>
		setStatus('timeout', otherColor(loserColor)));

	if (position && position?.status !== 'playing')
		props.clock.stop();

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
			{position && position.status !== 'playing' &&
				<GameOver
					result={position.result as GameResult}
					reason={position.status as GameOverReason}
					playerColor={getLocalColor(props.controllers)}
				/>}
		</>
	);
};

export default BoardView;
