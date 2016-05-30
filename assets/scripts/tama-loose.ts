module Application.Directives {

	export class TamaLoose {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'AE',
				templateUrl: './dist/templates/tama-loose.html',
				scope: {
					ctl: '='
				}
			};
		}
	}
}