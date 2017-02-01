var postcss = require('postcss');
var assign = require('object-assign');

module.exports = postcss.plugin('postcss-high-contrast', function (opts) {
	opts = assign({
		aggressiveHC: true,
		aggressiveHCDefaultSelectorList: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'],
		aggressiveHCCustomSelectorList: ['div', 'span'],
		backgroundColor: '#000',
		textColor: '#fff',
		buttonSelector: ['button'],
		buttonColor: '#000',
		buttonBackgroundColor: '#fcff3c',
		buttonBorderColor: 'none',
		linkColor: '#fcff3c',
		linkHoverColor: '#000',
		linkHoverBgColor: '#000',
		borderColor: '#fff',
		disableShadow: true,
		imageFilter: 'invert(100%)',
		imageSelectors: ['img'],
		removeCSSProps: false,
		CSSPropsWhiteList: ['background', 'background-color', 'color', 'border', 'border-top', 'border-bottom',
			'border-left', 'border-right', 'border-color', 'border-top-color', 'border-right-color',
			'border-bottom-color', 'border-left-color', 'box-shadow', 'filter', 'text-shadow']
	}, opts);

	var pattern = /(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|(rgb|rgba)\(.*\))|(linear-gradient)\(.*\)/;

	function propInArray(array, prop) {
		return array.indexOf(prop) > -1;
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
			if ((decl.prop === 'background-color') || (decl.prop === 'background')) {
				if (pattern.test(decl.value) && propInArray(opts.buttonSelector, decl.parent.selector)) {
					decl.value = decl.value.replace(pattern, opts.buttonBackgroundColor);
				}

				if (pattern.test(decl.value) && !propInArray(opts.buttonSelector, decl.parent.selector) && !propInArray(['a:hover'], decl.parent.selector)) {
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

				if (decl.parent && propInArray(opts.buttonSelector, decl.parent.selector)) {
					decl.value = opts.linkColor;
				}

				// Text Color
				if (pattern.test(decl.value) && !propInArray(['a'], decl.parent.selector)
					&& !propInArray(opts.buttonSelector, decl.parent.selector)) {
					decl.value = opts.textColor;
				}
			}

			// Border Colors
			var borderProps = [
				'border',
				'border-top',
				'border-right',
				'border-bottom',
				'border-left'
			];

			if (propInArray(borderProps, decl.prop)) {
				if (pattern.test(decl.value) && propInArray(opts.buttonSelector, decl.parent.selector)) {
					decl.value = decl.value.replace(pattern, opts.buttonBorderColor);
				}

				if (pattern.test(decl.value) && !propInArray(opts.buttonSelector, decl.parent.selector)) {
					decl.value = decl.value.replace(pattern, opts.borderColor);
				}
			}

			var borderColorProps = [
				'border-color',
				'border-top-color',
				'border-right-color',
				'border-bottom-color',
				'border-left-color'
			];

			if (propInArray(borderColorProps, decl.prop)) {
				if (pattern.test(decl.value) && propInArray(opts.buttonSelector, decl.parent.selector)) {
					decl.value = decl.value.replace(pattern, opts.buttonBorderColor);
				}

				if (pattern.test(decl.value) && !propInArray(opts.buttonSelector, decl.parent.selector)) {
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

		if (opts.imageFilter) {
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

		if (opts.removeCSSProps) {
			css.walkDecls( function (decl) {
				if (!propInArray(opts.CSSPropsWhiteList, decl.prop)) {
					decl.remove();
				}
			});

			css.walkRules( function (rule) {
				if (!rule.nodes.length) {
					rule.remove();
				}
			});
		}
	};
});
