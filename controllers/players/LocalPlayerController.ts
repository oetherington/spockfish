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

	private async takeOrMoveTo(
		obj: Group,
		selected: SelectedPiece | null,
		setSelected: (piece: SelectedPiece | null) => void,
		engine: RemoteEngine,
		setPosition: (position: SerializedPosition) => void,
	) : Promise<void> {
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

	private async selectPiece(
		obj: Group,
		selected: SelectedPiece | null,
		setSelected: (piece: SelectedPiece | null) => void,
		engine: RemoteEngine,
		setPosition: (position: SerializedPosition) => void,
	) : Promise<void> {
		if (!obj || (selected && obj === selected.obj)) {
			setSelected(null);
		} else {
			const piece = obj.userData as Piece;
			if (piece.color === this.color) {
				const legalMoves = await engine.getLegalMovesForPiece(piece);
				setSelected({ obj, piece, legalMoves });
			} else {
				await this.takeOrMoveTo(
					obj, selected, setSelected, engine, setPosition);
			}
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
			await this.selectPiece(
				obj, selected, setSelected, engine, setPosition);
		} else if (obj.userData.square) {
			await this.takeOrMoveTo(
				obj, selected, setSelected, engine, setPosition);
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
