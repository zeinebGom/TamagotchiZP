var Tamagotchi = (function () {
    function Tamagotchi(name, health, happiness, money, cleanness, workLevel) {
        this.name = name;
        this.health = this.initialHealth = health;
        this.happiness = this.initialHappiness = happiness;
        this.money = this.initialMoney = money;
        this.cleanness = this.initialCleanness = cleanness;
        this.workLevel = this.initialWorkLevel = workLevel;
        this.promote();
    }
    /* Reset the Tamagotch */
    Tamagotchi.prototype.reset = function () {
        this.health = this.initialHealth;
        this.happiness = this.initialHappiness;
        this.money = this.initialMoney;
        this.cleanness = this.initialCleanness;
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
    Tamagotchi.prototype.getCleanness = function () {
        return this.cleanness;
    };
    Tamagotchi.prototype.getHappiness = function () {
        return this.happiness;
    };
    Tamagotchi.prototype.getWorkLevel = function () {
        return this.workLevel;
    };
    Tamagotchi.prototype.getPromoteLevel = function () {
        return this.promoteLevel;
    };
    // Feed the Tamagotchi
    Tamagotchi.prototype.feed = function () {
        if (this.money > 0) {
            this.health++;
            this.money--;
            return {
                feed: true,
                message: 'Thank you, I am going to eat an hamburger'
            };
        }
        else
            return {
                feed: false,
                message: 'Not enough money for lunch...'
            };
    };
    // Clean the Tamagotchi 
    Tamagotchi.prototype.clean = function () {
        if (this.money > 0) {
            this.cleanness = this.initialCleanness;
            this.money--;
            return {
                clean: true,
                message: 'OK, I take my shower right now!'
            };
        }
        else
            return {
                clean: false,
                message: 'Not enough money to have my shower...'
            };
    };
    // Go to work
    Tamagotchi.prototype.work = function () {
        if (this.health <= 2) {
            return {
                work: false,
                message: 'So tired to work...'
            };
        }
        else {
            this.money += 10;
            this.health -= 2;
            this.workLevel += 10;
            var promoteReturn = this.promote();
            if (promoteReturn.hasNewPromoteLevel == true) {
                return {
                    work: true,
                    message: promoteReturn.message
                };
            }
            return {
                work: true,
                message: 'I am going to the office'
            };
        }
    };
    /* Play football */
    Tamagotchi.prototype.playFootball = function () {
        if (this.health <= 2) {
            return {
                work: false,
                message: 'So tired to play football...'
            };
        }
        else {
            this.health += 2;
            this.happiness += 1;
            this.money--;
            return {
                work: true,
                message: 'Playing football with my friends'
            };
        }
    };
    /* Sleep */
    Tamagotchi.prototype.sleep = function () {
        this.health += 15;
        return {
            sleep: true,
            message: 'Yes, I am going to sleep a little'
        };
    };
    /* Go to cinema */
    Tamagotchi.prototype.goCinema = function () {
        this.happiness += 4;
        this.health--;
        this.money -= 2;
        this.cleanness--;
        return {
            goCinema: true,
            message: 'Yeah, I am going to watch a nice movie!'
        };
    };
    /* Check for the promote level, depending on the work level */
    Tamagotchi.prototype.promote = function () {
        var oldPromoteLevel = this.promoteLevel;
        if (this.workLevel == 0)
            this.promoteLevel = "Unemployed";
        else if ((this.workLevel > 0) && (this.workLevel < 50))
            this.promoteLevel = "Laborer";
        else if ((this.workLevel >= 51) && (this.workLevel < 200))
            this.promoteLevel = "Chief";
        else
            this.promoteLevel = "Director";
        if (this.promoteLevel != oldPromoteLevel)
            return {
                hasNewPromoteLevel: true,
                message: 'You are now ' + this.promoteLevel
            };
        else
            return {
                hasNewPromoteLevel: false,
                message: ''
            };
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
            function Tama(name, health, happiness, money, cleanness, workLevel) {
                this.tamagotchi = this.createTama(name, health, happiness, money, cleanness, workLevel);
            }
            /* Create a Tamagotchi */
            Tama.prototype.createTama = function (name, health, happiness, money, cleanness, workLevel) {
                return new Tamagotchi(name, health, happiness, money, cleanness, workLevel);
            };
            return Tama;
        }());
        Factories.Tama = Tama;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, $timeout, TamaFact) {
                this.tamaFact = new TamaFact('Tamachi', 30, 30, 30, 10);
                this.scope = $scope;
                this.timeout = $timeout;
                this.hideActionsBar = true;
                this.showNotification = true;
                this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
                var now = new Date();
                this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + (now.getHours() > 12 ? 'PM' : 'AM');
            }
            /* Feed the Tamagotch */
            HomeController.prototype.feed = function () {
                var feed = this.tamaFact.tamagotchi.feed();
                this.notify(feed.message);
            };
            /* Clean the Tamagotch */
            HomeController.prototype.clean = function () {
                var clean = this.tamaFact.tamagotchi.clean();
                this.notify(clean.message);
            };
            /* Go to work */
            HomeController.prototype.work = function () {
                var work = this.tamaFact.tamagotchi.work();
                this.notify(work.message);
            };
            /* Play football */
            HomeController.prototype.playFootball = function () {
                var playFootball = this.tamaFact.tamagotchi.playFootball();
                this.notify(playFootball.message);
            };
            /* Sleep */
            HomeController.prototype.sleep = function () {
                var sleep = this.tamaFact.tamagotchi.sleep();
                this.notify(sleep.message);
            };
            /* Go to cinema */
            HomeController.prototype.goCinema = function () {
                var goCinema = this.tamaFact.tamagotchi.goCinema();
                this.notify(goCinema.message);
            };
            /* Restart playing */
            HomeController.prototype.restartGame = function () {
                this.tamaFact.tamagotchi.reset();
                this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
            };
            /* Display a notification message */
            HomeController.prototype.notify = function (notification) {
                var _this = this;
                HomeController.notifications++;
                this.showNotification = true;
                this.notification = notification;
                this.timeout(function () {
                    _this.scope.$apply(function () {
                        // The notification message area is erased if the number of notifications is 0
                        HomeController.notifications--;
                        if (HomeController.notifications == 0) {
                            _this.showNotification = false;
                        }
                    });
                }, 5000, true);
            };
            HomeController.notifications = 0;
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
/// <reference path="angular.d.ts" />
/// <reference path="tama-factory.ts" />
/// <reference path="home-controller.ts" />
var appModule = angular.module("tamaApp", ['ngAnimate']);
appModule.factory("Tama", function () { return Application.Factories.Tama; });
appModule.controller("HomeController", ["$scope", "$timeout", "Tama", function ($scope, $timeout, Tama) {
        return new Application.Controllers.HomeController($scope, $timeout, Tama);
    }]);
