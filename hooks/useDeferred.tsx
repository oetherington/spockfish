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
