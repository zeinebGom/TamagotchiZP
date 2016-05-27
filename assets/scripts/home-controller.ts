/// <reference path="angular.d.ts" />

module Application.Controllers {
	export class HomeController {
		
		
		scope: any;
		Tama: any;
		tamaName:any;
	

        constructor($scope: ng.IScope, Tama: any) {
			let tama = new Tama;

            this.scope = $scope;
            this.tamaName = tama.name;
          

        }
	}

}