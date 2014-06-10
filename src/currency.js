/**
 * User: antphp2010
 * Date: 10.06.14
 * Time: 11:57
 * To change this template use File | Settings | File Templates.
 */
(function(){
	var m = angular.module('softru.currency', []);
	m.filter('outputCurrency', function(){
		return function(amount){
			if(angular.isNumber(amount))
				return amount/100 + ' $';
			return 'o_O';
		};
	});
	m.directive('inputCurrency', function(outputCurrencyFilter){
		return {
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel){
				element.bind('blur', function(){
					element.val(outputCurrencyFilter(ngModel.$modelValue));
				});

				ngModel.$formatters.push(function(value){
					if(typeof value === 'undefined') return value;

					return outputCurrencyFilter(value);
				});

				ngModel.$parsers.push(function(value){
					if(typeof value === 'undefined') return value;

					value = value.replace(/[^\-0-9.]/g, '');

					if(value === '')
						return null;

					var float = parseFloat(value);
					if(angular.isNumber(float))
					{
						return Math.round(parseFloat(value) * 100);
					}
					else
						return undefined;
				});
			}
		};
	});
})();