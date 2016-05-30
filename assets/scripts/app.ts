/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="timer-factory.ts" />
/// <reference path="home-controller.ts" />


var appModule = angular.module("tamaApp", ['ngAnimate']);
 


appModule.factory("TamaFactory", () => Application.Factories.TamaFactory);

appModule.factory("TimerFactory", () => Application.Factories.TimerFactory);

appModule.controller("HomeController", ["$scope", "$timeout", "$interval", "TamaFactory", "TimerFactory", ($scope, $timeout, $interval, TamaFactory, TimerFactory) => 
	new Application.Controllers.HomeController($scope, $timeout, $interval, TamaFactory, TimerFactory)]);

