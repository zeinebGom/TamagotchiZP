/// <reference path="angular.d.ts" />
/// <reference path="./models/tamagotchi.ts" />

module Application.Factories {

	export class Tama {
		private tamagotchi: any;


		constructor() {
		
			this.tamagotchi= this.createTama();
		}

		

		
		private createTama():any {
			let tama = new Tamagotchi('ZP', 20, 300, 30,10);
			
		
			return tama;
		}
	}

}