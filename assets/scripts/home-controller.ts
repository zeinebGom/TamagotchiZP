/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />


module Application.Controllers {
	export class HomeController {
		private scope: any;
		private timeout: any;							// Service timeout to call once a function
		private interval: any;							// Service interval to call cyclically a function

		private tamaFact: any;
		private notification: string;					// Message to display in the notification status
		private hour: any;								// Hour displayed in the iPhone header
		private hideActionsBar: boolean;				// Hide the actions bar?
		private showNotification: boolean;
		private showHelpWindow: boolean;				// Display the help window?
		private timerFact: any;
		private timers: any;							// Timers called cyclically

		private static notifications: number = 0;		// Number of notifications to display in the notification status


		constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $interval: ng.IIntervalService, TamaFact: any, TimerFact: any) {
			this.tamaFact = new TamaFact('Tamachi', 6000, 30, 30, 1, 10);
			this.scope = $scope;
			this.timeout = $timeout;
			this.interval = $interval;
			this.hideActionsBar = true;
			this.showNotification = true;
			this.showHelpWindow = false;
			this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());

			let now = new Date();
			this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + (now.getHours() > 12 ? 'PM' : 'AM');


			this.timerFact = TimerFact;
			this.createTimers();
        }

        /* Create timers */
        createTimers(): void {
			this.timers = [];

			let timer1 = new this.timerFact('Loose health', 2000, this.interval, () => {
				this.tamaFact.tamagotchi.looseHealth(-2, true);
			}, -2, true, this);

			this.timers.push(timer1);
		}

		/* Cancel timers */
		cancelTimers(): void {
			for (let i = 0; i < this.timers.length; i++) {
				this.timers[i].cancelTimer();
			}
		}


        /* Feed the Tamagotch */
		feed(): any { 
			let feed = this.tamaFact.tamagotchi.feed();
			this.notify(feed.message);
		}

		/* Clean the Tamagotch */
		clean(): any {
			let clean = this.tamaFact.tamagotchi.clean();
			this.notify(clean.message);
		}

		/* Go to work */
		work(): any {
			let work = this.tamaFact.tamagotchi.work();
			this.notify(work.message);
		}

		/* Play football */
		playFootball(): any {
			let playFootball = this.tamaFact.tamagotchi.playFootball();
			this.notify(playFootball.message);
		}

		/* Sleep */
		sleep(): any {
			let sleep = this.tamaFact.tamagotchi.sleep();
			this.notify(sleep.message);
		}

		/* Go to cinema */
		goCinema(): any {
			let goCinema = this.tamaFact.tamagotchi.goCinema();
			this.notify(goCinema.message);
		}

		
		/* Restart playing */
		restartGame(): void {
			this.cancelTimers();
			this.tamaFact.tamagotchi.reset();
			this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
			this.createTimers();
		}

		/* Display help message */
		help(): void {
			this.showHelpWindow = true;
		}

		/* Check for playing */
		checkPlaying(): void {
			if (this.tamaFact.tamagotchi.getHealth() <= 0)
				this.cancelTimers();
		}

		/* Display a notification message */
		private notify(notification: string): void {
			HomeController.notifications++;
			this.showNotification = true;
			this.notification = notification;

			this.timeout(() => {
				this.scope.$apply(() => {

					// The notification message area is erased if the number of notifications is 0
					HomeController.notifications--;
					if (HomeController.notifications == 0) {
						this.showNotification = false;
					}
				});
			}, 5000, true);


		}

	}

}