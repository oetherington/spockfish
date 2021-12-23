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
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import ClockDisplay from './ClockDisplay';
import Promotion from './Promotion';
import GameOver from './GameOver';
import useEngine from '~/hooks/useEngine';
import PlayerController from '~/controllers/players/PlayerController';
import Clock from '~/utils/Clock';
import { RemoteEngine, GameResult, GameOverReason } from '~/engine/Engine';
import Color, { otherColor } from '~/engine/Color';
import { PieceType } from '~/engine/Piece';
import useSoundEffect from '~/hooks/useSoundEffect';
import useDeferred from '~/hooks/useDeferred';

type BoardViewProps = {
	width: number,
	height: number,
	controllers: PlayerController[],
	clock: Clock,
}

const getLocalColor = (controllers: PlayerController[]) =>
	controllers.find((c) => c.isLocal())?.getColor() ?? 'w';

const BoardView = (props: BoardViewProps) => {
	const playLowTimeSound = useSoundEffect('lowTime');
	const playGameOverSound = useSoundEffect('gameOver');

	const { engine, position, setPosition, setStatus } = useEngine();

	const isLoaded = !!(engine && position);

	const clock = props.clock;

	clock.setTimeoutCallback((loserColor: Color) =>
		setStatus('timeout', otherColor(loserColor)));

	clock.setLowTimeCallback((color: Color) => {
		const controller = props.controllers.find(c => c.getColor() === color);
		if (controller && controller.isLocal())
			playLowTimeSound(); // TODO: Show some visual indication on clock
	});

	if (!clock.isStopped() && position && position?.status !== 'playing') {
		clock.stop();
		playGameOverSound();
	}

	const { promise, resolve } = useDeferred<PieceType>();
	const [showPromotion, setShowPromotion] = useState<boolean>(false);

	const choosePromotion = () => {
		setShowPromotion(true);
		return promise;
	};

	const resolvePromotion = (pieceType: PieceType) => {
		setShowPromotion(false);
		resolve(pieceType);
	};

	// TODO: Add option for perspective/orthographic cameras
	return (
		<>
			<Canvas
				camera={{ zoom: 1, position: [ -6, 5.5, 5.5, ] }}
				dpr={window?.devicePixelRatio ?? 1}
			>
				<ambientLight intensity={0.2} />
				<pointLight position={[10, 10, 10]} />
				{isLoaded &&
					<Board {...{
						engine,
						position,
						setPosition,
						choosePromotion,
					}} {...props} />}
			</Canvas>
			{isLoaded &&
				<ClockDisplay clock={clock} turn={position.turn} />}
			{position && position.status !== 'playing' &&
				<GameOver
					result={position.result as GameResult}
					reason={position.status as GameOverReason}
					playerColor={getLocalColor(props.controllers)}
				/>}
			{position && showPromotion &&
				<Promotion resolve={resolvePromotion} color={position.turn} />}
		</>
	);
};

export default BoardView;
