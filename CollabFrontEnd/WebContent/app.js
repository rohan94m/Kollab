var app = angular.module('myApp',[ 'ngRoute', 'ngCookies' ])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/home',{
		templateUrl:'view/home.html',
		controller:'frontController'
		}).
	when('/login',{

		templateUrl:'view/login.html',
		controller:'userController'
		
	}).

	when('/signup',{

		templateUrl:'view/signup.html',
		controller:'userController'

	}).
	when('/userlist',{

		templateUrl:'view/userlist.html',
		controller:'userController'



	}).
	
	when('/user/:userid/',{
        controller: 'forumController',
        templateUrl: 'view/profile.html'
    }).

	when('/explore',{

		templateUrl:'view/explore.html',
		controller:'userController'



	}).
	
	when('/myprofile',{

		templateUrl:'view/myprofile.html',
		controller:'userController'



	}).

	

	when('/blogview',{
		templateUrl:'view/blogview.html',
		comtroller:'forumController'


	}).
	when('/blog/:blogid/',{
        controller: 'forumController',
        templateUrl: 'view/blog.html'
    }).

	when('/newblog',{
		templateUrl:'view/newblog.html',


	}).
	
	
	when('/admin',{
		templateUrl:'view/admin.html'
		


	}).
	
	when('/admin/user',{
		templateUrl:'view/adminusercontrol.html',
		comtroller:'userController'


	}).
	

	otherwise({redirectTo:'/home'})







}])


.controller('frontController',['$scope',function($scope){

	console.log("Front controller reached");








}])

/****************Security Related*************************/
	

	.run(function($rootScope, $location, $cookieStore, $http){
	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")


		 var loggedIn=false;
	
		 
		 // Set Logged in user to rootscope from cookies, in case of page refresh

		if($cookieStore.get('currentuser'))
			{
				$rootScope.currentuser=$cookieStore.get('currentuser');
				console.log("Someone logged in")
				console.log($rootScope.currentuser);
				$http.defaults.headers.common['Authorization']='Basic'+$rootScope.currentuser;
				loggedIn=true;
			}
	



		  
		 

		// If any of these pages, restricedPage is 1

		 var restrictedPage=$.inArray($location.path(),['/myprofile','/newblog','/admin/usercontrol','/admin','/admin/blogcontrol'])>-1;
		



		 console.log(" is restrictedPage:" +restrictedPage)

	     
		 console.log("loggedIn:"+loggedIn)


	 	if (!loggedIn) 
	     {
	    	 
	    	 if(restrictedPage) {
	    		 console.log("Navigating to login page:");

	    		 alert("You need to Login to access this page");
	    		 
	    		 $location.path('/login');
	    	 }
	    	  
	     }
	     else //logged in
	    	 {
	    	 
	    	 var role = $rootScope.currentuser.role;
	    	 var userRestrictedPage = $location.path().startsWith('/admin');
	    	 
	    	 if (userRestrictedPage && role!='Admin')
	    		 {
	    		 alert("You cannot do this operation as you are not logged in as: Admin")
	    		 $location.path('/home');
	    		 }
	    	 }
    	 
});
		
	   
});























