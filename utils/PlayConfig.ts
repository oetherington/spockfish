import PlayerController from '~/controllers/players/PlayerController';
import Clock from '~/utils/Clock';

type PlayConfig = {
	controllers: PlayerController[],
	clock: Clock,
}

export default PlayConfig;
