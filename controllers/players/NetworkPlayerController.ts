import PlayerController, { PlayerRenderData } from './PlayerController';
import { WebGLRenderer, Scene, Raycaster } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from '~/utils/SelectedPiece';

class NetworkPlayerController extends PlayerController {
	public onRender(data: PlayerRenderData) : void {
		// TODO
	}
}

export default NetworkPlayerController;
