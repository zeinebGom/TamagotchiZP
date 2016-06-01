/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />

module tamaApp {
    export class Routes {
        static $inject = ["$routeProvider", "$locationProvider"];
        static configureRoutes($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) {

			/*$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});*/

            $routeProvider.when("/home", { 
            	templateUrl: "partials/home.html",
            	controller: 'HomeController'
            });

            $routeProvider.when("/help", {
                templateUrl: "partials/help.html",
            	controller: 'HomeController'
			});

            $routeProvider.otherwise({ 
            	redirectTo: "/home" 
            });
        }
    }
}