import PlayerController from './PlayerController';
import { WebGLRenderer, Scene, Raycaster, Group } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from './SelectedPiece';
import useDomEvent from '~/hooks/useDomEvent';
import Piece from '~/engine/Piece';
import Move from '~/engine/Move';
import { squaresEqual } from '~/engine/Square';

class LocalPlayerController extends PlayerController {
	public isLocal() : boolean {
		return true;
	}

	private async selectPiece(
		obj: Group,
		selected: SelectedPiece | null,
		setSelected: (piece: SelectedPiece | null) => void,
		engine: RemoteEngine,
	) : Promise<void> {
		if (!obj || (selected && obj === selected.obj)) {
			setSelected(null);
		} else {
			const piece = obj.userData as Piece;
			const legalMoves = await engine.getLegalMovesForPiece(piece);
			setSelected({ obj, piece, legalMoves });
		}
	}

	private async clickObject(
		obj: Group,
		selected: SelectedPiece | null,
		setSelected: (piece: SelectedPiece | null) => void,
		engine: RemoteEngine,
		setPosition: (position: SerializedPosition) => void,
	) : Promise<void> {
		if (obj.userData.piece || obj.userData.abLevel) {
			// TODO: Handle case when clicking on a piece to take it
			await this.selectPiece(obj, selected, setSelected, engine);
		} else if (obj.userData.square) {
			if (selected) {
				const target = selected.legalMoves.find(({ to }: Move) =>
					squaresEqual(obj.userData, to));

				if (target) {
					const newPosition = await engine.makeMove(target);
					setPosition(newPosition);
				}
			}

			setSelected(null);
		}
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
		useDomEvent(gl.domElement, 'click', () => {
			if (position.turn !== this.color)
				return;

			const objects = raycaster.intersectObjects(scene.children);

			for (const object of objects) {
				let obj = object.object;
				while (obj.parent && obj.parent.type === 'Group')
					obj = obj.parent;

				if (obj.userData && obj.userData.clickable) {
					this.clickObject(
						obj as Group,
						selected,
						setSelected,
						engine,
						setPosition,
					);
					return;
				}
			}

			setSelected(null);
		}, [scene.children, selected, position]);
	}
}

export default LocalPlayerController;
