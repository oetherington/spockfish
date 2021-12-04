import PlayerController from './PlayerController';
import { WebGLRenderer, Scene, Raycaster } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from './SelectedPiece';

class EnginePlayerController extends PlayerController {
	private triggered: boolean = false;

	private async generateMove(
		engine: RemoteEngine,
		setPosition: (position: SerializedPosition) => void,
	) : Promise<void> {
		this.triggered = true;

		const moves = await engine.getLegalMoves();
		const index = Math.floor(Math.random() * moves.length);
		const newPosition = await engine.makeMove(moves[index]);
		setPosition(newPosition);

		this.triggered = false;
	}

	public onRender(
		engine: RemoteEngine,
		position: SerializedPosition,
		setPosition: (position: SerializedPosition) => void,
		selected: SelectedPiece | null,
		setSelected: (piece: SelectedPiece | null) => void,
		gl: WebGLRenderer,
		scene: Scene,
		raycaster: Raycaster,
	) : void {
		if (this.triggered || position.turn !== this.color)
			return;

		this.generateMove(engine, setPosition);
	}
}

export default EnginePlayerController;
