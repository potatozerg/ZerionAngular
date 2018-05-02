angular.module('controllers')
  .controller('listCtrl', ['$scope', 'httpCalls', '$rootScope', function($scope, httpCalls, $rootScope){

    $scope.documents = $rootScope.documents;
    // Delete selected document function
    $scope.delete = () => {
      const deleted = [];
      $scope.documents.forEach(function(d, i) {
        if (d.delete) {
          deleted.push(i);
          // delete
          httpCalls.delete(d._id)
            .then(function(res){
            });
        }
      });
      // delete in scope
      while(deleted.length) {
        $scope.documents.splice(deleted.pop(), 1);
      }
    }

  }]);
