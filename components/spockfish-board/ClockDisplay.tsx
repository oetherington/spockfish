import React, { useEffect, useState } from 'react';
import Clock, { DisplayedTime } from '~/utils/Clock';
import Color from '~/engine/Color';
import s from '~/styles/Clock.module.scss';

type ClockDisplayProps = {
	clock: Clock,
	turn: Color,
}

const ClockDisplay = ({ clock, turn }: ClockDisplayProps) => {
	const [displayedTime, setDisplayedTime] = useState<DisplayedTime>({
		'w': '-:--',
		'b': '-:--',
	});

	useEffect(() => {
		clock.start(setDisplayedTime);
	}, []);

	useEffect(() => {
		clock.setTurn(turn);
	}, [turn]);

	const whiteClass = `${s.clockWhite} ${turn === 'w' ? s.active : ''}`;
	const blackClass = `${s.clockBlack} ${turn === 'b' ? s.active : ''}`;

	return (
		<div className={s.clock}>
			<div className={whiteClass}>{displayedTime['w']}</div>
			<div className={blackClass}>{displayedTime['b']}</div>
		</div>
	);
};

export default ClockDisplay;
