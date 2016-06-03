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
                this.showNotification = false;
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
                        // The notification message area is hidden if the number of notifications is 0
                        if (--HomeController.notifications == 0) {
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
