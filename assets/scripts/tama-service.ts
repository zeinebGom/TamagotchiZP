/// <reference path="angular.d.ts" />
/// <reference path="./models/tamagotchi.ts" />

module Application.Services {

	export class TamaService {
		constructor() {
		}


		/* Create a Tamagotchi */
		createTama(): any {
			let name: string = 'Tamachi';
			let health: number = 600;
			let happiness: number = 30;
			let money: number = 400;
			let cleanness: number = 100;
			let workLevel: number = 10;
			return new Tamagotchi(name, health, happiness, money, cleanness, workLevel);
		}
	}
}