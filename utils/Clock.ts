import Color from '~/engine/Color';
import TimeControl from '~/utils/TimeControl';

export type DisplayedTime = Record<Color, string>;

type TimeoutCallback = (loserColor: Color) => void;

class Clock {
	private timeControl: TimeControl;
	private seconds: Record<Color, number>;
	private turn: Color = 'w';
	private lastSwitch: number = 0;
	private stopped: boolean = false;
	private done: boolean = false;
	private timeoutCallback: TimeoutCallback = (loserColor: Color) => {};

	constructor(timeControl: TimeControl) {
		this.timeControl = timeControl;
		this.seconds = {
			'w': timeControl.mins * 60,
			'b': timeControl.mins * 60,
		};
	}

	public setTimeoutCallback(callback: TimeoutCallback) : void {
		this.timeoutCallback = callback;
	}

	public isDone() : boolean {
		return this.done;
	}

	public setTurn(color: Color) : void {
		this.seconds[this.turn] += this.timeControl.inc;
		this.turn = color;
	}

	public start(setDisplayedTime: (dt: DisplayedTime) => void) : void {
		this.lastSwitch = performance.now();

		const callback = () => {
			if (this.done)
				return;

			const time = performance.now();
			const delta = (time - this.lastSwitch) / 1000;
			this.lastSwitch = time;

			this.seconds[this.turn] -= delta;

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

	private getTimeAsString(color: Color) : string {
		const totalSeconds = Math.ceil(this.seconds[color]);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.round(totalSeconds % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	}
}

export default Clock;
