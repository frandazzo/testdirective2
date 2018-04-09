app.directive("myTabs", function(){


	return {

		restrict: "E",
		transclude: true,
		templateUrl: "assets/views/my-tabs.html",
		scope: {},
		controller : function myTabs($scope){
			$scope.panes = [];
			$scope.selectPane = function(pane){
				for(var i = 0; i < $scope.panes.length; i++)
				{
					$scope.panes[i].selected = false;
				}

				pane.selected = true;
			}


			this.addPane = function(pane){
				$scope.panes.push(pane);

				if($scope.panes.length == 1)
				{
					$scope.panes[0].selected = true;
				}
			}

			this.notifyRegionChange = function(idRegion){
				console.log("notifyRegionChange", idRegion);
				$scope.$broadcast("regionChanged", idRegion);
			}
		},

		link: function(scope, elem, attrs){

			scope.panes = ["linkA", "linkB"];
			scope.alertData = function(pane){
				alert(pane);
			}

		}

	}


});


app.directive("myPane", function(){

	return {

		require: "^^myTabs",
		restrict: "E",
		transclude : true,
		scope: {
			title: "@",
			ciccillo: "="
		},
		templateUrl: "assets/views/my-pane.html",
		link: function(scope, elem, attrs, controller){
			controller.addPane(scope);

		}

	};


});









app.directive("myRegions", function(geoService){
	return {
		require: "^^myTabs",
		restrict: "E",
		scope: {},
		templateUrl: "assets/views/my-regions.html",
		link: function(scope, elem, attrs, controller){
			geoService.getRegions().then(function(regions){
				scope.regions = regions;
			});

			elem.find("select").bind("change", function (){			
				var idRegion = angular.element(this).val();

				scope.$root.$broadcast("myRegionsChange", idRegion);			
			})
		}
	};
});

app.directive("myProvinces", function(geoService){
	return {
		restrict: "E",
		
		templateUrl: "assets/views/my-provinces.html",

		
		
		link: function(scope, elem, attrs){
			scope.$root.$on("myRegionsChange", function(e, data){
				console.log("subscribed", e, data);
				geoService.getProvincesByRegion(data).then(function(provinces){
					scope.provinces = provinces;
				});
			});
		},
		controller: function myProvinces($scope){
			this.loadByIdRegion = function(idRegion){
				geoService.getProvincesByRegion(idRegion).then(function(provinces){
					scope.provinces = provinces;
				});
			}
		}
		
	};
});