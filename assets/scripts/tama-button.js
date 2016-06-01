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
