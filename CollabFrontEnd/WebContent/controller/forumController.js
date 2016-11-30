app.controller('forumController',['$scope', 'forumService','dummyService','$location','$routeParams', function($scope, forumService,dummyService,$location,$routeParams){

	console.log("Forum controller reached");

	var self=this;
	self.blogDetails={"blog_id":null,"blog_title":"","content":"","date_created":"","status":"Pending","reason":"Not verified","user_id":null,"author_name":""};
	
	self.commentDetails={"commentId":null,"comment_content":"","upvotes":0,"downvotes":0,"user_id":null,"username":"",
			"blog":{"blog_id":null} };
	
	self.fetchedblog={"blog_id":null,"blog_title":"","content":"","date_created":"","status":"Pending","reason":"Not verified","user_id":null,"author_name":""};
	
	self.bloglist=[];
	self.commentlist=[];
	self.blogid=0;
	
	
	
	self.currentPath=$location.path();
	console.log($location.path());
	self.latestbloglist=[];
	



	self.createBlog=function(blog)
	{
		blog.user_id=1;
		blog.author_name='Rohan';

		console.log("---- createBlog in userController reached ----")
		console.log(blog);
		
		forumService
		.createBlog(blog)
		.then(function(){
	
			console.log("Blog saved succesfully");
			
			self.reset();
			self.flag="createdblogsuccess";
			console.log(self.flag);
			
	
	
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
	
			self.blogDetails={"blog_id":null,"blog_title":"","content":"","date_created":"","status":"Pending","reason":"Not verified","user_id":null};
	    	
	        $scope.blogForm.$setPristine();
	   
	};



	self.goToBlog=function(idval)
	{
		self.blogid=idval;
		console.log("Blg id at goToBlog is "+self.blogid);
		$location.path('/blog/'+this.blogid);
	}


	self.fetchBlog=function()
	{
		self.blogid=$routeParams.blogid;
		console.log("Fetching blog with id "+self.blogid);
		forumService.
		fetchBlog(self.blogid)
		.then(function(response){
			
			self.fetchedblog=response;
			console.log(self.fetchedblog);
			
			
		},function(){
			
			console.log("COuldnt fetch to controller")
			
		})
		
		
	};

       self.createComment=function(comment){
    	   
    
    	console.log(self.fetchedblog.blog_id);
    	comment.user_id=1; // Set from rootscope
    	comment.username="Rohan"; // Set from rootscope
        console.log("---- createComment() in controller reached ----");
        console.log(comment);
         forumService
        .createComment(comment,self.fetchedblog.blog_id)
        .then(
                function(response){
                    console.log("Comment added");
                    self.flag="commentcreatesuccess";
                    $location.path(self.currentPath);
                    
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
	
		self.fetchBlog();
	}







}]);