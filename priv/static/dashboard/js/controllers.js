function DashboardCtrl($scope, $http, $location, $routeParams, $route, $cookieStore, LoginService, $resource) {
	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};

// user login controller function
	$scope.login =function(){
		console.log("login function called");
		var loginPerson = "username=" + $scope.username + "&password=" + $scope.password;
		console.log(loginPerson);
		$http.post('/metricdashboard/login_person', loginPerson, config).success(function(data) {
			var person = data.person;
			LoginService.isLogged = true;
			$cookieStore.put("isLogged", true);
			LoginService.username = person.user_name;
			$cookieStore.put("username", person.user_name);
			$cookieStore.put("first_name", person.first_name);
			$cookieStore.put("email", person.email);
			$cookieStore.put("id", person.id);
			LoginService.role = person.role;
			$cookieStore.put("role", person.role);
			$scope.alerts.push({type:'success', msg:"success!"});
			$location.path("/");
		})
		.error(function(){
			alert("username and password do not match");
		});
	};
//function for Registering person 
	$scope.register =function() {
		if($scope.registerfrm.$valid) {
			if($scope.registerfrm.password.$viewValue !== $scope.registerfrm.confirm_password.$viewValue)
			{
				alert("Oops! Something is wrong, Please provide correct password");
				return;
			}
			var registerPerson = "username=" +  $scope.username 
									+ "&firstname=" +  $scope.firstname 
									+ "&lastname=" +  $scope.lastname  
									+ "&password=" + $scope.password 
									+ "&email=" + $scope.email;
									console.log(registerPerson);
			$http.post('/metricdashboard/register_person', registerPerson, config).success(function(data) {
				console.log(data.username);
				$location.path("#/register/");
				alert("Thank you for registering with us");
			});
		}
	};

// retrieve Roles list
	$http.get('/metricdashboard/get_roles').success(function(data){
		$scope.roles = data.roles;
	});

	$scope.activeRoleIndex;

	$scope.selectedRoleId = function(role, index) {
		$scope.activeRoleIndex = index;
		$scope.roleid = role.id;
		console.log(role.name + index);
		var selectedroleid = "id=" + $scope.roleid;
		$http.post('/metricdashboard/find_catalogs', selectedroleid,config).success(function(data) {
			$scope.catalogs = data.catalogs;
		});

		$scope.isShowingCatalogs = function(index) {
			return $scope.activeRoleIndex === index;
		};

		$scope.activeCatalogIndex;

		$scope.selectedCatalogId = function(catalog, index) {
			$scope.activeCatalogIndex = index;
			$scope.catalogid = catalog.id;
			console.log(catalog.name + index);
			var selectedcatalogid = "id=" + $scope.catalogid;
			$http.post('/metricdashboard/find_stages', selectedcatalogid, config).success(function(data) {
				$scope.stages = data.stages;
			});

			$scope.isShowingStages = function(index) {
				return $scope.activeCatalogIndex === index;
			};

			$scope.activeStageIndex;

			$scope.selectedStageId = function(stage, index) {
				$scope.activeStageIndex = index;
				$scope.stageid = stage.id;
				console.log(stage.name);
				var selectedstageid = "id=" + $scope.stageid;
				$http.post('/metricdashboard/find_metrics', selectedstageid, config).success(function(data) {
					$scope.metrics = data.metrics;
					console.log($scope.metrics);
				});

				$scope.isShowingMetrics = function(index) {
				return $scope.activeStageIndex === index;
			};
			};
		};
	};
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----------------------UPLOAD CONTROLLER------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function FNCSUploadCtrl($scope, $http, $cookieStore, $location, $routeParams, $route, $resource) {
	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};

	$scope.showContent = function($fileContent){
		$scope.content = $fileContent;
		$scope.jsonData = $.csv.toObjects($fileContent);
		$scope.jsonContent = $scope.jsonData;
		
		// console.log($scope.jsonData);
		
		for (var i=0; i< $scope.jsonData.length; i++) {
			$scope.HiringTrackingID = $scope.jsonData[i].HiringTrackingID;
			$scope.HRSpeclstAssignedTo = $scope.jsonData[i].HRSpeclstAssignedTo;
			$scope.SecPriority = $scope.jsonData[i].SECPriority;
			$scope.Organization = $scope.jsonData[i].Organization;
			$scope.OrganizationalLocation = $scope.jsonData[i].OrganizationalLocation;
			$scope.PositionTitle = $scope.jsonData[i].PositionTitle;
			$scope.PdMr = $scope.jsonData[i].PDMR;
			$scope.PointOfContact = $scope.jsonData[i].PointofContact;
			$scope.Grade = $scope.jsonData[i].Grade;
			$scope.Status = $scope.jsonData[i].Status;
			$scope.CurrentStatusMilestone = $scope.jsonData[i].CurrentStatusMilestone;
			$scope.ETC = $scope.jsonData[i].ETC;
			$scope.EtcTo915 = $scope.jsonData[i].ETCto915;
			$scope.DateGivenToSelectingOfficial = $scope.jsonData[i].DateGiventoSelectingOfficial;
			$scope.CertExtended = $scope.jsonData[i].CertExtended;
			$scope.AOC = $scope.jsonData[i].AOC;
			$scope.Sf52Number = $scope.jsonData[i].SF52Number;
			$scope.SelecteeName = $scope.jsonData[i].SelecteeName;
			$scope.InternalExternal = $scope.jsonData[i].InternalExternal;
			$scope.NumberofRecords = $scope.jsonData[i].NumberOfRecords;

			var  store_fncs_recruit_list_Data = "hiring_tracking_id=" + $scope.HiringTrackingID
										+ "&hr_speclst_assigned_to=" + $scope.HRSpeclstAssignedTo
										+ "&sec_priority=" + $scope.SecPriority 
										+ "&organization=" + $scope.Organization
										+ "&organizational_location=" + $scope.OrganizationalLocation
										+ "&position_title=" + $scope.PositionTitle
										+ "&pd_mr=" + $scope.PdMr
										+ "&point_of_contact=" + $scope.PointOfContact
										+ "&grade=" + $scope.Grade
										+ "&status=" + $scope.Status
										+ "&current_status_milestone=" + $scope.CurrentStatusMilestone
										+ "&etc=" + $scope.ETC
										+ "&etc_to915=" + $scope.EtcTo915
										+ "&date_given_to_selecting_official=" + $scope.DateGivenToSelectingOfficial
										+ "&cert_extended=" + $scope.CertExtended
										+ "&aoc=" + $scope.AOC
										+ "&sf52_number=" + $scope.Sf52Number
										+ "&selectee_name=" + $scope.SelecteeName
										+ "&internal_external=" + $scope.InternalExternal
										+ "&number_of_records=" + $scope.NumberofRecords;
			console.log(store_fncs_recruit_list_Data);
			// $http.post('/metricdashboard/store_fncs_recruit_list', store_fncs_recruit_list_Data, config).success(function(data) {
			// });
		};
	};

	$scope.complete = function(content) {
		$location.path("/");
	};
}

// Hiring manager upload

function hiringmanagerUploadCtrl($scope, XLSXReaderService, $http, $cookieStore, $location, $routeParams, $route, $resource ) {
	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};

	$scope.showPreview = false;
	$scope.showJSONPreview = true;
	$scope.json_string = "";

	$scope.fileChanged = function(files) {
		$scope.isProcessing = true;
		$scope.sheets = [];
		$scope.excelFile = files[0];
		console.log($scope.excelFile);	
		XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
			$scope.sheets = xlsxData.sheets;
			console.log($scope.sheets);
			$scope.isProcessing = false;
		});
	};
	$scope.updateJSONString = function() {
		$scope.json_string = JSON.stringify($scope.sheets[$scope.selectedSheetName], null, 2);
		console.log($scope.json_string);
	};

	$scope.showPreviewChanged = function() {
		if ($scope.showPreview) {
				$scope.showJSONPreview = false;
				$scope.isProcessing = true;
				XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
					$scope.sheets = xlsxData.sheets;
					$scope.isProcessing = false;
				});
			}
		}

	// $scope.showContent = function($fileContent){
	// 	$scope.content = $fileContent;
	// 	$scope.jsonData = $.csv.toObjects($fileContent);
	// 	$scope.jsonContent = $scope.jsonData;
		
	// 	for (var i=0; i< $scope.jsonData.length; i++) {
	// 		$scope.CurrentStatusMilestone = $scope.jsonData[i].CurrentStatusMilestone;
	// 		$scope.Organization = $scope.jsonData[i].Organization;
	// 		$scope.PointOfContact = $scope.jsonData[i].PointOfContact;
	// 		$scope.PositionTitle = $scope.jsonData[i].PositionTitle;
	// 		$scope.SF52Number = $scope.jsonData[i].SF52Number;
	// 		$scope.NumberOfRecords = $scope.jsonData[i].NumberOfRecords;

	// 		var  store_hiring_manager_Data = "current_status_milestone=" + $scope.CurrentStatusMilestone + 
	// 									"&organization=" + $scope.Organization +
	// 									"&point_of_contact=" + $scope.PointOfContact + 
	// 									"&position_title=" + $scope.PositionTitle + 
	// 									"&sf52_number=" + $scope.SF52Number + 
	// 									"&number_of_records=" + $scope.NumberOfRecords;

	// 		console.log(store_hiring_manager_Data);

	// 		// $http.post('/metricdashboard/store_hiring_manager', store_hiring_manager_Data, config).success(function(data) {
	// 		// });
	// 	};
	// };
	// $scope.complete = function(contents) {
	// 	$location.path("/");
	// };
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------------------CHART CONTORLLERS----------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function ChartCtrl($scope, $http, $location, $routeParams, $rootScope, $route, $cookieStore) {
	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};

	$rootScope.tabClick = function ($event) {
		$event.preventDefault();
	};

// Charts for Inventory By Organization
$http.get('/metricdashboard/get_fncs_recruit_list').success(function(data) {
		$scope.fncs_recruit_list = data.fncs_recruit_list;
		$scope.categoryOrganization = [];
		var i, organization;
		for(i =0; i<$scope.fncs_recruit_list.length; i++) {
			organization = $scope.fncs_recruit_list[i].organization;
			if($scope.categoryOrganization.indexOf(organization) === -1) {
				$scope.categoryOrganization[$scope.categoryOrganization.length] = organization;
			}
		};
		inventory_org_xRecords = [2,11,6,19,18,25,21,16,27,34,8,8,18,12,64,27,17,26,37];

		var inventory_org_Records = [];
		for (i=0;i<$scope.categoryOrganization.length; i++) {
			var inventory_org_count = "organization=" + $scope.categoryOrganization[i];
			$http.post('/metricdashboard/get_fncs_recruit_list_count', inventory_org_count, config).success(function(data) {
				inventory_org_Records.push(data.fncs_recruit_list_count);
				construct_inventorySeries(inventory_org_Records);
			});
		};
		function construct_inventorySeries(inventory_org_Records){
			if(inventory_org_Records.length === $scope.categoryOrganization.length) {
				chart = new Highcharts.Chart({
					chart:{
						renderTo:'inventory_org_view',
						type: 'bar'
					},
					title: {
						text: 'Inventory Organization'
					},
					xAxis:{
						categories: $scope.categoryOrganization,
						labels: {
							enabled: false
						}
					},
					yAxis:{
						title:{
							text: null
						},
						labels:{
							enabled: false
						}
					},
					exporting: { enabled: false },
					colors: [
						'#b1d1e4',
						'#245470',
						'#2a6283',
						'#307096',
						'#367ea9',
						'#3c8dbc',
						'#4f98c2',
						'#62a3c9',
						'#76afd0',
						'#8abad6',
						'#9dc6dd'
					],
					plotOptions:{
						bar:{
							colorByPoint: true,
							dataLabels:{
								enabled:false
							}
						}
					},
					legend: {
						enabled:false
					},
					series: [{
						animation:true,
						name: ['Number of Records'],
						data: inventory_org_xRecords
					}]
				})
			}
		};

	});
// Charts for Number of Tentative offers by Organization
	$http.get('/metricdashboard/get_tentative').success(function(data) {
		$scope.tentative = data.tentative;
		$scope.xOrganization = [];
		var i, organization;
		for(i=0; i< $scope.tentative.length; i++) {
			organization = $scope.tentative[i].organization;
			if($scope.xOrganization.indexOf(organization) === -1){
				$scope.xOrganization[$scope.xOrganization.length] = organization;
			}
		}
		xRecords = [1,8,3,2,5,6,4,6,7,17,2,2,1,14,16,7,5,9];
		var Records = [];
		for(i=0; i<$scope.xOrganization.length; i++) {
			var org_total_Value = "organization=" + $scope.xOrganization[i];
			$http.post('/metricdashboard/get_tentative_count',org_total_Value,config).success(function(data){
				Records.push(data.tentative_count);
				constructSeries(Records);
			})
		};
		// console.log($scope.xOrganization);
		function constructSeries(Records){
			if(Records.length === $scope.xOrganization.length){
				chart = new Highcharts.Chart({
					chart:{
						renderTo: 'tentative_offer_view',
						type:'bar'
					},
					title:{
					text: 'Number of Tentative Offers by Organization'
					},
					xAxis:{
						title:{
							text: null
						},
						categories: $scope.xOrganization,
						labels: {
							enabled: false
						}
					},
					yAxis:{
						title:{
							text: null
						},
						labels:{
							enabled: false
						}
					},
					exporting: { enabled: false },
					colors: [
							'#404040',
							'#484848',
							'#505050',
							'#585858',
							'#606060',
							'#686868',
							'#707070',
							'#787878',
							'#808080',
							'#888888',
							'#909090',
							'#989898',
							'#A0A0A0'
							],
					plotOptions:{
						bar:{
							colorByPoint: true,
							dataLabels:{
								enabled:false
							},
						}
					},
					legend: {
						enabled:false
					},
					series: [{
						animation:true,
						name: ["Number of Records: "],
						data: xRecords
					}]	
				});
			};
		};
	});

//chart for hiring manager
$http.get('/metricdashboard/get_hiring_manager').success(function(data) {
		$scope.hiring_manager = data.hiring_manager;
		$scope.hiring_manager_organization = [];
		var i, hiringmanager_Organization;
		for(i=0; i< $scope.hiring_manager.length; i++) {
			hiringmanager_Organization = $scope.hiring_manager[i].organization;
			if($scope.hiring_manager_organization.indexOf(hiringmanager_Organization) === -1) {
				$scope.hiring_manager_organization[$scope.hiring_manager_organization.length] = hiringmanager_Organization;
			}
		};
		hiring_manager_xRecords = [3, 3, 3, 9, 2,6,7,3,1,18,6,4,3,16];
		var hiring_manager_Records = [];
		for(i=0; i<$scope.hiring_manager_organization.length; i++) {
			var current_stat_milestone_count = "organization=" + $scope.hiring_manager_organization[i];
			$http.post('/metricdashboard/get_hirinmanager_count', current_stat_milestone_count, config).success(function(data) {
				hiring_manager_Records.push(data.hiringCount);
				construct_currentstatusSeries(hiring_manager_Records);
			});
		};
		function construct_currentstatusSeries(hiring_manager_Records) { 
			if(hiring_manager_Records.length === $scope.hiring_manager_organization.length) {
				$('#hiring_manager_view').highcharts({
					chart:{
						type: 'bar',
					},
					title: {
						text: 'Hiring Manager Status by Organization'
					},
					xAxis:{
					
						categories: $scope.hiring_manager_organization,
					
						labels:{
							enabled: false
						},
						title:{
							text: null
						}
					},
					yAxis:{
						title:{
							text: null,
						},
						labels:{
							enabled: false
						}
					},
					exporting: { enabled: false },
					colors: [
						'#245470',
						'#2a6283',
						'#307096',
						'#367ea9',
						'#3c8dbc',
						'#4f98c2',
						'#62a3c9',
						'#76afd0',
						'#8abad6',
						'#b1d1e4',
						'#9dc6dd'
							],
					plotOptions:{
						bar:{
							colorByPoint: true
						}
					},
					legend: {
						enabled:false
					},
					series: [{
						animation:true,
						name: ['Number Of Records'],
						data: hiring_manager_xRecords
					}]
				});
			};
		};
	});

// Chart for Inventory by OPM
	$http.get('/metricdashboard/get_inventory_opm').success(function(data) {
		$scope.inventory_opm = data.inventory_opm;
		$scope.currentStatus = [];
		var inventory_opm_current_status;
		for (var i=0; i< $scope.inventory_opm.length; i++) {
			inventory_opm_current_status = $scope.inventory_opm[i].current_status_milestone;
			if($scope.currentStatus.indexOf(inventory_opm_current_status) === -1) {
				$scope.currentStatus[$scope.currentStatus.length] = inventory_opm_current_status;
			}
		};
		inventory_opm_xRecords = [2,13,37,68,2,57,84,26,89];
		var inventory_opm_Records = [];
		for( var i=0; i<$scope.currentStatus.length; i++) {
			var current_status_count = "current_status_milestone=" + $scope.currentStatus[i];
			$http.post('/metricdashboard/get_inventory_opm_count', current_status_count, config).success(function(data) {
				inventory_opm_Records.push(data.inventory_opm_count);
				construct_inventory_opm_Series(inventory_opm_Records);
			});
		};
		function construct_inventory_opm_Series(inventory_opm_Records) {
			if(inventory_opm_Records.length === $scope.currentStatus.length) {
				$('#inventory_opm_view').highcharts({
					chart:{
						type: 'bar'
					},
					title: {
						text: 'Inventory by OPM'
					},
					xAxis:{
						categories: $scope.currentStatus,
						labels:{
							enabled: false
						}
					},
					yAxis:{
						title:{
							text:null
						},
						labels:
							{
								enabled: false
							}
					},
					exporting: { enabled: false },
					plotOptions:{
						bar:{
							dataLabels:{
								enabled:false
							}
						},
					},
					legend: {
						enabled:false
					},
					series: [{
						animation:true,
						name : ['Number Of Records'],
						data :[{
							y:inventory_opm_xRecords[0],
							color:'red',
						},{
							y:inventory_opm_xRecords[1],
							color:'red',
						},{
							y:inventory_opm_xRecords[2],
							color:'red',
						},{
							y:inventory_opm_xRecords[3],
							color:'red',
						},{
							y:inventory_opm_xRecords[4],
							color:'yellow',
						},{
							y:inventory_opm_xRecords[5],
							color:'yellow',
						},{
							y:inventory_opm_xRecords[6],
							color:'green',
						},{
							y:inventory_opm_xRecords[7],
							color:'green',
						},{
							y:inventory_opm_xRecords[8],
							color:'blue',
						}]
					}]
				});
			};
		}
	});
};


// Charts for Inventory By Organization
function ChartCtrl_Inventory_Organization($scope, $http, $location, $routeParams, $rootScope, $route, $cookieStore){
	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};
	$rootScope.tabClick = function ($event) {
		$event.preventDefault();
	};

	$http.get('/metricdashboard/get_fncs_recruit_list').success(function(data) {
		$scope.fncs_recruit_list = data.fncs_recruit_list;
		$scope.categoryOrganization = [];
		var i, organization;
		for(i =0; i<$scope.fncs_recruit_list.length; i++) {
			organization = $scope.fncs_recruit_list[i].organization;
			if($scope.categoryOrganization.indexOf(organization) === -1) {
				$scope.categoryOrganization[$scope.categoryOrganization.length] = organization;
			}
		};
		inventory_org_xRecords = [2,11,6,19,18,25,21,16,27,34,8,8,18,12,64,27,17,26,37];

		var inventory_org_Records = [];
		for (i=0;i<$scope.categoryOrganization.length; i++) {
			var inventory_org_count = "organization=" + $scope.categoryOrganization[i];
			$http.post('/metricdashboard/get_fncs_recruit_list_count', inventory_org_count, config).success(function(data) {
				inventory_org_Records.push(data.fncs_recruit_list_count);
				construct_inventorySeries(inventory_org_Records);
			});
		};
		function construct_inventorySeries(inventory_org_Records){
			console.log(inventory_org_Records);
			if(inventory_org_Records.length === $scope.categoryOrganization.length) {
				chart = new Highcharts.Chart({
					chart:{
						renderTo:'inventory_org',
						type: 'bar'
					},
					title: {
						text: ' Inventory by Organization'
					},
					xAxis:{
						categories: $scope.categoryOrganization,
						title:{
							text:'Organizations'
						}
					},
					yAxis:{
						title:{
							text:'Number Of Records'
						},
					},
					colors: [
						'#245470',
						'#2a6283',
						'#307096',
						'#367ea9',
						'#3c8dbc',
						'#4f98c2',
						'#62a3c9',
						'#76afd0',
						'#8abad6',
						'#b1d1e4',
						'#9dc6dd'
					],
					plotOptions:{
						series:{
							point:{
								events:{
									click:function(event) {
										$scope.isShown = function() { 
												$scope.orgName = true;
											};
										$scope.orgName = [];
										var click_inventoryOrg = "clicked_organization=" + this.category;
										$http.post('/metricdashboard/get_on_click_details', click_inventoryOrg, config).success(function(data) {
											$scope.inventory_org_Data = [];
											$scope.orgName.push(data.onclick_details[0]);
											$scope.onclick_details = data.onclick_details;
											for (var i=0; i< $scope.onclick_details.length; i++) {
												$scope.inventory_org_Data.push($scope.onclick_details[i]);
											};
										});
									}
								}
							}
						},
						bar:{
							colorByPoint: true,
								cursor: 'pointer',
							dataLabels:{
								enabled:true
							}
						}
					},
					legend: {
						enabled:false
					},
					series: [{
						name: ['Number of Records'],
						data: inventory_org_Records
					}]
				})
			}
		};
	});
};

// Charts for Number of Tentative offers by Organization
function ChartCtrl_Tentative_Offer_Organization($scope, $http, $location, $routeParams, $rootScope, $route, $cookieStore){

	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};
	$rootScope.tabClick = function ($event) {
		$event.preventDefault();
	};

	$http.get('/metricdashboard/get_tentative').success(function(data) {
		$scope.tentative = data.tentative;
		$scope.xOrganization = [];
		var i, organization;
		for(i=0; i< $scope.tentative.length; i++) {
			organization = $scope.tentative[i].organization;
			if($scope.xOrganization.indexOf(organization) === -1){
				$scope.xOrganization[$scope.xOrganization.length] = organization;
			}
		}
		xRecords = [1,8,3,2,5,6,4,6,7,17,2,2,1,14,16,7,5,9];
		var Records = [];
		for(i=0; i<$scope.xOrganization.length; i++) {
			var org_total_Value = "organization=" + $scope.xOrganization[i];
			$http.post('/metricdashboard/get_tentative_count',org_total_Value,config).success(function(data){
				Records.push(data.tentative_count);
				constructSeries(Records);
			})
		};
		// console.log($scope.xOrganization);
		function constructSeries(Records){
			if(Records.length === $scope.xOrganization.length){
				chart = new Highcharts.Chart({
					chart:{
						renderTo: 'tentative_offer',
						type:'bar'
					},
					title:{
					text: 'Number of Tentative Offers by Organization'
					},
					xAxis:{
						title:{
							text: 'Organizations'
						},
						categories: $scope.xOrganization
					},
					yAxis:{
						title:{
							text: 'Number of Records'
						}
					},
					colors: [
							'#404040',
							'#484848',
							'#505050',
							'#585858',
							'#606060',
							'#686868',
							'#707070',
							'#787878',
							'#808080',
							'#888888',
							'#909090',
							'#989898',
							'#A0A0A0'
							],
					plotOptions:{
						series:{
							point:{
								events:{
									click:function(event){
										$scope.isShown = function() { 
												$scope.orgName = true;
											};
										$scope.orgName = [];
										var clickOrganization = "clicked_organization=" + this.category;
										$http.post('/metricdashboard/get_on_click_details_tentative',clickOrganization,config).success(function(data){
											$scope.tentative_offer_details = [];
											$scope.orgName.push(data.onclick_details_tentative[0]);
											$scope.offersDetails = data.onclick_details_tentative;
											for (var i=0; i < $scope.offersDetails.length; i++ ){
												$scope.tentative_offer_details.push($scope.offersDetails[i]);
											};
										});
									}
								}
							}
						},
						bar:{
							colorByPoint: true,
							cursor: 'pointer',
							dataLabels:{
								enabled:true,
							},
						}
					},
					legend: {
						enabled:false
					},
					series: [{
						name: ["Number of Records: "],
						data: xRecords
					}]
				});
			};
		};
	});
};

// charts for hiring manager
function ChartCtrl_Hiring_Manager_Statue($scope, $http, $location, $routeParams, $rootScope, $route, $cookieStore){

	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};
	$rootScope.tabClick = function ($event) {
		$event.preventDefault();
	};

	$http.get('/metricdashboard/get_hiring_manager').success(function(data) {
		$scope.hiring_manager = data.hiring_manager;
		$scope.hiring_manager_organization = [];
		var i, hiringmanager_Organization;
		for(i=0; i< $scope.hiring_manager.length; i++) {
			hiringmanager_Organization = $scope.hiring_manager[i].organization;
			if($scope.hiring_manager_organization.indexOf(hiringmanager_Organization) === -1) {
				$scope.hiring_manager_organization[$scope.hiring_manager_organization.length] = hiringmanager_Organization;
			}
		};
		hiring_manager_xRecords = [3, 3, 3, 9, 2,6,7,3,1,18,6,4,3,16];
		var hiring_manager_Records = [];
		for(i=0; i<$scope.hiring_manager_organization.length; i++) {
			var current_stat_milestone_count = "organization=" + $scope.hiring_manager_organization[i];
			$http.post('/metricdashboard/get_hirinmanager_count', current_stat_milestone_count, config).success(function(data) {
				hiring_manager_Records.push(data.hiringCount);
				construct_currentstatusSeries(hiring_manager_Records);
			});
		};
		function construct_currentstatusSeries(hiring_manager_Records) { 
			if(hiring_manager_Records.length === $scope.hiring_manager_organization.length) {
				$('#hiring_manager').highcharts({
					chart:{
						type: 'bar',
					},
					title: {
						text: 'Hiring Manager Status by Organization'
					},
					subtitle:{
						text: 'Current Status: 09. Selecting Official Review App-Interviews'
					},
					xAxis:{
					
						categories: $scope.hiring_manager_organization,
					
						labels:{
							enabled: true
						},
						title:{
							text:'Organization'
						}
					},
					yAxis:{
						title:{
							text: "Number of Records",
						},
						labels:{
							enabled: true
						}
					},
					colors: [
						'#245470',
						'#2a6283',
						'#307096',
						'#367ea9',
						'#3c8dbc',
						'#4f98c2',
						'#62a3c9',
						'#76afd0',
						'#8abad6',
						'#b1d1e4',
						'#9dc6dd'
							],
					plotOptions:{
						series:{
							point:{
								events:{
									click:function(event){
										$scope.isShown = function() { 
												$scope.orgName = true;
											};
										$scope.orgName = [];
										var click_hiring_Organization = "clicked_organization=" + this.category;
										$http.post('/metricdashboard/get_click_hiring_Data',click_hiring_Organization,config).success(function(data){
											$scope.selectedHiringData = [];
											$scope.orgName.push(data.selectedHiring[0]);
											$scope.selectedHiringData = data.selectedHiring;
										});
									}
								}
							}
						},
						bar:{
							colorByPoint: true,
							pointPadding: 0,
							cursor: 'pointer',
							dataLabels:{
								enabled:true
							},
						}
					},
					legend: {
						enabled:false
					},
					series: [{
						name: ['Number Of Records'],
						data: hiring_manager_xRecords
					}]
				});
			};
		};
	});
};



// Chart for Inventory by OPM

function ChartCtrl_Inventory_Opm($scope, $http, $location, $routeParams, $rootScope, $route, $cookieStore){

	var config = {headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}};
	$rootScope.tabClick = function ($event) {
		$event.preventDefault();
	};

	$http.get('/metricdashboard/get_inventory_opm').success(function(data) {
		$scope.inventory_opm = data.inventory_opm;
		$scope.currentStatus = [];
		var inventory_opm_current_status;
		for (var i=0; i< $scope.inventory_opm.length; i++) {
			inventory_opm_current_status = $scope.inventory_opm[i].current_status_milestone;
			if($scope.currentStatus.indexOf(inventory_opm_current_status) === -1) {
				$scope.currentStatus[$scope.currentStatus.length] = inventory_opm_current_status;
			}
		};
		inventory_opm_xRecords = [2,13,37,68,2,57,84,26,89];
		var inventory_opm_Records = [];
		for( var i=0; i<$scope.currentStatus.length; i++) {
			var current_status_count = "current_status_milestone=" + $scope.currentStatus[i];
			$http.post('/metricdashboard/get_inventory_opm_count', current_status_count, config).success(function(data) {
				inventory_opm_Records.push(data.inventory_opm_count);
				construct_inventory_opm_Series(inventory_opm_Records);
			});
		};
		function construct_inventory_opm_Series(inventory_opm_Records) {
			if(inventory_opm_Records.length === $scope.currentStatus.length) {
				$('#inventory_opm').highcharts({
					chart:{
						type: 'bar'
					},
					title: {
						text: 'Inventory by OPM 80 Day Hiring Milestone'
					},
					xAxis:{
						categories: $scope.currentStatus,
						title:{
							text:'Current Status / Milestone'
						}
					},
					yAxis:{
						title:{
							text:'Number Of Records'
						},
						labels:{
							overflow: 'justify'
						}
					},
					plotOptions:{
						bar:{
							cursor: 'pointer',
							dataLabels:{
								enabled:true
							},
							point:{
								events:{
									click:function(event) {
										$scope.isShown = function() { 
												$scope.currentstatusName = true;
											};
										$scope.currentstatusName = [];
										var click_inventory_Opm = "clicked_current_status_milestone=" + this.category;
										$http.post('/metricdashboard/get_click_inventory_opm_Data', click_inventory_Opm, config).success(function(data) {
											$scope.inventory_opm_Data = [];
											$scope.currentstatusName.push(data.selectedInventory[0]);
											$scope.inventory_opm_Data = data.selectedInventory;
										});
									}
								}
							}
						},
					},
					legend: {
						enabled:false
					},
					series: [{
						name : ['Number Of Records'],
						data :[{
							y:inventory_opm_xRecords[0],
							color:'red',
						},{
							y:inventory_opm_xRecords[1],
							color:'red',
						},{
							y:inventory_opm_xRecords[2],
							color:'red',
						},{
							y:inventory_opm_xRecords[3],
							color:'red',
						},{
							y:inventory_opm_xRecords[4],
							color:'yellow',
						},{
							y:inventory_opm_xRecords[5],
							color:'yellow',
						},{
							y:inventory_opm_xRecords[6],
							color:'green',
						},{
							y:inventory_opm_xRecords[7],
							color:'green',
						},{
							y:inventory_opm_xRecords[8],
							color:'blue',
						}]
					}]
				});
			};
		}
	});
};

function pivotTableCtrl($scope, $http, $location, $routeParams, $rootScope, $route, $cookieStore){ 
};