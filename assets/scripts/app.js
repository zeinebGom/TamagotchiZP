/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="home-controller.ts" />
var appModule = angular.module("tamaApp", []);
appModule.factory("Tama", function () { return Application.Factories.Tama; });
appModule.controller("HomeController", ["$scope", "Tama", function ($scope, Tama) {
        return new Application.Controllers.HomeController($scope, Tama);
    }]);
