/* eslint-env worker */

import { expose } from 'comlink';
import Engine from './Engine';

const workerApi: Engine = {
	sayHello: () => console.log('hello'),
};

expose(workerApi);
