import { WebGLRenderer, Scene, Raycaster } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import Color from '~/engine/Color';
import SelectedPiece from '~/utils/SelectedPiece';

abstract class PlayerController {
	protected color: Color;

	constructor(color: Color) {
		this.color = color;
	}

	public abstract onRender(
		engine: RemoteEngine,
		position: SerializedPosition,
		setPosition: (position: SerializedPosition) => void,
		selected: SelectedPiece | null,
		setSelected: (piece: SelectedPiece | null) => void,
		gl: WebGLRenderer,
		scene: Scene,
		raycaster: Raycaster,
	) : void;

	public getColor() : Color {
		return this.color;
	}

	public isLocal() : boolean {
		return false;
	}
}

export default PlayerController;
