import PlayerController, { PlayerRenderData } from './PlayerController';
import { WebGLRenderer, Scene, Raycaster } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from '~/utils/SelectedPiece';

class EnginePlayerController extends PlayerController {
	private triggered: boolean = false;

	private async generateMove(
		engine: RemoteEngine,
		setPosition: (position: SerializedPosition) => void,
	) : Promise<void> {
		this.triggered = true;

		const moves = await engine.getLegalMoves();
		const index = Math.floor(Math.random() * moves.length);

		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				const newPosition = await engine.makeMove(moves[index]);
				setPosition(newPosition);
				this.triggered = false;
			}, 1500);
		});
	}

	public onRender({
		engine,
		position,
		setPosition,
	}: PlayerRenderData) : void {
		if (this.triggered || position.turn !== this.color)
			return;

		if (position.status === 'playing')
			this.generateMove(engine, setPosition);
	}
}

export default EnginePlayerController;
