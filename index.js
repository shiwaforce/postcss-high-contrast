var postcss = require('postcss');
var color = require("color");
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
		linkHoverBgColor: '#fff',
		linkHoverColor: '#000',
		
		borderColor: '#fff',
		disableShadow: true
		
	}, opts);
	
	var pattern = /(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|(rgb|rgba)\((?:\s*\d{1,3}\s*%?\s*,?\s*){3,4}\))/;
	
	function propInArray(array, prop){
		var SELECTOR_SPLIT_PATTERN = /[. #:]/;
		var retValue = false;
		var selectors = prop.split(SELECTOR_SPLIT_PATTERN);
	
		for(var i=0; i < selectors.length; i++){
			if(array.indexOf(selectors[i]) != -1){
				retValue = true;
				break;
			}
		}
		return retValue;
	};

	return function(css, result){
		
		if(opts.aggressiveHC){
			css.walkRules(function(rule){
				if (propInArray(opts.aggressiveHCDefaultSelectorList, rule.selector)){
					
					var hasColor = rule.nodes.filter(function(node){
						var props = ['color'];
						return props.indexOf(node.prop) != -1;
					}).length;
					
					if(!hasColor){
						rule.append({prop: 'color', value: opts.textColor});
					} else {
						css.walkDecls(function(decl){
							if (decl.prop === 'color'){
								decl.value = opts.textColor;
							}
						});
					}
				}
				
				if (propInArray(opts.aggressiveHCCustomSelectorList, rule.selector)){
					
					var hasColor = rule.nodes.filter(function(node){
						var props = ['color'];
						return props.indexOf(node.prop) != -1;
					}).length;
					
					if(!hasColor){
						rule.append({prop: 'color', value: opts.textColor});
					} else {
						css.walkDecls(function(decl){
							if (decl.prop === 'color'){
								decl.value = opts.textColor;
							}
						});
					}
				}
			});
		}
		
		// Background Color
		css.walkDecls('background', function(decl) {
			if(pattern.test(decl.value)) {
				decl.value = decl.value.replace(pattern, opts.mainBgColor);
			}
		});
		
		css.walkDecls('background-color', function(decl) {
			if(pattern.test(decl.value)) {
				decl.value = decl.value.replace(pattern, opts.mainBgColor);
			}
		});
		
		
		// Color
		css.walkDecls('color', function(decl){
			
			// Link Color
			if (decl.parent && propInArray(['a'], decl.parent.selector)) {
				decl.value = opts.linkColor;
			}
			
			if (decl.parent && propInArray(['a:hover'], decl.parent.selector)) {
				decl.value = opts.linkHoverColor;
				decl.parent.append({prop: 'background-color', value: opts.linkHoverBgColor})
			}
			
			// Text Color
			if(pattern.test(decl.value) && !propInArray(['a'], decl.parent.selector)){
				decl.value = opts.textColor;
			}
		});
		
		
		// Border
		css.walkDecls('border-color', function(decl){
			if(pattern.test(decl.value)){
				decl.value = opts.borderColor;
			}
		});
		
		css.walkDecls('border-bottom-color', function(decl){
			if(pattern.test(decl.value)){
				decl.value = opts.borderColor;
			}
		});
		css.walkDecls('border-top-color', function(decl){
			if(pattern.test(decl.value)){
				decl.value = opts.borderColor;
			}
		});
		
		css.walkDecls('border-left-color', function(decl){
			if(pattern.test(decl.value)){
				decl.value = opts.borderColor;
			}
		});
		
		css.walkDecls('border-right-color', function(decl){
			if(pattern.test(decl.value)){
				decl.value = opts.borderColor;
			}
		});

		css.walkDecls('border', function(decl){
			if(pattern.test(decl.value)){
				decl.value = decl.value.replace(pattern, opts.borderColor);
			}
		});
		
		css.walkDecls('border-top', function(decl){
			if(pattern.test(decl.value)){
				decl.value = decl.value.replace(pattern, opts.borderColor);
			}
		});
		
		css.walkDecls('border-right', function(decl){
			if(pattern.test(decl.value)){
				decl.value = decl.value.replace(pattern, opts.borderColor);
			}
		});
		
		css.walkDecls('border-bottom', function(decl){
			if(pattern.test(decl.value)){
				decl.value = decl.value.replace(pattern, opts.borderColor);
			}
		});
		
		css.walkDecls('border-left', function(decl){
			if(pattern.test(decl.value)){
				decl.value = decl.value.replace(pattern, opts.borderColor);
			}
		});
		
		
		// Shadow
		if(opts.disableShadow){
			css.walkDecls('box-shadow', function(decl){
				decl.value = 'none';
			});
			
			css.walkDecls('text-shadow', function(decl){
				decl.value = 'none';
			});
		}
		
	}
});