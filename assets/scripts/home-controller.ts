/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />


module Application.Controllers {
	export class HomeController {
		private scope: any;
		private tamaFact: any;
		private notification: string;
		private timeout: any;

		constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, TamaFact: any) {
			this.tamaFact = new TamaFact('Tamachi', 20, 300, 30, 10);
			this.scope = $scope;
			this.timeout = $timeout;
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
		
		/* Restart playing */
		restartGame(): void {
			this.tamaFact.tamagotchi.reset();
			this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
		}

		/* Display a notification message */
		private notify(notification: string): void {
			this.notification = notification;

			this.timeout(() => {
				this.scope.$apply(() => {
					this.notification = '';
				});

			
			}, 5000, true);


		}

	}

}