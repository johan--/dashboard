'use strict';

/* Services */
angular.module('dashboardServices', ['ngResource']).
	
	factory('LoginService', function($resource) {
		var personDetails = {
			isLogged: false,
			username: '',
			getUser: function(){
				return this.username;
			}
		};
		return personDetails;
	});

// angular.module("dashboardXLSXServices", ['$q', '$rootScope']).

// 	factory("XLSXReaderService", function($q, $rootScope) {
// 		var service = function(data) {
// 			angular.extend(this, data);
// 		};
//  		service.readFile = function(file, showPreview) {
//  			var deferred = $q.defer();

//  			XLSXReader(file, showPreview, function(data){
//  				$rootScope.$apply(function() {
// 					deferred.resolve(data);
// 				});
// 			});

// 			return deferred.promise;
// 		};
 		
//  		return service;
// 	});