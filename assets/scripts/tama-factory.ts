/// <reference path="angular.d.ts" />

module Application.Factories {

	export class Tama {
		private tama: any;

		constructor() {
		
			return this.createTama();
		}

		
		private createTama(): any {
			let tama = [{
				name:'tama'
			}];
		
			return tama;
		}
	}

}