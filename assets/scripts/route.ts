/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />

module tamaApp {
	export class Routes {
		static $inject = ["$routeProvider", "$locationProvider"];
		static configureRoutes($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) {

			$routeProvider
				.when("/home", { 
					templateUrl: "partials/home.html",
					controller: 'HomeController'
				})
				.when("/help", {
					templateUrl: "partials/help.html",
					controller: 'HomeController'
				})
				.otherwise({ 
					redirectTo: "/home"
				});
		}
	}
}