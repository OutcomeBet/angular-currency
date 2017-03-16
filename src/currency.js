(function() {
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

	m.filter('nnCurrencyNormalize', [function() {
		return function(amount) {
			if(angular.isString(amount)) {
				amount = parseFloat(amount);
			}

			if(angular.isNumber(amount)) {
				return amount.toFixed(2);
			}

			return '';
		};
	}]);

	m.filter('nnCurrencyToCoins', ['nnCurrencyRate', function(nnCurrencyRate) {
		return function(amount) {
			if(angular.isString(amount)) {
				amount = parseFloat(amount);
			}

			if(angular.isNumber(amount)) {
				return (amount * nnCurrencyRate);
			}

			return NaN;
		};
	}]);

	m.directive('nnCurrency', ['nnCurrencyFilter', 'nnCurrencyRate', function(nnCurrencyFilter, nnCurrencyRate) {
		return {
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel) {
				element.bind('blur', function() {
					element.val(nnCurrencyFilter(ngModel.$modelValue));
				});

				var isEmpty = ngModel.$isEmpty;
				ngModel.$isEmpty = function(val) {
					return isEmpty(val);
				};

				ngModel.$formatters.push(function(value) {
					if(typeof value === 'undefined') return value;

					return parseFloat(nnCurrencyFilter(value));
				});

				ngModel.$parsers.push(function(value) {
					if(typeof value === 'undefined' || value === null) {
						return value;
					}

					if(typeof value === 'number') value = value.toString();

					value = value.replace(/[^\-0-9.]/g, '');

					if(value === '')
						return null;

					var float = parseFloat(value);
					if(angular.isNumber(float)) {
						return Math.round(float * nnCurrencyRate);
					} else
						return undefined;
				});
			}
		};
	}]);
})();
