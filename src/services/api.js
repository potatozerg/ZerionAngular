angular.module('services', [])
  .service('httpCalls', ['$http', function($http) {

    // Set the token
  	const token = '8e2b2dd8a0e2e21b75ad6cd16302f788b2fbdf67-e3156984fc39f6d60214b752a0721112041fb227';
  	// Set the URL
  	const url = 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records';

    return {

      getAll: () => {
        return $http.get(url, { headers: { "Authorization": `Bearer ${token}`}});
      },

      delete: id => {
        return $http.delete(`${url}/${id}`, { headers: { "Authorization": `Bearer ${token}`}});
      },

      create: input => {
  			return $http.post(url, input, { headers: { "Authorization": `Bearer ${token}`}});
      },

      update: input => {
        return $http.put(`${url}/${input._id}`, input, { headers: { "Authorization": `Bearer ${token}`}});
      }
    }
  }]);
