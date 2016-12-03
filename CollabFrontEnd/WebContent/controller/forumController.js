app.controller('forumController',['$scope', 'forumService','dummyService','$location','$routeParams','$rootScope', 

				function($scope, forumService,dummyService,$location,$routeParams,$rootScope){

	console.log("Forum controller reached");

	var self=this;
	self.blogDetails={"blog_id":null,"blog_title":"","content":"","date_created":"", "user_id":null,"author_name":"",
					  "category":"","comment_count":0,"shortcontent":""};
	
	self.commentDetails={"commentId":null,"comment_content":"","upvotes":0,"downvotes":0,"user_id":null,"username":"",
			"date_created":"", "blog":{"blog_id":null} };
	
	self.fetchedblog={"blog_id":null,"blog_title":"","content":"","date_created":"","user_id":null,
						"author_name":"","category":"","comment_count":0,"shortcontent":""};
	
	self.bloglist=[];

	self.myblogslist=[];


	self.commentlist=[];


	self.blogid=0;
	
	
	
	self.currentPath=$location.path();
	console.log($location.path());
	self.latestbloglist=[];
	



	self.createBlog=function(blog)
	{
		//Set in back-end through logged in session object
		blog.user_id=null;
		blog.author_name='';

		console.log("---- createBlog in userController reached ----")
		console.log(blog);
		
		forumService
		.createBlog(blog)
		.then(function(){
	
			console.log("Blog saved succesfully");
			
			
			self.reset();
			$location.path("/explore");
			
			
			
	
	
		},function(){
	
			console.error("blog not saved!")
			self.flag='createblogfailed';
			console.log(self.flag);
			
	
		});
	
	};
	
	self.fetchAllBlog=function()
	{
		console.log("----fetchAllBlog in controller reached ---- ");
		 forumService
		.fetchAllBlogs()
		.then(function(blogListData){
			console.log(blogListData);
			console.log("List of  blogss obtained as");
			
			self.bloglist=blogListData;
			
			console.log(self.bloglist);
		
	
	
		},function(errResponse){
	
			console.error("Could not obtain blog List");
			
			self.bloglist=[];
	
	
	
	
	
		});
	
	
	};
	
	
	self.fetchLatestBlog=function()
	{
		console.log("----fetchLatestBlog in controller reached ---- ");
		 forumService
		.fetchLatestBlogs()
		.then(function(blogListData){
			console.log(blogListData);
			console.log("List of  blogss obtained as");
			
			self.latestbloglist=blogListData;
			
			console.log(self.latestbloglist);
		
	
	
		},function(errResponse){
	
			console.error("Could not obtain blog List");
			
			self.latestbloglist=[];
	
	
	
	
	
		});
	
	
	};
	

	
	
	self.reset=function()
	{
	
			self.blogDetails={"blog_id":null,"blog_title":"","content":"","date_created":"",
					"user_id":null,"author_name":"","category":"","comment_count":0,"shortcontent":""};
	    	
	        $scope.blogForm.$setPristine();
	        alert("Blog Posted");
	        
	       
	   
	};



	self.goToBlog=function(idval)
	{
		self.blogid=idval;
		console.log("Blg id at goToBlog is "+self.blogid);
		$location.path('/blog/'+this.blogid);
	}


	self.fetchBlogFromRouteParams=function()
	{
		self.blogid=$routeParams.blogid;
		console.log("Fetching blog with id "+self.blogid);
		forumService.
		fetchBlog(self.blogid)
		.then(function(response){
			
			self.fetchedblog=response;
			console.log(self.fetchedblog);
			
			
		},function(){
			
			console.log("Couldnt fetch to controller");
			
		})
		
		
	};
	
	
	
	
	self.fetchBlog=function(blogid)
	{
		console.log("Fetching blog with id "+blogid);
		forumService.
		fetchBlog(blogid)
		.then(function(response){
			
			self.fetchedblog=response;
			console.log(self.fetchedblog);
			
			
		},function(){
			
			console.log("Couldnt fetch to controller");
			
		});
		
		
		
		
	};


	self.fetchMyBlogs=function(userid)
	{
		forumService
		.fetchMyBlogs(userid)
		.then(function(data){

			self.myblogslist=data;

		},function(){

			console.log("This user doesnt have any blogs");

		})



	}


       self.createComment=function(comment){
    	   
    
    	console.log(self.fetchedblog.blog_id);
    	
    	//Set in back-end through logged in session object
    	comment.user_id=null; 
    	comment.username="";
        console.log("---- createComment() in controller reached ----");
        console.log(comment);
         forumService
        .createComment(comment,self.fetchedblog.blog_id)
        .then(
                function(response){
                    console.log("Comment added");
                    self.flag="commentcreatesuccess";
                    self.fetchBlog(self.fetchedblog.blog_id);
                    
                }, 
                function(errResponse){
                	console.log("Comment not added");
                    self.flag="commentcreatefailed";
                }
        );
    };


    
    // Calling controller functions based on $location.path 
    
	if(self.currentPath=='/explore')
	{
		self.fetchLatestBlog();

	}


	if(self.currentPath.startsWith('/blog/'))
	{
	
		self.fetchBlogFromRouteParams();
	}

    
	if(self.currentPath=='/myprofile')
	{
		self.fetchMyBlogs($rootScope.currentuser.userid);

	}







}]);