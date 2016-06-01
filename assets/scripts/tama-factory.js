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
