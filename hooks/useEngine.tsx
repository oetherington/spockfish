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

import { useState, useEffect } from 'react';
import { wrap, Remote } from 'comlink';
import Engine, {
	RemoteEngine,
	SerializedPosition,
	GameStatus,
	GameResult,
} from '~/engine/Engine';

type EnginePayload = {
	worker: Worker | null,
	engine: Remote<Engine> | null,
	position: SerializedPosition | null,
};

const loadWorker = async (setPayload: (payload: EnginePayload) => void) => {
	const worker = new Worker(new URL(
		'~/engine/Spockfish.worker.ts',
		import.meta.url,
	));
	const RemoteEngine = wrap<typeof Engine>(worker);
	const engine = await new RemoteEngine();
	const position = await engine.getSerializedPosition();
	setPayload({ worker, engine, position });
};

const useEngine = () => {
	const [payload, setPayload] = useState<EnginePayload>({
		worker: null,
		engine: null,
		position: null,
	});

	useEffect(() => {
		loadWorker(setPayload);
	}, []);

	const setPosition = (position: SerializedPosition) =>
		setPayload({ ...payload, position });

	const setStatus = async (status: GameStatus, result: GameResult | null) => {
		const eng = payload.engine as RemoteEngine;
		const newPosition = await eng.setStatus(status, result);
		setPayload({ ...payload, position: newPosition });
	};

	return {
		...payload,
		setPosition,
		setStatus,
	};
};

export default useEngine;
