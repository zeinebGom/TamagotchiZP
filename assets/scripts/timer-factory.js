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
