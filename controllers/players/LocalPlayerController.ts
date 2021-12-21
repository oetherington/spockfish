import PlayerController, { PlayerRenderData } from './PlayerController';
import { WebGLRenderer, Scene, Raycaster, Group } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from '~/utils/SelectedPiece';
import useDomEvent from '~/hooks/useDomEvent';
import Piece from '~/engine/Piece';
import Move, { PieceMove, isPieceMove } from '~/engine/Move';
import Square, { squaresEqual } from '~/engine/Square';

class LocalPlayerController extends PlayerController {
	public isLocal() : boolean {
		return true;
	}

	private async takeOrMoveTo(
		obj: Group,
		{
			engine,
			selected,
			setSelected,
			setPosition,
			choosePromotion,
		}: PlayerRenderData,
	) : Promise<void> {
		if (selected) {
			const target = selected.legalMoves.find((move: Move) =>
				isPieceMove(move) && squaresEqual(obj.userData,
					move.to as Square)) as PieceMove | undefined;

			if (target) {
				if (target.promotion)
					target.promotion = await choosePromotion();

				const newPosition = await engine.makeMove(target);
				setPosition(newPosition);
			}
		}

		setSelected(null);
	}

	private async selectPiece(
		obj: Group,
		data: PlayerRenderData,
	) : Promise<void> {
		const { engine, selected, setSelected } = data;

		if (!obj || (selected && obj === selected.obj)) {
			setSelected(null);
		} else {
			const piece = obj.userData as Piece;
			if (piece.color === this.color) {
				const legalMoves = await engine.getLegalMovesForPiece(piece);
				setSelected({ obj, piece, legalMoves });
			} else {
				await this.takeOrMoveTo(obj, data);
			}
		}
	}

	private async clickObject(
		obj: Group,
		data: PlayerRenderData,
	) : Promise<void> {
		if (obj.userData.piece || obj.userData.abLevel)
			await this.selectPiece(obj, data);
		else if (obj.userData.square)
			await this.takeOrMoveTo(obj, data);
	}

	public onRender(data: PlayerRenderData) : void {
		const {
			position,
			scene,
			selected,
			setSelected,
			raycaster,
			gl,
		} = data;

		useDomEvent(gl.domElement, 'click', () => {
			if (position.turn !== this.color)
				return;

			const objects = raycaster.intersectObjects(scene.children);

			for (const object of objects) {
				let obj = object.object;
				while (obj.parent && obj.parent.type === 'Group')
					obj = obj.parent;

				if (obj.userData && obj.userData.clickable) {
					this.clickObject(obj as Group, data);
					return;
				}
			}

			setSelected(null);
		}, [scene.children, selected, position]);
	}
}

export default LocalPlayerController;
