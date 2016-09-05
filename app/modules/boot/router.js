/**
 * 路由配置列表
 * @author:岳(liuyue@travelsky.com)
 */

var dashboard = require('../pages/dashboard');
var tables = require('../pages/tables');

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(function ($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('index', dashboard)
        .state('tables', tables);
});