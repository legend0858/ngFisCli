/**
 * @name:app启动入口
 * @author:岳(liuyue@travelsky.com)
 * @date: 2016/6/28
 */

angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngResource', 'ngDialog']);
require('router');

/**
 * Master Controller
 */

angular.module('RDash').controller('MasterCtrl', function ($scope, $cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function () {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function () {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function () {
        $scope.$apply();
    };
});