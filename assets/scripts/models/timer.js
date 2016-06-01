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
