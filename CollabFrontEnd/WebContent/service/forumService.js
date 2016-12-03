app.factory('forumService',['$http','$q',function($http,$q){

	var BASE_URL="http://localhost:8081/collaboration/";
	console.log("User Service reached yo!");
    return {
        
        fetchAllBlogs: function() {
                console.log("----fetchAllBlogs in service reached----");
                return $http.get('http://localhost:8081/collaboration/blog')
                .then(
                        function(response){
                        	console.log(response.data);
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Error while fetching Blogs. No response ');
                            return $q.reject(errResponse);
                        }
                );
            },
            
            fetchLatestBlogs: function() {
                console.log("----fetchLatestBlogs in service reached----");
                return $http.get('http://localhost:8081/collaboration/latestblogs')
                .then(
                        function(response){
                        	console.log(response.data);
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Error while fetching Blogs. No response ');
                            return $q.reject(errResponse);
                        }
                );
            },
         
        createBlog: function(blog){
        		console.log("---- createBlog() in service reached ----");
                return $http.post('http://localhost:8081/collaboration/blog', blog)
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
         
           

            fetchBlog:function(blogid){
                console.log("----In fetchBlog of Service----")
                console.log("blogid is "+blogid);
                return $http.get('http://localhost:8081/collaboration/blog/'+blogid)
                .then(function(response){
                        console.log("Obtained blog from server");
                        return response.data;



                },function(errResponse){

                    console.error("Error communicating with server. Could not fetch blog");
                    return $q.reject(errResponse);


                }
                );

            },


            fetchMyBlogs: function(userid)
            {

                console.log("----In fetchMyBlogs of Service----")
                console.log("userid is "+userid);
                return $http.get('http://localhost:8081/collaboration/myblogs/'+userid)
                .then(function(response){
                        console.log("Obtained blogs list from server");
                        return response.data;



                },function(errResponse){

                    console.error("Error communicating with server. Could not fetch blog");
                    return $q.reject(errResponse);


                });

            },




            

            // COMMENT SERVICE

    

               createComment: function(comment,blogid){
                console.log("---- createComment() in service has been reached ----");
                return $http.post('http://localhost:8081/collaboration/comment/'+blogid, comment)
                .then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('No response from server');
                            return $q.reject(errResponse);
                        }
                );
            }


         
     
             
        };
     
    }]);
	
