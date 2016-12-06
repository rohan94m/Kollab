app.factory('userService',['$http','$q','$rootScope','$cookieStore',function($http,$q,$rootScope,$cookieStore){

	var BASE_URL="http://localhost:8081/collaboration/";
	console.log("User Service reached yo!");
    return {
        
        fetchAllUsers: function() {
                console.log("----fetchAllUsers in service reached----");
                return $http.get('http://localhost:8081/collaboration/user')
                .then(
                        function(response){
                        	console.log(response.data);
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Error while fetching users. No response ');
                            return $q.reject(errResponse);
                        }
                );
            },
            
            fetchLatestUsers: function() {
                    console.log("----fetchLatestUsers in service reached----");
                    return $http.get('http://localhost:8081/collaboration/latestusers')
                    .then(
                            function(response){
                            	console.log(response.data);
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while fetching users. No response ');
                                return $q.reject(errResponse);
                            }
                    );
                },
         
        createUser: function(user){
        		console.log("---- createUser() in service reached ----");
                return $http.post('http://localhost:8081/collaboration/user', user)
                .then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('No response from server');
                            return $q.reject(errResponse);
                        }
                );
            },
            
            fetchUser:function(emailid){
                console.log("----In fetchUser of Service----")
                return $http.get('http://localhost:8081/collaboration/user/'+emailid)
                .then(function(response){
                        console.log("Obtained User from server");
                        return response.data;



                },function(errResponse){

                    console.error("Error communicating with server. Could not fetch user");
                    return $q.reject(errResponse);


                });

            },
         
        updateUser: function(user){
                return $http.put('http://localhost:8081/collaboration/user/', user)
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
            
            authenticateUser:  function(user)
            {
            	
            	return $http.post('http://localhost:8081/collaboration/login', user)
            	.then(function(response){

                        if(response.data.emailid=='Invalid'){
                        
                        console.log("Wrong credentials") ;  
                        alert("Email or Password do not match!");
                    }
                    else
                        {
                    	console.log("Authenticated");
                    
                    $rootScope.currentuser={ "userid":response.data.userId, "username":response.data.fullname,
                    						"role":response.data.role,"accountstatus":response.data.accountstatus};
                    $cookieStore.put('currentuser',$rootScope.currentuser);
            		console.log('Cookies set for'+$cookieStore.get('currentuser').username);
                    
                
                        }
            		
            	return response.data;
            	},function(errorResponse){
            		
            		console.log("Could not authenticate");
            		alert("Couldnt reach server");
            		return $q.reject(errorResponse);
            	
            		
            	}
            	
            	);
            	
            },

            logout: function() {
                console.log("--> UserService : calling 'logout' method.");
                return $http
                            .get('http://localhost:8081/collaboration/logout')
                            .then(function(response) {
                                return response.data;
                            },
                            function(errResponse) {
                                console.error('Error while logging out.');
                                return $q.reject(errResponse);
                            }
                        );
            },
            
            
            
            sendRequest:function(friendid){
            	
            	  
                   return $http
                               .put('http://localhost:8081/collaboration/sendrequest/'+friendid)
                               .then(function() {
                            	   	
                            	   console.log("Request Sent");
                               },
                               function(errResponse) {
                                   
                            	   console.log("NO response from server");
                            	   return $q.reject(errResponse);
                               }
                           );
            	
            	
            	
            	
            },
            
            
            
            acceptRequest:function(friendship)
            {
            	return $http
                	.post('http://localhost:8081/collaboration/acceptRequest',friendship)
                	
                	.then(function(response){
                		
                		return response;
                		
                		
                	},function(errResponse){
                		
                		$q.reject(errResponse);
                		
                		
                	})
            	
            	
            	
            	
            },
            
                 
            getFriendsList: function(userid)
            {
          	  
                return $http
                            .get('http://localhost:8081/collaboration/friendlist/'+userid)
                            .then(function(response) {
                         	   	
                         	  return response.data;
                            },
                            function(errResponse) {
                                
                         	   console.log("NO response from server");
                         	  return $q.reject(errResponse);
                            }
                        );
            	
            }


         
     
             
        };
        
      
     
    }]);
	
