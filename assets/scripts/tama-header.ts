module Application.Directives {

	export class TamaHeader {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'AE',
				templateUrl: './dist/templates/tama-header.html',
				scope: {
					ctl: '='
				}
			};
		}
	}
}