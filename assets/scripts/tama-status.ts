module Application.Directives {

	export class TamaStatus {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'AE',
				templateUrl: './dist/templates/tama-status.html',
				scope: {
					ctl: '='
				}
			};
		}
	}
}