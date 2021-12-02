import { useState, useEffect } from 'react';
import { wrap } from 'comlink';
import Engine, { nullEngine } from '~/engine/Engine';

type Payload = {
	worker: Worker | null,
	engine: Engine,
};

const useEngine = () => {
	const [payload, setPayload] = useState<Payload>({
		worker: null,
		engine: nullEngine,
	});

	useEffect(() => {
		const worker = new Worker(new URL(
			'~/engine/Spockfish.worker.ts',
			import.meta.url,
		));
		const engine = wrap(worker) as Engine;
		setPayload({ worker, engine });
	}, []);

	return payload.engine;
};

export default useEngine;
