app.controller('userController',['$scope', 'userService','$location', function($scope, userService,$location){

	console.log("User controller reached");

	var self=this;
	
	// Signup form model
	self.userDetails={"userId":null,"emailid":"","fullname":"","password":"","mobileno":"","isOnline":"no","accountstatus":"pending","reason":"awaiting confirmation","role":"","friendCount":0};
	
	
	// All users in this list
	self.ulist=[]; 
	
	
	//Single user obtained 
	self.fetcheduser={"userId":null,"emailid":"","fullname":"","password":"","mobileno":"","isOnline":"no","accountstatus":"pending","reason":"awaiting confirmation","role":"","friendCount":0};
	
	
	//Depending on this path, controller functions are called
	self.currentPath=$location.path(); 

	
	// Latest three users in this list
	self.latestulist=[]; 
	

	
	self.createUser=function(user)
	{
		console.log("---- createUser in userController reached ----")
		console.log(user);
		
		userService
		.createUser(user)
		.then(function(){
	
			console.log("user saved succesfully");
			
			self.reset();
			self.flag="createdusersuccess";
			
	
	
		},function(){
	
			console.error("user not saved!")
			self.flag='createfailed';
			console.log(self.flag);
			
	
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
			"password":"","mobileno":"","isOnline":"no","accountstatus":"pending","reason":"awaiting confirmation","role":"","friendCount":0};
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
			console.log("Couldnt get blog ");


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
	
	
	
	if(self.currentPath==('/userlist'))
		{
		
			self.fetchAllUser();
		}











}]);