module Application.Directives {

	export class TamaHelp {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'AE',
				templateUrl: './dist/templates/tama-help.html',
				scope: {
					ctl: '='
				}
			};
		}
	}
}