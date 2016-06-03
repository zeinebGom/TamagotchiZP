var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaHelp = (function () {
            function TamaHelp() {
                return this.createDirective();
            }
            TamaHelp.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-help.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaHelp;
        }());
        Directives.TamaHelp = TamaHelp;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
