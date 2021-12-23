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

import Color from '~/engine/Color';
import TimeControl from '~/utils/TimeControl';

export type DisplayedTime = Record<Color, string>;

type LowTimeCallback = (color: Color) => void;
type TimeoutCallback = (loserColor: Color) => void;

const lowTimeSeconds = 10;

class Clock {
	private timeControl: TimeControl;
	private seconds: Record<Color, number>;
	private turn: Color = 'w';
	private lastSwitch: number = 0;
	private started: boolean = false;
	private stopped: boolean = false;
	private done: boolean = false;
	private lowTimeCallback: LowTimeCallback = (color: Color) => {};
	private timeoutCallback: TimeoutCallback = (loserColor: Color) => {};

	constructor(timeControl: TimeControl) {
		this.timeControl = timeControl;
		this.seconds = {
			'w': timeControl.mins * 60,
			'b': timeControl.mins * 60,
		};
	}

	public setLowTimeCallback(callback: LowTimeCallback) : void {
		this.lowTimeCallback = callback;
	}

	public setTimeoutCallback(callback: TimeoutCallback) : void {
		this.timeoutCallback = callback;
	}

	public getRemainingSeconds(color: Color) : number {
		return this.seconds[color];
	}

	public isDone() : boolean {
		return this.done;
	}

	public setTurn(color: Color) : void {
		this.seconds[this.turn] += this.timeControl.inc;
		this.turn = color;
	}

	public start(setDisplayedTime: (dt: DisplayedTime) => void) : void {
		this.started = true;

		this.lastSwitch = performance.now();

		const callback = () => {
			if (this.done)
				return;

			const time = performance.now();
			const delta = (time - this.lastSwitch) / 1000;
			this.lastSwitch = time;

			const newTime = this.seconds[this.turn] - delta;

			if (newTime < lowTimeSeconds &&
					this.seconds[this.turn] > lowTimeSeconds)
				this.lowTimeCallback(this.turn);

			this.seconds[this.turn] = newTime;

			if (this.seconds[this.turn] <= 0) {
				this.seconds[this.turn] = 0;
				this.done = true;
				this.timeoutCallback(this.turn);
			} else if (!this.stopped) {
				window.setTimeout(callback, 100);
			}

			setDisplayedTime({
				'w': this.getTimeAsString('w'),
				'b': this.getTimeAsString('b'),
			});
		};

		window.setTimeout(callback, 100);
	}

	public stop() : void {
		this.stopped = true;
	}

	public isStarted() : boolean {
		return this.started;
	}

	public isStopped() : boolean {
		return this.stopped;
	}

	private getTimeAsString(color: Color) : string {
		const totalSeconds = Math.ceil(this.seconds[color]);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.round(totalSeconds % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	}
}

export default Clock;
