/**
 * @name:app路由
 * @author:岳(liuyue@travelsky.com)
 * @date: 2016/6/28
 */

var dashboard = require('pages/dashboard/dashboard');
var tables = require('pages/tables/tables');

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