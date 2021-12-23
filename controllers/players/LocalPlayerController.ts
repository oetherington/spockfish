/*
 * This file is part of Spockfish
 * Copyright (C) 2021-2022 Ollie Etherington <www.etherington.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import PlayerController, { PlayerRenderData } from './PlayerController';
import { WebGLRenderer, Scene, Raycaster, Group } from 'three';
import { RemoteEngine, SerializedPosition } from '~/engine/Engine';
import SelectedPiece from '~/utils/SelectedPiece';
import useDomEvent from '~/hooks/useDomEvent';
import Piece from '~/engine/Piece';
import Move, { PieceMove, isPieceMove, isAttackBoardMove } from '~/engine/Move';
import Square, { AttackLevel, squaresEqual } from '~/engine/Square';

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
			const target = selected.legalMoves.find(
				obj.userData.targetAbLevel
					? (move: Move) => isAttackBoardMove(move) &&
						move.to === obj.userData.targetAbLevel
					: (move: Move) => isPieceMove(move) &&
						squaresEqual(obj.userData, move.to as Square)
			);

			if (target) {
				if ((target as PieceMove).promotion)
					(target as PieceMove).promotion = await choosePromotion();

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
		} else if (obj.userData.abLevel) {
			const piece = obj.userData.abLevel as AttackLevel;
			const legalMoves = await engine.getLegalMovesForAttackBoard(piece);
			setSelected({ obj, piece, legalMoves });
		} else if (obj.userData.targetAbLevel) {
			await this.takeOrMoveTo(obj, data);
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
		if (obj.userData.piece ||
				obj.userData.abLevel ||
				obj.userData.targetAbLevel)
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
