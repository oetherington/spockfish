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
