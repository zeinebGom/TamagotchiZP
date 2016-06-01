/// <reference path="angular.d.ts" />
/// <reference path="models/tamagotchi.ts" />
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, $timeout, $interval, TamaFact, TimerFact) {
                this.tamaFact = new TamaFact('Tamachi', 6000, 30, 30, 1, 10);
                this.scope = $scope;
                this.timeout = $timeout;
                this.interval = $interval;
                this.hideActionsBar = true;
                this.showNotification = true;
                this.showHelpWindow = false;
                this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
                var now = new Date();
                this.hour = (now.getHours() > 12 ? now.getHours() - 12 : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + (now.getHours() > 12 ? 'PM' : 'AM');
                this.timerFact = TimerFact;
                this.createTimers();
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
                this.notify('Hello!!! My name is ' + this.tamaFact.tamagotchi.getName());
                this.createTimers();
            };
            /* Display help message */
            HomeController.prototype.help = function () {
                this.showHelpWindow = true;
            };
            /* Check for playing */
            HomeController.prototype.checkPlaying = function () {
                if (this.tamaFact.tamagotchi.getHealth() <= 0)
                    this.cancelTimers();
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
