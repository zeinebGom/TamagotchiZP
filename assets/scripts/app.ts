/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="timer-factory.ts" />
/// <reference path="tama-loose.ts" />
/// <reference path="tama-help.ts" />
/// <reference path="tama-status.ts" />
/// <reference path="tama-button.ts" />
/// <reference path="tama-notification.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="route.ts" />
/// <reference path="home-controller.ts" />


var appModule = angular.module("tamaApp", ['ngAnimate','ngRoute']);
 


appModule.factory("TamaFactory", () => Application.Factories.TamaFactory);

appModule.factory("TimerFactory", () => Application.Factories.TimerFactory);

appModule.controller("HomeController", ["$scope", "$timeout", "$interval", "TamaFactory", "TimerFactory", ($scope, $timeout, $interval, TamaFactory, TimerFactory) => 
	new Application.Controllers.HomeController($scope, $timeout, $interval, TamaFactory, TimerFactory)]);

appModule.directive("tamaLoose", () => new Application.Directives.TamaLoose());

appModule.directive("tamaHelp", () => new Application.Directives.TamaHelp());

appModule.directive("tamaStatus", () => new Application.Directives.TamaStatus());

appModule.directive("tamaButton", () => new Application.Directives.TamaButton());

appModule.directive("tamaNotification", () => new Application.Directives.TamaNotification());

appModule.config(tamaApp.Routes.configureRoutes);


