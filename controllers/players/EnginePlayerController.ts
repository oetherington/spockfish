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
