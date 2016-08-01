'use strict';
 
app.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
          var self = this;
          self.user={username:'',password:'',role:'',fname:'',lname:'',email:'',address:''};
          self.users=[];
               
          self.fetchAllUsers = function(){
              UserService.fetchAllUsers()
                  .then(
                               function(d) {
                                    self.users = d;
                               },
                                function(errResponse){
                                    console.error('Error while fetching Currencies');
                                }
                       );
          };
            
          self.createUser = function(user){
              UserService.createUser(user)
                      .then(
                      self.fetchAllUsers, 
                              function(errResponse){
                                   console.error('Error while creating User.');
                              } 
                  );
          };
 
         self.updateUser = function(User){
              UserService.updateUser(User)
                      .then(
                              self.fetchAllUsers, 
                              function(errResponse){
                                   console.error('Error while updating User.');
                              } 
                  );
          };
 
         self.deleteUser = function(name){
              UserService.deleteUser(name)
                      .then(
                              self.fetchAllUsers, 
                              function(errResponse){
                                   console.error('Error while deleting User.');
                              } 
                  );
          };
 
          self.fetchAllUsers();
 
          self.submit = function() {
        	  var index=-1;
        	  for(var i = 0, len = self.users.length; i < len; i++){
        		  if(self.users[i].username == self.user.username){
        			  index = i;
                if(self.users[i].password == self.user.password)
                  delete self.user.password;
        			  break;
        		  }
        	  }
        	  if(index>-1){
        		  self.updateUser(self.user);
        		  console.log('User updated with name ', self.user.username);
        	  }else{
        		  self.createUser(self.user);
        		  console.log('User create with name ', self.user.username)
        	  }
              self.reset();
          };
               
          self.edit = function(username){
              console.log('id to be edited', username);
              for(var i = 0; i < self.users.length; i++){
                  if(self.users[i].username === username) {
                     self.user = angular.copy(self.users[i]);
                     break;
                  }
              }
          };
               
          self.remove = function(id){
              console.log('username to be deleted', id);
              if(self.user.username === id) {//clean form if the user to be deleted is shown there.
                 self.reset();
              }
              self.deleteUser(id);
          };
 
           
          self.reset = function(){
              self.user={username:'',password:'',role:'',fname:'',lname:'',email:'',address:''};
              $scope.myForm.$setPristine(); //reset Form
          };
          
          self.check = function(){
        	  var index=-1;
        	  for(var i = 0, len = self.users.length; i < len; i++){
        		  if(self.users[i].username == self.user.username){
        			  index = i;
        			  break;
        		  }
        	  }
        	  if(index > -1){
        		  return "Update";
        	  }else{
        		  return "Add";
        	  }
          }
 
      $scope.currentPage = 0;
    	$scope.rowLimit=6;
    	$scope.numberOfPages=function(){
            return Math.ceil(self.users.length/$scope.rowLimit);
        };

      $scope.nextPage=function () {
        return $scope.currentPage >= self.users.length/$scope.rowLimit - 1 || self.users.length <= $scope.rowLimit;
      }
      }]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});