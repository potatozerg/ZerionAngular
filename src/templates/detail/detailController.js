angular.module('controllers', [])
  .controller('detailCtrl', ['$scope', '$location', 'httpCalls', '$rootScope', '$window',
    function($scope, $location, httpCalls, $rootScope, $window){

    // initialize
  	$scope.new = {
  		name: '',
  		description: '',
  		imgs: [{url: ''}]
  	};

    $scope.saveData = () => {
      $window.localStorage.setItem('detail', JSON.stringify($scope.new));
    }

    $scope.getData = () => {
      $scope.new = JSON.parse($window.localStorage.getItem('detail'));
    }

    // delete input function
  	const clear = () => {
  		$scope.new.name = '';
  		$scope.new.description = '';
  		$scope.new.imgs = [{url: ''}];
  		$scope.new._id = '';
  	};

    // if clicked an existing document
    if($rootScope.new) {
      $scope.new = $rootScope.new;
    } else { // new or refreshed
      if ($rootScope.method === 'create') {
        clear();
      } else {
        $scope.getData();
      }
    }

    $scope.addImg = () => {
      $scope.new.imgs.push({url: ''});
    };

    $scope.removeImg = index => {
      if($scope.new.imgs.length !== 1){
        $scope.new.imgs.splice(index,1);
      }
    };

    // back to tile view and delete input
    $scope.back = () => {
      clear();
      $location.path('/home');
    };

    $scope.save = () => {
      $window.localStorage.removeItem('detail');
      // http post
      if ($rootScope.method === 'create') {
        delete $scope.new._id;
        httpCalls.create($scope.new)
          .then(function(res){
            $location.path('/home');
          });
      }
      // http put
      if ($rootScope.method === 'update') {
        httpCalls.update($scope.new)
          .then(function(res){
            $location.path('/home');
          });
      }
    };


  }]);
