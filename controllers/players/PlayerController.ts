import { WebGLRenderer, Scene, Raycaster } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from '~/utils/SelectedPiece';
import { PieceType } from '~/engine/Piece';
import Color from '~/engine/Color';

export type PlayerRenderData = {
	engine: RemoteEngine,
	position: SerializedPosition,
	setPosition: (position: SerializedPosition) => void,
	selected: SelectedPiece | null,
	setSelected: (piece: SelectedPiece | null) => void,
	choosePromotion: () => Promise<PieceType>,
	gl: WebGLRenderer,
	scene: Scene,
	raycaster: Raycaster,
}

abstract class PlayerController {
	protected color: Color;

	constructor(color: Color) {
		this.color = color;
	}

	public abstract onRender(data: PlayerRenderData) : void;

	public getColor() : Color {
		return this.color;
	}

	public isLocal() : boolean {
		return false;
	}
}

export default PlayerController;
