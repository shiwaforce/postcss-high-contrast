var postcss = require('postcss');
var color = require("color");
var extend = require('util')._extend;

module.exports = postcss.plugin('postcss-high-contrast', function (opts) {
	opts = extend({
		mainBgColor: '#000',
		altBgColor: '#fff',
		textHeadingColor: '#fff',
		textColor: '#fff',
		linkColor: '#fcff3c',
		linkHoverBgColor: '#fff',
		linkHoverColor: '#000'
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
		
		css.walkRules(function(rule){
			if (rule.selector === 'body') {
				// Check if body has background or background-color
				var hasBg = rule.nodes.filter(function (node) {
					var props = ['background', 'background-color'];
					return props.indexOf(node.prop) != -1;
				}).length;
				
				// Set background color of body
				if (!hasBg){
					rule.append({prop: 'background-color', value: opts.mainBgColor});
				}
				
				// Set background color for existing background properies
				css.walkDecls(function(decl){
					if(decl.prop === 'background'){
						decl.value = opts.mainBgColor;
					} else if (decl.prop === 'background-color'){
						decl.value = opts.mainBgColor;
					}
				});
			}
			
			var textSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'];
			if (propInArray(textSelectors, rule.selector)){
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
		
		css.walkDecls('background', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50){
					decl.value = opts.mainBgColor;
				}
			}
		});
		
		css.walkDecls('background-color', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.value = opts.mainBgColor;
				}
			}
		});
		
		css.walkDecls('border-color', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.value = opts.altBgColor;
				}
			}
		});
		css.walkDecls('border-bottom-color', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.value = opts.altBgColor;
				}
			}
		});
		css.walkDecls('border-top-color', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.value = opts.altBgColor;
				}
			}
		});
		css.walkDecls('border-left-color', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.value = opts.altBgColor;
				}
			}
		});
		css.walkDecls('border-right-color', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.value = opts.altBgColor;
				}
			}
		});
		
		
		
		css.walkDecls('border', function(decl){
			if(pattern.test(decl.value)){
				var declColor = color(decl.value.match(pattern)[0]).hsl();
				
				if(declColor.s <= 50 && declColor.l >= 50 || declColor.s >= 50 || declColor.l >= 50 ){
					decl.parent.append({prop: 'border-color', value: opts.altBgColor})
				}
			}
		});
		
		css.walkDecls('color', function(decl){
			if (decl.parent && propInArray(['a'], decl.parent.selector)) {
				decl.value = opts.linkColor;
			}
			
			if (decl.parent && propInArray(['a:hover'], decl.parent.selector)) {
				decl.value = opts.linkHoverColor;
				decl.parent.append({prop: 'background-color', value: opts.linkHoverBgColor})
			}
		});
		
	}
});