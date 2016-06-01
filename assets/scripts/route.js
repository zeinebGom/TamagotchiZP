/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
var tamaApp;
(function (tamaApp) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($locationProvider, $routeProvider) {
            $routeProvider
                .when("/home", {
                templateUrl: "partials/home.html",
                controller: 'HomeController'
            }).when("/help", {
                templateUrl: "partials/help.html",
                controller: 'HomeController'
            }).otherwise({
                redirectTo: "/home"
            });
        };
        Routes.$inject = ["$routeProvider", "$locationProvider"];
        return Routes;
    }());
    tamaApp.Routes = Routes;
})(tamaApp || (tamaApp = {}));
