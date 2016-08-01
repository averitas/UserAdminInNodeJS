/**
 * 
 */

'use strict';
 
app.factory('UserService', ['$http', '$q', function($http, $q){
 
    return {
         
            fetchAllUsers: function() {
                    return $http({
                    	 method: 'GET',
                    	 url: 'http://localhost:3000/api/users',
                    	 headers: {
                    	   'Content-Type': undefined,
                    	 }
                    	})
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching users');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createUser: function(user){
                    return $http({
                   	 method: 'POST',
                	 url: 'http://localhost:3000/api/add',
                	 headers: {
                	   'Content-Type': "application/json",
                	 },
                	 data: user
                	})
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUser: function(user){
                    return $http({
                      	 method: 'PUT',
                    	 url: 'http://localhost:3000/api/edit',
                    	 headers: {
                    	   'Content-Type': "application/json",
                    	 },
                    	 data: user
                    	})
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUser: function(id){
                    return $http({
                      	 method: 'DELETE',
                    	 url: 'http://localhost:3000/api/delete/'+id,
                    	 headers: {
                    	   'Content-Type': undefined,
                    	 }
                    	})
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting user');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);