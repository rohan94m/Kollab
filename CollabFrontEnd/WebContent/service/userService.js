app.factory('userService',['$http','$q',function($http,$q){

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


                })

            },
         
        updateUser: function(user, id){
                return $http.put('http://localhost:8080/SpringMVC4RestAPI/user/'+id, user)
                .then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Error while updating user');
                            return $q.reject(errResponse);
                        }
                );
            }


         
     
             
        };
     
    }]);
	
