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
