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
