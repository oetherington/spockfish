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
	}, [clock, turn]);

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
