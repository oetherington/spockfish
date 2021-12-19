import React, { useState } from 'react';

export type Deferred<T> = {
	promise: Promise<T>,
	resolve: (value: T) => void,
	reject: () => void,
}

function useDeferred<T>(): Deferred<T> {
	const createPromise = () => {
		let resolve, reject;

		const promise = new Promise<T>((resolve_, reject_) => {
			resolve = resolve_;
			reject = reject_;
		});

		return {
			promise,
			resolve: resolve as unknown as (value: T) => void,
			reject: reject as unknown as () => void,
		};
	};

	const [data, setData] = useState(createPromise());

	return {
		promise: data.promise,
		resolve: (value: T) => {
			data.resolve(value);
			setData(createPromise());
		},
		reject: () => {
			data.reject();
			setData(createPromise());
		},
	};
};

export default useDeferred;
