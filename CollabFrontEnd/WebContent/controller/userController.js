app.controller('userController',['$scope', 'userService','$location','$rootScope',
				'$http','$cookieStore','$routeParams', function($scope, userService,$location,$rootScope,$http,$cookieStore,$routeParams){

	console.log("User controller reached");

	var self=this;
	
	// Signup form model
	self.userDetails={"userId":null,"emailid":"","fullname":"","password":"","mobileno":"",
	"isOnline":"offline","accountstatus":"Pending","reason":"none","role":"","friendCount":0,"user_bio":"","user_status":""};
	
	
	// All users in this list
	self.ulist=[]; 
	
	
	//Single user obtained 
	self.fetcheduser={"userId":null,"emailid":"","fullname":"","password":"",
	"mobileno":"","isOnline":"offline","accountstatus":"Pending","reason":"none","role":"","friendCount":0,"user_bio":"","user_status":""};
	
	
	//Depending on this path, controller functions are called
	self.currentPath=$location.path(); 

	
	// Latest three users in this list
	self.latestulist=[]; 
	
	if($cookieStore.get('currentuser'))
	{
		$rootScope.currentuser=$cookieStore.get('currentuser');
	}

	
	

	
	self.createUser=function(user)
	{
		console.log("---- createUser in userController reached ----")
		console.log(user);
		
		userService
		.createUser(user)
		.then(function(){
	
			console.log("user saved succesfully");
			alert("Registered succesfully");
			
			self.reset();
			
			$location.path("/login");
			
			
	
	
		},function(){
	
			console.error("user not saved!")
			
			alert("Could not create your account");
			
	
		});
	
	};
	
	self.fetchAllUser=function()
	{
		console.log("----fetchAllUser in controller reached ---- ");
		 userService
		.fetchAllUsers()
		.then(function(userListData){
			console.log(userListData);
			console.log("List of users obtained as");
			
			self.ulist=userListData;
			
			console.log(self.ulist);
		
	
	
		},function(errResponse){
	
			console.error("Could not obtain user List");
			
			self.ulist=null;
	
	
	
	
	
		});
	
	
	};
	
	
	
	self.fetchLatestUser=function()
	{
		console.log("----fetchLatestUser in controller reached ---- ");
		 userService
		.fetchLatestUsers()
		.then(function(userListData){
			console.log(userListData);
			console.log("List of users obtained as");
			
			self.latestulist=userListData;
			
			console.log(self.latestulist);
		
	
	
		},function(errResponse){
	
			console.error("Could not obtain user List");
			
			self.latestulist=null;
	
	
	
	
	
		});
	
	
	};
	

	
	self.reset=function()
	{
	
	    	self.userDetails={"userId":null,"emailid":"","fullname":"",
			"password":"","mobileno":"","isOnline":"offline","accountstatus":"Pending","reason":"none","role":"","friendCount":0,"user_bio":"",
			"user_status":""};
	        $scope.userForm.$setPristine();
	   
	};
	
	self.fetchUser=function(userid)
	{
		console.log("Fetching user with id "+userid);
		userService
		.fetchUser(userid)
		.then(function(userData){

			self.fetcheduser=userData;
			console.log("User details obtained ");
			console.log(self.fetcheduser);


		},function(){

			self.fetcheduser=null;
			console.log("Couldnt get user ");


		});

	};
	
	
	self.fetchUserFromRouteParams=function()
	{
		
		self.userid=$routeParams.userid;
		console.log("Fetching user with id "+self.userid);
		userService.
		fetchUser(self.userid)
		.then(function(response){
			
			self.fetcheduser=response;
			console.log("Fetched user through Params is");
			console.log(self.fetcheduser);
			
			
			
			
		},function(){
			
			console.log("Couldnt fetch to controller");
			
		})
	}
	
	
	
	self.goToUser=function(idval)
	{
		
		console.log("usert id at goToUser is "+idval);
		$location.path('/user/'+idval);
	}
	
	if(self.currentPath.startsWith('/user/'))
	{
	
		self.fetchUserFromRouteParams();
	}
	
	
	
	

	// must be logged in

	
	self.authenticate=function(user)
	{
		console.log("Authnticate reached");
		userService
		.authenticateUser(user)
		.then(function(data){
		console.log("Valid Credentials. Navigating to home page.");
		 if($rootScope.currentuser.role=='Admin')
			 {
			 	$location.path('/admin');
			 		
			 }
		 else
			 {
			 $location.path('/home');
			 
			 }
		
		
		
				
			
		},function(){
			
			self.flag="loginnotreached";
			console.log("Login failed");
			
			
		})
		
		
	};

	self.logout = function() {
				console.log("--> UserController : calling logout method.");
				$rootScope.currentuser = null;
				$cookieStore.remove('currentuser');
				userService.logout()
				.then(function(){
					console.log("LoggedOut");
					alert("Succesfully Logged Out");
					console.log("-->UserController : User Logged out.");
				},function(){
					
					console.log("Logout Failed");
				})
				
				
				$location.path('/home');
	};
	
	


	self.statusUpdate=function(user)
	{
		self.fetcheduser.user_status=user.user_status;
	
		
		userService.updateUser(self.fetcheduser)
		.then(function(data){
			
			console.log(data.user_status);
			self.fetcheduser.user_status="";
			self.userDetails.user_status="";
			self.fetcheduser=data;
			
		},function(data){
			self.fetcheduser.user_status="";
			self.userDetails.user_status="";
			
		})
		
		

		

	};
	
	
	
	self.acceptUser=function(user)
	{
		user.accountstatus='Valid';
		userService.updateUser(user)
		.then(function(){
			
			alert("This user is now Accepted");
			self.fetchAllUser();
			
			
		},function(){
			
			alert("Couldnt Update this users status");
			
		})
		
		
		
	};
	
	
	
	
	self.rejectUser=function(user)
	{
		user.accountstatus='Invalid';
		userService.updateUser(user)
		.then(function(){
			
			alert("This user is now Rejected");
			self.fetchAllUser();
			
			
		},function(){
			
			alert("Couldnt Update this users status");
			
		})
		
		
		
	};
	
	
	
	
	
	
	
	
	// Calling controller functions based on $location.path 


	if(self.currentPath=='/explore')
	{
		self.fetchLatestUser();

	}
	
	if(self.currentPath.startsWith('/blog/'))
		{
		
			//self.fetchUser();
		}
	
	
	
	if(self.currentPath==('/userlist') || self.currentPath==('/admin/user')  )
		{
		
			self.fetchAllUser();
		}

		

		if(self.currentPath==('/myprofile'))
		{
			//Must Be Logged in
			self.fetchUser($rootScope.currentuser.userid);

		}
		
		if(self.currentPath==('/admin/usercontrol'))
		{
			//Must Be Logged in
			self.fetchAllUser();

		}











}]);