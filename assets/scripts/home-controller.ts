/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />


module Application.Controllers {
	export class HomeController {
		private scope: any;
		private timeout: any;							// Service timeout to call once a function
		private interval: any;							// Service interval to call cyclically a function

		private notification: string;					// Message to display in the notification status
		private hour: any;								// Hour displayed in the iPhone header
		private hideActionsBar: boolean;				// Hide the actions bar?
		private showNotification: boolean;
		private showHelpWindow: boolean;				// Display the help window?
		private timers: any;							// Timers called cyclically

		private healthClassName: string;				// Health class name
		private cleannessClassName: string;				// Cleanness class name
		private happinessClassName: string;				// Happiness class name
		private happinessIcon: number;					// Happiness icon
		private tamagotchi: Tamagotchi;

		private nightMode: boolean;						// Interface in night mode

		private static notifications: number;		// Number of notifications to display in the notification status


		constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $interval: ng.IIntervalService, TamaService: any) {
			this.tamagotchi = new TamaService().createTama();
			this.scope = $scope;
			this.timeout = $timeout;
			this.interval = $interval;
			this.hideActionsBar = true;
			this.nightMode = false;

			let now = new Date();
			this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + (now.getHours() > 12 ? 'PM' : 'AM');

			this.generalCheck();
			this.createTimers();

			HomeController.notifications = 0;
			this.notify('Hello, my name is ' + this.tamagotchi.getName());
		}

		/* Create timers */
		createTimers(): void {
			this.timers = [];

			let timer0 = this.interval(() => { this.generalCheck(); }, 1000);
			let timer1 = this.interval(() => { this.looseHealth(); }, 2000);
			let timer2 = this.interval(() => { this.looseCleanness(); }, 8000);

			this.timers.push(timer0);
			this.timers.push(timer1);
			this.timers.push(timer2);
		}

		/* Cancel timers */
		cancelTimers(): void {
			for (let i = 0; i < this.timers.length; i++)
				this.interval.cancel(this.timers[i]);
		}

		/* General check */
		generalCheck(): void {
			this.getHealthClass();
			this.getCleannessClass();
			this.getHappinessClass();

			if(this.tamagotchi.getHealth() <= 0) {
				this.cancelTimers();
			}

		}

		/* Feed the Tamagotchi */
		feed(): any { 
			let feed = this.tamagotchi.feed();
			this.notify(feed.message);
		}

		/* Clean the Tamagotchi */
		clean(): any {
			let clean = this.tamagotchi.clean();
			this.notify(clean.message);
		}

		/* Go to work */
		work(): any {
			let work = this.tamagotchi.work();
			this.notify(work.message);
		}

		/* Play football */
		playFootball(): any {
			let playFootball = this.tamagotchi.playFootball();
			this.notify(playFootball.message);
		}

		/* Sleep */
		sleep(): any {
			let sleep = this.tamagotchi.sleep();
			this.notify(sleep.message);
		}

		/* Go to cinema */
		goCinema(): any {
			let goCinema = this.tamagotchi.goCinema();
			this.notify(goCinema.message);
		}

		
		/* Restart playing */
		restartGame(): void {
			this.cancelTimers();
			this.tamagotchi.reset();
			this.notify('Back to game, my name is ' + this.tamagotchi.getName());
			this.createTimers();
		}

		/* Interaction with the Tamagotchi */
		private looseHealth() {
			this.tamagotchi.looseHealth(-2, true);
		}

		private looseCleanness() {
			this.tamagotchi.looseCleanness(-1, true);
		}

		/* Display a notification message */
		private notify(notification: string): void {
			HomeController.notifications++;
			this.notification = notification;
			this.showNotification = true;

			this.timeout(() => {
				this.scope.$apply(() => {

					// The notification message area is hidden if the number of notifications is 0
					if (--HomeController.notifications <= 0) {
						this.showNotification = false;
					}
				});
			}, 5000, true);
		}

		private getHealthClass(): void {
			let className: string = 'green';
			let health = this.tamagotchi.getHealth();
			if (health < 10)
				className = 'red';
			else if (health > 10 && health < 20)
				className = 'orange';
			
			this.healthClassName = className;
		}

		private getCleannessClass(): void {
			let className: string = 'green';
			let cleanness = this.tamagotchi.getCleanness();
			if (cleanness < 10)
				className = 'red';
			else if (cleanness > 10 && cleanness < 20)
				className = 'orange';

			this.cleannessClassName = className;
		}

		private getHappinessClass(): void {
			let className: string = 'green';
			let icon: number = 0;
			let happiness = this.tamagotchi.getHappiness();

			if (happiness < 10) {
				className = 'red';
				icon = 1;
			}
			else if (happiness > 10 && happiness < 20) {
				className = 'orange';
				icon = 1;
			}

			this.happinessClassName = className;
			this.happinessIcon = icon;
		}



	}

}