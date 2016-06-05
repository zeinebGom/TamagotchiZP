/* This class provides an abstraction view of a Tamagotchi character */
var Tamagotchi = (function () {
    function Tamagotchi(name, health, happiness, money, cleanness, workLevel) {
        this.name = name;
        this.health = this.initialHealth = health;
        this.isDead = false;
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
        this.health += 2;
        this.happiness += 1;
        this.money--;
        if (this.cleanness > 3)
            this.cleanness = 3;
        else
            this.cleanness = 0;
        return {
            work: true,
            message: 'Playing football with my friends'
        };
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
        else {
            if ((this.workLevel > 0) && (this.workLevel < 50))
                this.promoteLevel = "Laborer";
            else {
                if ((this.workLevel >= 51) && (this.workLevel < 200))
                    this.promoteLevel = "Chief";
                else
                    this.promoteLevel = "Director";
            }
        }
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
    /* Auto modifications for some features */
    /* Loose some health */
    Tamagotchi.prototype.looseHealth = function (value, isIncrement) {
        if (isIncrement == true)
            this.health += value;
        else
            this.health = value;
    };
    /* Loose some cleanness */
    Tamagotchi.prototype.looseCleanness = function (value, isIncrement) {
        if (isIncrement == true)
            this.cleanness += value;
        else
            this.cleanness = value;
    };
    return Tamagotchi;
}());
/// <reference path="angular.d.ts" />
/// <reference path="./models/tamagotchi.ts" />
var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var TamaService = (function () {
            function TamaService() {
            }
            /* Create a Tamagotchi */
            TamaService.prototype.createTama = function () {
                var name = 'Tamachi';
                var health = 600;
                var happiness = 30;
                var money = 400;
                var cleanness = 100;
                var workLevel = 10;
                return new Tamagotchi(name, health, happiness, money, cleanness, workLevel);
            };
            return TamaService;
        }());
        Services.TamaService = TamaService;
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaLoose = (function () {
            function TamaLoose() {
                return this.createDirective();
            }
            TamaLoose.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-loose.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaLoose;
        }());
        Directives.TamaLoose = TamaLoose;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaHelp = (function () {
            function TamaHelp() {
                return this.createDirective();
            }
            TamaHelp.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-help.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaHelp;
        }());
        Directives.TamaHelp = TamaHelp;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaStatus = (function () {
            function TamaStatus() {
                return this.createDirective();
            }
            TamaStatus.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-status.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaStatus;
        }());
        Directives.TamaStatus = TamaStatus;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaButton = (function () {
            function TamaButton() {
                return this.createDirective();
            }
            TamaButton.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-button.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaButton;
        }());
        Directives.TamaButton = TamaButton;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaNotification = (function () {
            function TamaNotification() {
                return this.createDirective();
            }
            TamaNotification.prototype.createDirective = function () {
                return {
                    restrict: 'A',
                    templateUrl: './dist/templates/tama-notification.html',
                    scope: {
                        ctl: '='
                    },
                    transclude: true
                };
            };
            return TamaNotification;
        }());
        Directives.TamaNotification = TamaNotification;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaHeader = (function () {
            function TamaHeader() {
                return this.createDirective();
            }
            TamaHeader.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-header.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaHeader;
        }());
        Directives.TamaHeader = TamaHeader;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
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
            })
                .when("/help", {
                templateUrl: "partials/help.html",
                controller: 'HomeController'
            })
                .otherwise({
                redirectTo: "/home"
            });
        };
        Routes.$inject = ["$routeProvider", "$locationProvider"];
        return Routes;
    }());
    tamaApp.Routes = Routes;
})(tamaApp || (tamaApp = {}));
/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, $timeout, $interval, TamaService) {
                this.tamagotchi = new TamaService().createTama();
                this.scope = $scope;
                this.timeout = $timeout;
                this.interval = $interval;
                this.hideActionsBar = true;
                this.nightMode = false;
                var now = new Date();
                this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + (now.getHours() > 12 ? 'PM' : 'AM');
                this.generalCheck();
                this.createTimers();
                HomeController.notifications = 0;
                this.notify('Hello, my name is ' + this.tamagotchi.getName());
            }
            /* Create timers */
            HomeController.prototype.createTimers = function () {
                var _this = this;
                this.timers = [];
                var timer0 = this.interval(function () { _this.generalCheck(); }, 1000);
                var timer1 = this.interval(function () { _this.looseHealth(); }, 2000);
                var timer2 = this.interval(function () { _this.looseCleanness(); }, 8000);
                this.timers.push(timer0);
                this.timers.push(timer1);
                this.timers.push(timer2);
            };
            /* Cancel timers */
            HomeController.prototype.cancelTimers = function () {
                for (var i = 0; i < this.timers.length; i++)
                    this.interval.cancel(this.timers[i]);
            };
            /* General check */
            HomeController.prototype.generalCheck = function () {
                this.getHealthClass();
                this.getCleannessClass();
                this.getHappinessClass();
                if (this.tamagotchi.getHealth() <= 0) {
                    this.cancelTimers();
                }
            };
            /* Feed the Tamagotchi */
            HomeController.prototype.feed = function () {
                var feed = this.tamagotchi.feed();
                this.notify(feed.message);
            };
            /* Clean the Tamagotchi */
            HomeController.prototype.clean = function () {
                var clean = this.tamagotchi.clean();
                this.notify(clean.message);
            };
            /* Go to work */
            HomeController.prototype.work = function () {
                var work = this.tamagotchi.work();
                this.notify(work.message);
            };
            /* Play football */
            HomeController.prototype.playFootball = function () {
                var playFootball = this.tamagotchi.playFootball();
                this.notify(playFootball.message);
            };
            /* Sleep */
            HomeController.prototype.sleep = function () {
                var sleep = this.tamagotchi.sleep();
                this.notify(sleep.message);
            };
            /* Go to cinema */
            HomeController.prototype.goCinema = function () {
                var goCinema = this.tamagotchi.goCinema();
                this.notify(goCinema.message);
            };
            /* Restart playing */
            HomeController.prototype.restartGame = function () {
                this.cancelTimers();
                this.tamagotchi.reset();
                this.notify('Back to game, my name is ' + this.tamagotchi.getName());
                this.createTimers();
            };
            /* Interaction with the Tamagotchi */
            HomeController.prototype.looseHealth = function () {
                this.tamagotchi.looseHealth(-2, true);
            };
            HomeController.prototype.looseCleanness = function () {
                this.tamagotchi.looseCleanness(-1, true);
            };
            /* Display a notification message */
            HomeController.prototype.notify = function (notification) {
                var _this = this;
                HomeController.notifications++;
                this.notification = notification;
                this.showNotification = true;
                this.timeout(function () {
                    _this.scope.$apply(function () {
                        // The notification message area is hidden if the number of notifications is 0
                        if (--HomeController.notifications <= 0) {
                            _this.showNotification = false;
                        }
                    });
                }, 5000, true);
            };
            HomeController.prototype.getHealthClass = function () {
                var className = 'green';
                var health = this.tamagotchi.getHealth();
                if (health < 10)
                    className = 'red';
                else if (health > 10 && health < 20)
                    className = 'orange';
                this.healthClassName = className;
            };
            HomeController.prototype.getCleannessClass = function () {
                var className = 'green';
                var cleanness = this.tamagotchi.getCleanness();
                if (cleanness < 10)
                    className = 'red';
                else if (cleanness > 10 && cleanness < 20)
                    className = 'orange';
                this.cleannessClassName = className;
            };
            HomeController.prototype.getHappinessClass = function () {
                var className = 'green';
                var icon = 0;
                var happiness = this.tamagotchi.getHappiness();
                if (happiness < 10) {
                    className = 'red';
                    icon = 1;
                }
                else if (happiness > 10 && happiness < 20) {
                    className = 'orange';
                    icon = 1;
                }
                this.happinessClassName = className;
                this.happinessIcon = icon;
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
/// <reference path="angular.d.ts" />
/// <reference path="tama-service.ts" />
/// <reference path="tama-loose.ts" />
/// <reference path="tama-help.ts" />
/// <reference path="tama-status.ts" />
/// <reference path="tama-button.ts" />
/// <reference path="tama-notification.ts" />
/// <reference path="tama-header.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="route.ts" />
/// <reference path="home-controller.ts" />
var appModule = angular.module("tamaApp", ['ngAnimate', 'ngRoute']);
appModule.service("TamaService", function () { return Application.Services.TamaService; });
appModule.controller("HomeController", ["$scope", "$timeout", "$interval", "TamaService", function ($scope, $timeout, $interval, TamaService) {
        return new Application.Controllers.HomeController($scope, $timeout, $interval, TamaService);
    }]);
appModule.directive("tamaHeader", function () { return new Application.Directives.TamaHeader(); });
appModule.directive("tamaLoose", function () { return new Application.Directives.TamaLoose(); });
appModule.directive("tamaHelp", function () { return new Application.Directives.TamaHelp(); });
appModule.directive("tamaStatus", function () { return new Application.Directives.TamaStatus(); });
appModule.directive("tamaButton", function () { return new Application.Directives.TamaButton(); });
appModule.directive("tamaNotification", function () { return new Application.Directives.TamaNotification(); });
appModule.config(tamaApp.Routes.configureRoutes);
