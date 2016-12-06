app.controller('userController',['$scope', 'userService','$location','$rootScope',
				'$http','$cookieStore','$routeParams', function($scope, userService,$location,$rootScope,$http,$cookieStore,$routeParams){

	console.log("User controller reached");

	var self=this;
	
	// Sign-up form model
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
	
	
	self.isLoggedIn=false;
	
	
	//Friends List
	
	self.friendslist=[];
	
	
	//  Stores the status of the friend relation between the logged in user and the current user that is being viewed
	// 	Depending on request_status in self.fetchedfriendship
	//  Friends/Accept Request/Awaiting Confirmation/Add As A Friend
	self.friendstatus="";
	
	
	// The Friendship Object 
	self.fetchedfriendship={"friendid":0,"sender_id":"","sender_name":"","receiver_name":"","receiver_id":"","request_status":""};
	
	
	
	
	 
	
	if($cookieStore.get('currentuser'))
	{
		$rootScope.currentuser=$cookieStore.get('currentuser');
		self.isLoggedIn=true;
	}

	
	// ******** User CRUD related **********

	
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
			

			
			
			
			
			if(self.isLoggedIn)
				{
			
					self.getFriendsList();
				
				}

		},function(){

			self.fetcheduser=null;
			console.log("Couldnt get user ");


		});

	};
	
	
	// ******** User CRUD related **********
	
	
	

	// ******** User Authentication, Login/Logout  related **********

	
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
	
	
	
	// ******** User Authentication, Login/Logout  related **********
	
	
	
	
	
	// ******** User Profile related **********


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
	
	
	// ******** ! User Profile related **********
	
	
	// ******** Administrator related **********
	
	
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
			
		});
		
		
		
	};
	
	
	// ******** Administrator related **********
	
	
	
	
	
	
	// ******** Friend related **********
	
	self.sendRequest=function()
	{
		
		var friendid=self.fetcheduser.userId;
		userService.sendRequest(friendid)
		
		.then(function(reponse){
			
			
			alert("Request Sent !");
			
			self.friendstatus='Awaiting Confirmation';		
			
		},function(reponse){
		});
		
	};
	
	
	
	self.acceptRequest=function()
	{
		console.log("Accept Request Called");
		console.log(self.fetchedfriendship.friendid);
		if(self.fetchedfriendship.friendid!=0)
			{
			
				self.fetchedfriendship.request_status='Accepted';
				console.log("request is being acepted");
				console.log(self.fetchedfriendship);
				userService.acceptRequest(self.fetchedfriendship)
				
				.then(function(response){
				
					alert("Request Accepted");
					self.friendstatus="Friends";
					
				},function(respsonse){ 
				
					console.log("Couldnt accept request");
				
				});
									
			}
	};
	
	
	self.acceptRequestFromProfile=function(friend)
	{
		console.log("Accept Request from profile Called");
		console.log(friend.friendid);
		if(friend.friendid!=0)
			{
			
				friend.request_status='Accepted';
				console.log("request is being acepted");
				console.log(friend);
				userService.acceptRequest(friend)
				
				.then(function(response){
				
					alert("Request Accepted");
					self.fetchUser($rootScope.currentuser.userid);
					
				},function(respsonse){
					
					console.log("Couldnt accept request");
					
				});
									
			}
	};
	
	
	self.getFriendsList=function()
	{
		console.log("Getting Friends list for user"+$rootScope.currentuser.username);
		userService.getFriendsList($rootScope.currentuser.userid)
		.then(function(data){
			
			self.friendslist=data;
			console.log("Obtained Friends List");
			console.log(self.friendslist);			
			console.log("Fetched user is "+self.fetcheduser.fullname);
			console.log("Loggeind in user is "+$rootScope.currentuser.username);
			
			
			if(self.fetcheduser.userId==$rootScope.currentuser.userid)
				{
					console.log("User is viewing his own profile and his own friendlist is loaded");
				
				}
			
			else
				{
				console.log("User is viewing another and  friendship is being checked")
				
				self.friendstatus="Add As A Friend";
				
				for(var i=0;i<self.friendslist.length;i++)
				{
				
					if(self.friendslist[i].sender_id == $rootScope.currentuser.userid  &&  self.friendslist[i].receiver_id==self.fetcheduser.userId)
					{
						
							if(self.friendslist[i].request_status=='Accepted')
								{
									self.friendstatus="Friends";
								}
							
							if(self.friendslist[i].request_status=='Pending')
							{
								self.friendstatus="Awaiting Confirmation";
							}
							
							self.fetchedfriendship=self.friendslist[i];
						
							break;
					}
					
					
					
					if(self.friendslist[i].receiver_id == $rootScope.currentuser.userid  &&  self.friendslist[i].sender_id==self.fetcheduser.userId)
					{
						
							if(self.friendslist[i].request_status=='Accepted')
								{
									self.friendstatus="Friends";
								}
							
							if(self.friendslist[i].request_status=='Pending')
							{
								self.friendstatus="Confirm Request";
							}
							
							self.fetchedfriendship=self.friendslist[i];
							break;
					}
				}
				
				console.log("Friend status is"+self.friendstatus);	
				}
		},function(data){
			
			self.friendslist=[];
			console.log("Couldnt Get Friends List");
			
			
		});
	};
	
	// ***** Friend Related ****
	
	
	
	
	// ***** Fetch User related ****
	
	self.fetchUserFromRouteParams=function()
	{
		
		var userid=$routeParams.userid;
		console.log("Fetching user with id "+userid);
		self.fetchUser(userid);
	};
	
	
	
	self.goToUser=function(idval)
	{
	
		
		console.log("usert id at goToUser is "+idval);
		$location.path('/user/'+idval);
	}
	
	
	// ***** Fetch User related ****
	
	
	
	
	// ****** Calling controller functions based on $location.path ****** 
	
	
	
	if(self.currentPath.startsWith('/user/')){
	
		self.fetchUserFromRouteParams();
	}
	
	
	
	
	if(self.currentPath=='/explore'){
		
		
		self.fetchLatestUser();

	}
	
	
	if(self.currentPath==('/userlist') || self.currentPath==('/admin/user')){
		
		
		
			self.fetchAllUser();
		}

		

		if(self.currentPath==('/myprofile')){
			
			
			
			self.fetchUser($rootScope.currentuser.userid);

		}		
		
		
		if(self.currentPath==('/admin/usercontrol'))		{
		
			self.fetchAllUser();

		}
		
		
		//********* END OF CONTROLLER **********

}]);