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

import React from 'react';
import Color, { otherColor } from '~/engine/Color';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { GameResult, GameOverReason } from '~/engine/Engine';
import s from '~/styles/GameOver.module.scss';

type LocalResult = 'win' | 'lose' | 'draw';

const toLocalResult = (result: GameResult, playerColor: Color) => {
	if (result === 'draw')
		return 'draw';
	if (result === playerColor)
		return 'win';
	return 'lose';
};

const getTitle = (localResult: LocalResult) => {
	switch (localResult) {
		case 'win':  return 'You won!';
		case 'lose': return 'You lost';
		case 'draw': return 'Draw';
	}
};

const getReasonString = (result: GameResult, reason: GameOverReason) => {
	const cs = {
		'w': 'White',
		'b': 'Black',
	};

	const winner = cs[result as Color];
	const loser = cs[otherColor(result as Color)];

	switch (reason) {
		case 'timeout': return `${loser} ran out of time`;
		case 'checkmate': return `${winner} checkmated ${loser.toLowerCase()}`;
		case 'resignation': return `${loser} resigned`;
		case 'disconnection': return `${loser} disconnected`;
		case 'stalemate': return 'Stalemate';
		case 'insufficient-material': return 'Insufficient material';
		case '50-move-rule': return '50 moves without a capture or pawn move';
		case 'repetition': return 'three-fold repetition';
		case 'agreement': return 'Drawn by agreement';
	}
};

type GameOverProps = {
	result: GameResult,
	reason: GameOverReason,
	playerColor: Color,
}

const GameOver = ({ result, reason, playerColor }: GameOverProps) => {
	const localResult = toLocalResult(result, playerColor);

	const exit = () => window.location.href = '/';
	const playAgain = () => location.reload();

	return (
		<Dialog open={true}>
			<div className={`${s[localResult]} ${s.header}`}>
				<div className={s.title}>{getTitle(localResult)}</div>
				<div className={s.reason}>
					{getReasonString(result, reason)}
				</div>
			</div>
			<div className={s.wrapper}>
				<Button variant="outlined" onClick={exit}>
					Back to lobby
				</Button>
				<Button variant="contained" onClick={playAgain}>
					Play again
				</Button>
			</div>
		</Dialog>
	);
};

export default GameOver;
