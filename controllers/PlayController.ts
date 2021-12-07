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
