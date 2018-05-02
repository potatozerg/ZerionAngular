angular.module('controllers', [])
  .controller('detailCtrl', ['$scope', '$location', 'httpCalls', '$rootScope', function($scope, $location, httpCalls, $rootScope){

    // initialize
  	$scope.new = {
  		name: '',
  		description: '',
  		imgs: [{url: ''}]
  	};

    if($rootScope.new) {
      $scope.new = $rootScope.new;
    }

    // back to tile view and delete input
    $scope.back = () => {
      clear();
      $location.path('/home');
    };

    $scope.save = () => {
      // http post
      if ($rootScope.method === 'create') {
        delete $scope.new._id;
        httpCalls.create($scope.new)
          .then(function(res){
            $scope.getAll();
            clear();
            $location.path('/home');
          });
      }
      // http put
      if ($rootScope.method === 'update') {
        httpCalls.update($scope.new)
          .then(function(res){
            $scope.getAll();
            clear();
            $location.path('/home');
          });
      }
    };

    // delete input function
  	const clear = () => {
  		$scope.new.name = '';
  		$scope.new.description = '';
  		$scope.new.imgs[0].url = '';
  		$scope.new._id = '';
  	};
  }]);
