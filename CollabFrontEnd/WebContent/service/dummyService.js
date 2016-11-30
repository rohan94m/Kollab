app.factory('dummyService',[function(){

	var savedData=null;


	return{


		setData:function(dummyObject)
		{

			savedData=dummyObject;
		}
		,
		getData:function()
		{
			return savedData;
		}






	}





}]);