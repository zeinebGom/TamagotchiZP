var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var TamaNotification = (function () {
            function TamaNotification() {
                return this.createDirective();
            }
            TamaNotification.prototype.createDirective = function () {
                return {
                    restrict: 'AE',
                    templateUrl: './dist/templates/tama-notification.html',
                    scope: {
                        ctl: '='
                    }
                };
            };
            return TamaNotification;
        }());
        Directives.TamaNotification = TamaNotification;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
