/// <reference path="angular.d.ts" />
var Application;
(function (Application) {
    var Factories;
    (function (Factories) {
        var Tama = (function () {
            function Tama() {
                return this.createTama();
            }
            Tama.prototype.createTama = function () {
                var tama = [{
                        name: 'tama'
                    }];
                return tama;
            };
            return Tama;
        }());
        Factories.Tama = Tama;
    })(Factories = Application.Factories || (Application.Factories = {}));
})(Application || (Application = {}));
