/**
 * User: antphp2010
 * Date: 10.06.14
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
(function(){
	var app = angular.module('demo', ['softru.currency']);
	app.controller('DemoCtrl', function($scope){
		$scope.model = {
			money: 123456
		};
	});
})();