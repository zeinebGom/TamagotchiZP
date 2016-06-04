module Application.Directives {

	export class TamaNotification {

		constructor() {
			return this.createDirective();
		}

		private createDirective(): any {
			return {
				restrict: 'A',
				templateUrl: './dist/templates/tama-notification.html',
				scope: {
					ctl: '='
				},
				transclude: true
			};
		}
	}
}