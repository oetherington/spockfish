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

import PlayerController from '~/controllers/players/PlayerController';
import LocalPlayerController from '~/controllers/players/LocalPlayerController';
import EnginePlayerController from '~/controllers/players/EnginePlayerController';
import Color, { colors, otherColor } from '~/engine/Color';
import TimeControl from '~/utils/TimeControl';
import PlayConfig from '~/utils/PlayConfig';
import Clock from '~/utils/Clock';
import type { NextRouter } from 'next/router';

const intRegex = /^[0-9]\d*$/;

const getAiConfig = (
	params: string[],
	onInvalidURL: () => void,
): PlayConfig => {
	if (params.length !== 3)
		onInvalidURL();

	const [ col, mins, inc ] = params;
	const color = col as Color;

	if (!colors.includes(color) ||
			!intRegex.test(mins) ||
			!intRegex.test(inc))
		onInvalidURL();

	const timeControl: TimeControl = {
		mins: parseInt(mins),
		inc: parseInt(inc),
	};

	return {
		controllers: [
			new LocalPlayerController(color),
			new EnginePlayerController(otherColor(color)),
		],
		clock: new Clock(timeControl),
	};
};

const PlayController = {
	init: (router: NextRouter): PlayConfig => {
		const onInvalidURL = () => router.push('/');

		const { params } = router.query;

		if (Array.isArray(params) && params.length > 0) {
			if (params[0] === 'ai') {
				return getAiConfig(params.slice(1), onInvalidURL);
			}
		}

		onInvalidURL();

		return {} as PlayConfig;
	},
};

export default PlayController;
