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
import useSound from 'use-sound';
import moveSound from '~/public/sounds/lichessMoveSound.mp3';
import lowTimeSound from '~/public/sounds/tos_bosun_whistle_1.mp3';
import gameOverSound from '~/public/sounds/ent_communicator_close.mp3';

export type SoundEffect
	= 'move'
	| 'lowTime'
	| 'gameOver';

type SoundSpec = {
	file: string,
	volume?: number,
};

const effects: Record<SoundEffect, SoundSpec> = {
	move: { file: moveSound },
	lowTime: { file: lowTimeSound, volume: 0.1 },
	gameOver: { file: gameOverSound },
};

const useSoundEffect = (effect: SoundEffect) => {
	const { file, ...opts } = effects[effect];
	const [play] = useSound(file, opts);
	return play;
};

export default useSoundEffect;
