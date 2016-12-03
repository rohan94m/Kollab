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
	
	when('/displayblog',{
		templateUrl:'view/allblogs.html',
		comtroller:'forumController'


	}).


	otherwise({redirectTo:'/home'})







}])


.controller('frontController',['$scope',function($scope){

	console.log("Front controller reached");








}]);