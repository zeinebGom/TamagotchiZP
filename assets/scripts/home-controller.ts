/// <reference path="angular.d.ts" />

module Application.Controllers {
	export class HomeController {
		
		
		scope:any;
	
	
		tamaFact: any;
		constructor($scope: ng.IScope, TamaFact: any) {
			this.tamaFact = new TamaFact;
			this.scope = $scope;
			 // this.name = this.tama.tamagotchi.getName();
			 // this.health = this.tama.tamagotchi.getHealth();
			 // this.money = this.tama.tamagotchi.getMoney();


			console.log(this.tamaFact);
			
	

        }

		feed(): void { 
		
			this.tamaFact.tamagotchi.feed(); 
			
		} 
	}

}