/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="timer-factory.ts" />
/// <reference path="tama-loose.ts" />
/// <reference path="tama-help.ts" />
/// <reference path="tama-status.ts" />
/// <reference path="tama-button.ts" />
/// <reference path="tama-notification.ts" />
/// <reference path="home-controller.ts" />
var appModule = angular.module("tamaApp", ['ngAnimate']);
appModule.factory("TamaFactory", function () { return Application.Factories.TamaFactory; });
appModule.factory("TimerFactory", function () { return Application.Factories.TimerFactory; });
appModule.controller("HomeController", ["$scope", "$timeout", "$interval", "TamaFactory", "TimerFactory", function ($scope, $timeout, $interval, TamaFactory, TimerFactory) {
        return new Application.Controllers.HomeController($scope, $timeout, $interval, TamaFactory, TimerFactory);
    }]);
appModule.directive("tamaLoose", function () { return new Application.Directives.TamaLoose(); });
appModule.directive("tamaHelp", function () { return new Application.Directives.TamaHelp(); });
appModule.directive("tamaStatus", function () { return new Application.Directives.TamaStatus(); });
appModule.directive("tamaButton", function () { return new Application.Directives.TamaButton(); });
appModule.directive("tamaNotification", function () { return new Application.Directives.TamaNotification(); });
