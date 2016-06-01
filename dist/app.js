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
            this.cleanness++;
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
        /*if (this.health <= 2) {
            return {
                work: false,
                message: 'So tired to play football...'
            }
        }
        else {*/
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
        /*}*/
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
    return Tamagotchi;
}());
/* This class gives the ability to call cyclically a function with a value */
var Timer = (function () {
    function Timer(name, delay, interval, fctCyclic, value, isIncrement, parent) {
        this.name = name;
        this.interval = interval;
        this.fctCyclic = fctCyclic;
        this.value = value;
        this.isIncrement = isIncrement;
        this.delay = delay;
        this.parent = parent;
        this.createTimer();
    }
    Timer.prototype.createTimer = function () {
        var _this = this;
        this.promise = this.interval(function () {
            _this.fctCyclic(_this.value, _this.isIncrement);
            _this.parent.checkPlaying();
        }, this.delay, 0);
    };
    Timer.prototype.cancelTimer = function () {
        this.interval.cancel(this.promise);
    };
    return Timer;
}());
/// <reference path="angular.d.ts" />
/// <reference path="./models/tamagotchi.ts" />
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var TamaFactory = (function () {
            function TamaFactory(name, health, happiness, money, cleanness, workLevel) {
                this.tamagotchi = this.createTama(name, health, happiness, money, cleanness, workLevel);
            }
            /* Create a Tamagotchi */
            TamaFactory.prototype.createTama = function (name, health, happiness, money, cleanness, workLevel) {
                return new Tamagotchi(name, health, happiness, money, cleanness, workLevel);
            };
            return TamaFactory;
        }());
        Factories.TamaFactory = TamaFactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
/// <reference path="angular.d.ts" />
/// <reference path="./models/timer.ts" />
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var TimerFactory = (function () {
            function TimerFactory(name, delay, interval, fctCyclic, value, isIncrement, parent) {
                this.timer = this.createTimer(name, delay, interval, fctCyclic, value, isIncrement, parent);
            }
            /* Create a timer */
            TimerFactory.prototype.createTimer = function (name, delay, interval, fctCyclic, value, isIncrement, parent) {
                return new Timer(name, delay, interval, fctCyclic, value, isIncrement, parent);
            };
            /* Kill the timer */
            TimerFactory.prototype.cancelTimer = function () {
                this.timer.cancelTimer();
            };
            return TimerFactory;
        }());
        Factories.TimerFactory = TimerFactory;
    })(Factories = Application.Factories || (Application.Factories = {}));
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
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-notification.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaNotification;
        }());
        Directives.TamaNotification = TamaNotification;
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
            function HomeController($scope, $timeout, $interval, $location, TamaFact, TimerFact) {
                this.tamaFact = new TamaFact('Tamachi', 600, 30, 30, 10, 10);
                this.scope = $scope;
                this.timeout = $timeout;
                this.interval = $interval;
                this.location = $location;
                this.hideActionsBar = true;
                var now = new Date();
                this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + (now.getHours() > 12 ? 'PM' : 'AM');
                this.timerFact = TimerFact;
                this.createTimers();
                this.notify('Hello, my name is ' + this.tamaFact.tamagotchi.getName());
            }
            /* Create timers */
            HomeController.prototype.createTimers = function () {
                var _this = this;
                this.timers = [];
                var timer1 = new this.timerFact('Loose health', 2000, this.interval, function () {
                    _this.tamaFact.tamagotchi.looseHealth(-2, true);
                }, -2, true, this);
                this.timers.push(timer1);
            };
            /* Cancel timers */
            HomeController.prototype.cancelTimers = function () {
                for (var i = 0; i < this.timers.length; i++) {
                    this.timers[i].cancelTimer();
                }
            };
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
                this.cancelTimers();
                this.tamaFact.tamagotchi.reset();
                this.notify('Back to game, my name is ' + this.tamaFact.tamagotchi.getName());
                this.createTimers();
            };
            /* Check for playing */
            HomeController.prototype.checkPlaying = function () {
                if (this.tamaFact.tamagotchi.getHealth() <= 0) {
                    this.cancelTimers();
                }
            };
            /* Display a notification message */
            HomeController.prototype.notify = function (notification) {
                var _this = this;
                HomeController.notifications++;
                this.notification = notification;
                this.showNotification = true;
                this.timeout(function () {
                    _this.scope.$apply(function () {
                        // The notification message area is erased if the number of notifications is 0
                        if (--HomeController.notifications == 0) {
                            console.log('DEDANS');
                            _this.showNotification = false;
                        }
                    });
                }, 5000, true);
            };
            HomeController.notifications = 0; // Number of notifications to display in the notification status
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
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
var appModule = angular.module("tamaApp", ['ngAnimate', 'ngRoute']);
appModule.factory("TamaFactory", function () { return Application.Factories.TamaFactory; });
appModule.factory("TimerFactory", function () { return Application.Factories.TimerFactory; });
appModule.controller("HomeController", ["$scope", "$timeout", "$interval", "$location", "TamaFactory", "TimerFactory", function ($scope, $timeout, $interval, $location, TamaFactory, TimerFactory) {
        return new Application.Controllers.HomeController($scope, $timeout, $interval, $location, TamaFactory, TimerFactory);
    }]);
appModule.directive("tamaLoose", function () { return new Application.Directives.TamaLoose(); });
appModule.directive("tamaHelp", function () { return new Application.Directives.TamaHelp(); });
appModule.directive("tamaStatus", function () { return new Application.Directives.TamaStatus(); });
appModule.directive("tamaButton", function () { return new Application.Directives.TamaButton(); });
appModule.directive("tamaNotification", function () { return new Application.Directives.TamaNotification(); });
appModule.config(tamaApp.Routes.configureRoutes);
