/// <reference path="angular.d.ts" />
/// <reference path="./models/timer.ts" />

module Application.Factories {

	export class TimerFactory {
		private timer: any;

		constructor(name: string, delay: number, interval: any, fctCyclic: any, value: number, isIncrement: boolean, parent: any) {
			this.timer = this.createTimer(name, delay, interval, fctCyclic, value, isIncrement, parent);
		}

		/* Create a timer */
		private createTimer(name: string, delay: number, interval: any, fctCyclic: any, value: number, isIncrement: boolean, parent: any): any {
			return new Timer(name, delay, interval, fctCyclic, value, isIncrement, parent);
		}

		/* Kill the timer */
		cancelTimer(): void {
			this.timer.cancelTimer();
		}
	}
}