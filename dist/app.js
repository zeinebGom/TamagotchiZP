var Tamagotchi = (function () {
    function Tamagotchi(name, health, money, hyg, workLevel) {
        this.name = name;
        this.health = this.initialHealth = health;
        this.money = this.initialMoney = money;
        this.hyg = this.initialHyg = hyg;
        this.workLevel = this.initialWorkLevel = workLevel;
        this.promote();
    }
    /* Restart game */
    Tamagotchi.prototype.restartGame = function () {
        console.log('Santé ini ' + this.initialHealth);
        this.health = this.initialHealth;
        this.money = this.initialMoney;
        this.hyg = this.initialHyg;
        this.workLevel = this.initialWorkLevel;
        this.promote();
    };
    /* Getters functions */
    Tamagotchi.prototype.getName = function () {
        return this.name;
    };
    Tamagotchi.prototype.getHealth = function () {
        return this.health;
    };
    Tamagotchi.prototype.getMoney = function () {
        return this.money;
    };
    Tamagotchi.prototype.getHyg = function () {
        return this.hyg;
    };
    Tamagotchi.prototype.getPromoteLevel = function () {
        return this.promoteLevel;
    };
    // Feed the Tamagotchi
    Tamagotchi.prototype.feed = function () {
        if (this.money > 0) {
            this.health++;
            this.money--;
            return true;
        }
        else
            return false;
    };
    // Clean the Tamagotchi 
    Tamagotchi.prototype.clean = function () {
        if (this.money > 0) {
            this.hyg++;
            this.money--;
            return true;
        }
        else
            return false;
    };
    Tamagotchi.prototype.work = function () {
        this.money += 10;
        this.health -= 2;
        this.workLevel += 10;
        this.promote();
    };
    Tamagotchi.prototype.promote = function () {
        if (this.workLevel == 0) {
            return this.promoteLevel = "Unemployed";
        }
        else if ((this.workLevel > 0) && (this.workLevel < 50)) {
            return this.promoteLevel = "Laborer";
        }
        else if ((this.workLevel >= 51) && (this.workLevel < 200)) {
            return this.promoteLevel = "Chief";
        }
        else if (this.workLevel >= 201) {
            return this.promoteLevel = "Director";
        }
    };
    return Tamagotchi;
}());
/// <reference path="angular.d.ts" />
/// <reference path="./models/tamagotchi.ts" />
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var Tama = (function () {
            function Tama() {
                this.tamagotchi = this.createTama();
            }
            Tama.prototype.createTama = function () {
                var tama = new Tamagotchi('Tamachi', 20, 300, 30, 10);
                return tama;
            };
            return Tama;
        }());
        Factories.Tama = Tama;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="angular.d.ts" />
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, TamaFact) {
                this.tamaFact = new TamaFact;
                this.scope = $scope;
                // this.name = this.tama.tamagotchi.getName();
                // this.health = this.tama.tamagotchi.getHealth();
                // this.money = this.tama.tamagotchi.getMoney();
                console.log(this.tamaFact);
            }
            HomeController.prototype.feed = function () {
                this.tamaFact.tamagotchi.feed();
            };
            HomeController.prototype.clean = function () {
                this.tamaFact.tamagotchi.clean();
            };
            HomeController.prototype.work = function () {
                this.tamaFact.tamagotchi.work();
            };
            HomeController.prototype.restartGame = function () {
                this.tamaFact.tamagotchi.restartGame();
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="home-controller.ts" />
var appModule = angular.module("tamaApp", []);
appModule.factory("Tama", function () { return Application.Factories.Tama; });
appModule.controller("HomeController", ["$scope", "Tama", function ($scope, Tama) {
        return new Application.Controllers.HomeController($scope, Tama);
    }]);
