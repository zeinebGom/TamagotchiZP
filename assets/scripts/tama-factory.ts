/// <reference path="angular.d.ts" />
/// <reference path="./models/tamagotchi.ts" />

module Application.Factories {

	export class TamaFactory {
		private tamagotchi: any;

		constructor(name: string, health: number, happiness: number, money: number, cleanness: number, workLevel: number) {
			this.tamagotchi = this.createTama(name, health, happiness, money, cleanness, workLevel);
		}

		/* Create a Tamagotchi */
		private createTama(name: string, health: number, happiness: number, money: number, cleanness: number, workLevel: number): any {
			return new Tamagotchi(name, health, happiness, money, cleanness, workLevel);
		}
	}
}