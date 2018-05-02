const app = angular.module('mainApp', ['ngRoute', 'services', 'controllers']);

app.controller('mainCtrl', ['$scope', '$location', 'httpCalls', '$rootScope',
  function($scope, $location, httpCalls, $rootScope){

	// Get function
	$scope.getAll = () => {
    httpCalls.getAll()
			.then(function(res){
				$scope.documents = res.data;
        $rootScope.documents = res.data;
				$scope.changeView('tile');
			});
	};

	// Get all documents and set the default view
	$scope.getAll();

  $scope.changeView = view => {

    if(view === 'tile') {
      $location.path('/home');
    } else if (view === 'list') {
      delete $scope.documents;
      $location.path('/list');
    } else {
      $rootScope.method = 'create';
      $location.path('/detail');
    }
  }

	// when click on a document, enter to the detail page
	$scope.detailView = d => {

		$rootScope.method = 'update';
    $rootScope.new = {
  		name: '',
  		description: '',
  		imgs: [{url: ''}]
  	};
		$rootScope.new._id = d._id;
		$rootScope.new.name = d.name;
		$rootScope.new.description = d.description;
		$rootScope.new.imgs[0].url = d.imgs[0].url;
    $location.path('/detail');
	};

}]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

	$routeProvider.when("/",{
    redirectTo:"/home"
	}).when("/home",{
		templateUrl:"templates/main.html",
		controller: "mainCtrl"
	}).when("/list",{
		templateUrl:"templates/list/list.html",
		controller: "listCtrl"
	}).when("/detail",{
		templateUrl:"templates/detail/detail.html",
		controller: "detailCtrl"
	}).otherwise({
		redirectTo:"/home"
	})
	$locationProvider.html5Mode(true);
}])
