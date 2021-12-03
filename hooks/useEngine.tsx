import { useState, useEffect } from 'react';
import { wrap, Remote } from 'comlink';
import Engine, { SerializedPosition } from '~/engine/Engine';

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

	return {
		...payload,
		setPosition,
	};
};

export default useEngine;
