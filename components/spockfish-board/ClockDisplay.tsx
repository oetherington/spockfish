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
		if (!clock.isStarted() && turn === 'b')
			clock.start(setDisplayedTime);
		clock.setTurn(turn);
	}, [turn]);

	const whiteClass = `${s.clockWhite} ${turn === 'w' ? s.active : ''}`;
	const blackClass = `${s.clockBlack} ${turn === 'b' ? s.active : ''}`;

	return (
		<div className={s.clock}>
			{
				clock.isStarted()
					? <>
						<div className={whiteClass}>{displayedTime['w']}</div>
						<div className={blackClass}>{displayedTime['b']}</div>
					</>
					: <span className={s.waiting}>
						Waiting for first move...
					</span>
			}
		</div>
	);
};

export default ClockDisplay;
