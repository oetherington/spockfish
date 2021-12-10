import React from 'react';
import useSound from 'use-sound';
import moveSound from '~/public/sounds/lichessMoveSound.mp3';
import lowTimeSound from '~/public/sounds/tos_bosun_whistle_1.mp3';
import gameOverSound from '~/public/sounds/ent_communicator_close.mp3';

export type SoundEffect
	= 'move'
	| 'lowTime'
	| 'gameOver';

const effects: Record<SoundEffect, string> = {
	move: moveSound,
	lowTime: lowTimeSound,
	gameOver: gameOverSound,
};

const useSoundEffect = (effect: SoundEffect) => {
	const [play] = useSound(effects[effect]);
	return play;
};

export default useSoundEffect;
