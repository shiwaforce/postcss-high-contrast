var postcss = require('postcss');
var extend = require('util')._extend;

module.exports = postcss.plugin('postcss-high-contrast', function (opts) {
	opts = extend({
		aggressiveHC: true,
		aggressiveHCDefaultSelectorList: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'],
		aggressiveHCCustomSelectorList: ['div', 'span'],
		backgroundColor: '#000',
		altBgColor: '#fff',
		textColor: '#fff',
		linkColor: '#fcff3c',
		linkHoverColor: '#000',
		linkHoverBgColor: '#000',
		borderColor: '#fff',
		disableShadow: true,
		imageFilter: 'invert(100%)',
		imageSelectors: ['img']
	});

	var pattern = /(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|(rgb|rgba)\((?:\s*\d{1,3}\s*%?\s*,?\s*){3,4}\))/;

	function propInArray(array, prop) {
		var SELECTOR_SPLIT_PATTERN = /[. #:]/;
		var retValue = false;
		var selectors = prop.split(SELECTOR_SPLIT_PATTERN);

		for (var i = 0; i < selectors.length; i++) {
			if (array.indexOf(selectors[i]) !== -1) {
				retValue = true;
				break;
			}
		}
		return retValue;
	}

	return function (css) {

		if (opts.aggressiveHC) {
			css.walkRules( function (rule) {

				var hasColor = rule.nodes.filter( function (node) {
					var props = ['color'];
					return props.indexOf(node.prop) !== -1;
				}).length;

				// Aggressive HC
				if (propInArray(opts.aggressiveHCDefaultSelectorList, rule.selector)) {

					if (!hasColor) {
						rule.append({ prop: 'color', value: opts.textColor });
					} else {
						css.walkDecls( function (decl) {
							if (decl.prop === 'color') {
								decl.value = opts.textColor;
							}
						});
					}
				}

				if (propInArray(opts.aggressiveHCCustomSelectorList, rule.selector)) {

					if (!hasColor) {
						rule.append({ prop: 'color', value: opts.textColor });
					} else {
						css.walkDecls( function (decl) {
							if (decl.prop === 'color') {
								decl.value = opts.textColor;
							}
						});
					}
				}

				// Body Overrides
				if (rule.selector === 'body') {
					// Check if body has background or background-color
					var hasBg = rule.nodes.filter( function (node) {
						var props = ['background', 'background-color'];
						return props.indexOf(node.prop) !== -1;
					}).length;

					// Set background color of body
					if (!hasBg) {
						rule.append({
							prop: 'background-color',
							value: opts.backgroundColor
						});
					}
				}
			});
		}

		css.walkDecls( function (decl) {
			// Background Colors
			if (decl.prop === 'background') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.backgroundColor);
				}
			}

			if (decl.prop === 'background-color') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.backgroundColor);
				}
			}

			// Colors
			if (decl.prop === 'color') {
				if (decl.parent && propInArray(['a'], decl.parent.selector)) {
					decl.value = opts.linkColor;
				}

				if (decl.parent && propInArray(['a:hover'], decl.parent.selector)) {
					decl.value = opts.linkHoverColor;
					decl.parent.append({
						prop: 'background-color',
						value: opts.linkHoverBgColor
					});
				}

				// Text Color
				if (pattern.test(decl.value) && !propInArray(['a'], decl.parent.selector)) {
					decl.value = opts.textColor;
				}
			}

			// Border Colors
			if (decl.prop === 'border') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.borderColor);
				}
			}

			if (decl.prop === 'border-top') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.borderColor);
				}
			}

			if (decl.prop === 'border-right') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.borderColor);
				}
			}

			if (decl.prop === 'border-bottom') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.borderColor);
				}
			}

			if (decl.prop === 'border-left') {
				if (pattern.test(decl.value)) {
					decl.value = decl.value.replace(pattern, opts.borderColor);
				}
			}

			if (decl.prop === 'border-color') {
				if (pattern.test(decl.value)) {
					decl.value = opts.borderColor;
				}
			}

			if (decl.prop === 'border-top-color') {
				if (pattern.test(decl.value)) {
					decl.value = opts.borderColor;
				}
			}

			if (decl.prop === 'border-right-color') {
				if (pattern.test(decl.value)) {
					decl.value = opts.borderColor;
				}
			}

			if (decl.prop === 'border-bottom-color') {
				if (pattern.test(decl.value)) {
					decl.value = opts.borderColor;
				}
			}

			if (decl.prop === 'border-left-color') {
				if (pattern.test(decl.value)) {
					decl.value = opts.borderColor;
				}
			}

			// Shadow
			if (opts.disableShadow) {
				if (decl.prop === 'box-shadow') {
					decl.value = 'none';
				}

				if (decl.prop === 'text-shadow') {
					decl.value = 'none';
				}
			}
		});

		if(opts.imageFilter) {
			css.walkRules( function (rule) {
				var hasFilter = rule.nodes.filter( function (node) {
					var props = ['filter'];
					return props.indexOf(node.prop) !== -1;
				}).length;

				if (propInArray(opts.imageSelectors, rule.selector)) {

					if (!hasFilter) {
						rule.append({ prop: 'filter', value: opts.imageFilter });
					} else {
						css.walkDecls( function (decl) {
							if (decl.prop === 'filter') {
								decl.value = opts.imageFilter;
							}
						});
					}
				}
			});
		}
	};
});
