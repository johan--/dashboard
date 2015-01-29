'use strict';

angular.module('dashboard', ['dashboardServices', 'ngCookies', 'ngRoute', 'ngSanitize', 'ngUpload', 'onReadFile', 'angularTreeview']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/404', {templateUrl:'partials/errors/404.html'}).
			when('/', {templateUrl:'partials/view.html'}).
			when('/upload', {templateUrl:'partials/uploads/upload.html', controller: FNCSUploadCtrl}).
			when('/inventory_organization', {templateUrl:'partials/charts/inventory_organization.html', controller: ChartCtrl_Inventory_Organization}).
			when('/tentative_offer_organization', {templateUrl:'partials/charts/tentative_offer_organization.html', controller: ChartCtrl_Tentative_Offer_Organization}).
			when('/hiring_manager', {templateUrl:'partials/charts/hiring_manager.html', controller: ChartCtrl_Hiring_Manager_Statue}).
			when('/inventory_opm', {templateUrl:'partials/charts/inventory_opm.html', controller: ChartCtrl_Inventory_Opm}).

			when('/upload_hiring_manager', {templateUrl:'partials/uploads/upload_hiring_manager.html', controller: hiringmanagerUploadCtrl}).

			when('/sec_priority_org', {templateUrl:'partials/sec_priority_dashboard.html'}).
			when('/sec_priority_current_status', {templateUrl:'partials/sec_priority_organization.html'}).

			when('/Sec_Priority_Org', {templateUrl:'partials/pivotTable/sec_priority_dashboard.html', controller: pivotTableCtrl}).
			when('/Sec_Priority_Current_Status', {templateUrl:'partials/pivotTable/sec_priority_organization.html', controller: pivotTableCtrl}).

			otherwise({redirectTo:'/404'})
	}]);