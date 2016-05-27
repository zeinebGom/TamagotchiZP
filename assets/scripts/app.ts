/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="home-controller.ts" />


var appModule = angular.module("tamaApp", []);
 


appModule.factory("Tama", ()=> Application.Factories.Tama);

appModule.controller("HomeController", ["$scope", "$timeout", "Tama", ($scope, $timeout, Tama) => 
	new Application.Controllers.HomeController($scope, $timeout, Tama)]);

