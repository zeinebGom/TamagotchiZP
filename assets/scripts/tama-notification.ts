module Application.Directives {

	export class TamaNotification {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'AE',
				templateUrl: './dist/templates/tama-notification.html',
				scope: {
					ctl: '='
				},
				transclude: true
			};
		}
	}
}