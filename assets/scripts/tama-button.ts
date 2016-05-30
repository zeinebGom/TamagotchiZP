module Application.Directives {

	export class TamaButton {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'AE',
				templateUrl: './dist/templates/tama-button.html',
				scope: {
					ctl: '='
				}
			};
		}
	}
}