/**
 * User: antphp2010
 * Date: 10.06.14
 * Time: 11:57
 * To change this template use File | Settings | File Templates.
 */
(function(){
	var m = angular.module('nn.currency', []);
	m.constant('nnCurrencyRate', 1);
	m.constant('nnCurrencySymbol', false);

	m.filter('nnCurrency', ['nnCurrencyRate', 'nnCurrencySymbol', function(nnCurrencyRate, nnCurrencySymbol) {
		return function(amount) {
			if(angular.isNumber(amount))
				return (amount / nnCurrencyRate).toFixed(2) + (nnCurrencySymbol ? (' ' + nnCurrencySymbol) : '');
			return '';
		};
	}]);

	m.directive('nnCurrency', ['nnCurrencyFilter', 'nnCurrencyRate', function(nnCurrencyFilter, nnCurrencyRate) {
		return {
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel){
				element.bind('blur', function(){
					element.val(nnCurrencyFilter(ngModel.$modelValue));
				});

				var isEmpty = ngModel.$isEmpty;
				ngModel.$isEmpty = function(val){
					return isEmpty(val);
				};

				ngModel.$formatters.push(function(value){
					if(typeof value === 'undefined') return value;

					return parseFloat(nnCurrencyFilter(value));
				});

				ngModel.$parsers.push(function(value){
					if(typeof value === 'undefined') return value;

					value = value.replace(/[^\-0-9.]/g, '');

					if(value === '')
						return null;

					var float = parseFloat(value);
					if(angular.isNumber(float))
					{
						return Math.round(float * nnCurrencyRate);
					}
					else
						return undefined;
				});
			}
		};
	}]);
})();