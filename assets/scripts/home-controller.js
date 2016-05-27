/// <reference path="angular.d.ts" />
var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope, Tama) {
                var tama = new Tama;
                this.scope = $scope;
                this.tamaName = tama.name;
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
