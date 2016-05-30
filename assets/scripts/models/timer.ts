
/* This class gives the ability to call cyclically a function with a value */
class Timer {
	private name: string;
	private promise: any;
	private delay: number;
	private interval: any;
	private value: number;
	private isIncrement: boolean;
	private fctCyclic: any;
	private parent: any;

	
	constructor(name: string, delay: number, interval: any, fctCyclic: any, value: number, isIncrement: boolean, parent: any) {
		this.name = name;
		this.interval = interval;
		this.fctCyclic = fctCyclic;
		this.value = value;
		this.isIncrement = isIncrement;
		this.delay = delay;
		this.parent = parent;

		this.createTimer();

	}

	createTimer(): void {
		this.promise = this.interval(() => {
			this.fctCyclic(this.value, this.isIncrement);
			this.parent.checkPlaying();
		}, this.delay, 0);
	}

	cancelTimer(): void {
		this.interval.cancel(this.promise);
	}

}