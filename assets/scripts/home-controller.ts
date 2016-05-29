/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />


module Application.Controllers {
	export class HomeController {
		private scope: any;
		private timeout: any;

		private tamaFact: any;
		private notification: string;
		private hour: any;
		private showActionsBar: boolean;

		private static notifications: number = 0;


		constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, TamaFact: any) {
			this.tamaFact = new TamaFact('Tamachi', 20, 30, 30, 10);
			this.scope = $scope;
			this.timeout = $timeout;

			let now = new Date();
			this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + now.getMinutes() + (now.getHours() > 12 ? 'PM' : 'AM');
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
			this.tamaFact.tamagotchi.reset();
			this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
		}

		/* Display a notification message */
		private notify(notification: string): void {
			HomeController.notifications++;
			this.notification = notification;

			this.timeout(() => {
				this.scope.$apply(() => {

					// The notification message area is erased if the number of notifications is 0
					HomeController.notifications--;
					if (HomeController.notifications == 0)
						this.notification = '';
				});
			}, 5000, true);


		}

	}

}