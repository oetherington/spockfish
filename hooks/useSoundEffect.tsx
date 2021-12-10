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
